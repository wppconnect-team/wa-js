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
}
/**
 * Send a invoice message
 * To send (prices, tax, shipping or discount), for example: USD 12.90, send them without dots or commas, like: 12900
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
export declare function sendPixKeyMessage(chatId: any, params: {
    keyType: 'CNPJ' | 'CPF' | 'PHONE' | 'EMAIL' | 'EVP';
    name: string;
    key: string;
    instructions?: string;
}, options?: SendMessageOptions): Promise<SendMessageReturn>;
