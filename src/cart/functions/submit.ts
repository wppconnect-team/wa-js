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
 * Send a request order to business chat
 *
 * @example
 * ```javascript
 * const cart = WPP.cart.submit('[number]@c.us');
 * ```
 *
 * @example
 * ```javascript
 * // Send cart with a custom message
 * const cart = WPP.cart.submit('[number]@c.us', 'Custom message here');
 * ```
 *
 * @category Cart
 */

import {
  getMessageById,
  prepareRawMessage,
  SendMessageOptions,
} from '../../chat';
import { getMyUserId } from '../../conn';
import { createWid, WPPError } from '../../util';
import { CartStore } from '../../whatsapp';
import {
  addAndSendMsgToChat,
  createOrder,
  findChat,
  updateCart,
} from '../../whatsapp/functions';
import { clear, getThumbFromCart } from './';

export async function submit(
  wid: string,
  msg?: string,
  options?: SendMessageOptions
): Promise<any> {
  if (wid.toString() == getMyUserId()?.toString()) {
    throw new WPPError(
      'can_not_submit_order_to_yourself',
      `You can not submit order to yourself`
    );
  }
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
  const chat = await findChat(createWid(wid) as any);
  const order = await createOrder(chat.id, cart.cartItemCollection.toArray());

  const totalPrice = order.price?.total;

  const message = await prepareRawMessage(
    chat,
    {
      type: 'order',
      orderId: order.id,
      token: order.token,
      orderTitle: chat.name || chat.formattedTitle,
      sellerJid: chat.id.toString({
        legacy: !0,
      }),
      status: 1,
      messageVersion: 2,
      thumbnail: await getThumbFromCart(wid),
      itemCount: cart.itemCount,
      message: msg || cart.message,
      totalAmount1000:
        totalPrice && totalPrice.length > 0 ? parseInt(totalPrice, 10) : void 0,
      totalCurrencyCode:
        order.price.currency && order.price.currency.length > 0
          ? order.price.currency
          : 0,
    },
    options
  );
  await addAndSendMsgToChat(chat, message as any);
  updateCart(cart);
  await clear(wid);
  if (!order.id) {
    throw new WPPError(
      'error_send_order_request',
      `Error when sending order request`
    );
  }
  return await getMessageById((message as any).id);
}
