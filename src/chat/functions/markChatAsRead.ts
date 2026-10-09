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

import { assertGetChat } from '../../assert';
import { Stringable } from '../../types';
import { MsgKey, MsgModel } from '../../whatsapp';
import { markChatRead } from '../../whatsapp/functions';
import { getMessageById } from './getMessageById';

/**
 * Mark only one message as read, instead of the whole chat
 *
 * @example
 * ```javascript
 * WPP.chat.markMessageAsRead('[message_id]');
 * ```
 * @category Message
 */
export async function markMessageAsRead(
  messageId: string | MsgKey | MsgModel | Stringable
): Promise<{ id: MsgKey; unreadCount: number }> {
  const msg =
    messageId instanceof MsgModel
      ? messageId
      : await getMessageById(messageId.toString());

  const chat = assertGetChat(msg.id.remote);

  const unreadCount = chat.unreadCount || 0;

  await markChatRead(chat, msg.id);

  if (!msg.id.fromMe && unreadCount > 0) {
    chat.unreadCount = unreadCount - 1;
  }

  return { id: msg.id, unreadCount: chat.unreadCount || 0 };
}
