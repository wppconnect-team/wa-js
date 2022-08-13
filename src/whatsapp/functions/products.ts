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

import { ProductModel } from '..';
import { exportModule } from '../exportModule';
import { Wid } from '../misc';

/** @whatsapp 2.2144.10:35339 */
export declare function createBusinessCatalog(): Promise<any>;

/** @whatsapp 96519
 * @whatsapp 196519 >= 2.2222.8
 * @whatsapp 895697 >= 2.2228.4
 */
export declare function addProduct(
  product: ProductModel,
  imageWidth?: number,
  imageHeight?: number
): Promise<any>;

/** @whatsapp 96519
 * @whatsapp 196519 >= 2.2222.8
 * @whatsapp 895697 >= 2.2228.4
 */
export declare function editProduct(
  product: ProductModel,
  imageWidth?: number,
  imageHeight?: number
): Promise<any>;

/** @whatsapp 96519
 * @whatsapp 196519 >= 2.2222.8
 * @whatsapp 895697 >= 2.2228.4
 */
export declare function deleteProducts(productIds: string[]): Promise<any>;

/** @whatsapp 96519
 * @whatsapp 196519 >= 2.2222.8
 * @whatsapp 895697 >= 2.2228.4
 */
export declare function sendProductToChat(...args: any[]): Promise<any>;

export interface ProductVisibilitySetParams {
  isHidden: boolean;
  productId: number;
}

/** @whatsapp 621374 >= 2.2228.14 */
export declare function productVisibilitySet(
  params: ProductVisibilitySetParams[]
): any;

/** @whatsapp 621374 >= 2.2228.14 */
export declare function queryCatalog(
  chatId?: Wid,
  t?: any,
  n?: number,
  r?: number,
  i?: number,
  s?: any,
  l?: any
): any;

/** @whatsapp 621374 >= 2.2228.14 */
export declare function queryProduct(
  chatId?: Wid,
  productId?: any,
  imageWidth?: number,
  imageHeight?: number,
  i?: any,
  s?: boolean,
  l?: any
): any;

exportModule(
  exports,
  {
    addProduct: 'addProduct',
    editProduct: 'editProduct',
    deleteProducts: 'deleteProducts',
    sendProductToChat: 'sendProductToChat',
    productVisibilitySet: 'productVisibilitySet',
    queryCatalog: 'queryCatalog',
    queryProduct: 'queryProduct',
    queryProductList: 'queryProductList',
  },
  (m) => m.sendProductToChat
);
