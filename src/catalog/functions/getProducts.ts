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

import { createWid } from '../../util';
import { queryCatalog } from '../../whatsapp/functions';

const catalogGetProductsSchema = z.object({
  chatId: z.string(),
  limit: z.number().optional(),
});

export type CatalogGetProductsInput = z.infer<typeof catalogGetProductsSchema>;

export type CatalogGetProductsOutput = any[];

/**
 * Get products from a business catalog
 *
 * @example
 * ```javascript
 * const products = await WPP.catalog.getProducts({ chatId: '[chatId]' });
 *
 * // Limit the number of products returned
 * const products = await WPP.catalog.getProducts({ chatId: '[chatId]', limit: 20 });
 * ```
 *
 * @category Catalog
 */
export async function getProducts(
  params: CatalogGetProductsInput
): Promise<CatalogGetProductsOutput> {
  const { chatId, limit } = catalogGetProductsSchema.parse(params);

  const { data } = await queryCatalog(
    createWid(chatId),
    undefined,
    limit ?? 10,
    100,
    100
  );
  return data;
}
