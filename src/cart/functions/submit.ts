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

import { assertFindChat } from '../../assert';
import {
  getMessageById,
  prepareRawMessage,
  sendMessageOptionsSchema,
} from '../../chat';
import { getMyUserId } from '../../conn';
import { createWid, WPPError } from '../../util';
import { CartStore } from '../../whatsapp';
import {
  addAndSendMsgToChat,
  createOrder,
  updateCart,
} from '../../whatsapp/functions';
import { clear, getThumbFromCart } from './';

const cartSubmitSchema = z.object({
  chatId: z.string(),
  msg: z.string().optional(),
  options: sendMessageOptionsSchema.optional(),
});

export type CartSubmitInput = z.infer<typeof cartSubmitSchema>;

export type CartSubmitOutput = any;

/**
 * Send a request order to a business chat
 *
 * @example
 * ```javascript
 * const cart = await WPP.cart.submit({ chatId: '[chatId]' });
 * ```
 *
 * @example
 * ```javascript
 * // Send cart with a custom message
 * const cart = await WPP.cart.submit({
 *   chatId: '[chatId]',
 *   msg: 'Custom message here',
 * });
 * ```
 *
 * @category Cart
 */
export async function submit(
  params: CartSubmitInput
): Promise<CartSubmitOutput> {
  const { chatId, msg, options } = cartSubmitSchema.parse(params);

  if (chatId.toString() == getMyUserId()?.toString()) {
    throw new WPPError(
      'can_not_submit_order_to_yourself',
      `You can not submit order to yourself`
    );
  }
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
  const chat = await assertFindChat(createWid(chatId!)!);
  const order = await createOrder(chat.id, cart.cartItemCollection.toArray());

  const totalPrice = order.price?.total;

  const message = await prepareRawMessage({
    chat,
    message: {
      type: 'order',
      orderId: order.id,
      token: order.token,
      orderTitle: chat.name || chat.formattedTitle,
      sellerJid: chat.id.toString({
        legacy: !0,
      }),
      status: 1,
      messageVersion: 2,
      thumbnail: await getThumbFromCart({ chatId }),
      itemCount: cart.itemCount,
      message: msg || cart.message,
      totalAmount1000:
        totalPrice && totalPrice.length > 0 ? parseInt(totalPrice, 10) : void 0,
      totalCurrencyCode:
        order.price.currency && order.price.currency.length > 0
          ? order.price.currency
          : 0,
    },
    options,
  });
  await addAndSendMsgToChat(chat, message as any);
  updateCart(cart);
  await clear({ chatId });
  if (!order.id) {
    throw new WPPError(
      'error_send_order_request',
      `Error when sending order request`
    );
  }
  return await getMessageById((message as any).id);
}
