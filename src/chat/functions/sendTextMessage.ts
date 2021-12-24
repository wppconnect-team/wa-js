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

/**
 * Send a text message
 *
 * @category Message
 */
export async function sendTextMessage(
  chatId: any,
  content: any,
  options: TextMessageOptions = {}
): Promise<SendMessageReturn> {
  options = {
    ...defaultSendMessageOptions,
    ...options,
  };

  let rawMessage: RawMessage = {
    body: content,
    type: 'chat',
    subtype: null,
    urlText: null,
    urlNumber: null,
  };

  rawMessage = prepareMessageButtons(rawMessage, options);
  rawMessage = await prepareLinkPreview(rawMessage, options);

  return await sendRawMessage(chatId, rawMessage, options);
}
