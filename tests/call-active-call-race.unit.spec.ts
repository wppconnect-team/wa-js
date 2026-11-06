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

const RINGING = 'ReceivedCall';

function callModel(id: string, extra: any = {}) {
  return {
    id,
    isVideo: false,
    isGroup: false,
    getState: () => RINGING,
    ...extra,
  };
}

/**
 * Loads the call functions with a VoIP stack that only resolves when the test
 * says so, to change the active call while the stack is loading.
 */
function callApi() {
  const store: { activeCall: any } = { activeCall: null };
  const native: string[] = [];
  const stack: any = {
    parsers: { parseCallInfo: (json: string) => JSON.parse(json) },
  };
  for (const name of [
    'acceptCall',
    'rejectCall',
    'endCall',
    'setCallMute',
    'setCallVideoMute',
    'requestVideoUpgrade',
    'sendReaction',
    'raiseHand',
  ]) {
    stack[name] = async () => {
      native.push(`${name}:${store.activeCall?.id}`);
      return 0;
    };
  }
  stack.getCallInfo = async () => {
    native.push(`getCallInfo:${store.activeCall?.id}`);
    return JSON.stringify({ callId: store.activeCall?.id });
  };

  let pending: Array<(value: any) => void> = [];
  const resolveStack = () => {
    pending.forEach((resolve) => resolve(stack));
    pending = [];
  };

  const whatsapp = {
    CallStore: {
      get activeCall() {
        return store.activeCall;
      },
      get: () => undefined,
      getModelsArray: () => [],
    },
    websocket: new Proxy(
      {},
      {
        get() {
          throw new Error('legacy path must not be used');
        },
      }
    ),
  };

  const modules: Record<string, any> = {
    '../../util': { WPPError },
    '../../whatsapp': whatsapp,
    '../../whatsapp/enums': { CALL_STATES: { ReceivedCall: RINGING } },
    '../../whatsapp/functions': {
      getVoipStackInterface: () =>
        new Promise((resolve) => pending.push(resolve)),
    },
    '../../conn/functions/getMyUserWid': { getMyUserWid: () => null },
    './enableCallInterface': { enableCallInterface: async () => undefined },
  };

  const load = (file: string) => {
    const exports: any = {};
    const context = createContext({
      exports,
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
  modules['./getCall'] = load('getCall');

  const api: any = {};
  for (const file of [
    'accept',
    'end',
    'getCallInfo',
    'raiseHand',
    'reject',
    'sendReaction',
    'setMute',
    'setVideoEnabled',
  ]) {
    Object.assign(api, load(file));
  }

  return { api, store, native, resolveStack };
}

/**
 * Starts the operation while call A is active, applies `change` while the
 * stack is still loading, then lets the stack resolve.
 */
async function raceOperation(
  run: (api: any) => Promise<any>,
  change: (store: { activeCall: any }) => void
) {
  const ctx = callApi();
  const callA = callModel('CALL-A');
  ctx.store.activeCall = callA;

  const result = run(ctx.api).then(
    (value) => ({ value }),
    (error) => ({ error })
  );
  change(ctx.store);
  // Let enableCallInterface settle so the stack request is pending
  await new Promise((resolve) => setTimeout(resolve, 0));
  ctx.resolveStack();

  return { ...ctx, callA, outcome: (await result) as any };
}

const replaceWithB = (store: { activeCall: any }) => {
  store.activeCall = callModel('CALL-B');
};
const endCall = (store: { activeCall: any }) => {
  store.activeCall = null;
};

const operations: Array<[string, (api: any) => Promise<any>]> = [
  ['end', (api) => api.end('CALL-A')],
  ['setMute', (api) => api.setMute(true, 'CALL-A')],
  ['setVideoEnabled', (api) => api.setVideoEnabled(true, 'CALL-A')],
  ['sendReaction', (api) => api.sendReaction('👍', 'CALL-A')],
  ['raiseHand', (api) => api.raiseHand(true, 'CALL-A')],
  ['getCallInfo', (api) => api.getCallInfo('CALL-A')],
  ['accept', (api) => api.accept('CALL-A')],
  ['reject', (api) => api.reject('CALL-A')],
];

test.describe('call operations while the VoIP stack is loading', () => {
  for (const [name, run] of operations) {
    test(`${name} does not act on a call that replaced the requested one`, async () => {
      const { outcome, native, store } = await raceOperation(run, replaceWithB);

      expect(outcome.error).toBeInstanceOf(WPPError);
      expect(outcome.error.code).toBe('call_not_found');
      expect(native).toEqual([]);
      expect(store.activeCall.userEndedCall).toBeUndefined();
    });

    test(`${name} fails when the requested call ended`, async () => {
      const { outcome, native } = await raceOperation(run, endCall);

      expect(outcome.error).toBeInstanceOf(WPPError);
      expect(outcome.error.code).toBe('call_not_found');
      expect(native).toEqual([]);
    });

    test(`${name} acts on the requested call when it is still active`, async () => {
      const { outcome, native } = await raceOperation(run, () => undefined);

      expect(outcome.error).toBeUndefined();
      expect(native).toHaveLength(1);
      expect(native[0]).toMatch(/:CALL-A$/);
    });
  }

  test('without a call id, pins the call active when requested', async () => {
    const { outcome, native } = await raceOperation(
      (api) => api.setMute(true),
      replaceWithB
    );

    expect(outcome.error?.code).toBe('call_not_found');
    expect(native).toEqual([]);
  });

  test('end marks only the requested call as ended by the user', async () => {
    const { outcome, callA } = await raceOperation(
      (api) => api.end('CALL-A'),
      () => undefined
    );

    expect(outcome.value).toBe(true);
    expect(callA.userEndedCall).toBe(true);
  });
});
