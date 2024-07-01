/*!
 * Copyright 2023 WPPConnect Team
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

import { get, getActiveChat } from '../../chat';
import { WPPError } from '../../util';
import { Cmd, Wid } from '../../whatsapp';
import { unixTime } from '../../whatsapp/functions';

export function inputText(opts: { newText?: string; chatId?: string | Wid }): {
  text: string;
  timestamp: number;
} {
  const chat = opts?.chatId ? get(opts.chatId) : getActiveChat();
  if (!chat) {
    throw new WPPError('not_in_chat', 'Not active chat or invalid wid value');
  } else if (!opts?.newText) {
    return chat?.getComposeContents();
  } else {
    if (chat?.active) {
      Cmd.closeChat(chat);
      setTimeout(() => {
        chat.setComposeContents({ text: opts.newText, timestamp: unixTime() });
        Cmd.openChatBottom(chat);
      }, 5);
      return chat.getComposeContents();
    } else {
      chat?.setComposeContents({ text: opts.newText, timestamp: unixTime() });
      return chat.getComposeContents();
    }
  }
}
