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
import { RawMessage } from '..';
export interface GetMessagesOptions {
    count?: number;
    direction?: 'after' | 'before';
    id?: string;
    onlyUnread?: boolean;
    media?: 'url' | 'document' | 'all' | 'image';
}
/**
 * Fetch messages from a chat
 *
 * @example
 * ```javascript
 * // Some messages
 * WPP.chat.getMessages('[number]@c.us', {
 *   count: 20,
 * });
 *
 * // All messages
 * WPP.chat.getMessages('[number]@c.us', {
 *   count: -1,
 * });
 *
 * // Last 20 unread messages
 * WPP.chat.getMessages('[number]@c.us', {
 *   count: 20,
 *   onlyUnread: true,
 * });
 *
 * // All unread messages
 * WPP.chat.getMessages('[number]@c.us', {
 *   count: -1,
 *   onlyUnread: true,
 * });
 *
 * // 20 messages before specific message
 * WPP.chat.getMessages('[number]@c.us', {
 *   count: 20,
 *   direction: 'before',
 *   id: '<full message id>'
 * });
 *
 * // Only media messages (url, document and links)
 * WPP.chat.getMessages('[number]@c.us', {
 *   count: 20,
 *   media: 'all',
 * });
 *
 * // Only image messages
 * WPP.chat.getMessages('[number]@c.us', {
 *   count: 20,
 *   media: 'image',
 * });
 *
 * // Only document messages
 * WPP.chat.getMessages('[number]@c.us', {
 *   count: 20,
 *   media: 'document',
 * });
 *
 * // Only link (url) messages
 * WPP.chat.getMessages('[number]@c.us', {
 *   count: 20,
 *   media: 'url',
 * });
 * ```
 * @category Message
 * @return  {RawMessage[]} List of raw messages
 */
export declare function getMessages(chatId: string | Wid, options?: GetMessagesOptions): Promise<RawMessage[]>;
