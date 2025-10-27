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
import { ProductCollModel } from '../../whatsapp';
/**
 * Get collections of catalog
 *
 * @example
 * ```javascript
 * // Retrieve 20 collections of chat
 * const myCatalog = await WPP.catalog.getCollections('552198554578@c.us', '20');
 *
 * // Retrieve 20 collections of chat and products arrays limit with 10 products
 * const myCatalog = await WPP.catalog.getCollections('552198554578@c.us', '20', '10');
 * ```
 *
 * @return Your collections of products
 */
export declare function getCollections(chatId: string, qnt?: number, productsCount?: number): Promise<ProductCollModel[]>;
