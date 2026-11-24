/*!
 * Copyright 2021 WPPConnect Team
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
import { EventEmitter2 } from 'eventemitter2';
import { readFileSync } from 'fs';
import * as path from 'path';
import { ModuleKind, transpileModule } from 'typescript';
import { runInNewContext } from 'vm';

function transpile(file: string) {
  return transpileModule(
    readFileSync(path.join(__dirname, '../src', file), 'utf8'),
    { compilerOptions: { module: ModuleKind.CommonJS } }
  ).outputText;
}

function authenticatedEvent(isAuthenticated: () => boolean) {
  const callbacks: Array<() => void> = [];
  const internalEv = new EventEmitter2();
  const cmd = Object.assign(new EventEmitter2(), { isMainLoaded: false });
  const emitted: string[] = [];
  let loggedIn = 0;
  internalEv.onAny((event) => emitted.push(String(event)));
  runInNewContext(transpile('conn/events/registerAuthenticatedEvent.ts'), {
    exports: {},
    require(id: string) {
      if (id === '../../eventEmitter') return { internalEv };
      if (id === '../../whatsapp') return { Cmd: cmd };
      if (id === '..') return { isAuthenticated };
      if (id === '../../loader') {
        return {
          onInjected: (callback: () => void) => callbacks.push(callback),
          setLoggedIn: () => loggedIn++,
        };
      }
      throw new Error(`Unexpected dependency: ${id}`);
    },
  });
  return {
    inject: () => callbacks[0](),
    cmd,
    emitted,
    loggedIn: () => loggedIn,
  };
}

test('an already logged-in session loads the logged-in modules at injection', () => {
  const f = authenticatedEvent(() => true);
  f.inject();
  expect(f.loggedIn()).toBe(1);
  expect(f.emitted).not.toContain('conn.authenticated');
});

test('the QR screen waits for the scan before loading the logged-in modules', async () => {
  const f = authenticatedEvent(() => false);
  f.inject();
  expect(f.loggedIn()).toBe(0);

  f.cmd.emit('main_loaded');
  await Promise.resolve();
  expect(f.emitted).toContain('conn.authenticated');
  expect(f.loggedIn()).toBe(1);
});

test('an unknown session state still loads the logged-in modules', () => {
  const f = authenticatedEvent(() => {
    throw new Error('isLoggedIn not found');
  });
  expect(() => f.inject()).toThrow('isLoggedIn not found');
  expect(f.loggedIn()).toBe(1);
});

function loaderFixture() {
  const internalEv = new EventEmitter2();
  const timers: Array<() => void> = [];
  const exports: any = {};
  runInNewContext(transpile('loader/index.ts'), {
    exports,
    self: { require: () => null },
    window: {},
    setTimeout: (callback: () => void) => timers.push(callback),
    clearTimeout: () => {},
    require(id: string) {
      if (id === 'debug') return () => () => {};
      if (id === '../eventEmitter') {
        return {
          internalEv: Object.assign(internalEv, {
            waitFor: () => new Promise(() => {}),
          }),
        };
      }
      if (id === './blacklist') return { isMetaModuleBlacklisted: () => false };
      if (id === './lazyModules') {
        return { LAZY_MODULES: {}, MAX_DISCOVERED_COMPONENTS: 0 };
      }
      throw new Error(`Unexpected dependency: ${id}`);
    },
  });
  return { loader: exports, timers };
}

test('onLoggedIn listeners run once, after setLoggedIn', () => {
  const { loader, timers } = loaderFixture();
  let runs = 0;
  loader.onLoggedIn(() => runs++);
  expect(loader.isLoggedIn).toBe(false);

  loader.setLoggedIn();
  loader.setLoggedIn();
  timers.forEach((callback) => callback());

  expect(loader.isLoggedIn).toBe(true);
  expect(runs).toBe(1);
});
