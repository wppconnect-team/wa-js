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

const TOKEN = 'AbCdEfGhIjKlMnOpQrStUv';

function wid(id: string) {
  return {
    _serialized: id,
    isGroup: () => id.endsWith('@g.us'),
    toString: () => id,
  };
}

/**
 * Loads offerGroup and joinCallLink with a store whose active call is set by
 * `onStart` once WhatsApp is asked to start or join the call.
 */
function callApi(onStart: (store: { activeCall: any }) => void) {
  const store: { activeCall: any } = { activeCall: null };
  const stack = {
    previewAndJoinCallLink: async () => {
      onStart(store);
      return 0;
    },
  };

  const modules: Record<string, any> = {
    '../../assert': {
      assertWid: (id: string) => wid(id),
      assertFindChat: async (groupWid: any) => ({ id: groupWid }),
    },
    '../../contact/functions/queryExists': {
      queryExists: async (w: any) => ({ wid: w }),
    },
    '../../loader': { ensureLazyModule: async () => undefined },
    '../../util': { WPPError },
    '../../whatsapp': {
      CallStore: {
        get activeCall() {
          return store.activeCall;
        },
      },
    },
    '../../whatsapp/functions': {
      getVoipStackInterface: async () => stack,
      startWAWebVoipGroupCallFromChat: async () => onStart(store),
      startWAWebVoipGroupCallFromWids: async () => onStart(store),
    },
    './enableCallInterface': { enableCallInterface: async () => undefined },
  };

  const load = (file: string) => {
    const exports: any = {};
    const context = createContext({
      exports,
      setTimeout,
      require(id: string) {
        if (id in modules) return modules[id];
        throw new Error(`Unexpected dependency: ${id}`);
      },
    });
    runInContext(
      transpileModule(
        readFileSync(
          path.join(__dirname, `../src/call/functions/${file}.ts`),
          'utf8'
        ),
        { compilerOptions: { module: ModuleKind.CommonJS } }
      ).outputText,
      context
    );
    return exports;
  };

  modules['./requireVoipStack'] = load('requireVoipStack');

  return { ...load('offerGroup'), ...load('joinCallLink'), store };
}

test.describe('offerGroup', () => {
  test('returns the group call', async () => {
    const call = { id: 'GROUP-CALL', isGroup: true };
    const api = callApi((store) => (store.activeCall = call));

    expect(await api.offerGroup('123@g.us')).toBe(call);
  });

  test('returns the 1:1 call placed for a group with a single other member', async () => {
    const call = { id: 'DIRECT-CALL', isGroup: false };
    const api = callApi((store) => (store.activeCall = call));

    expect(await api.offerGroup('123@g.us')).toBe(call);
  });

  test('does not return the call that was already active', async () => {
    const previous = { id: 'OLD-CALL', isGroup: true };
    const call = { id: 'NEW-CALL', isGroup: true };
    const api = callApi((store) =>
      setTimeout(() => (store.activeCall = call), 150)
    );
    api.store.activeCall = previous;

    expect(await api.offerGroup(['1@c.us', '2@c.us'])).toBe(call);
  });
});

test.describe('joinCallLink', () => {
  test('returns the call under its real id, not the link token', async () => {
    const call = { id: 'REAL-CALL-ID', isGroup: true };
    const api = callApi((store) => {
      // WhatsApp first registers the call under the link token
      store.activeCall = { id: TOKEN, isGroup: true };
      setTimeout(() => (store.activeCall = call), 150);
    });

    const joined = await api.joinCallLink(
      `https://call.whatsapp.com/voice/${TOKEN}`
    );

    expect(joined).toBe(call);
  });
});
