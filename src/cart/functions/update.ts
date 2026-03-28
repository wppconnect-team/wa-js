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
import { CartModel } from '../../whatsapp';
import { add } from './add';

const cartUpdateSchema = z.object({
  chatId: z.string(),
  productId: z.string(),
  quantity: z.number(),
});

export type CartUpdateInput = z.infer<typeof cartUpdateSchema>;

export type CartUpdateOutput = CartModel | undefined;

/**
 * Update the quantity of a product in a cart
 *
 * @example
 * ```javascript
 * const cart = await WPP.cart.update({
 *   chatId: '[chatId]',
 *   productId: '6987301181294',
 *   quantity: 12,
 * });
 * ```
 *
 * @category Cart
 */
export async function update(
  params: CartUpdateInput
): Promise<CartUpdateOutput> {
  const { chatId, productId, quantity } = cartUpdateSchema.parse(params);

  if (!chatId || !productId || !quantity) {
    throw new WPPError(
      'send_required_params',
      `For update item in cart send chatId, productId and quantity`
    );
  }
  return add({ chatId, products: [{ id: productId, qnt: quantity }] });
}
