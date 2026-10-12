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

import { isMetaModuleBlacklisted } from '../src/loader/blacklist';

interface TestLoader {
  loaderType: string;
  injectLoader(): void;
  searchId(predicate: (module: unknown, id: string) => boolean): string | null;
  modules(): Record<string, unknown>;
  loadModule(id: string): unknown;
}

function metaLoaderFixture() {
  const resolutions: string[] = [];
  const chat = { ChatCollection: {} };
  const attachmentUI = { displayName: 'AttachMediaFlow' };
  const modules: Record<string, unknown> = {
    WAWebChatCollection: chat,
    'WAWebAttachMediaFlow.react': attachmentUI,
  };
  const registrations = Object.fromEntries(
    Object.keys(modules).map((id) => [id, { factory: () => modules[id] }])
  );
  const global = {
    require: () => ({ modulesMap: registrations }),
    __d: () => {},
    importNamespace: (id: string): unknown => {
      resolutions.push(id);
      return modules[id];
    },
    ErrorGuard: { skipGuardGlobal: () => {} },
  };
  const loader: TestLoader = {
    loaderType: 'unknown',
    injectLoader: () => {},
    searchId: () => null,
    modules: () => ({}),
    loadModule: () => null,
  };
  runInNewContext(
    transpileModule(
      readFileSync(path.join(__dirname, '../src/loader/index.ts'), 'utf8'),
      { compilerOptions: { module: ModuleKind.CommonJS } }
    ).outputText,
    {
      exports: loader,
      self: global,
      window: global,
      setTimeout: () => 0,
      clearTimeout: () => {},
      setInterval: () => 0,
      clearInterval: () => {},
      require(id: string): unknown {
        switch (id) {
          case 'debug':
            return () => () => {};
          case '../eventEmitter':
            return { internalEv: { waitFor: () => new Promise(() => {}) } };
          case './blacklist':
            return { isMetaModuleBlacklisted };
          case './lazyModules':
            return { LAZY_MODULES: {}, MAX_DISCOVERED_COMPONENTS: 0 };
          default:
            throw new Error(`Unexpected fixture dependency: ${id}`);
        }
      },
    }
  );
  loader.injectLoader();
  return { loader, resolutions, attachmentUI };
}

test('unrelated searches do not initialize the native attachment preview UI', () => {
  const { loader, resolutions } = metaLoaderFixture();
  expect(loader.loaderType).toBe('meta');
  expect(loader.searchId(() => false)).toBeNull();
  expect(resolutions).toContain('WAWebChatCollection');
  expect(resolutions).not.toContain('WAWebAttachMediaFlow.react');
});

test('bulk enumeration skips attachment UI while explicit loading remains available', () => {
  const { loader, resolutions, attachmentUI } = metaLoaderFixture();
  expect(Object.keys(loader.modules())).toContain('WAWebChatCollection');
  expect(resolutions).not.toContain('WAWebAttachMediaFlow.react');
  expect(loader.loadModule('WAWebAttachMediaFlow.react')).toBe(attachmentUI);
  expect(resolutions).toContain('WAWebAttachMediaFlow.react');
});
