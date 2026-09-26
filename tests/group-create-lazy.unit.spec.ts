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
import { compare } from 'compare-versions';
import { readFileSync } from 'fs';
import * as path from 'path';
import { ModuleKind, transpileModule } from 'typescript';
import { runInNewContext } from 'vm';

function createApi({
  loaded = false,
  version = '2.3000.1048567512',
  legacyLoader = false,
  nativeError = undefined as Error | undefined,
  loadError = undefined as Error | undefined,
} = {}) {
  const calls: any[][] = [];
  let fallback: any;
  const group = { wid: '123@g.us', participants: [{ wid: '456@c.us' }] };
  const load = (file: string, requireModule: (id: string) => any) => {
    const exports: any = {};
    runInNewContext(
      transpileModule(
        readFileSync(path.join(__dirname, '../src', file), 'utf8'),
        { compilerOptions: { module: ModuleKind.CommonJS } }
      ).outputText,
      { exports, require: requireModule }
    );
    return exports;
  };
  const registry = load('loader/lazyModules.ts', () => undefined).LAZY_MODULES;
  const nativeModule = {
    get createGroup() {
      return loaded
        ? async (...args: any[]) => {
            calls.push(['create', ...args]);
            if (nativeError) throw nativeError;
            return group;
          }
        : undefined;
    },
  };
  load('whatsapp/functions/sendCreateGroup.ts', (id) => {
    if (id === 'compare-versions') return { compare };
    if (id === '../contants') return { SANITIZED_VERSION_STR: version };
    if (id === '../exportModule') return { exportModule: () => undefined };
    if (id === './createGroup') return nativeModule;
    if (id === '../../loader') {
      return {
        injectFallbackModule: (_name: string, module: any) =>
          (fallback = module),
        ensureLazyModule: async (moduleId: string) => {
          calls.push(['load', moduleId]);
          if (loadError) throw loadError;
          if (legacyLoader) return false;
          if (
            registry[moduleId]?.components.includes('WAWebNewGroupFlow.react')
          ) {
            loaded = true;
          }
          return loaded;
        },
      };
    }
    throw new Error(`Unexpected dependency: ${id}`);
  });
  return {
    calls,
    create: () =>
      Promise.resolve(
        fallback.sendCreateGroup('Family', ['456@c.us'], 86400, '789@g.us')
      ),
  };
}

test('loads the new-group bundle before resolving createGroup in a cold session', async () => {
  const api = createApi();
  expect(await api.create()).toEqual({
    gid: '123@g.us',
    participants: [
      {
        userWid: '456@c.us',
        code: '200',
        invite_code: undefined,
        invite_code_exp: undefined,
      },
    ],
  });
  expect(api.calls.map((call) => call[0])).toEqual(['load', 'create']);
  expect(api.calls[0][1]).toBe('WAWebGroupCreateJob');
  expect(api.calls[1][1]).toMatchObject({
    title: 'Family',
    ephemeralDuration: 86400,
    parentGroupId: '789@g.us',
  });
  expect(api.calls[1][2]).toEqual([{ phoneNumber: '456@c.us' }]);
});

test('retains the available native function on a legacy loader', async () => {
  const api = createApi({
    loaded: true,
    legacyLoader: true,
    version: '2.2301.5',
  });
  await api.create();
  expect(api.calls.find((call) => call[0] === 'create')?.[2]).toEqual([
    '456@c.us',
  ]);
});

test('uses an already registered create function only once', async () => {
  const api = createApi({ loaded: true });
  await api.create();
  expect(api.calls.filter((call) => call[0] === 'create')).toHaveLength(1);
});

test('propagates a native failure without retrying the group creation', async () => {
  const error = new Error('server rejected creation');
  const api = createApi({ loaded: true, nativeError: error });
  await expect(api.create()).rejects.toBe(error);
  expect(api.calls.filter((call) => call[0] === 'create')).toHaveLength(1);
});

test('does not create a group if loading rejects', async () => {
  const error = new Error('loading failed');
  const api = createApi({ loaded: true, loadError: error });
  await expect(api.create()).rejects.toBe(error);
  expect(api.calls.filter((call) => call[0] === 'create')).toHaveLength(0);
});
