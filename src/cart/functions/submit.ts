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
 * Send a request order to biz chat
 *
 * @example
 * ```javascript
 * const cart = WPP.cart.submit('[number]@c.us');
 * ```
 *
 * @category Cart
 */

import { createWid, WPPError } from '../../util';
import { CartStore, ChatStore, MsgModel } from '../../whatsapp';
import {
  createOrder,
  findChat,
  sendOrderChatAction,
  updateCart,
} from '../../whatsapp/functions';
import { clear } from './';

export async function submit(wid: string): Promise<any> {
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
  const chate = await findChat(createWid(wid) as any);
  const order = await createOrder(chate.id, cart.cartItemCollection.toArray());
  sendOrderChatAction(chate, order, cart.itemCount, '', cart.message);
  updateCart(cart);
  /*const orderId = await submitOrderAction(
    cart,
    (await findChat(createWid(wid) as any)) as any
  );*/
  await clear(wid);
  if (!order.id) {
    throw new WPPError(
      'error_send_order_request',
      `Error when sending order request`
    );
  }
  const chat = ChatStore.get(wid);
  const msg = (chat?.msgs as any)?._models?.find(
    (msg: MsgModel) => msg.orderId == order.id
  );
  return msg;
}
