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
import { deleteCollection as DeleteCollection } from '../../whatsapp/functions';

const catalogDeleteCollectionSchema = z.object({
  collectionId: z.string(),
});

export type CatalogDeleteCollectionInput = z.infer<
  typeof catalogDeleteCollectionSchema
>;

export type CatalogDeleteCollectionOutput = string;

/**
 * Delete a product collection from your catalog
 *
 * @example
 * ```javascript
 * await WPP.catalog.deleteCollection({ collectionId: '[collectionId]' });
 * ```
 *
 * @category Catalog
 */
export async function deleteCollection(
  params: CatalogDeleteCollectionInput
): Promise<CatalogDeleteCollectionOutput> {
  const { collectionId } = catalogDeleteCollectionSchema.parse(params);

  const { sessionId } = new ProductCatalogSession(true);
  await DeleteCollection(collectionId, `${sessionId}`);
  return 'Collection deleted successfully';
}
