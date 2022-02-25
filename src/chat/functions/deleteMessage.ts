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
import { Wid } from '../../whatsapp';
import { MSG_TYPE, SendMsgResult } from '../../whatsapp/enums';
import { getMessageById } from '.';

export interface DeleteMessageReturn {
  id: string;
  sendMsgResult: Promise<SendMsgResult>;
  isRevoked: boolean;
  isDeleted: boolean;
}

/**
 * Delete a message
 *
 * @category Message
 */
export async function deleteMessage(
  chatId: string | Wid,
  id: string,
  deleteMediaInDevice: boolean,
  revoke: boolean
): Promise<DeleteMessageReturn>;
/**
 * Delete a list of messages
 *
 * @category Message
 */
export async function deleteMessage(
  chatId: string | Wid,
  ids: string[],
  deleteMediaInDevice: boolean,
  revoke: boolean
): Promise<DeleteMessageReturn[]>;
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

  const msgs = await getMessageById(chatId, ids);

  const results: any[] = [];
  for (const msg of msgs) {
    let sendMsgResult: SendMsgResult = SendMsgResult.ERROR_UNKNOWN;
    let isRevoked = false;
    let isDeleted = false;

    if (msg.type === MSG_TYPE.REVOKED) {
      // Message is already revoked
      sendMsgResult = SendMsgResult.ERROR_UNKNOWN;
      isRevoked = true;
    } else if (revoke) {
      sendMsgResult = await chat.sendRevokeMsgs([msg], deleteMediaInDevice);
      if (sendMsgResult === SendMsgResult.OK) {
        isRevoked = true;
      }
    } else {
      sendMsgResult = await chat.sendDeleteMsgs([msg], deleteMediaInDevice);
      if (sendMsgResult === SendMsgResult.OK) {
        isDeleted = true;
      }
    }

    results.push({
      id: msg.id.toString(),
      sendMsgResult,
      isRevoked,
      isDeleted,
    });
  }

  if (isSingle) {
    return results[0];
  }
  return results;
}
