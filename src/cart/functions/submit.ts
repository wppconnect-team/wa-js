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
import {
  CartStore,
  ChatStore,
  MsgKey,
  MsgModel,
  UserPrefs,
} from '../../whatsapp';
import { ACK } from '../../whatsapp/enums';
import {
  addAndSendMsgToChat,
  createOrder,
  findChat,
  unixTime,
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

  const totalPrice = order.price?.total;
  const message = {
    type: 'order',
    ack: ACK.CLOCK,
    from: UserPrefs.getMaybeMeUser(),
    id: new MsgKey({
      from: UserPrefs.getMaybeMeUser(),
      to: chate.id,
      id: await MsgKey.newId(),
      participant: void 0,
      selfDir: 'out',
    }),
    local: !0,
    isNewMsg: !0,
    t: unixTime(),
    to: chate.id,
    orderId: order.id,
    token: order.token,
    orderTitle: chate.name || chate.formattedTitle,
    sellerJid: chate.id.toString({
      legacy: !0,
    }),
    status: 1,
    messageVersion: 2,
    thumbnail: '',
    itemCount: cart.itemCount,
    message: cart.message,
    totalAmount1000:
      totalPrice && totalPrice.length > 0 ? parseInt(totalPrice, 10) : void 0,
    totalCurrencyCode:
      order.price.currency && order.price.currency.length > 0
        ? order.price.currency
        : 0,
  };
  console.log(message);
  const orderMsg = await addAndSendMsgToChat(chate, message as any);
  console.log(orderMsg);
  updateCart(cart);
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
