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

import { WPPError } from '../src/util/errors';

function listsApi({
  enabled = true,
  business = false,
  nativeId = 42 as number | undefined,
} = {}) {
  const calls: any[] = [];
  const label = {
    id: '42',
    name: 'Family',
    colorIndex: null,
    type: 5,
    isActive: true,
  };
  const functions = {
    labelsEditingEnabled: () => enabled,
    getNextLabelId: async () => {
      calls.push(['allocate']);
      return 41;
    },
    labelAddAction: async (name: string, color: number | null) => {
      if (!enabled) throw new Error('Minified invariant #75240');
      calls.push(['create', name, color]);
      return nativeId;
    },
    labelEditAction: async (...args: any[]) => {
      if (!enabled) throw new Error('Minified invariant #75241');
      calls.push(['rename', ...args]);
    },
    labelDeleteAction: async (options: any) => {
      if (!enabled) throw new Error('Minified invariant #75242');
      calls.push(['remove', options]);
    },
  };
  function load(relative: string): any {
    const exports = {};
    runInNewContext(
      transpileModule(
        readFileSync(path.join(__dirname, '../src', relative), 'utf8'),
        {
          compilerOptions: { module: ModuleKind.CommonJS },
        }
      ).outputText,
      {
        exports,
        require(id: string) {
          if (id === '../../util') return { WPPError };
          if (id === '../../assert')
            return { assertGetChat: (id: string) => ({ id }) };
          if (id === '../../profile/functions/isBusiness')
            return { isBusiness: () => business };
          if (id === '../../whatsapp/functions' || id === './labelAddAction')
            return functions;
          if (id === '../../whatsapp')
            return {
              LabelStore: {
                get: () => label,
                getNextAvailableColor: () => {
                  calls.push(['color']);
                  return 7;
                },
                addOrRemoveLabels: async (operations: any, chats: any) =>
                  calls.push(['associate', operations, chats]),
              },
            };
          if (id === './assertListEditingAvailable')
            return load('lists/functions/assertListEditingAvailable.ts');
          if (id === '../../whatsapp/functions/callLabelDeleteAction')
            return load('whatsapp/functions/callLabelDeleteAction.ts');
          throw Error(`Unexpected dependency ${id}`);
        },
      }
    );
    return exports;
  }
  return {
    calls,
    create: (...args: any[]) =>
      Promise.resolve(load('lists/functions/create.ts').create(...args)),
    rename: () =>
      Promise.resolve(
        load('lists/functions/rename.ts').rename('42', ' New name ')
      ),
    remove: () =>
      Promise.resolve(load('lists/functions/remove.ts').remove('42')),
  };
}

test('create uses the actual native ID for return and chat association', async () => {
  const api = listsApi();
  expect(await api.create(' Family ', ['5511@c.us'])).toBe('42');
  expect(api.calls).toEqual([
    ['create', 'Family', null],
    ['associate', [{ id: '42', type: 'add' }], [{ id: '5511@c.us' }]],
  ]);
});

test('business creation retains automatic and explicit colors', async () => {
  const api = listsApi({ business: true });
  await api.create('Family');
  await api.create('Work', [], 0);
  expect(api.calls).toEqual([
    ['color'],
    ['create', 'Family', 7],
    ['create', 'Work', 0],
  ]);
});

for (const action of ['create', 'rename', 'remove'] as const) {
  test(`${action} reports unavailable editing before native side effects`, async () => {
    const api = listsApi({ enabled: false });
    await expect(api[action]('Family')).rejects.toMatchObject({
      code: 'list_editing_not_available',
    });
    expect(api.calls).toEqual([]);
  });
}

test('rename preserves absent color and custom list metadata', async () => {
  const api = listsApi();
  await api.rename();
  expect(api.calls).toEqual([['rename', '42', 'New name', 0, null, true, 5]]);
});

test('remove keeps the nullable color in the native options', async () => {
  const api = listsApi();
  await api.remove();
  expect(api.calls).toEqual([
    ['remove', { labelId: '42', name: 'Family', color: null }],
  ]);
});

test('create does not associate chats or report success when the native ID is absent', async () => {
  const failed = listsApi({ nativeId: null as any });
  await expect(failed.create('Family', ['5511@c.us'])).rejects.toMatchObject({
    code: 'list_create_failed',
  });
  expect(failed.calls).toEqual([['create', 'Family', null]]);
});

test('invalid list input is rejected before any mutation', async () => {
  const api = listsApi();
  await expect(api.create(' ')).rejects.toMatchObject({
    code: 'list_name_required',
  });
  await expect(api.create('Family', [], -1)).rejects.toMatchObject({
    code: 'list_invalid_color',
  });
  expect(api.calls).toEqual([]);
});
