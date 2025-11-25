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

import { exportModule } from '../exportModule';

export interface SendOrderStatusParams {
  chat: any;
  sellerJid: string | any;
  orderInfo: {
    items: Array<{
      id: string;
      name: string;
      amount: number;
      quantity: number;
      isCustomItem?: boolean;
      isQuantitySet?: boolean;
    }>;
    totalAmount: number;
    subtotal: number;
    tax?: number;
    shipping?: number;
    discount?: number;
    currency: string;
    referenceId?: string;
  };
  orderNote?: string;
  orderStatus: string;
  offset: number;
  paymentStatus: string;
  paymentMethod?: string;
  contextInfo?: any;
}

/**
 * Function to send order status update message as merchant
 * @internal
 */
export declare function sendOrderStatusMessageAsMerchant(
  params: SendOrderStatusParams
): Promise<any>;

exportModule(
  exports,
  {
    sendOrderStatusMessageAsMerchant: 'sendOrderStatusMessageAsMerchant',
  },
  (m) =>
    m.sendOrderStatusMessageAsMerchant &&
    m.sendOrderPaymentStatusMessageAsMerchant
);
