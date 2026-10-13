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

import { generateOrderUniqueId, WPPError } from '../../util';
import {
  defaultSendMessageOptions,
  RawMessage,
  SendMessageOptions,
  SendMessageReturn,
} from '..';
import { sendRawMessage } from '.';
import { NativeFlowBizExperiment } from './nativeFlowBiz';

export interface OrderItems {
  type: 'product' | 'custom';
  id?: number[] | string[];
  name?: string;
  price?: number;
  qnt?: number;
}

export interface OrderMessageOptions extends SendMessageOptions {
  notes?: string;
  discount?: number;
  tax?: number;
  shipping?: number;
  offset?: number;
}

/**
 * Send a Brazilian Pix key payment request without an amount.
 *
 * @example
 * ```javascript
 * // Send PIX Key Message (Brazil Pix Key)
 * WPP.chat.sendPixKeyMessage('[number]@c.us', {
 *     keyType: 'CNPJ',
 *     name: 'WPPCONNECT-TEAM',
 *     key: '33460516000178',
 *     instructions: 'Pay text for instructions here',
 * });
 *
 * ```
 * @category Message
 */
export async function sendPixKeyMessage(
  chatId: any,
  params: {
    keyType: 'CNPJ' | 'CPF' | 'PHONE' | 'EMAIL' | 'EVP';
    name: string;
    key: string;
    instructions?: string;
  },
  options?: SendMessageOptions & {
    /**
     * Experimental `<biz>` node variations, to test what WhatsApp accepts.
     * Not validated; leave undefined in production.
     */
    experimentalNativeFlowBiz?: NativeFlowBizExperiment;
  }
): Promise<SendMessageReturn> {
  if (!chatId || !params.keyType || !params.name || !params.key)
    throw new WPPError(
      'parameter_not_fount',
      'Please, send all the required parameters'
    );
  const { experimentalNativeFlowBiz, ...sendOptions } = options ?? {};
  options = {
    ...defaultSendMessageOptions,
    ...sendOptions,
  };

  const buttonParamsJson = {
    order: {
      items: [
        {
          name: '',
          retailer_id: `custom-item-${generateOrderUniqueId()}`,
          amount: {
            offset: 1,
            value: 0,
          },
          quantity: 0,
        },
      ],
      order_type: 'ORDER_WITHOUT_AMOUNT',
      status: 'payment_requested',
      subtotal: {
        value: 0,
        offset: 1,
      },
    },
    total_amount: {
      value: 0,
      offset: 1,
    },
    reference_id: generateOrderUniqueId(),
    payment_settings: [
      {
        type: 'pix_static_code',
        pix_static_code: {
          key_type: params.keyType,
          merchant_name: params.name,
          key: params.key,
        },
      },
      {
        type: 'cards',
        cards: {
          enabled: false,
        },
      },
    ],
    external_payment_configurations: [
      {
        payment_instruction: params.instructions || '',
        type: 'payment_instruction',
      },
    ],
    additional_note: '',
    currency: 'BRL',
    type: 'physical-goods',
  };

  const message: RawMessage = {
    type: 'interactive',
    caption: '',
    nativeFlowName: 'payment_info',
    interactiveType: 'native_flow',
    interactivePayload: {
      buttons: [
        {
          buttonParamsJson: JSON.stringify(buttonParamsJson),
          name: 'payment_info',
        },
      ],
      messageVersion: 1,
    },
    messageSecret: self.crypto.getRandomValues(new Uint8Array(32)),
  };
  if (experimentalNativeFlowBiz) {
    (message as any).nativeFlowBizExperiment = experimentalNativeFlowBiz;
  }
  return await sendRawMessage(chatId, message, options);
}
