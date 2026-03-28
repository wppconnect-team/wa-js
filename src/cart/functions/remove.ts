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
import { CartModel, CartStore } from '../../whatsapp';
import { deleteProductFromCart } from '../../whatsapp/functions';

const cartRemoveSchema = z.object({
  chatId: z.string(),
  productId: z.string(),
});

export type CartRemoveInput = z.infer<typeof cartRemoveSchema>;

export type CartRemoveOutput = CartModel | undefined;

/**
 * Remove a product from a cart
 *
 * @example
 * ```javascript
 * const cart = await WPP.cart.remove({
 *   chatId: '[chatId]',
 *   productId: '6987301181294',
 * });
 * ```
 *
 * @category Cart
 */
export async function remove(
  params: CartRemoveInput
): Promise<CartRemoveOutput> {
  const { chatId, productId } = cartRemoveSchema.parse(params);

  if (!chatId || !productId) {
    throw new WPPError(
      'send_required_params',
      `For update item in cart send chatId and productId`
    );
  }
  await deleteProductFromCart(chatId, productId);
  return CartStore.findCart(chatId);
}
