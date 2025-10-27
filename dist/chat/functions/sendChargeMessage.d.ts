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
import { SendMessageOptions, SendMessageReturn } from '..';
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
    pix?: {
        keyType: 'CNPJ' | 'CPF' | 'PHONE' | 'EMAIL' | 'EVP';
        name: string;
        key: string;
    };
    payment_instruction?: string;
}
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
 * ```
 * @category Message
 */
export declare function sendChargeMessage(chatId: any, items: OrderItems[], options?: OrderMessageOptions): Promise<SendMessageReturn>;
