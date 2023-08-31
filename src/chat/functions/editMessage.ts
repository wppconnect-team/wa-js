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

import { WPPError } from '../../util';
import { MsgKey } from '../../whatsapp';
import { canEditMsg } from '../../whatsapp/functions';
import {
  defaultSendMessageOptions,
  LinkPreviewOptions,
  RawMessage,
  SendMessageOptions,
  SendMessageReturn,
} from '..';
import { getMessageById, prepareRawMessage, sendRawMessage } from '.';

export type EditMessageOptions = SendMessageOptions & LinkPreviewOptions;

/**
 * Send a text message
 *
 * @example
 * WPP.chat.editMessage('[number]@c.us', 'New text for message', {
 *   linkPreview: true,
 *   mentionedJidList: ['5521985232287@c.us']
 * });
 * ```
 * @category Message
 */
export async function editMessage(
  msgId: string | MsgKey,
  newText: string,
  options: EditMessageOptions = {}
): Promise<SendMessageReturn> {
  options = {
    ...defaultSendMessageOptions,
    ...options,
  };

  const msg = await getMessageById(msgId);

  const canEdit = canEditMsg(msg);
  if (!canEdit) {
    throw new WPPError(`edit_message_error`, `Cannot edit this message`);
  }

  let rawMessage: RawMessage = {
    type: 'protocol',
    subtype: 'message_edit',
    protocolMessageKey: msg.id,
    body: newText.trim(),
    editMsgType: msg.type,
  };

  rawMessage = await prepareRawMessage(msg.chat!, rawMessage, options);

  rawMessage.latestEditMsgKey = rawMessage.id;
  rawMessage.latestEditSenderTimestampMs = rawMessage.t;

  return await sendRawMessage(msg.chat?.id, rawMessage, options);
}
