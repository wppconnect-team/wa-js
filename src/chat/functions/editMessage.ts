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

import { z } from 'zod';

import { WPPError } from '../../util';
import { canEditCaption, canEditMsg } from '../../whatsapp/functions';
import {
  defaultSendMessageOptions,
  RawMessage,
  sendMessageOptionsSchema,
  SendMessageReturn,
} from '..';
import { getMessageById, prepareRawMessage, sendRawMessage } from '.';
import { linkPreviewOptionsSchema } from './prepareLinkPreview';

const chatEditMessageSchema = z.object({
  msgId: z.string(),
  newText: z.string(),
  options: z
    .union([linkPreviewOptionsSchema, sendMessageOptionsSchema])
    .optional(),
});
export type ChatEditMessageInput = z.infer<typeof chatEditMessageSchema>;
export type ChatEditMessageOutput = SendMessageReturn;

/**
 * Edit a message previously sent.
 *
 * @example
 * WPP.chat.editMessage({ msgId: 'true_[number]@c.us_[msgId]', newText: 'New text for message', options: {
 *   linkPreview: true,
 *   mentionedJidList: ['5521985232287@c.us']
 * } });
 * ```
 * @category Message
 */
export async function editMessage(
  params: ChatEditMessageInput
): Promise<ChatEditMessageOutput> {
  const { msgId, newText, options: opts } = chatEditMessageSchema.parse(params);
  const options = {
    ...defaultSendMessageOptions,
    ...(opts || {}),
  };

  const msg = await getMessageById({ id: msgId });

  const canEdit = canEditMsg(msg);
  const canEditCaptionMessage = canEditCaption(msg);
  if (!canEdit && !canEditCaptionMessage) {
    throw new WPPError(`edit_message_error`, `Cannot edit this message`);
  }

  let rawMessage: RawMessage = {
    type: 'protocol',
    subtype: 'message_edit',
    protocolMessageKey: msg.id,
    body: newText.trim(),
    caption: newText.trim(),
    editMsgType: msg.type,
  };

  if (!msg.chat) {
    throw new WPPError(
      `edit_message_error`,
      `Message does not have a chat associated`
    );
  }

  rawMessage = await prepareRawMessage({
    chat: msg.chat!,
    message: rawMessage,
    options,
  });

  rawMessage.latestEditMsgKey = rawMessage.id;
  rawMessage.latestEditSenderTimestampMs = rawMessage.t;

  return await sendRawMessage({
    chatId: msg.chat?.id._serialized,
    rawMessage,
    options,
  });
}
