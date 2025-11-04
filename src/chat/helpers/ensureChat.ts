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

import { assertFindChat, assertGetChat, InvalidChat } from '../../assert';
import type { ChatModel, Wid } from '../../whatsapp';
import { resolveChatLid } from './resolveChatLid';

export interface EnsureChatOptions {
  /**
   * When true, the chat will always be created, mimicking the behaviour of
   * `createChat`. Otherwise the existing chat is fetched and only falls back
   * to creation when necessary.
   */
  createChat?: boolean;
  /**
   * When enabled (default), the helper resolves the LID associated with the
   * chat to keep storage writes consistent with WhatsApp Web expectations.
   */
  ensureLid?: boolean;
}

/**
 * Centralised helper used by sending functions to retrieve chats safely.
 *
 * The implementation avoids duplicated logic spread across the different
 * message helpers and guarantees that any chat returned is compatible with
 * the patched storage layer, minimising the chance of race conditions or
 * missing LID errors when messaging new contacts.
 */
export async function ensureChat(
  chatId: string | Wid,
  options: EnsureChatOptions = {}
): Promise<ChatModel> {
  const { createChat = false, ensureLid = true } = options;

  let chat: ChatModel;

  if (createChat) {
    chat = await assertFindChat(chatId);
  } else {
    try {
      chat = assertGetChat(chatId);
    } catch (error) {
      if (error instanceof InvalidChat) {
        chat = await assertFindChat(chatId);
      } else {
        throw error;
      }
    }
  }

  if (ensureLid && chat?.id?.isUser?.()) {
    await resolveChatLid(chat.id);
  }

  return chat;
}
