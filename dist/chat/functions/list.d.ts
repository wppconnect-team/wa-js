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
import { ChatModel, Wid } from '../../whatsapp';
export interface ChatListOptions {
    id?: Wid;
    count?: number;
    direction?: 'after' | 'before';
    onlyCommunities?: boolean;
    onlyGroups?: boolean;
    onlyNewsletter?: boolean;
    onlyUsers?: boolean;
    onlyWithUnreadMessage?: boolean;
    withLabels?: string[];
}
/**
 * Return a list of chats
 *
 * @example
 * ```javascript
 * // All chats
 * const chats = await WPP.chat.list();
 *
 * // Some chats
 * const chats = WPP.chat.list({count: 20});
 *
 * // 20 chats before specific chat
 * const chats = WPP.chat.list({count: 20, direction: 'before', id: '[number]@c.us'});
 *
 * // Only users chats
 * const chats = await WPP.chat.list({onlyUsers: true});
 *
 * // Only groups chats
 * const chats = await WPP.chat.list({onlyGroups: true});
 *
 * // Only communities chats
 * const chats = await WPP.chat.list({onlyCommunities: true});
 *
 * // Only Newsletter
 * const chats = await WPP.chat.list({onlyNewsletter: true});
 *
 * // Only with label Text
 * const chats = await WPP.chat.list({withLabels: ['Test']});
 *
 * // Only with label id
 * const chats = await WPP.chat.list({withLabels: ['1']});
 *
 * // Only with label with one of text or id
 * const chats = await WPP.chat.list({withLabels: ['Alfa','5']});
 * ```
 *
 * @category Chat
 */
export declare function list(options?: ChatListOptions): Promise<ChatModel[]>;
