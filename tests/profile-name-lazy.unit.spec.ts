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

function profileApi({
  loaded = false,
  legacyLoader = false,
  nativeError = undefined as Error | undefined,
  loadError = undefined as Error | undefined,
} = {}) {
  const calls: any[][] = [];
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
  const api = load('profile/functions/setMyProfileName.ts', (id) => {
    if (id === '../../loader') {
      return {
        ensureLazyModule: async (moduleId: string) => {
          calls.push(['load', moduleId]);
          if (loadError) throw loadError;
          if (legacyLoader) return false;
          if (
            registry[moduleId]?.components.includes('WAWebProfileDrawer.react')
          ) {
            loaded = true;
          }
          return loaded;
        },
      };
    }
    if (id === '../../whatsapp') {
      return {
        functions: {
          get setPushname() {
            return loaded
              ? async (name: string) => {
                  calls.push(['set', name]);
                  if (nativeError) throw nativeError;
                }
              : undefined;
          },
        },
      };
    }
    throw new Error(`Unexpected dependency: ${id}`);
  });
  return {
    calls,
    setName: (name = 'New name') => Promise.resolve(api.setMyProfileName(name)),
  };
}

test('loads the profile bundle before resolving setPushname in a cold session', async () => {
  const api = profileApi();
  expect(await api.setName()).toBe(true);
  expect(api.calls).toEqual([
    ['load', 'WAWebSetPushnameConnAction'],
    ['set', 'New name'],
  ]);
});

test('preserves an already loaded legacy setter and the supplied name', async () => {
  const api = profileApi({ loaded: true, legacyLoader: true });
  expect(await api.setName('João')).toBe(true);
  expect(api.calls.filter((call) => call[0] === 'set')).toEqual([
    ['set', 'João'],
  ]);
});

test('propagates native failure without retrying the name mutation', async () => {
  const error = new Error('server rejected name');
  const api = profileApi({ loaded: true, nativeError: error });
  await expect(api.setName()).rejects.toBe(error);
  expect(api.calls.filter((call) => call[0] === 'set')).toHaveLength(1);
});

test('does not mutate the name when loading rejects', async () => {
  const error = new Error('loading failed');
  const api = profileApi({ loaded: true, loadError: error });
  await expect(api.setName()).rejects.toBe(error);
  expect(api.calls.filter((call) => call[0] === 'set')).toHaveLength(0);
});
