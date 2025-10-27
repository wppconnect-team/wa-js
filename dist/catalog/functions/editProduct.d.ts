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
import { ProductModel } from '../../whatsapp';
/**
 * Get your current catalog
 *
 * @example
 * ```javascript
 * // Get your current catalog
 * const myCatalog = WPP.catalog.editProduct('5498255476885590', {name: 'Plano 01', price: '89990', description: 'Insert description for your product', isHidden: true, url: 'http://www.wppconnect.io', retailerId: 'AKA001'});
 * ```
 *
 * @return Return model of product edited
 */
export interface editProductParams {
    name?: string;
    description?: string;
    image?: string;
    price?: number;
    isHidden?: boolean;
    url?: string;
    retailerId?: string;
}
export declare function editProduct(productId: string, params: editProductParams): Promise<ProductModel>;
