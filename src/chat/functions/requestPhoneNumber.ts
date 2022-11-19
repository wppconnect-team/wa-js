/*!
 * Copyright 2022 WPPConnect Team
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

import { assertWid } from '../../assert';
import { WPPError } from '../../util';
import {
  defaultSendMessageOptions,
  RawMessage,
  SendMessageOptions,
  SendMessageReturn,
} from '..';
import { sendRawMessage } from '.';

/**
 * Request the real phone number for a LID chat ([number]@lid)
 *
 * @example
 * ```javascript
 * // Request
 * WPP.chat.requestPhoneNumber('[number]@lid');
 * ```
 *
 * @category Message
 */
export async function requestPhoneNumber(
  chatId: any,
  options: SendMessageOptions = {}
): Promise<SendMessageReturn> {
  options = {
    ...defaultSendMessageOptions,
    ...options,
  };

  const wid = assertWid(chatId);

  if (!wid.isLid()) {
    throw new WPPError(
      'not_a_lid_chat',
      `requestPhoneNumber should not be called for non lid chat ${wid.toString()}`
    );
  }

  const rawMessage: RawMessage = {
    type: 'request_phone_number',
  };

  return await sendRawMessage(chatId, rawMessage, options);
}
