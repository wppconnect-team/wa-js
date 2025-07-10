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

import { assertFindChat, assertWid } from '../../assert';
import { Cmd, Wid } from '../../whatsapp';
import { getSearchContext } from '../../whatsapp/functions';
import { getMessageById } from '.';

/**
 * Open the chat in the WhatsApp interface in a specific message
 *
 * @example
 * ```javascript
 * await WPP.chat.openChatAt('[number]@c.us', <message_id>);
 * ```
 *
 * @category Chat
 */
export async function openChatAt(
  chatId: string | Wid,
  messageId: string
): Promise<boolean> {
  const wid = assertWid(chatId);

  const chat = await assertFindChat(wid);

  const msg = await getMessageById(messageId);

  try {
    const msgContext = getSearchContext(chat, msg);
    return await Cmd.openChatAt(chat, msgContext);
  } catch (e) {
    const msgContext = getSearchContext(chat, msg.id._serialized);
    return await Cmd.openChatAt({ chat, msgContext });
  }
}
