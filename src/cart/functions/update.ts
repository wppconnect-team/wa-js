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
 * Update product in cart
 *
 * @example
 * ```javascript
 * const cart = WPP.cart.update('[number]@c.us', '6987301181294productId', { quantity: 12 });
 * ```
 *
 * @category Cart
 */

import { WPPError } from '../../util';
import { CartModel } from '../../whatsapp';
import { add } from './add';

export async function update(
  chatId: string,
  productId: string,
  options: { quantity: number }
): Promise<CartModel | undefined> {
  if (!chatId || !productId || !options.quantity) {
    throw new WPPError(
      'send_required_params',
      `For update item in cart send chatId, productId and options`
    );
  }
  return add(chatId, [{ id: productId, qnt: options.quantity }]);
}
