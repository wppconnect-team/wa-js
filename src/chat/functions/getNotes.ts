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

import { assertGetChat } from '../../assert';
import { isBusiness } from '../../profile';
import { WPPError } from '../../util';
import { NoteModel, Wid } from '../../whatsapp';
import { retrieveOnlyNoteForChatJid } from '../../whatsapp/functions/addOrEditNoteAction';

/**
 * Get notes from a contact
 * Only when are connected with business device
 * @example
 * ```javascript
 * WPP.chat.getNotes('[number]@c.us', 'Text for your notes');
 * ```
 * @category Chat
 */
export async function getNotes(
  chatId: string | Wid
): Promise<NoteModel | null> {
  const chat = assertGetChat(chatId);
  if (!isBusiness()) {
    throw new WPPError(
      'connected_device_not_is_business',
      `Connected device not is business account`
    );
  } else if (chat.id.isGroup()) {
    throw new WPPError(
      'can_not_get_notes_for_groups',
      `You can not get notes for groups. ChatId: ${chatId}`
    );
  }
  return await retrieveOnlyNoteForChatJid(chat.id.toJid());
}
