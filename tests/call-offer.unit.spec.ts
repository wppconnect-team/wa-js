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

import { WPPError } from '../src/util/errors';

function wid(id: string) {
  return {
    _serialized: id,
    isUser: () => true,
    toString: () => id,
  };
}

function callModel(peer: string) {
  return { id: 'CALL-ID', peerJid: wid(peer) };
}

function offerApi(store: { activeCall?: any; models?: any[] }) {
  const calls: any[][] = [];
  const onStart: Array<() => void> = [];
  const exports: any = {};
  const context = createContext({
    exports,
    setTimeout,
    require(id: string) {
      if (id === '../../assert') return { assertWid: (to: string) => wid(to) };
      if (id === '../../contact/functions/queryExists') {
        return {
          queryExists: async () => ({
            wid: wid('5511999999999@c.us'),
            lid: wid('123456789@lid'),
          }),
        };
      }
      if (id === '../../util') return { WPPError };
      if (id === '../../whatsapp') {
        return {
          CallStore: {
            get activeCall() {
              return store.activeCall;
            },
            getModelsArray: () => store.models || [],
          },
        };
      }
      if (id === '../../whatsapp/functions') {
        return {
          getVoipStackInterface: async () => ({}),
          startWAWebVoipCall: async (...args: any[]) => {
            calls.push(args);
            onStart.forEach((fn) => fn());
          },
        };
      }
      if (id === './enableCallInterface') {
        return { enableCallInterface: async () => undefined };
      }
      throw new Error(`Unexpected dependency: ${id}`);
    },
  });
  runInContext(
    transpileModule(
      readFileSync(
        path.join(__dirname, '../src/call/functions/offer.ts'),
        'utf8'
      ),
      { compilerOptions: { module: ModuleKind.CommonJS } }
    ).outputText,
    context
  );
  return {
    offer: (to: string, options?: any) =>
      Promise.resolve(exports.offer(to, options)),
    calls,
    onStart,
  };
}

test('flags the call as a user gesture so no confirmation popup is shown', async () => {
  const store: any = { activeCall: callModel('123456789@lid') };
  const api = offerApi(store);

  await api.offer('5511999999999@c.us');

  expect(api.calls).toHaveLength(1);
  const [peer, isVideo, callFromUi, lobbyEntryPoint, callId, options] =
    api.calls[0];
  expect(peer.toString()).toBe('123456789@lid');
  expect(isVideo).toBe(false);
  expect(callFromUi).toBe(8);
  expect(lobbyEntryPoint).toBe(5);
  expect(callId).toBeNull();
  expect(options).toEqual({ entryTrust: 'user_gesture' });
});

test('forwards isVideo to the native call', async () => {
  const store: any = { activeCall: callModel('123456789@lid') };
  const api = offerApi(store);

  await api.offer('5511999999999@c.us', { isVideo: true });

  expect(api.calls[0][1]).toBe(true);
});

test('returns the call registered as activeCall after the offer is sent', async () => {
  const store: any = {};
  const api = offerApi(store);
  const placed = callModel('123456789@lid');
  api.onStart.push(() => {
    setTimeout(() => (store.activeCall = placed), 50);
  });

  const call = await api.offer('5511999999999@c.us');

  expect(call).toBe(placed);
});

test('still finds the call among the store models on older versions', async () => {
  const placed = callModel('123456789@lid');
  const api = offerApi({ models: [placed] });

  const call = await api.offer('5511999999999@c.us');

  expect(call).toBe(placed);
});

test('ignores an active call with another peer', async () => {
  const store: any = { activeCall: callModel('999@lid') };
  const api = offerApi(store);
  const placed = callModel('123456789@lid');
  api.onStart.push(() => {
    setTimeout(() => (store.activeCall = placed), 50);
  });

  const call = await api.offer('5511999999999@c.us');

  expect(call).toBe(placed);
});
