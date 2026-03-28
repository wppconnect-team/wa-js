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

import { CartModel, CartStore } from '../../whatsapp';

const cartGetSchema = z.object({
  chatId: z.string(),
});

export type CartGetInput = z.infer<typeof cartGetSchema>;

export type CartGetOutput = CartModel | undefined;

/**
 * Get the cart for a chat
 *
 * @example
 * ```javascript
 * const cart = WPP.cart.get({ chatId: '[chatId]' });
 * ```
 *
 * @category Cart
 */
export function get(params: CartGetInput): CartGetOutput {
  const { chatId } = cartGetSchema.parse(params);

  return CartStore.get(chatId);
}
