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

import { z } from 'zod';

import { assertGetChat, assertWid } from '../../assert';
import { WPPError } from '../../util';
import { Cmd } from '../../whatsapp';

const chatArchiveSchema = z.object({
  chatId: z.string(),
  archive: z.boolean().optional(),
});
export type ChatArchiveInput = z.infer<typeof chatArchiveSchema>;
export type ChatArchiveOutput = void;

/**
 * Archive a chat
 *
 * @example
 * ```javascript
 * // Archive a chat
 * WPP.chat.archive({ chatId: '[number]@c.us' });
 *
 * // Unarchive a chat
 * WPP.chat.archive({ chatId: '[number]@c.us', archive: false });
 * // or
 * WPP.chat.unarchive({ chatId: '[number]@c.us' });
 * ```
 * @category Chat
 */
export async function archive(
  params: ChatArchiveInput
): Promise<ChatArchiveOutput> {
  const { chatId, archive: archiveFlag = true } =
    chatArchiveSchema.parse(params);
  const wid = assertWid(chatId);

  const chat = assertGetChat(wid);

  if (chat.archive === archiveFlag) {
    throw new WPPError(
      `${archiveFlag ? 'archive' : 'unarchive'}_error`,
      `The chat ${wid.toString()} is already ${
        archiveFlag ? 'archived' : 'unarchived'
      }`,
      { wid, archive: archiveFlag }
    );
  }
  Cmd.archiveChat(chat, archiveFlag);

  return;
}

/**
 * Unarchive a chat
 *
 * @alias archive
 *
 * @category Chat
 */
export async function unarchive(params: { chatId: string }) {
  return archive({ ...params, archive: false });
}
