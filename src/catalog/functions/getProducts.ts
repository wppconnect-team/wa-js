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

import { createWid } from '../../util';
import { queryCatalog } from '../../whatsapp/functions';

/**
 * Retrieves product by contact id
 *
 * @example
 * Get products of catalogs
 * ```javascript
 * await WPP.catalog.getProducts('5521985625689@c.us', 10);
 * ```
 * @return A array with products
 * @category Catalog
 */

export async function getProducts(chatId: string, qnt: number): Promise<any[]> {
  const { data } = await queryCatalog(
    createWid(chatId),
    undefined,
    qnt || 10,
    100,
    100
  );
  return data;
}
