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
import { strict as assert } from 'assert';
import { readFileSync } from 'fs';
import * as path from 'path';
import { ModuleKind, transpileModule } from 'typescript';
import { runInNewContext } from 'vm';

function load(addProduct: (...args: any[]) => Promise<any>) {
  const exports: any = {};
  const code = transpileModule(
    readFileSync(
      path.join(__dirname, '../src/catalog/functions/createProduct.ts'),
      'utf8'
    ),
    { compilerOptions: { module: ModuleKind.CommonJS } }
  ).outputText;
  runInNewContext(code, {
    exports,
    require: (id: string) => {
      switch (id) {
        case '../../util':
          return { convertToFile: async () => ({ type: 'image/png' }) };
        case '../../whatsapp':
          return {
            OpaqueData: { createFromData: async () => 'opaque' },
            ProductModel: class {},
            ProductImageModel: class {
              constructor(data: object) {
                Object.assign(this, data);
              }
            },
            UserPrefs: {
              getMaybeMePnUser: () => 'me@c.us',
              getMaybeMeLidUser: () => undefined,
            },
          };
        case '../../whatsapp/functions':
          return {
            addProduct,
            calculateFilehashFromBlob: async () => 'hash',
            uploadProductImage: async () => 'https://example.com/product.png',
          };
      }
      throw new Error(`Unexpected dependency: ${id}`);
    },
  });
  return exports.createProduct;
}

const params = {
  name: 'Product',
  image: 'image',
  price: 12.5,
  currency: 'USD',
};

test('creates a product with the current options-object signature', async () => {
  const calls: any[] = [];
  const createProduct = load(async function (options) {
    calls.push(options);
    return options.product;
  });
  const product = await createProduct(params);
  expect(calls).toHaveLength(1);
  expect(calls[0]).toEqual({ product, width: 100, height: 100 });
  expect(product).toMatchObject({
    name: 'Product',
    imageCdnUrl: 'https://example.com/product.png',
    catalogWid: 'me@c.us',
    priceAmount1000: 125000,
    currency: 'USD',
  });
});

test('preserves the legacy positional signature', async () => {
  const calls: any[] = [];
  const createProduct = load(async function (product, width, height) {
    calls.push([product, width, height]);
    return product;
  });
  const product = await createProduct(params);
  expect(calls).toEqual([[product, 100, 100]]);
});

test('propagates creation failures without submitting a second product', async () => {
  let attempts = 0;
  const failure = new Error('Catalog permission denied');
  const createProduct = load(async function (_options) {
    attempts++;
    throw failure;
  });
  await assert.rejects(
    () => createProduct(params),
    (error) => error === failure
  );
  expect(attempts).toBe(1);
});
