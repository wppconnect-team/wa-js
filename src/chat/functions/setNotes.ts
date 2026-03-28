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

import { z } from 'zod';

import { assertGetChat } from '../../assert';
import { isBusiness } from '../../profile';
import { WPPError } from '../../util';
import { NoteModel } from '../../whatsapp';
import {
  addOrEditNoteAction,
  retrieveOnlyNoteForChatJid,
} from '../../whatsapp/functions/addOrEditNoteAction';

const chatSetNotesSchema = z.object({
  chatId: z.string(),
  content: z.string(),
});
export type ChatSetNotesInput = z.infer<typeof chatSetNotesSchema>;
export type ChatSetNotesOutput = NoteModel | null;

/**
 * Set notes for a contact
 * Only when are connected with business device
 * @example
 * ```javascript
 * WPP.chat.setNotes('[number]@c.us', 'Text for your notes');
 * ```
 * @category Chat
 */
export async function setNotes(
  params: ChatSetNotesInput
): Promise<ChatSetNotesOutput> {
  const { chatId, content } = chatSetNotesSchema.parse(params);
  const chat = assertGetChat(chatId);
  if (!isBusiness()) {
    throw new WPPError(
      'connected_device_not_is_business',
      `Connected device not is business account`
    );
  } else if (!content) {
    throw new WPPError(
      'missing_content_for_notes',
      `Missing content for notes`
    );
  } else if (chat.id.isGroup()) {
    throw new WPPError(
      'can_not_set_notes_for_groups',
      `You can not set notes for groups. ChatId: ${chatId}`
    );
  }
  const existsNote = await retrieveOnlyNoteForChatJid(chat.id.toJid());
  await addOrEditNoteAction(
    {
      actionType: existsNote ? 'edit' : 'add',
      chatJid: chat.id.toJid(),
      content,
      createdAt: Math.floor(Date.now() / 1000),
      id: existsNote?.id,
      noteType: 'unstructured',
    },
    true
  );
  return await retrieveOnlyNoteForChatJid(chat.id.toJid());
}
