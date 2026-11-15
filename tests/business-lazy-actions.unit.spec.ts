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

const operations = [
  'editBusinessProfile',
  'updateCartEnabled',
  'createProduct',
  'addProductImage',
  'changeProductImage',
];
function fixture(name: string) {
  const calls: string[] = [];
  let release!: (value: boolean) => void;
  let fail!: (error: Error) => void;
  let started!: () => void;
  const ready = new Promise<void>((resolve) => (started = resolve));
  const gate = new Promise<boolean>((resolve, reject) => {
    release = resolve;
    fail = reject;
  });
  const state = { available: false, failure: undefined as Error | undefined };
  const product = { additionalImageCdnUrl: [] as string[] };
  const functions: any = {
    calculateFilehashFromBlob: async () => 'hash',
    addProduct: async () => {
      calls.push('create');
      return product;
    },
    editProduct: async () => {
      calls.push('editProduct');
      return product;
    },
  };
  for (const action of [
    'editBusinessProfile',
    'updateCartEnabled',
    'uploadProductImage',
  ]) {
    Object.defineProperty(functions, action, {
      get() {
        calls.push(`get:${action}`);
        if (!state.available) return undefined;
        return async (..._args: any[]) => {
          calls.push(`call:${action}`);
          if (state.failure) throw state.failure;
          return 'https://example.com/image';
        };
      },
    });
  }
  const errors: any = {};
  runInNewContext(
    transpileModule(
      readFileSync(path.join(__dirname, '../src/util/errors.ts'), 'utf8'),
      { compilerOptions: { module: ModuleKind.CommonJS } }
    ).outputText,
    { exports: errors }
  );
  const file =
    name === 'editBusinessProfile'
      ? `profile/functions/${name}.ts`
      : `catalog/functions/${name}.ts`;
  const exports: any = {};
  runInNewContext(
    transpileModule(
      readFileSync(path.join(__dirname, '../src', file), 'utf8'),
      { compilerOptions: { module: ModuleKind.CommonJS } }
    ).outputText,
    {
      exports,
      require(id: string) {
        if (id === '../../loader')
          return {
            ensureLazyModule: async (moduleId: string) => {
              calls.push(`ensure:${moduleId}`);
              started();
              return gate;
            },
          };
        if (id === '../../util')
          return {
            ...errors,
            convertToFile: async () => ({ type: 'image/png' }),
          };
        if (id === '../../assert')
          return { assertGetProduct: async () => product };
        if (/getMyUserWid$/.test(id)) return { getMyUserWid: () => 'me@c.us' };
        if (id === '../../whatsapp/functions') return functions;
        if (id === '../../whatsapp')
          return {
            Conn: { isSMB: true },
            ConnGetters: { getIsSMB: () => true },
            BusinessProfileStore: {
              fetchBizProfile: async () => {
                calls.push('fetchProfile');
                return {};
              },
            },
            OpaqueData: { createFromData: async () => 'opaque' },
            ProductModel: class {},
            ProductImageModel: class {
              constructor(value: any) {
                Object.assign(this, value);
              }
            },
            UserPrefs: {
              getMaybeMePnUser: () => 'me@c.us',
              getMaybeMeLidUser: () => undefined,
            },
          };
        throw new Error(`Unexpected dependency ${id}`);
      },
    }
  );
  const args =
    name === 'editBusinessProfile'
      ? [{ description: 'New' }]
      : name === 'updateCartEnabled'
        ? [true]
        : name === 'createProduct'
          ? [{ name: 'New', image: 'image' }]
          : ['product', 'image'];
  return {
    calls,
    ready,
    state,
    release,
    fail,
    run: async () => await exports[name](...args),
  };
}

for (const name of operations) {
  test(`${name} waits for bundle registration before resolving or dispatching the action`, async () => {
    const f = fixture(name);
    const result = f.run();
    await f.ready;
    expect(
      f.calls.filter((c) => c.startsWith('get:') || c.startsWith('call:'))
    ).toEqual([]);
    f.state.available = true;
    f.release(true);
    await result;
    const dispatch = f.calls.findIndex((c) => c.startsWith('call:'));
    expect(dispatch).toBeGreaterThan(
      f.calls.findIndex((c) => c.startsWith('ensure:'))
    );
  });
  test(`${name} does not dispatch mutations when its binding remains unavailable`, async () => {
    const f = fixture(name);
    const result = f.run();
    await f.ready;
    f.release(false);
    await expect(result).rejects.toMatchObject({
      code:
        name === 'editBusinessProfile' || name === 'updateCartEnabled'
          ? 'business_profile_unavailable'
          : 'product_image_upload_unavailable',
    });
    expect(
      f.calls.filter(
        (c) => c.startsWith('call:') || c === 'editProduct' || c === 'create'
      )
    ).toEqual([]);
  });
  test(`${name} retains an eagerly available legacy action even without lazy-loader support`, async () => {
    const f = fixture(name);
    f.state.available = true;
    const result = f.run();
    await f.ready;
    f.release(false);
    await result;
    expect(f.calls.filter((c) => c.startsWith('call:'))).toHaveLength(1);
  });
}

test('a native action rejection propagates without a second dispatch', async () => {
  const f = fixture('updateCartEnabled');
  f.state.available = true;
  f.state.failure = new Error('Denied');
  const result = f.run();
  await f.ready;
  f.release(true);
  await expect(result).rejects.toBe(f.state.failure);
  expect(f.calls.filter((c) => c.startsWith('call:'))).toHaveLength(1);
});
