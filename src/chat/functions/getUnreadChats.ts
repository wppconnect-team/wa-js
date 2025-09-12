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

import { on } from '../../eventEmitter';
import { ChatModel } from '../../whatsapp';
import { list } from './list';

let unreadChats: Array<ChatModel> = [];

on('chat.unread_count_changed', (params) => {
  if (params.unreadCount > 0) {
    if (!unreadChats.find((chat) => chat.id === params.chat?.id)) {
      unreadChats.push(params.chat);
    }
  } else {
    unreadChats = unreadChats.filter((chat) => chat.id != params.chat?.id);
  }
});

/**
 * Get all chats that have unread messages
 *
 * @category Chat
 *
 */
export async function getUnreadChats(
  onlyNewUnreads: boolean
): Promise<Array<ChatModel>> {
  if (onlyNewUnreads) {
    return unreadChats;
  } else {
    return await list({ onlyWithUnreadMessage: true });
  }
}
