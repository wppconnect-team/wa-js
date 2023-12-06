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

import { assertFindChat } from '../../assert';
import { ChatStore, MsgKey, Wid } from '../../whatsapp';
import { forwardMessagesToChats } from '../../whatsapp/functions';
import { getMessageById } from '..';

export interface ForwardMessagesOptions {
  displayCaptionText?: boolean;
  multicast?: boolean;
}

/**
 * Forward messages to a chat
 *
 * @example
 * ```javascript
 * // Forward messages
 * WPP.chat.forwardMessage('[number]@c.us', 'true_[number]@c.us_ABCDEF');
 * ```
 * @category Message
 * @return  {any} Any
 */
export async function forwardMessage(
  toChatId: string | Wid,
  msgId: string | MsgKey,
  options: ForwardMessagesOptions = {}
): Promise<boolean> {
  const chat = await assertFindChat(toChatId);

  const msg = await getMessageById(msgId);
  let forwardMessageFunc = ChatStore.forwardMessagesToChats;
  if (typeof forwardMessageFunc !== 'function') {
    forwardMessageFunc = forwardMessagesToChats;
  }
  return await forwardMessageFunc([msg], [chat], options.displayCaptionText);
}
