/*!
 * Copyright 2021 WPPConnect Team
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

import { assertGetProduct } from '../../assert';
import { createWid } from '../../util';
import { CatalogStore, ProductModel, UserPrefs } from '../../whatsapp';
import { queryProduct } from '../../whatsapp/functions';

/**
 * Retrieves product by id
 *
 * @example
 * ```javascript
 * // Retrieve data of product
 * await WPP.catalog.getProductById('5521985565656@c.us', '68685985868923');
 * ```
 *
 * @category Catalog
 */

export async function getProductById(
  chatId: string,
  productId: number
): Promise<ProductModel> {
  let wid = createWid(chatId);
  const { data } = await queryProduct(wid, productId);
  return data;
}
