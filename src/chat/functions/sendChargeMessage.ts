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

import { getMyUserWid } from '../../conn/functions/getMyUserWid';
import { generateOrderUniqueId, WPPError } from '../../util';
import { CatalogStore, UserPrefs, Wid } from '../../whatsapp';
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

export type PixKeyType = 'CNPJ' | 'CPF' | 'PHONE' | 'EMAIL' | 'EVP';

export interface OrderMessageOptions extends SendMessageOptions {
  notes?: string;
  discount?: number;
  tax?: number;
  shipping?: number;
  offset?: number;
  pix?: {
    keyType: PixKeyType;
    name: string;
    key: string;
  };
  /** Payment methods presented to the customer inside the order message. */
  paymentSettings?: OrderPaymentSettings;
  // Text for external payment (out of whatsapp)
  payment_instruction?: string;
}

export interface OrderPaymentSettings {
  /** Digitable line for a boleto. */
  boletoCode?: string;
  /** Whether card brands should be offered. */
  cards?: boolean;
  /** URL opened by the payment-link action. */
  paymentLink?: string;
  /** Complete dynamic Pix copy-and-paste code. */
  pixCode?: string;
}

type PaymentSetting =
  | {
      type: 'pix_static_code';
      pix_static_code: {
        key: string;
        key_type: PixKeyType;
        merchant_name: string;
      };
    }
  | { type: 'pix_dynamic_code'; pix_dynamic_code: { code: string } }
  | { type: 'payment_link'; payment_link: { uri: string } }
  | { type: 'boleto'; boleto: { digitable_line: string } }
  | { type: 'cards'; cards: { enabled: boolean } };

/**
 * Send a order message
 * To send (prices, tax, shipping or discount), for example: USD 12.90, send them without dots or commas, like: 12900
 *
 * @example
 * ```javascript
 * // Send charge with a product
 * WPP.chat.sendChargeMessage('[number]@c.us', [
 *   { type: 'product', id: '67689897878', qnt: 2 },
 *   { type: 'product', id: '37878774457', qnt: 1 },
 * ]
 *
 * // Send charge with a custom item
 * WPP.chat.sendChargeMessage('[number]@c.us', [
 *   { type: 'custom', name: 'Item de cost test', price: 120000, qnt: 2 },
 * ]
 *
 * // Send charge with custom options
 * WPP.chat.sendChargeMessage('[number]@c.us', [
 *   { type: 'product', id: '37878774457', qnt: 1 },
 *   { type: 'custom', name: 'Item de cost test', price: 120000, qnt: 2 },
 * ],
 * { tax: 10000, shipping: 4000, discount: 10000 }
 *
 * // Send charge with Pix data (auto generate copy-paste pix code)
 * WPP.chat.sendChargeMessage('[number]@c.us', [
 *   { type: 'custom', name: 'Item de cost test', price: 120000, qnt: 2 },
 * ],
 * {
 *   tax: 10000,
 *   shipping: 4000,
 *   discount: 10000,
 *   pix: {
 *     keyType: 'CPF',
 *     key: '00555095999',
 *     name: 'Name of seller',
 *   },
 * });
 *
 * // Send a charge with Pix, payment link, boleto, and cards
 * WPP.chat.sendChargeMessage('[number]@c.us', [
 *   { type: 'custom', name: 'Product', price: 20000, qnt: 1 },
 * ], {
 *   paymentSettings: {
 *     pixCode: '000201...',
 *     paymentLink: 'https://example.com/pay/123',
 *     boletoCode: '00190...',
 *     cards: true,
 *   },
 * });
 * ```
 * @category Message
 */
export async function sendChargeMessage(
  chatId: string | Wid,
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

  const user = getMyUserWid();

  const catalog = CatalogStore.get(user);
  for (const product of items) {
    if (product.type == 'product') {
      const { data } = await queryProduct(
        user,
        product.id,
        100,
        100,
        undefined,
        true
      );
      if (typeof data === 'undefined')
        throw new WPPError(
          'product_not_found',
          `The product id ${product.id} not found`
        );

      const collection = getCatalogProduct(
        catalog?.productCollection,
        product.id
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
      await getCountryShortcodeByPhone(UserPrefs.getMaybeMePnUser().user)
    ),
    total_amount: {
      value: total_amount,
      offset: Number(options.offset) || 1000,
    },
    order_type: 'ORDER',
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
    payment_settings: createPaymentSettings(options),
    external_payment_configurations: options.payment_instruction
      ? [
          {
            type: 'payment_instruction',
            payment_instruction: options.payment_instruction,
          },
        ]
      : undefined,
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

interface CatalogProductCollection {
  get(id: OrderItems['id']): CatalogProduct;
}

interface CatalogProduct {
  getProductImageCollectionHead(): {
    mediaData: { preview: { getBase64(): string } };
  };
}

function getCatalogProduct(
  collection: unknown,
  id: OrderItems['id']
): CatalogProduct {
  if (!isCatalogProductCollection(collection)) {
    throw new WPPError(
      'product_collection_unavailable',
      'The catalog product collection is unavailable'
    );
  }

  return collection.get(id);
}

function isCatalogProductCollection(
  collection: unknown
): collection is CatalogProductCollection {
  return (
    typeof collection === 'object' &&
    collection !== null &&
    'get' in collection &&
    typeof collection.get === 'function'
  );
}

function createPaymentSettings(
  options: OrderMessageOptions
): PaymentSetting[] | undefined {
  const settings: PaymentSetting[] = [];

  if (options.pix) {
    settings.push({
      type: 'pix_static_code',
      pix_static_code: {
        key: options.pix.key,
        key_type: options.pix.keyType,
        merchant_name: options.pix.name,
      },
    });
  }

  const payment = options.paymentSettings;
  if (payment?.pixCode) {
    settings.push({
      type: 'pix_dynamic_code',
      pix_dynamic_code: { code: payment.pixCode },
    });
  }
  if (payment?.paymentLink) {
    settings.push({
      type: 'payment_link',
      payment_link: { uri: payment.paymentLink },
    });
  }
  if (payment?.boletoCode) {
    settings.push({
      type: 'boleto',
      boleto: { digitable_line: payment.boletoCode },
    });
  }
  if (payment?.cards !== undefined) {
    settings.push({ type: 'cards', cards: { enabled: payment.cards } });
  } else if (options.pix) {
    settings.push({ type: 'cards', cards: { enabled: true } });
  }

  return settings.length > 0 ? settings : undefined;
}
