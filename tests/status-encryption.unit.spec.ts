/*!
 * Copyright 2026 WPPConnect Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { expect, test } from '@playwright/test';
import { readFileSync } from 'fs';
import * as path from 'path';
import { ModuleKind, transpileModule } from 'typescript';
import { createContext, runInContext } from 'vm';

// Exercise the actual injected encryptAndSendMsg wrapper, including its catch
// path. A status sent with the wrong native signature previously returned null,
// which WhatsApp reports as ERROR_UNKNOWN instead of acknowledging the status.
function statusWrapper(encryptStatus: (...args: any[]) => Promise<void>) {
  const injected: (() => void)[] = [];
  const original = async () => ({ forwarded: true });
  const protobuf = { extendedTextMessage: { text: 'Test status' } };
  let wrapped: (...args: any[]) => Promise<any>;
  const functions = {
    createMsgProtobuf: () => protobuf,
    encryptAndSendMsg: original,
    encryptAndSendStatusMsg: encryptStatus,
  };
  const context = createContext({
    exports: {},
    require(id: string) {
      if (id === '../../loader') {
        return {
          onInjected: (callback: () => void) => injected.push(callback),
          onFullReady: () => {},
        };
      }
      if (id === '../../whatsapp/functions') return functions;
      if (id === '../../whatsapp/exportModule') {
        return {
          wrapModuleFunction(target: unknown, callback: typeof wrapped) {
            if (target === original) {
              wrapped = (...args) => callback(original, ...args);
            }
          },
        };
      }
      return {};
    },
  });
  const source = readFileSync(
    path.join(__dirname, '../src/status/functions/sendRawStatus.ts'),
    'utf8'
  );
  runInContext(
    transpileModule(source, {
      compilerOptions: { module: ModuleKind.CommonJS },
    }).outputText,
    context
  );
  injected.forEach((callback) => callback());
  return { send: (...args: any[]) => wrapped(...args), protobuf };
}

const record = {
  type: 'chat',
  data: { id: 'status-id', to: 'status@broadcast', t: 123 },
};
const reporter = { sendReporter: {} };

test('status wrapper passes named options to the current native encryptor', async () => {
  const calls: any[] = [];
  const native = async (options: any) => {
    // Mirrors the native entry's first record access in WA 1046070720 and
    // 1046899131; the positional invocation fails here before sending anything.
    expect(options.sendMsgRecord.data.id).toBe(record.data.id);
    calls.push(options);
  };
  const { send, protobuf } = statusWrapper(native);
  const result = await send(record, reporter);
  expect(result).toEqual({
    t: 123,
    sync: null,
    phash: null,
    addressingMode: null,
    count: null,
    error: null,
  });
  expect(calls).toEqual([
    { sendMsgRecord: record, msgProtobuf: protobuf, metricsReporter: reporter },
  ]);
});

test('status wrapper preserves the legacy positional signature', async () => {
  const calls: any[] = [];
  const native = async (msg: any, proto: any, perf: any) => {
    calls.push([msg, proto, perf]);
  };
  const { send, protobuf } = statusWrapper(native);
  expect(await send(record, reporter)).toMatchObject({ t: 123, error: null });
  expect(calls).toEqual([[record, protobuf, reporter]]);
});

test('a native failure does not retry a potentially sent status', async () => {
  let calls = 0;
  const native = async (_options: any) => {
    calls += 1;
    throw new Error('native send failed');
  };
  const { send } = statusWrapper(native);
  expect(await send(record, reporter)).toBeNull();
  expect(calls).toBe(1);
});

test('ordinary messages bypass status encryption', async () => {
  const native = async (_options: any) => {
    throw new Error('status encryption must not run');
  };
  const { send } = statusWrapper(native);
  expect(await send({ data: { to: '123@c.us' } }, reporter)).toEqual({
    forwarded: true,
  });
});
