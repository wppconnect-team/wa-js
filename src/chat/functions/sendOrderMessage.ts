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

import { generateOrderUniqueId, WPPError } from '../../util';
import { CatalogStore, UserPrefs } from '../../whatsapp';
import {
  currencyForCountryShortcode,
  getCountryShortcodeByPhone,
  queryProduct,
} from '../../whatsapp/functions';
import {
  defaultSendMessageOptions,
  RawMessage,
  SendMessageOptions,
  SendMessageReturn,
} from '..';
import { sendRawMessage } from '.';

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
 * Send a order message
 * To send (prices, tax, shipping or discount), for example: USD 12.90, send them without dots or commas, like: 12900
 *
 * @example
 * ```javascript
 * // Send Order with a product
 * WPP.chat.sendOrderMessage('[number]@c.us', [
 *   { type: 'product', id: '67689897878', qnt: 2 },
 *   { type: 'product', id: '37878774457', qnt: 1 },
 * ]
 *
 * // Send Order with a custom item
 * WPP.chat.sendOrderMessage('[number]@c.us', [
 *   { type: 'custom', name: 'Item de cost test', price: 120000, qnt: 2 },
 * ]
 *
 * // Send Order with custom options
 * WPP.chat.sendOrderMessage('[number]@c.us', [
 *   { type: 'product', id: '37878774457', qnt: 1 },
 *   { type: 'custom', name: 'Item de cost test', price: 120000, qnt: 2 },
 * ],
 * { tax: 10000, shipping: 4000, discount: 10000 }
 * ```
 * @category Message
 */
export async function sendOrderMessage(
  chatId: any,
  items: OrderItems[],
  options?: OrderMessageOptions
): Promise<SendMessageReturn> {
  if (!items || !chatId)
    throw new WPPError(
      'parameter_not_fount',
      'Please, send all the required parameters'
    );
  options = {
    ...defaultSendMessageOptions,
    ...options,
  };

  const products = [];
  let subtotal = 0;
  let thumbDefault = null;

  const catalog = CatalogStore.get(UserPrefs.getMaybeMeUser());
  for (const product of items) {
    if (product.type == 'product') {
      const { data } = await queryProduct(
        UserPrefs.getMaybeMeUser(),
        product.id,
        100,
        100,
        undefined,
        true
      );
      console.log(data);
      if (typeof data === 'undefined')
        throw new WPPError(
          'product_not_found',
          `The product id ${product.id} not found`
        );

      const collection = (catalog?.productCollection as any).get(
        product.id as any
      );
      if (!thumbDefault) {
        const mediaProductImage = collection.getProductImageCollectionHead();
        thumbDefault = mediaProductImage.mediaData.preview.getBase64();
      }

      const item = {
        retailer_id: data.id,
        name: data.name,
        amount: {
          value: Number(data.price),
          offset: Number(options.offset) || 1000,
        },
        quantity: Number(product.qnt || 1),
        isCustomItem: false,
        isQuantitySet: true,
      };
      subtotal += Number(data.price) * Number(product.qnt || 1);
      products.push(item);
    } else {
      const item = {
        retailer_id: `custom-item-${generateOrderUniqueId()}`,
        name: product.name,
        amount: {
          value: Number(product.price),
          offset: Number(options.offset) || 1000,
        },
        quantity: Number(product.qnt || 1),
        isCustomItem: true,
        isQuantitySet: true,
      };
      subtotal += Number(product.price) * Number(product.qnt || 1);
      products.push(item);
    }
  }

  const total_amount =
    subtotal +
    Number(options?.tax || 0) +
    Number(options?.shipping || 0) -
    Number(options?.discount || 0);
  const buttonParamsJson = {
    reference_id: generateOrderUniqueId(),
    type: 'physical-goods',
    payment_configuration: 'merchant_categorization_code',
    currency: await currencyForCountryShortcode(
      await getCountryShortcodeByPhone(UserPrefs.getMeUser().user)
    ),
    total_amount: {
      value: total_amount,
      offset: Number(options.offset) || 1000,
    },
    order: {
      status: 'pending',
      items: products,
      subtotal: {
        value: Number(subtotal),
        offset: Number(options.offset) || 1000,
      },
      tax: options?.tax
        ? { value: options?.tax, offset: Number(options.offset) || 1000 }
        : null,
      shipping: options?.shipping
        ? { value: options?.shipping, offset: Number(options.offset) || 1000 }
        : null,
      discount: options?.discount
        ? { value: options?.discount, offset: Number(options.offset) || 1000 }
        : null,
    },
  };

  const message: RawMessage = {
    type: 'interactive',
    caption: options?.notes,
    nativeFlowName: 'order_details',
    interactiveType: 'native_flow',
    interactiveHeader: {
      hasmediaAttachment: false,
      mediaType: undefined,
      subtitle: undefined,
      thumbnail: thumbDefault,
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
  return await sendRawMessage(chatId, message, options);
}
