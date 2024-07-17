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

/**
 * Clear all items of cart
 *
 * @example
 * ```javascript
 * const cart = WPP.cart.add('[number]@c.us', [
 *   { id: 'productId', qnt: 2 },
 * ]);
 * ```
 *
 * @category Cart
 */

import { WPPError } from '../../util';
import { CartStore } from '../../whatsapp';
import { updateCart } from '../../whatsapp/functions';

export async function clear(wid: string): Promise<void> {
  const cart = CartStore.findCart(wid);
  if (!cart || !cart?.cartItemCollection?.length) {
    throw new WPPError(
      'cart_not_have_products',
      `Cart from  ${wid || '<empty>'} not have products`,
      {
        wid,
      }
    );
  }
  cart.cartItemCollection?.reset();
  cart.set('message', '');
  cart.trigger('change:cartItemCollection');
  updateCart(cart);
}
