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

import {
  defaultSendMessageOptions,
  LinkPreviewOptions,
  MessageButtonsOptions,
  RawMessage,
  SendMessageOptions,
  SendMessageReturn,
} from '..';
import { prepareLinkPreview, prepareMessageButtons, sendRawMessage } from '.';

export type TextMessageOptions = SendMessageOptions &
  MessageButtonsOptions &
  LinkPreviewOptions;

const chatSendTextMessageSchema = z.object({
  chatId: z.any(),
  content: z.any(),
  options: z.any().optional(),
});
export type ChatSendTextMessageInput = z.infer<
  typeof chatSendTextMessageSchema
>;
export type ChatSendTextMessageOutput = SendMessageReturn;

/**
 * Send a text message
 *
 * @example
 * ```javascript
 * // Send a simple text message
 * WPP.chat.sendTextMessage({ chatId: '<chatId>', content: 'Hello new contact' });
 * ```
 * @category Message
 */
export async function sendTextMessage(
  params: ChatSendTextMessageInput
): Promise<ChatSendTextMessageOutput> {
  const {
    chatId,
    content,
    options: opts = {},
  } = chatSendTextMessageSchema.parse(params);
  const options: TextMessageOptions = {
    ...defaultSendMessageOptions,
    ...(opts as TextMessageOptions),
  };

  let rawMessage: RawMessage = {
    body: content,
    type: 'chat',
    subtype: null,
    urlText: null,
    urlNumber: null,
  };

  rawMessage = prepareMessageButtons({ message: rawMessage, options });
  rawMessage = await prepareLinkPreview({ message: rawMessage, options });

  return await sendRawMessage({ chatId, rawMessage, options });
}
