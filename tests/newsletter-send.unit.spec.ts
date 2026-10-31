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
import { runInNewContext } from 'vm';

import { WPPError } from '../src/util/errors';

function loadModule(file: string, dependencies: Record<string, unknown>) {
  const exports: Record<string, any> = {};
  runInNewContext(
    transpileModule(readFileSync(path.join(__dirname, '..', file), 'utf8'), {
      compilerOptions: { module: ModuleKind.CommonJS },
    }).outputText,
    {
      exports,
      require(id: string) {
        if (!(id in dependencies))
          throw new Error(`Unexpected dependency: ${id}`);
        return dependencies[id];
      },
    }
  );
  return exports;
}

function fixture(
  contract: 'action' | 'job',
  success = true,
  newsletter = true
) {
  const events: string[] = [];
  const messages: any[] = [];
  const chat = {
    id: { isGroup: () => false, toString: () => '123@newsletter' },
    isNewsletter: newsletter,
    newsletterMetadata: { role: 'owner' },
    msgs: { add: (msg: any) => messages.push(msg) },
  };
  class MsgModel {
    ack = 0;
    constructor(data: object) {
      Object.assign(this, data);
    }
    updateAck(ack: number) {
      this.ack = ack;
      events.push(`ack:${ack}`);
    }
  }
  const result = { messageSendResult: success ? 'OK' : 'ERROR_NETWORK' };
  let sentMsg: any;
  let sentType: string | undefined;
  const native =
    contract === 'action'
      ? {
          // Contract observed in WAWebNewsletterSendMsgAction on
          // 2.3000.1052511336 and 2.3000.1052536159, reported in core #2714.
          sendNewsletterMessage: async (data: any) => {
            expect(data.chat.newsletterMetadata).toBe(chat.newsletterMetadata);
            expect(data.chat).toBe(chat);
            sentMsg = data.msg;
            sentType = data.type;
            events.push('action:store');
            chat.msgs.add(data.msg);
            data.msg.updateAck(success ? 1 : -1);
            events.push('action:update');
            return { ...result, ...(success ? { msg: data.msg } : {}) };
          },
        }
      : {
          sendNewsletterMessageJob: async (data: any) => {
            expect(data.newsletterJid).toBe('123@newsletter');
            sentMsg = data.msg;
            sentType = data.type;
            return success
              ? { success: true, ack: { t: 1234 }, serverId: 5678 }
              : { success: false };
          },
        };
  const bindings = loadModule(
    'src/whatsapp/functions/sendNewsletterMessageJob.ts',
    {
      '../exportModule': {
        exportModule(
          target: any,
          properties: any,
          condition: (m: any) => boolean
        ) {
          if (!condition(native))
            throw new Error('Native finder did not match');
          if (typeof properties === 'string') target[properties] = native;
          else {
            for (const [name, property] of Object.entries(properties)) {
              const keys = Array.isArray(property) ? property : [property];
              target[name] = (native as any)[
                keys.find((key) => (native as any)[key])
              ];
            }
          }
        },
      },
    }
  );
  const functions = {
    ...bindings,
    msgDataFromMsgModel: async (msg: any) => msg,
    addNewsletterMsgsRecords: async () => events.push('wrapper:store'),
    updateNewsletterMsgRecord: async () => events.push('wrapper:update'),
    addAndSendMsgToChat: async (_chat: any, raw: any) => {
      events.push('regular');
      return [new MsgModel(raw), result];
    },
  };
  const loaded = loadModule('src/chat/functions/sendRawMessage.ts', {
    debug: () => () => undefined,
    '../../assert': { assertFindChat: async () => chat },
    '../../community': {},
    '../../util': { WPPError },
    '../../whatsapp': { MsgModel },
    '../../whatsapp/enums': {
      ACK: { SENT: 1, FAILED: -1 },
      SendMsgResult: { OK: 'OK', ERROR_NETWORK: 'ERROR_NETWORK' },
    },
    '../../whatsapp/functions': functions,
    '..': { defaultSendMessageOptions: { waitForAck: true } },
    '.': { prepareRawMessage: async (_chat: any, raw: any) => raw },
  });
  return {
    events,
    messages,
    get sentMsg() {
      return sentMsg;
    },
    get sentType() {
      return sentType;
    },
    send: (type = 'chat') =>
      loaded.sendRawMessage('123@newsletter', {
        id: { toString: () => 'MESSAGE_ID' },
        type,
      }),
  };
}

for (const [type, nativeType] of [
  ['chat', 'text'],
  ['image', 'media'],
  ['video', 'media'],
  ['poll_creation', 'pollCreation'],
]) {
  test(`passes chat to the native newsletter action for ${type}`, async () => {
    const f = fixture('action');
    const result = await f.send(type);
    expect(result).toMatchObject({
      id: 'MESSAGE_ID',
      ack: 1,
      sendMsgResult: { messageSendResult: 'OK' },
    });
    expect(f.sentType).toBe(nativeType);
    expect(f.messages).toEqual([f.sentMsg]);
    expect(f.events).toEqual(['action:store', 'ack:1', 'action:update']);
  });
}

test('preserves the native action failure ACK and send result', async () => {
  const f = fixture('action', false);
  expect(await f.send()).toMatchObject({
    ack: -1,
    sendMsgResult: { messageSendResult: 'ERROR_NETWORK' },
  });
  expect(f.events).toEqual(['action:store', 'ack:-1', 'action:update']);
});

test('keeps the legacy job storage path and a single MsgModel', async () => {
  const f = fixture('job');
  expect(await f.send()).toMatchObject({
    ack: 1,
    sendMsgResult: { messageSendResult: 'OK' },
  });
  expect(f.sentType).toBe('text');
  expect(f.messages).toEqual([f.sentMsg]);
  expect(f.sentMsg).toMatchObject({ t: 1234, serverId: 5678 });
  expect(f.events).toEqual(['wrapper:store', 'ack:1', 'wrapper:update']);
});

test('does not report a failed legacy job as sent', async () => {
  const f = fixture('job', false);
  expect(await f.send()).toMatchObject({
    ack: -1,
    sendMsgResult: { messageSendResult: 'ERROR_NETWORK' },
  });
});

test('leaves the regular chat send path unchanged', async () => {
  const f = fixture('action', true, false);
  expect(await f.send()).toMatchObject({
    sendMsgResult: { messageSendResult: 'OK' },
  });
  expect(f.events).toEqual(['regular']);
});

test('rejects unsupported newsletter message types before native send', async () => {
  const f = fixture('action');
  const failure = await f.send('audio').catch((error: unknown) => error);
  expect(failure).toMatchObject({
    code: 'type_not_valid_for_newsletter',
  });
  expect(f.events).toEqual([]);
});
