/*!
 * Copyright 2024 WPPConnect Team
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

import { exportModule } from '../exportModule';
import { ProductModel } from '../models';

export declare function addProductToCart(product: ProductModel): Promise<{
  newCount: number;
  status: 'SUCCESS' | 'QUANTITY_LIMIT_REACHED';
  totalCartCount: number;
}>;

export declare function updateProductQuantityCart(
  product: ProductModel,
  quantity: number
): Promise<any>;

export declare function deleteProductFromCart(
  chatId: string,
  productId: string
): Promise<any>;

exportModule(
  exports,
  {
    addProductToCart: 'addProductToCart',
  },
  (m) => m.addProductToCart
);

exportModule(
  exports,
  {
    updateProductQuantityCart: 'default',
  },
  (m) => m.default?.displayName?.includes('BizUpdateProductQuantityCartAction')
);

exportModule(
  exports,
  {
    deleteProductFromCart: 'default',
  },
  (m) => m.default?.displayName?.includes('BizDeleteProductFromCartAction')
);
