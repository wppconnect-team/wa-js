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

/** @whatsapp 2.2144.10:35339 */
export declare function createBusinessCatalog(): Promise<any>;

/**
 * @whatsapp 2.2144.10:68793
 */
export declare function addProduct(
  product: ProductModel,
  imageWidth?: number,
  imageHeight?: number
): Promise<any>;

/**
 * @whatsapp 2.2144.10:68793
 */
export declare function editProduct(
  product: ProductModel,
  imageWidth?: number,
  imageHeight?: number
): Promise<any>;

/**
 * @whatsapp 2.2144.10:68793
 */
export declare function deleteProducts(productIds: string[]): Promise<any>;

/**
 * @whatsapp 2.2144.10:68793
 */
export declare function sendProductToChat(...args: any[]): Promise<any>;

exportModule(
  exports,
  {
    addProduct: 'addProduct',
    editProduct: 'editProduct',
    deleteProducts: 'deleteProducts',
    sendProductToChat: 'sendProductToChat',
  },
  (m) => m.sendProductToChat
);
