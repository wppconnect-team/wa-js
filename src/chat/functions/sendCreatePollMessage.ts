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
  RawMessage,
  SendMessageOptions,
  SendMessageReturn,
} from '..';
import { sendRawMessage } from '.';

export type PoolMessageOptions = SendMessageOptions;

/**
 * Send a create poll message
 *
 * Note: This only works for groups
 *
 * @example
 * ```javascript
 * // Single pool
 * WPP.chat.sendCreatePollMessage(
 *  '[number]@g.us',
 *  'A poll name',
 *  ['Option 1', 'Option 2', 'Option 3']
 * );
 * ```
 *
 * @category Message
 */
export async function sendCreatePollMessage(
  chatId: any,
  name: string,
  choices: string[],
  options: PoolMessageOptions = {}
): Promise<SendMessageReturn> {
  options = {
    ...defaultSendMessageOptions,
    ...options,
  };

  const rawMessage: RawMessage = {
    type: 'poll_creation',
    pollName: name,
    pollOptions: choices.map((name, localId) => ({ name, localId })),
    pollEncKey: self.crypto.getRandomValues(new Uint8Array(32)),
    pollSelectableOptionsCount: 0,
  };

  return await sendRawMessage(chatId, rawMessage, options);
}
