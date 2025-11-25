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

import { sendRawMessage } from '../../chat/functions';
import { WPPError } from '../../util';
import { MsgKey, MsgStore } from '../../whatsapp';
import { MSG_TYPE } from '../../whatsapp/enums';
import {
  queryOrder,
  sendOrderStatusMessageAsMerchant,
  updateMessageTable,
} from '../../whatsapp/functions';
import { OrderMessageStatus, OrderStatus, PaymentStatus } from '../types';

/**
 * Options for declining an order
 */
export interface DeclineOrderOptions {
  /** The message ID or message key of the order message */
  msgId: string | MsgKey;
  /** Optional note to include with the decline message (recommended) */
  declineNote?: string;
}

/**
 * Decline an order
 *
 * This function performs TWO critical operations:
 * 1. Updates the order message's status field from INQUIRY (1) to DECLINED (3)
 *    - This changes the UI to show the order as declined
 * 2. Sends an order cancellation message to the customer
 *    - Shows "Canceled" status with optional note
 *
 * The order information is automatically retrieved from the message.
 *
 * @example
 * ```javascript
 * // Decline an order with a note
 * await WPP.order.decline({
 *   msgId: 'message_id_here',
 *   declineNote: 'Sorry, we cannot fulfill this order at this time'
 * });
 *
 * // Decline without a note
 * await WPP.order.decline({
 *   msgId: 'message_id_here'
 * });
 * ```
 *
 * @category Order
 */
export async function decline(options: DeclineOrderOptions): Promise<void> {
  const { msgId, declineNote } = options;

  // Get the message
  const msg = MsgStore.get(msgId);
  if (!msg) {
    throw new WPPError('msg_not_found', 'Message not found');
  }

  // Validate it's an order message
  if (msg.type !== MSG_TYPE.ORDER) {
    throw new WPPError('msg_not_order', 'Message is not an order');
  }

  // Validate message has required order fields
  if (!msg.orderId || !msg.token) {
    throw new WPPError(
      'invalid_order_message',
      'Message is missing orderId or token'
    );
  }

  // Extract chat and seller information from message
  const chat = msg.chat;
  const sellerJid = msg.sellerJid || msg.to;

  if (!chat || !sellerJid) {
    throw new WPPError(
      'invalid_order_message',
      'Message does not contain valid order information'
    );
  }

  // Get the order information from the message
  const order = await queryOrder(msg.orderId, 80, 80, msg.token);

  // Convert to OrderInfo format
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
    referenceId: msg.orderId,
  };

  // Create the reply context
  const contextInfo = msg.msgContextInfo(chat.id);

  // STEP 1: Update the message status to DECLINED in database
  // This changes the persistent storage to show the order as declined
  updateMessageTable(msg.id, { status: OrderMessageStatus.DECLINED });

  // STEP 1.5: Update the message in the local store immediately for UI reactivity
  // This must happen immediately (not awaited) to ensure UI updates
  msg.set({ status: OrderMessageStatus.DECLINED });

  // STEP 2: Send the cancellation message to the customer
  await sendOrderStatusMessageAsMerchant({
    chat,
    sellerJid,
    orderInfo,
    orderNote: declineNote,
    orderStatus: OrderStatus.Canceled,
    offset: 2,
    paymentStatus: PaymentStatus.Pending,
    paymentMethod: undefined,
    contextInfo,
  });

  // STEP 3: Send an interactive ORDER_DETAILS message with buttons
  // This creates the "Update status" and "View details" buttons
  const buttonParamsJson = {
    reference_id: msg.orderId,
    type: 'physical-goods',
    payment_configuration: 'merchant_categorization_code',
    currency: order.currency,
    total_amount: {
      value: orderInfo.totalAmount,
      offset: 1000,
    },
    order_type: 'ORDER',
    order: {
      status: 'canceled',
      items: orderInfo.items.map((item) => ({
        retailer_id: item.id,
        name: item.name,
        amount: {
          value: item.amount,
          offset: 1000,
        },
        quantity: item.quantity,
        isCustomItem: item.isCustomItem || false,
        isQuantitySet: item.isQuantitySet || true,
      })),
      subtotal: {
        value: orderInfo.subtotal,
        offset: 1000,
      },
      tax: orderInfo.tax ? { value: orderInfo.tax, offset: 1000 } : null,
    },
  };

  const interactiveMessage = {
    type: 'interactive',
    nativeFlowName: 'order_details',
    interactiveType: 'native_flow',
    interactiveHeader: {
      hasmediaAttachment: false,
      mediaType: undefined,
      subtitle: undefined,
      thumbnail: msg.thumbnail,
      title: null,
    },
    interactivePayload: {
      buttons: [
        {
          buttonParamsJson: JSON.stringify(buttonParamsJson),
          name: 'review_and_pay',
        },
      ],
      messageVersion: 1,
    },
  };

  await sendRawMessage(chat.id, interactiveMessage, {
    quotedMsg: msg,
  });
}
