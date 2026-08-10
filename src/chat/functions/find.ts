/*!
 * Copyright 2025 WPPConnect Team
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
import { ChatModel, ChatStore, GroupMetadataStore, Wid } from '../../whatsapp';
import {
  ChatOriginType,
  findOrCreateLatestChat,
} from '../../whatsapp/functions';

/**
 * Find a chat by id
 *
 * This create a new chat if no one was found
 *
 * @example
 * ```javascript
 * const chat = await WPP.chat.find('[number]@c.us');
 *
 * // For a contact resolved from a @username lookup, pass the matching origin
 * // so WhatsApp applies the same LID metadata it applies natively
 * const { wid } = await WPP.contact.queryUsernameExists('someusername');
 * const chat = await WPP.chat.find(wid, 'username_contactless_search');
 * ```
 *
 * @param chatId The chat id
 * @param originType Why the chat is being created. Only relevant when the chat
 *   does not exist yet and needs to be created. Use
 *   `'username_contactless_search'` for contacts resolved from a `@username`:
 *   it is the only origin that makes WhatsApp share your own phone number with
 *   the contact when your account has no username, matching the native flow.
 *
 * @category Chat
 */
export async function find(
  chatId: string | Wid,
  originType: ChatOriginType = 'createChat'
): Promise<ChatModel> {
  const wid = assertWid(chatId);

  // Use findOrCreateLatestChat to match WhatsApp Web's native behavior
  // This ensures the chat is properly initialized and can be opened/clicked
  // Returns { chat: plain object with id, created: boolean }
  const result = await findOrCreateLatestChat(wid, originType);

  if (!result?.chat?.id) {
    throw new Error(`Failed to find or create chat for ${wid.toString()}`);
  }

  // result.chat is a plain object, not a ChatModel instance
  // Use ChatStore.get with the chat id to get the actual ChatModel
  // This works for both regular contacts and @lid contacts
  const chat = ChatStore.get(result.chat.id);

  if (!chat) {
    throw new Error(`Chat not found in ChatStore for ${wid.toString()}`);
  }

  if (chat.id.isGroup()) {
    await GroupMetadataStore.find(chat.id);
  }

  return chat;
}
