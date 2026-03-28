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

import { deleteProducts as _deleteProducts } from '../../whatsapp/functions';

const catalogDeleteProductsSchema = z.object({
  productsIds: z.array(z.string()),
});

export type CatalogDeleteProductsInput = z.infer<
  typeof catalogDeleteProductsSchema
>;

export type CatalogDeleteProductsOutput = {
  productsIds: string[];
  status: number;
};

/**
 * Delete one or more products from your catalog
 *
 * @example
 * ```javascript
 * const result = await WPP.catalog.deleteProducts({
 *   productsIds: ['[productId1]', '[productId2]'],
 * });
 * ```
 *
 * @category Catalog
 */
export async function deleteProducts(
  params: CatalogDeleteProductsInput
): Promise<CatalogDeleteProductsOutput> {
  const { productsIds } = catalogDeleteProductsSchema.parse(params);

  let status = 200;
  try {
    if (Array.isArray(productsIds)) {
      await _deleteProducts(productsIds);
    } else {
      await _deleteProducts([productsIds]);
    }
  } catch (_error) {
    status = 500;
  }

  return {
    productsIds,
    status,
  };
}
