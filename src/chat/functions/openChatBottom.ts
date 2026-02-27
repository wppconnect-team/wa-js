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

import { assertWid } from '../../assert';
import { isWhatsAppVersionLTE } from '../../conn/functions/getBuildConstants';
import { ChatStore, Cmd, Wid } from '../../whatsapp';
import { findOrCreateLatestChat } from '../../whatsapp/functions';

/**
 * Open the chat in the WhatsApp interface in bottom position
 *
 * @example
 * ```javascript
 * await WPP.chat.openChatBottom('[number]@c.us');
 * ```
 *
 * @argument chatEntryPoint Optional chat entry point: "Chatlist" for any existing chat in the left panel, undefined for any other case.
 *
 * @category Chat
 */
export async function openChatBottom(
  chatId: string | Wid,
  chatEntryPoint?: string | undefined
): Promise<boolean> {
  const wid = assertWid(chatId);

  // Use findOrCreateLatestChat to match WhatsApp Web's native behavior
  // This ensures the correct chat is found or created before opening
  await findOrCreateLatestChat(wid, 'newChatFlow');

  // Get the actual ChatModel instance from ChatStore
  const chat = ChatStore.get(wid);

  if (!chat) {
    throw new Error(`Chat not found in ChatStore for ${wid.toString()}`);
  }

  // WhatsApp changed from positional to named params in version 2.3000.1029960097
  if (isWhatsAppVersionLTE('2.3000.1029960097')) {
    // Legacy: use positional params for older versions
    return await Cmd.openChatBottom(chat, chatEntryPoint);
  }

  return await Cmd.openChatBottom({ chat, chatEntryPoint });
}
