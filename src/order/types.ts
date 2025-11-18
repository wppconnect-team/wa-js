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

import { MsgKey } from '../whatsapp';

/**
 * Order item information
 */
export interface OrderItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  isCustomItem?: boolean;
  isQuantitySet?: boolean;
}

/**
 * Order information structure
 */
export interface OrderInfo {
  items: OrderItem[];
  totalAmount: number;
  subtotal: number;
  tax?: number;
  shipping?: number;
  discount?: number;
  currency: string;
}

/**
 * Options for updating an order status
 */
export interface UpdateOrderOptions {
  /** The message ID or message key of the order message */
  msgId: string | MsgKey;
  /** The new order status */
  orderStatus: OrderStatus;
  /** Optional note to include with the status update */
  orderNote?: string;
  /** The decimal offset for amount values (default: 2 for cents) */
  offset?: number;
  /** Reference ID for the order */
  referenceId?: string;
  /** Optional payment status update */
  paymentStatus?: PaymentStatus;
  /** Optional payment method */
  paymentMethod?: string;
}

/**
 * Order status values from WhatsApp's OrderStatus enum
 * Based on WAWebOrderStatus module
 */
export enum OrderStatus {
  /** Order is pending confirmation */
  Pending = 'pending',
  /** Order is being processed */
  Processing = 'processing',
  /** Order has been partially shipped */
  PartiallyShipped = 'partially_shipped',
  /** Order has been shipped */
  Shipped = 'shipped',
  /** Order is complete */
  Complete = 'completed',
  /** Order has been canceled */
  Canceled = 'canceled',
  /** Payment has been requested */
  PaymentRequested = 'payment_requested',
  /** Order is being prepared for shipping */
  PreparingToShip = 'preparing_to_ship',
  /** Order has been delivered */
  Delivered = 'delivered',
  /** Order has been confirmed */
  Confirmed = 'confirmed',
  /** Order delivery is delayed */
  Delayed = 'delayed',
  /** Order has failed */
  Failed = 'failed',
  /** Order is out for delivery */
  OutForDelivery = 'out_for_delivery',
  /** Order has been refunded */
  Refunded = 'refunded',
}

/**
 * Payment status values from WhatsApp's OrderPaymentStatus enum
 * Based on WAWebOrderPaymentStatus module
 */
export enum PaymentStatus {
  /** Payment is pending */
  Pending = 'pending',
  /** Payment has been captured/completed */
  Captured = 'captured',
  /** Payment has failed */
  Failed = 'failed',
  /** Payment has been canceled */
  Canceled = 'canceled',
}

/**
 * Order message status from Message$OrderMessage$OrderStatus protobuf enum
 * This controls the UI state (whether "Accept Order" button is shown)
 * Based on WAWebProtobufsE2E.pb.Message$OrderMessage$OrderStatus
 */
export enum OrderMessageStatus {
  /** Initial order inquiry state - shows "Accept Order" button */
  INQUIRY = 1,
  /** Order accepted by merchant - hides "Accept Order" button */
  ACCEPTED = 2,
  /** Order declined by merchant */
  DECLINED = 3,
}
