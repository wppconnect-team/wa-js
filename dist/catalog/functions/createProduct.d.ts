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
 * Create new product
 *
 * @example
 * ```javascript
 * const myCatalog = await WPP.catalog.addProduct(
    {
      name: 'Product name',
      image: 'base64 image string',
      description: 'product description',
      price: '89.90',
      isHidden: false,
      url: 'https://wppconnect.io',
      retailerId: 'AKA001',
    }
  );
 * ```
 *
 * @return Your created product
 */
export interface createProductParams {
    name: string;
    image: string;
    description?: string;
    price?: number;
    isHidden?: boolean;
    url?: string;
    retailerId?: string;
    currency?: string;
}
export declare function createProduct(params: createProductParams): Promise<ProductModel>;
