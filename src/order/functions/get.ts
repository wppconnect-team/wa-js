/*!
 * Copyright 2021 WPPConnect Team
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

import { WPPError } from '../../util';
import { MsgKey, MsgStore, OrderModel } from '../../whatsapp';
import { MSG_TYPE } from '../../whatsapp/enums';
import { queryOrder } from '../../whatsapp/functions';
/**
 * Get info of a order
 *
 * @example
 * ```javascript
 * const orderInfo = await WPP.order.get();
 * ```
 *
 * @return Your current catalog
 */
export async function get(msgId: string | MsgKey) {
  const msg = MsgStore.get(msgId);
  if (!msg) throw new WPPError('msg_not_found', 'Message not found');
  if (msg.type === MSG_TYPE.ORDER) {
    const order = await queryOrder(msg.orderId, 80, 80, msg.token);
    const model = new OrderModel({
      id: msg.orderId,
      products: order.products,
      itemCount: order.products.length,
      subtotal: order.subtotal,
      tax: order.tax,
      total: order.total,
      currency: order.currency,
      createdAt: order.createdAt,
      sellerJid: msg.sellerJid,
    });
    return model;
  } else {
    throw new WPPError('msg_not_is_a_order', 'Message not is a order');
  }
}
