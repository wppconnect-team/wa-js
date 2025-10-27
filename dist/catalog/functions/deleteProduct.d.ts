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
/**
 * Get your current catalog
 *
 * @example
 * ```javascript
 * // Delete product by id
 * const myCatalog = await WPP.catalog.delProducts('6104203702939361');
 *
 * // Delete various products
 * const myCatalog = await WPP.catalog.delProducts(['6104203702939361', '6104289702939361']);
 * ```
 *
 * @return Return sucess or error of product deleted
 */
export declare function delProducts(productsIds: string[]): Promise<any>;
