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

const MODULE_ID = 'WAWebVoipSendSignalingXmpp';

/**
 * Loads the signaling registration with an outgoing sender that only resolves
 * once its lazy bundle is registered.
 */
function signalingApi(bundleLoads: boolean[]) {
  const ensured: string[] = [];
  const wrapped = new Map<any, any>();
  const onReady: Array<() => void> = [];
  const stack = {};
  const sender = async () => undefined;
  const getVoipStackInterface = async () => stack;
  let registered = false;

  const modules: Record<string, any> = {
    debug: () => () => undefined,
    '../../eventEmitter': {
      ev: { hasListeners: () => true },
      internalEv: { emit: () => undefined },
    },
    '../../loader': {
      onInjected: (fn: () => void) => onReady.push(fn),
      onFullReady: (fn: () => void) => onReady.push(fn),
      ensureLazyModule: async (id: string) => {
        ensured.push(id);
        registered = registered || !!bundleLoads.shift();
        return registered;
      },
    },
    '../../whatsapp/exportModule': {
      wrapModuleFunction: (fn: any, wrapper: any) => wrapped.set(fn, wrapper),
    },
    '../../whatsapp/functions': {
      getVoipStackInterface,
      getCachedVoipStackInterface: undefined,
      get sendWAWebVoipSignalingXmpp() {
        return registered ? sender : undefined;
      },
    },
    '../../whatsapp/websocket': { decodeStanza: async () => undefined },
  };

  const context = createContext({
    exports: {},
    require(id: string) {
      if (id in modules) return modules[id];
      throw new Error(`Unexpected dependency: ${id}`);
    },
  });
  runInContext(
    transpileModule(
      readFileSync(
        path.join(__dirname, '../src/call/events/registerSignalingEvent.ts'),
        'utf8'
      ),
      { compilerOptions: { module: ModuleKind.CommonJS } }
    ).outputText,
    context
  );
  onReady.forEach((fn) => fn());

  const resolveStack = async () => {
    await wrapped.get(getVoipStackInterface)(getVoipStackInterface);
    await new Promise((resolve) => setTimeout(resolve, 0));
  };

  return { ensured, wrapped, sender, resolveStack };
}

test('wraps the outgoing sender after requesting its lazy bundle', async () => {
  const api = signalingApi([true]);

  expect(api.wrapped.has(api.sender)).toBe(false);
  await api.resolveStack();

  expect(api.ensured).toEqual([MODULE_ID]);
  expect(api.wrapped.has(api.sender)).toBe(true);
});

test('retries on the next stack access when the bundle failed to load', async () => {
  const api = signalingApi([false, true]);

  await api.resolveStack();
  expect(api.wrapped.has(api.sender)).toBe(false);

  await api.resolveStack();
  expect(api.ensured).toEqual([MODULE_ID, MODULE_ID]);
  expect(api.wrapped.has(api.sender)).toBe(true);
});

test('stops requesting the bundle once the sender is wrapped', async () => {
  const api = signalingApi([true]);

  await api.resolveStack();
  await api.resolveStack();

  expect(api.ensured).toEqual([MODULE_ID]);
});
