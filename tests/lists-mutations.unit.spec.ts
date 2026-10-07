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
  const palette = [
    '#ff9485',
    '#64c4ff',
    '#ffd429',
    '#dfaef0',
    '#95a5a6',
    '#5ccfa5',
    '#ff8f8f',
    '#a5b1f7',
  ];
  const functions = {
    labelsEditingEnabled: () => enabled,
    getAllLabelColors: () => palette,
    colorIndexToHex: (index: number) => palette[index],
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
                getModelsArray: () => [label],
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
          if (id === './getColorPalette')
            return load('lists/functions/getColorPalette.ts');
          if (id === './resolveColorIndex')
            return load('lists/functions/resolveColorIndex.ts');
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
    setColor: (...args: any[]) =>
      Promise.resolve(
        load('lists/functions/setColor.ts').setColor(
          ...(args.length ? args : ['42', 0])
        )
      ),
    getColorPalette: () =>
      load('lists/functions/getColorPalette.ts').getColorPalette(),
    list: () => load('lists/functions/list.ts').list(),
    palette,
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

for (const action of ['create', 'rename', 'remove', 'setColor'] as const) {
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

test('list exposes the palette hex alongside the color index', () => {
  const api = listsApi();
  expect(api.list()).toEqual([
    { id: '42', name: 'Family', colorIndex: 0, hexColor: api.palette[0] },
  ]);
});

test('getColorPalette returns the native palette', () => {
  const api = listsApi();
  expect(api.getColorPalette()).toEqual(api.palette);
});

test('setColor preserves list metadata and applies the index', async () => {
  const api = listsApi();
  await api.setColor('42', 3);
  expect(api.calls).toEqual([['rename', '42', 'Family', 0, 3, true, 5]]);
});

test('setColor accepts a hex code from the palette', async () => {
  const api = listsApi();
  await api.setColor('42', api.palette[5]);
  expect(api.calls).toEqual([['rename', '42', 'Family', 0, 5, true, 5]]);
});

test('setColor matches hex codes regardless of case and padding', async () => {
  const api = listsApi();
  await api.setColor('42', '  #64C4FF  ');
  expect(api.calls).toEqual([['rename', '42', 'Family', 0, 1, true, 5]]);
});

test('setColor rejects colors outside the palette before mutating', async () => {
  for (const invalid of [-1, 1.5, 8, '#000000']) {
    const api = listsApi();
    await expect(api.setColor('42', invalid)).rejects.toMatchObject({
      code: 'list_invalid_color',
    });
    expect(api.calls).toEqual([]);
  }
});

test('create accepts a hex code and rejects one outside the palette', async () => {
  const api = listsApi();
  await api.create('Work', [], api.palette[2]);
  expect(api.calls).toEqual([['create', 'Work', 2]]);

  const invalid = listsApi();
  await expect(invalid.create('Work', [], '#000000')).rejects.toMatchObject({
    code: 'list_invalid_color',
  });
  expect(invalid.calls).toEqual([]);
});
