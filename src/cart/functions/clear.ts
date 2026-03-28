/*!
 * Copyright 2026 WPPConnect Team
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

import { z } from 'zod';

import { WPPError } from '../../util';
import { CartStore } from '../../whatsapp';
import { updateCart } from '../../whatsapp/functions';

const cartClearSchema = z.object({
  chatId: z.string(),
});

export type CartClearInput = z.infer<typeof cartClearSchema>;

export type CartClearOutput = void;

/**
 * Clear all items from a cart
 *
 * @example
 * ```javascript
 * await WPP.cart.clear({ chatId: '[chatId]' });
 * ```
 *
 * @category Cart
 */
export async function clear(params: CartClearInput): Promise<CartClearOutput> {
  const { chatId } = cartClearSchema.parse(params);

  const cart = CartStore.findCart(chatId);
  if (!cart || !cart?.cartItemCollection?.length) {
    throw new WPPError(
      'cart_not_have_products',
      `Cart from  ${chatId || '<empty>'} not have products`,
      {
        chatId,
      }
    );
  }
  cart.cartItemCollection?.reset();
  cart.set('message', '');
  cart.trigger('change:cartItemCollection');
  updateCart(cart);
}
