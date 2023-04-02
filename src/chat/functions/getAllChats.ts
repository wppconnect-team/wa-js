/*!
 * Copyright 2023 WPPConnect Team
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

import { ChatModel, ChatStore, Wid } from '../../whatsapp';
import { get } from './get';

export interface GetAllChatsOptions {
  count?: number;
  direction?: 'after' | 'before';
  id?: Wid;
  onlyUnread?: boolean;
}
/**
 * Get all chats
 *  * @example
 * ```javascript
 * // Some chats
 * WPP.chat.getAllChats({
 *   count: 20,
 * });
 *
 * // All chats
 * WPP.chat.getAllChats({
 *   count: -1,
 * });
 *
 * // 20 chats before specific chat
 * WPP.chat.getMessages({
 *   count: 20,
 *   direction: 'before',
 *   id: '[number]@c.us'
 * });
 * ```
 * @category Chat
 */
export function getAllChats(options: GetAllChatsOptions = {}): ChatModel[] {
  const count = options.count == -1 ? Infinity : options.count || 20;
  const direction = options.direction === 'before' ? 'before' : 'after';
  const indexChat = options?.id
    ? get(options.id)
    : ChatStore.getModelsArray()[0];
  const onlyUnread = options.onlyUnread ? options.onlyUnread : false;
  const allChats = onlyUnread
    ? ChatStore.filter((chat: ChatModel) => chat.unreadCount)
    : ChatStore.getModelsArray();

  const startIndex = allChats.indexOf(indexChat as any);
  if (direction === 'before') {
    const fixStartIndex = startIndex - count < 0 ? 0 : startIndex - count;
    const fixEndIndex =
      fixStartIndex + count >= startIndex ? startIndex : fixStartIndex + count;
    return allChats.slice(fixStartIndex, fixEndIndex);
  } else {
    return allChats.slice(startIndex, startIndex + count);
  }
}
