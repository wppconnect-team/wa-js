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

function loaderFixture() {
  const modules: Record<string, any> = { WAWebChatCollection: null };
  const registrations: Record<string, any> = { WAWebChatCollection: () => {} };
  let now = 0;
  let resolutions = 0;
  const exports: any = {};
  runInNewContext(
    transpileModule(
      readFileSync(path.join(__dirname, '../src/loader/index.ts'), 'utf8'),
      {
        compilerOptions: { module: ModuleKind.CommonJS },
      }
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
          return { META_MODULE_ID_BLACKLIST: new Set() };
        if (id === './lazyModules')
          return { LAZY_MODULES: {}, MAX_DISCOVERED_COMPONENTS: 10 };
        throw Error(`Unexpected dependency ${id}`);
      },
    }
  );
  exports.loaderType = 'meta';
  exports.moduleRequire = Object.assign(
    (id: string) => {
      if (id !== 'WAWebReact') resolutions++;
      return modules[id] || null;
    },
    { m: registrations }
  );
  return {
    loader: exports,
    modules,
    registrations,
    advance: (ms: number) => {
      now += ms;
    },
    resolutions: () => resolutions,
  };
}

test('recovers a predeclared core module whose exports become available without new IDs', () => {
  const f = loaderFixture();
  const predicate = (m: any) => !!m?.ChatCollection;
  expect(f.loader.searchId(predicate)).toBeNull();
  f.modules.WAWebChatCollection = { ChatCollection: {} };
  f.advance(1000);
  expect(f.loader.searchId(predicate)).toBe('WAWebChatCollection');
});

test('bounds repeated scans until the negative cache expires', () => {
  const f = loaderFixture();
  const predicate = (m: any) => !!m?.ChatCollection;
  f.loader.searchId(predicate);
  const before = f.resolutions();
  for (let i = 0; i < 9; i++) {
    f.advance(100);
    expect(f.loader.searchId(predicate)).toBeNull();
  }
  expect(f.resolutions()).toBe(before);
  f.advance(100);
  f.loader.searchId(predicate);
  expect(f.resolutions()).toBeGreaterThan(before);
});

test('newly registered IDs invalidate a miss immediately', () => {
  const f = loaderFixture();
  const predicate = (m: any) => !!m?.Conn;
  expect(f.loader.searchId(predicate)).toBeNull();
  f.registrations.WAWebConn = () => {};
  f.modules.WAWebConn = { Conn: {} };
  expect(f.loader.searchId(predicate)).toBe('WAWebConn');
});

test('each predicate can recover independently despite repeated unrelated misses', () => {
  const f = loaderFixture();
  const missing = ['Socket', 'MsgStore', 'Stream'].map(
    (key) => (m: any) => !!m?.[key]
  );
  const available = (m: any) => !!m?.ChatCollection;
  for (const predicate of [...missing, available])
    expect(f.loader.searchId(predicate)).toBeNull();
  f.modules.WAWebChatCollection = { ChatCollection: {} };
  f.advance(1000);
  for (let i = 0; i < 20; i++)
    for (const predicate of missing) f.loader.searchId(predicate);
  expect(f.loader.searchId(available)).toBe('WAWebChatCollection');
});

test('positive results remain cached', () => {
  const f = loaderFixture();
  const predicate = (m: any) => !!m?.ChatCollection;
  f.modules.WAWebChatCollection = { ChatCollection: {} };
  expect(f.loader.searchId(predicate)).toBe('WAWebChatCollection');
  const before = f.resolutions();
  f.advance(10000);
  expect(f.loader.searchId(predicate)).toBe('WAWebChatCollection');
  expect(f.resolutions()).toBe(before);
});
