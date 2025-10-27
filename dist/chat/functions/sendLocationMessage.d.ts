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
import { MessageButtonsOptions } from './prepareMessageButtons';
export interface LocationMessageOptions extends SendMessageOptions, MessageButtonsOptions {
    /**
     * latitude in degrees
     */
    lat: number | string;
    /**
     * longitude in degrees
     */
    lng: number | string;
    /**
     * The full address of place
     */
    address?: string;
    /**
     * Name of the place
     */
    name?: string;
    /**
     * URL to open when click on the address/name
     */
    url?: string;
}
/**
 * Send a location message
 *
 * @example
 * ```javascript
 * // full example
 * WPP.chat.sendLocationMessage('[number]@c.us', {
 *  lat: -22.95201,
 *  lng: -43.2102601,
 *  name: 'Cristo Rendentor', // optional
 *  address: 'Parque Nacional da Tijuca - Alto da Boa Vista, Rio de Janeiro - RJ', // optional
 *  url: 'https://santuariocristoredentor.com.br/' // optional
 * });
 *
 * // minimal
 * WPP.chat.sendLocationMessage('[number]@c.us', {
 *  lat: -22.95201,
 *  lng: -43.2102601,
 * });
 *
 * // name and address
 * WPP.chat.sendLocationMessage('[number]@c.us', {
 *  lat: -22.95201,
 *  lng: -43.2102601,
 *  name: 'Cristo Rendentor',
 *  address: 'Parque Nacional da Tijuca - Alto da Boa Vista, Rio de Janeiro - RJ'
 * });
 *
 * // with buttons
 * WPP.chat.sendLocationMessage('[number]@c.us', {
 *  lat: -22.95201,
 *  lng: -43.2102601,
 *  name: 'Cristo Rendentor',
 *  address: 'Parque Nacional da Tijuca - Alto da Boa Vista, Rio de Janeiro - RJ',
 *  buttons: [
 *      {
 *          url: 'https://example.test/',
 *          text: 'URL example'
 *      },
 *      {
 *          phoneNumber: '+55 12 3456 7777',
 *          text: 'Phone Number'
 *      },
 *      {
 *          id: 'id1',
 *          text: 'First'
 *      },
 *      {
 *          id: 'id2',
 *          text: 'Second'
 *      },
 *      {
 *          id: 'other',
 *          text: 'Other'
 *      }
 *  ],
 * });
 * ```
 * @category Message
 */
export declare function sendLocationMessage(chatId: any, options: LocationMessageOptions): Promise<SendMessageReturn>;
