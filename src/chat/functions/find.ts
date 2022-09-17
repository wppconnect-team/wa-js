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
import { ChatModel, GroupMetadataStore, Wid } from '../../whatsapp';
import { findChat } from '../../whatsapp/functions';

/**
 * Find a chat by id
 *
 * This create a new chat if no one was found
 *
 * @category Chat
 */
export async function find(chatId: string | Wid): Promise<ChatModel> {
  const wid = assertWid(chatId);
  const chat = await findChat(wid);

  if (chat.isGroup) {
    await GroupMetadataStore.find(chat.id);
  }

  return chat;
}
