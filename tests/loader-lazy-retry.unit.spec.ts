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
import { readFileSync } from 'fs';
import * as path from 'path';
import { ModuleKind, transpileModule } from 'typescript';
import { runInNewContext } from 'vm';

const ID = 'WAWebChatForwardMessage';

function loaderFixture() {
  const modules: Record<string, any> = {};
  const registrations: Record<string, any> = {};
  const calls: string[] = [];
  let failNext = false;
  let now = 0;
  const bootloader = {
    loadModules(components: string[], cb: () => void) {
      calls.push(components[0]);
      if (failNext) {
        failNext = false;
        throw new Error('simulated fetch failure');
      }
      registrations[ID] = () => {};
      modules[ID] = { forwardMessages: () => [] };
      cb();
    },
  };
  const exports: any = {};
  runInNewContext(
    transpileModule(
      readFileSync(path.join(__dirname, '../src/loader/index.ts'), 'utf8'),
      { compilerOptions: { module: ModuleKind.CommonJS } }
    ).outputText,
    {
      exports,
      self: { require: () => null },
      window: {},
      Date: { now: () => now },
      setTimeout: () => 0,
      clearTimeout: () => {},
      require(id: string) {
        if (id === 'debug') return () => () => {};
        if (id === '../eventEmitter')
          return { internalEv: { waitFor: () => new Promise(() => {}) } };
        if (id === './blacklist')
          return { isMetaModuleBlacklisted: () => false };
        if (id === './lazyModules')
          return {
            LAZY_MODULES: { [ID]: { components: ['WAWebForwardFlow'] } },
            MAX_DISCOVERED_COMPONENTS: 10,
          };
        throw Error(`Unexpected dependency ${id}`);
      },
    }
  );
  exports.loaderType = 'meta';
  exports.moduleRequire = Object.assign(
    (id: string) => (id === 'Bootloader' ? bootloader : modules[id] || null),
    { m: registrations }
  );
  return {
    loader: exports,
    modules,
    registrations,
    calls,
    failOnce: () => {
      failNext = true;
    },
    advance: (ms: number) => {
      now += ms;
    },
  };
}

test('retries a component whose bootload failed', async () => {
  const f = loaderFixture();
  f.failOnce();
  expect(await f.loader.ensureLazyModule(ID)).toBe(false);
  expect(await f.loader.ensureLazyModule(ID)).toBe(true);
  expect(f.calls).toEqual(['WAWebForwardFlow', 'WAWebForwardFlow']);
});

test('does not bootload a component again after it loaded', async () => {
  const f = loaderFixture();
  expect(await f.loader.ensureLazyModule(ID)).toBe(true);
  f.modules[ID] = null;
  await f.loader.ensureLazyModule(ID);
  expect(f.calls).toEqual(['WAWebForwardFlow']);
});

test('id-only conditions skip a module that has unresolved dependencies', () => {
  const f = loaderFixture();
  const byId = (_m: any, moduleId: string) => moduleId === ID;
  // Defined by one bundle while its deps are still in another: resolves null.
  f.registrations[ID] = () => {};
  expect(f.loader.searchId(byId)).toBeNull();
  f.modules[ID] = { forwardMessages: () => [] };
  f.advance(1000);
  expect(f.loader.searchId(byId)).toBe(ID);
});
