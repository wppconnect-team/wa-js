/*!
 * Copyright 2024 WPPConnect Team
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
import { getActiveChat } from '../../chat';
import { WPPError } from '../../util';
import { ComposeBoxActions, Wid } from '../../whatsapp';
import { unixTime } from '../../whatsapp/functions';

export async function setInputText(
  text: string,
  chatId?: string | Wid
): Promise<{
  text: string;
  timestamp: number;
}> {
  const chat =
    chatId !== undefined ? await assertFindChat(chatId) : getActiveChat();

  if (!chat) {
    throw new WPPError('not_in_chat', 'Not active chat or invalid wid value');
  } else {
    if (chat?.active) {
      chat.setComposeContents({ text: text, timestamp: unixTime() });
      ComposeBoxActions.setTextContent(chat, text);
      return chat.getComposeContents();
    } else {
      chat?.setComposeContents({ text: text, timestamp: unixTime() });
      return chat.getComposeContents();
    }
  }
}
