/*!
 * Copyright 2022 WPPConnect Team
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

import { ProductCatalogSession } from '../../whatsapp';
import { editCollection as EditCollection } from '../../whatsapp/functions';

/**
 * Create new collection
 *
 * @example
 * ```javascript
 * const myCatalog = await WPP.catalog.EditCollection('565656589898', { collectionName: 'New Name for collection', productsToAdd: ['5656523223'], productsToRemove: ['5656523232']});
 * ```
 *
 * @return Return collection edited
 */
interface paramsEditCollection {
  name?: string;
  productsToAdd?: string[];
  productsToRemove?: string[];
}
export async function editCollection(
  collectionId: string,
  params: paramsEditCollection
): Promise<any> {
  const { sessionId } = new ProductCatalogSession(true);

  return await EditCollection(
    collectionId,
    params.name,
    false,
    params.productsToAdd || [],
    params.productsToRemove || [],
    `${sessionId}`
  );
}
