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

function listsApi(
  models: any[],
  { enabled = true, available = true, rollback = false, failure = false } = {}
) {
  const calls: string[][] = [];
  const functions: any = {
    colorIndexToHex: () => '#64c4ff',
    isLabelReorderEnabled: () => enabled,
  };
  const persist = async (ids: string[]) => {
    calls.push([...ids]);
    if (failure) throw new Error('native sync failed');
    if (!rollback)
      ids.forEach((id, index) => {
        models.find((model) => model.id === id).orderIndex = index;
      });
  };
  function load(file: string): any {
    const exports: any = {};
    runInNewContext(
      transpileModule(
        readFileSync(
          path.join(__dirname, '../src/lists/functions', file),
          'utf8'
        ),
        {
          compilerOptions: { module: ModuleKind.CommonJS },
        }
      ).outputText,
      {
        exports,
        require(id: string) {
          if (id === '../../whatsapp')
            return {
              LabelStore: {
                getModelsArray: () => models,
                get: (id: string) => models.find((model) => model.id === id),
              },
            };
          if (id === '../../whatsapp/functions') return functions;
          if (id === '../../util') return { WPPError };
          if (id === './getOrderedLabels') return load('getOrderedLabels.ts');
          if (id === './assertListEditingAvailable')
            return load('assertListEditingAvailable.ts');
          if (id === '../../loader')
            return {
              ensureLazyModule: async (id: string) => {
                expect(id).toBe('WAWebListsActions');
                if (available) functions.persistLabelReorder = persist;
                return available;
              },
            };
          throw Error(`Unexpected dependency ${id}`);
        },
      }
    );
    return exports;
  }
  return {
    list: load('list.ts').list as () => any[],
    setOrder: load('setOrder.ts').setOrder as (ids: string[]) => Promise<void>,
    calls,
  };
}

test('lists follow device order instead of collection creation order', () => {
  const models = [
    { id: '1', name: 'First created', type: 5, orderIndex: 30 },
    { id: '2', name: 'Second created', type: 5, orderIndex: 10 },
    { id: '3', name: 'Third created', type: 5, orderIndex: 20 },
  ];
  const { list } = listsApi(models);
  expect(list().map((item) => item.id)).toEqual(['2', '3', '1']);
  expect(models.map((item) => item.id)).toEqual(['1', '2', '3']);
  models[0].orderIndex = 0;
  expect(list().map((item) => item.id)).toEqual(['1', '2', '3']);
});

test('equal positions use numeric ids and old models retain the native id fallback', () => {
  const { list } = listsApi([
    { id: '10', type: 5, orderIndex: 4 },
    { id: '2', type: 5, orderIndex: 4 },
    { id: '1', type: 5 },
    { id: '0', type: 2, orderIndex: 0 },
  ]);
  expect(list().map((item) => item.id)).toEqual(['1', '2', '10']);
  expect(list()[1].orderIndex).toBe(4);
});

const models = () => [
  { id: '1', name: 'Family', type: 5, orderIndex: 1, colorIndex: 3 },
  { id: '2', name: 'Work', type: 5, orderIndex: 3, colorIndex: 5 },
  { id: '8', name: 'Groups', type: 2, orderIndex: 2, colorIndex: 0 },
  { id: '9', name: 'Unread', type: 1, orderIndex: 0, colorIndex: 0 },
];

test('setOrder bootloads native persistence and preserves preset slots and colors', async () => {
  const labels = models();
  const api = listsApi(labels);
  await api.setOrder(['2', '1']);
  expect(api.calls).toEqual([['9', '2', '8', '1']]);
  expect(api.list().map((item) => item.id)).toEqual(['2', '1']);
  expect(labels[0]).toMatchObject({ name: 'Family', colorIndex: 3 });
  expect(labels[1]).toMatchObject({ name: 'Work', colorIndex: 5 });
  expect(labels[2].orderIndex).toBe(2);
});

for (const ids of [[], ['1'], ['1', '1'], ['1', '9'], ['1', 'missing']]) {
  test(`rejects invalid order ${JSON.stringify(ids)} without native mutation`, async () => {
    const api = listsApi(models());
    const code = await api.setOrder(ids).then(
      () => undefined,
      (error) => error.code
    );
    expect(code).toBe('invalid_list_order');
    expect(api.calls).toHaveLength(0);
  });
}

for (const config of [{ enabled: false }, { available: false }]) {
  test(`reports unavailable reordering ${JSON.stringify(config)}`, async () => {
    const api = listsApi(models(), config);
    const code = await api.setOrder(['2', '1']).then(
      () => undefined,
      (error) => error.code
    );
    expect(code).toBe('list_ordering_not_available');
    expect(api.calls).toHaveLength(0);
  });
}

test('reports native rollback instead of claiming the order was saved', async () => {
  const api = listsApi(models(), { rollback: true });
  const code = await api.setOrder(['2', '1']).then(
    () => undefined,
    (error) => error.code
  );
  expect(code).toBe('list_order_update_failed');
  expect(api.list().map((item) => item.id)).toEqual(['1', '2']);
});

test('native rejection propagates without retrying the mutation', async () => {
  const api = listsApi(models(), { failure: true });
  const message = await api.setOrder(['2', '1']).then(
    () => undefined,
    (error) => error.message
  );
  expect(message).toBe('native sync failed');
  expect(api.calls).toHaveLength(1);
});

test('an existing order is a no-op and caller changes do not alter a pending request', async () => {
  const api = listsApi(models());
  await api.setOrder(['1', '2']);
  expect(api.calls).toHaveLength(0);
  const ids = ['2', '1'];
  const pending = api.setOrder(ids);
  ids.reverse();
  await pending;
  expect(api.list().map((item) => item.id)).toEqual(['2', '1']);
});
