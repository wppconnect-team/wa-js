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

import { ProductCatalogSession } from '../../whatsapp';
import { createCollection as CreateCollection } from '../../whatsapp/functions';

const catalogCreateCollectionSchema = z.object({
  collectionName: z.string(),
  productsId: z.array(z.string()),
});

export type CatalogCreateCollectionInput = z.infer<
  typeof catalogCreateCollectionSchema
>;

export type CatalogCreateCollectionOutput = any;

/**
 * Create a new product collection in your catalog
 *
 * @example
 * ```javascript
 * await WPP.catalog.createCollection({
 *   collectionName: 'Summer Sale',
 *   productsId: ['[productId1]', '[productId2]'],
 * });
 * ```
 *
 * @category Catalog
 */
export async function createCollection(
  params: CatalogCreateCollectionInput
): Promise<CatalogCreateCollectionOutput> {
  const { collectionName, productsId } =
    catalogCreateCollectionSchema.parse(params);

  const { sessionId } = new ProductCatalogSession(true);

  return await CreateCollection(collectionName, productsId, `${sessionId}`);
}
