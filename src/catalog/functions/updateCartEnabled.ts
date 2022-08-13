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

import { updateCartEnabled as UpdateCartEnabled } from '../../whatsapp/functions';

/**
 * Get your current catalog
 *
 * @example
 * ```javascript
 * // Set product visibility hidden
 * const myCatalog = await WPP.catalog.setProductVisibility(54985569989897, true);
 * ```
 * // Set product visible
 * const myCatalog = await WPP.catalog.setProductVisibility(54985569989897, false);
 * ```
 *
 * @return Return sucess of product visibility set
 */
export async function updateCartEnabled(enabled: boolean): Promise<any> {
  return await UpdateCartEnabled(enabled);
}
