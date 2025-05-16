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
import { ChatModel, GroupMetadataStore, Wid } from '../../whatsapp';
import { findOrCreateLatestChat } from '../../whatsapp/functions';

/**
 * Find a chat by id
 *
 * This create a new chat if no one was found
 *
 * @category Chat
 */
export async function find(chatId: string | Wid): Promise<ChatModel> {
  let exist: any;

  const wid = assertWid(chatId);
  if (wid?.isLid()) {
    // patch for send message to lids
    exist = await findOrCreateLatestChat(wid, 'username_contactless_search');
  } else {
    exist = await findOrCreateLatestChat(wid);
  }

  if (!wid.isLid() && wid.isGroup() && exist.chat) {
    await GroupMetadataStore.find(exist.chat.id);
  }

  return exist?.chat;
}
