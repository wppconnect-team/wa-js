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

import { compare } from 'compare-versions';

import { assertGetChat } from '../../assert';
import { iAmAdmin } from '../../group';
import { Cmd, Wid } from '../../whatsapp';
import { MSG_TYPE, SendMsgResult } from '../../whatsapp/enums';
import { getMessageById } from '.';

export interface DeleteMessageReturn {
  id: string;
  sendMsgResult: SendMsgResult;
  isRevoked: boolean;
  isDeleted: boolean;
  isSentByMe: boolean;
}

/**
 * Delete a message
 *
 * @example
 * ```javascript
 * // Delete a message
 * WPP.chat.deleteMessage('[number]@c.us', 'msgid');
 * // Delete a list of messages
 * WPP.chat.deleteMessage('[number]@c.us', ['msgid1', 'msgid2]);
 * // Delete a message and delete media
 * WPP.chat.deleteMessage('[number]@c.us', 'msgid', true);
 * // Revoke a message
 * WPP.chat.deleteMessage('[number]@c.us', 'msgid', true, true);
 * ```
 *
 * @category Message
 */
export async function deleteMessage(
  chatId: string | Wid,
  ids: string | string[],
  deleteMediaInDevice = false,
  revoke = false
): Promise<DeleteMessageReturn | DeleteMessageReturn[]> {
  const chat = assertGetChat(chatId);

  let isSingle = false;

  if (!Array.isArray(ids)) {
    isSingle = true;
    ids = [ids];
  }

  const msgs = await getMessageById(ids);

  const results: DeleteMessageReturn[] = [];
  for (const msg of msgs) {
    let sendMsgResult: SendMsgResult = SendMsgResult.ERROR_UNKNOWN;
    let isRevoked = false;
    let isDeleted = false;
    const isSentByMe = msg.senderObj.isMe;
    let imAdmin = false;
    if (chat.isGroup) imAdmin = await iAmAdmin(chatId);

    const canRevoke = isSentByMe || imAdmin;

    if (msg.type === MSG_TYPE.REVOKED && revoke) {
      sendMsgResult = SendMsgResult.ERROR_UNKNOWN;
      isRevoked = true;
    } else if (revoke && canRevoke) {
      if (msg.type === 'list') {
        (msg as any).__x_isUserCreatedType = true;
      }

      if (compare(self.Debug.VERSION, '2.3000.0', '>=')) {
        await Cmd.sendRevokeMsgs(
          chat,
          {
            type: 'message',
            list: [msg],
          },
          { clearMedia: deleteMediaInDevice }
        );
      } else {
        await Cmd.sendRevokeMsgs(chat, [msg], {
          clearMedia: deleteMediaInDevice,
        });
      }

      sendMsgResult = SendMsgResult.OK;
      isRevoked = true;
    } else {
      if (compare(self.Debug.VERSION, '2.3000.0', '>=')) {
        await Cmd.sendDeleteMsgs(
          chat,
          {
            type: 'message',
            list: [msg],
          },
          deleteMediaInDevice
        );
      } else {
        await Cmd.sendDeleteMsgs(chat, [msg], {
          clearMedia: deleteMediaInDevice,
        });
      }

      sendMsgResult = SendMsgResult.OK;
      isDeleted = !chat.msgs.get(msg.id);
    }

    results.push({
      id: msg.id.toString(),
      sendMsgResult,
      isRevoked,
      isDeleted,
      isSentByMe,
    });
  }

  return isSingle ? results[0] : results;
}
