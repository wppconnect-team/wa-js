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

const MAX_COMPLETED = 500;
const inFlight = new Map<string, Promise<void>>();
const completed = new Set<string>();

function remember(key: string) {
  completed.delete(key);
  completed.add(key);
  if (completed.size > MAX_COMPLETED) {
    completed.delete(completed.values().next().value as string);
  }
}

/**
 * Mark a message as read, sending the native read receipt for it.
 *
 * The native receipt (`markChatRead`) has "read up to this message" semantics:
 * older unread messages of the same chat are read together with the selected
 * one, while newer messages stay unread. The chat counter is set to the number
 * of received messages newer than the selected one (never above the current
 * value), so repeated, concurrent or already read calls do not reduce it again.
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
  const key = msg.id.toString();

  if (!msg.id.fromMe && !completed.has(key)) {
    let pending = inFlight.get(key);
    if (!pending) {
      pending = markChatRead(chat, msg.id)
        .then(() => remember(key))
        .finally(() => inFlight.delete(key));
      inFlight.set(key, pending);
    }
    await pending;
  }

  const current = chat.unreadCount || 0;
  if (!msg.id.fromMe && current > 0) {
    const newer = chat.msgs
      .getModelsArray()
      .filter((m) => !m.id.fromMe && (m.t || 0) > (msg.t || 0)).length;
    chat.unreadCount = Math.min(current, newer);
  }

  return { id: msg.id, unreadCount: chat.unreadCount || 0 };
}
