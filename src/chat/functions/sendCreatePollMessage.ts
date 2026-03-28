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
  RawMessage,
  SendMessageOptions,
  SendMessageReturn,
} from '..';
import { sendRawMessage } from '.';

export interface PoolMessageOptions extends SendMessageOptions {
  selectableCount?: number;
}

const chatSendCreatePollMessageSchema = z.object({
  chatId: z.string(),
  name: z.string(),
  choices: z.array(z.string()),
  options: z.custom<PoolMessageOptions>().optional(),
});
export type ChatSendCreatePollMessageInput = z.infer<
  typeof chatSendCreatePollMessageSchema
>;
export type ChatSendCreatePollMessageOutput = SendMessageReturn;

/**
 * Send a create poll message
 *
 * Note: This only works for groups
 *
 * @example
 * ```javascript
 * // Single pool
 * WPP.chat.sendCreatePollMessage({
 *   chatId: '[number]@g.us',
 *   name: 'A poll name',
 *   choices: ['Option 1', 'Option 2', 'Option 3']
 * });
 *
 * // With selectable count
 * WPP.chat.sendCreatePollMessage({
 *   chatId: '[number]@g.us',
 *   name: 'A poll name',
 *   choices: ['Option 1', 'Option 2', 'Option 3'],
 *   options: { selectableCount: 1 }
 * });
 * ```
 *
 * @category Message
 */
export async function sendCreatePollMessage(
  params: ChatSendCreatePollMessageInput
): Promise<ChatSendCreatePollMessageOutput> {
  const {
    chatId,
    name,
    choices,
    options: opts = {},
  } = chatSendCreatePollMessageSchema.parse(params);
  const options: PoolMessageOptions = {
    ...defaultSendMessageOptions,
    ...(opts as PoolMessageOptions),
  };

  const rawMessage: RawMessage = {
    type: 'poll_creation',
    pollName: name,
    pollOptions: choices.map((name, localId) => ({ name, localId })),
    pollEncKey: self.crypto.getRandomValues(new Uint8Array(32)),
    pollSelectableOptionsCount: options.selectableCount || 0,
    messageSecret: self.crypto.getRandomValues(new Uint8Array(32)),
  };

  return await sendRawMessage({ chatId, rawMessage, options });
}
