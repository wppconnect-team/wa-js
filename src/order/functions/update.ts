/*!
 * Copyright 2025 WPPConnect Team
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
import { MsgStore } from '../../whatsapp';
import { MSG_TYPE } from '../../whatsapp/enums';
import {
  queryOrder,
  sendOrderStatusMessageAsMerchant,
} from '../../whatsapp/functions';
import {
  OrderMessageStatus,
  PaymentStatus,
  UpdateOrderOptions,
} from '../types';

/**
 * Update an order status and/or payment information
 *
 * This function sends an order status update message to the customer.
 *
 * **Important:** For accepting or declining orders, use the dedicated `accept()` and `decline()`
 * functions instead. Those functions properly update both the message status field (UI state)
 * and send the status update message.
 *
 * This function is best used for status updates after an order has been accepted, such as:
 * - Marking as shipped
 * - Marking as delivered
 * - Marking as complete
 * - Updating payment information
 *
 * @example
 * ```javascript
 * // Mark as shipped
 * await WPP.order.update({
 *   msgId: 'message_id_here',
 *   orderInfo: {
 *     items: [
 *       {
 *         id: 'product_1',
 *         name: 'Product Name',
 *         amount: 1000,
 *         quantity: 2,
 *         isCustomItem: false,
 *         isQuantitySet: true
 *       }
 *     ],
 *     totalAmount: 2000,
 *     subtotal: 2000,
 *     currency: 'USD'
 *   },
 *   orderStatus: WPP.order.OrderStatus.Shipped,
 *   orderNote: 'Your order has been shipped',
 *   referenceId: 'ORDER_12345'
 * });
 *
 * // Mark as delivered
 * await WPP.order.update({
 *   msgId: 'message_id_here',
 *   orderInfo: { ... },
 *   orderStatus: WPP.order.OrderStatus.Delivered,
 *   orderNote: 'Your order has been delivered'
 * });
 *
 * // Update payment status
 * await WPP.order.update({
 *   msgId: 'message_id_here',
 *   orderInfo: { ... },
 *   orderStatus: WPP.order.OrderStatus.Complete,
 *   paymentStatus: WPP.order.PaymentStatus.Captured,
 *   orderNote: 'Order completed and payment received'
 * });
 * ```
 *
 * @category Order
 */
export async function update(options: UpdateOrderOptions): Promise<void> {
  const {
    msgId,
    orderStatus,
    orderNote,
    offset = 2,
    referenceId,
    paymentStatus = PaymentStatus.Pending,
    paymentMethod,
  } = options;

  // Get the message
  const orderMsg = MsgStore.get(msgId);
  if (!orderMsg) {
    throw new WPPError('msg_not_found', 'Message not found');
  }

  // Validate it's an order message
  if (orderMsg.type !== MSG_TYPE.ORDER) {
    throw new WPPError('msg_not_order', 'Message is not an order');
  }

  // Validate the order has been accepted or declined before allowing updates
  if (
    orderMsg.status !== OrderMessageStatus.ACCEPTED &&
    orderMsg.status !== OrderMessageStatus.DECLINED
  ) {
    throw new WPPError(
      'order_not_processed',
      'Order must be accepted or declined before updating. Use accept() or decline() first.'
    );
  }

  // Extract chat and seller information from message
  const chat = orderMsg.chat;
  const sellerJid = orderMsg.sellerJid || orderMsg.to;

  if (!chat || !sellerJid) {
    throw new WPPError(
      'invalid_order_message',
      'Message does not contain valid order information'
    );
  }

  // Get the order details directly from WhatsApp
  const order = await queryOrder(orderMsg.orderId, 80, 80, orderMsg.token);

  // Convert to OrderInfo format expected by sendOrderStatusMessageAsMerchant
  const orderInfo = {
    items: order.products.map((product) => ({
      id: product.id.toString(),
      name: product.name,
      amount: product.price || 0,
      quantity: product.quantity || 1,
      isCustomItem: false,
      isQuantitySet: true,
    })),
    totalAmount: order.total || 0,
    subtotal: order.subtotal || 0,
    tax: order.tax || undefined,
    currency: order.currency,
    referenceId: referenceId || orderMsg.orderId,
  };

  // Create the reply context manually since findOrderDetailsMessage won't find simple order messages
  // (it only searches for native flow messages with ORDER_DETAILS or PAYMENT_INFO flow names)
  const contextInfo = orderMsg.msgContextInfo(chat.id);

  // Send the status update message to the customer
  await sendOrderStatusMessageAsMerchant({
    chat,
    sellerJid,
    orderInfo,
    orderNote,
    orderStatus,
    offset,
    paymentStatus,
    paymentMethod,
    contextInfo,
  });
}
