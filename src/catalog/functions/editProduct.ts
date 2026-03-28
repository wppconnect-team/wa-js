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

import { z } from 'zod';

import { assertGetProduct } from '../../assert';
import { ProductModel } from '../../whatsapp';
import { editProduct as EditProduct } from '../../whatsapp/functions';

const catalogEditProductSchema = z.object({
  productId: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  price: z.number().optional(),
  isHidden: z.boolean().optional(),
  url: z.string().optional(),
  retailerId: z.string().optional(),
});

export type CatalogEditProductInput = z.infer<typeof catalogEditProductSchema>;

export type CatalogEditProductOutput = ProductModel;

/**
 * Edit an existing product in your catalog
 *
 * @example
 * ```javascript
 * const product = await WPP.catalog.editProduct({
 *   productId: '[productId]',
 *   name: 'Updated Name',
 *   price: 2000,
 * });
 * ```
 *
 * @category Catalog
 */
export async function editProduct(
  params: CatalogEditProductInput
): Promise<CatalogEditProductOutput> {
  const { productId, ...fields } = catalogEditProductSchema.parse(params);

  const produto = await assertGetProduct(productId);
  Object.keys(fields).forEach(
    (key) => (fields as any)[key] === undefined && delete (fields as any)[key]
  );
  const editedProduct = Object.assign(produto, fields);
  return await EditProduct(editedProduct);
}
