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
import { editCollection as EditCollection } from '../../whatsapp/functions';

const catalogEditCollectionSchema = z.object({
  collectionId: z.string(),
  name: z.string().optional(),
  productsToAdd: z.array(z.string()).optional(),
  productsToRemove: z.array(z.string()).optional(),
});

export type CatalogEditCollectionInput = z.infer<
  typeof catalogEditCollectionSchema
>;

export type CatalogEditCollectionOutput = any;

/**
 * Edit a product collection in your catalog
 *
 * @example
 * ```javascript
 * await WPP.catalog.editCollection({
 *   collectionId: '[collectionId]',
 *   name: 'New Collection Name',
 *   productsToAdd: ['[productId1]'],
 *   productsToRemove: ['[productId2]'],
 * });
 * ```
 *
 * @category Catalog
 */
export async function editCollection(
  params: CatalogEditCollectionInput
): Promise<CatalogEditCollectionOutput> {
  const { collectionId, name, productsToAdd, productsToRemove } =
    catalogEditCollectionSchema.parse(params);

  const { sessionId } = new ProductCatalogSession(true);

  return await EditCollection(
    collectionId,
    name,
    false,
    productsToAdd || [],
    productsToRemove || [],
    `${sessionId}`
  );
}
