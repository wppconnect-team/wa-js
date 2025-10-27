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
import { Wid } from '../../whatsapp';
import { SendMessageOptions, SendMessageReturn } from '..';
export interface VCardContact {
    id: string | Wid;
    name: string;
}
/**
 * Send a VCard as message
 * @example
 * ```javascript
 * // single contact
 * WPP.chat.sendVCardContactMessage('[number]@c.us', {
 *   id: '123456@c.us',
 *   name: 'The Contact Name'
 * });
 *
 * // multiple contacts
 * WPP.chat.sendVCardContactMessage('[number]@c.us', [
 *   {
 *     id: '123456@c.us',
 *     name: 'The Contact Name'
 *   },
 *   {
 *     id: '456789@c.us',
 *     name: 'Another Contact'
 *   },
 * ]);
 *
 * ```
 * @category Message
 */
export declare function sendVCardContactMessage(chatId: any, contacts: string | Wid | VCardContact | (string | Wid | VCardContact)[], options?: SendMessageOptions): Promise<SendMessageReturn>;
