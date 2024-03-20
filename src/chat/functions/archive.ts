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

import { compare } from 'compare-versions';

import { assertGetChat, assertWid } from '../../assert';
import { WPPError } from '../../util';
import { Cmd, Wid } from '../../whatsapp';
import { setArchive } from '../../whatsapp/functions';

/**
 * Archive a chat
 *
 * @example
 * ```javascript
 * // Archive a chat
 * WPP.chat.archive('[number]@c.us');
 *
 * // Unarchive a chat
 * WPP.chat.archive('[number]@c.us', false);
 * // or
 * WPP.chat.unarchive('[number]@c.us');
 * ```
 * @category Chat
 */
export async function archive(chatId: string | Wid, archive = true) {
  const wid = assertWid(chatId);

  const chat = assertGetChat(wid);

  if (chat.archive === archive) {
    throw new WPPError(
      `${archive ? 'archive' : 'unarchive'}_error`,
      `The chat ${wid.toString()} is already ${
        archive ? 'archived' : 'unarchived'
      }`,
      { wid, archive }
    );
  }
  if (compare(self.Debug.VERSION, '2.3000.0', '>=')) {
    Cmd.archiveChat(chat, archive);
  } else {
    await setArchive(chat, archive);
  }

  return {
    wid,
    archive,
  };
}

/**
 * Unarchive a chat
 *
 * @alias archive
 *
 * @example
 * ```javascript
 * // Unarchive a chat
 * WPP.chat.unarchive('[number]@c.us');
 *
 * // Alias for
 * WPP.chat.archive('[number]@c.us', false);
 * ```
 * @category Chat
 */
export async function unarchive(chatId: string | Wid) {
  return archive(chatId, false);
}
