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
import {
  markChatRead,
  queryPendingReadReceiptMsgRows,
  updateUnreadCountMD,
} from '../../whatsapp/functions';
import { getMessageById } from './getMessageById';

// Serialize this API's operations per chat so another requested boundary cannot
// consume the selected message between the pending-receipt query and the call.
const inFlight = new Map<string, Promise<void>>();

/**
 * Mark a message as read, sending the native read receipt for it.
 *
 * The native receipt (`markChatRead`) has "read up to this message" semantics:
 * older unread messages of the same chat are read together with the selected
 * one, while newer messages stay unread. The counter is refreshed from native
 * database metadata, independent of timestamps or locally loaded messages.
 * Already read messages do not send another receipt. Operations made through
 * this API are serialized per chat; independent native readers may still race.
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
  if (!msg.id.fromMe) {
    const chatId = chat.id.toString();
    const previous = inFlight.get(chatId) || Promise.resolve();
    const pending = previous
      .catch(() => undefined)
      .then(async () => {
        const rows = await queryPendingReadReceiptMsgRows(chatId);
        // Native markChatRead falls back to the newest pending message when the
        // selected key is absent. Avoid reading newer messages on a repeat call.
        if (rows.some((row) => row.id === msg.id.toString())) {
          await markChatRead(chat, msg.id);
        }
        await updateUnreadCountMD(chat, 0, false);
      });
    inFlight.set(chatId, pending);
    try {
      await pending;
    } finally {
      if (inFlight.get(chatId) === pending) inFlight.delete(chatId);
    }
  }

  return { id: msg.id, unreadCount: chat.unreadCount || 0 };
}
