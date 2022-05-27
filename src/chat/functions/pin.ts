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

import { assertGetChat, assertWid } from '../../assert';
import { WPPError } from '../../util';
import { Wid } from '../../whatsapp';
import { setPin } from '../../whatsapp/functions';

/**
 * Pin a chat
 *
 * @example
 * ```javascript
 * // Pin a chat
 * WPP.chat.pin('[number]@c.us');
 *
 * // Unpin a chat
 * WPP.chat.pin('[number]@c.us', false);
 * // or
 * WPP.chat.unpin('[number]@c.us');
 * ```
 * @category Chat
 */
export async function pin(chatId: string | Wid, pin = true) {
  const wid = assertWid(chatId);

  const chat = assertGetChat(wid);

  if (chat.pin === pin) {
    throw new WPPError(
      `${pin ? 'pin' : 'unpin'}_error`,
      `The chat ${wid.toString()} is already ${pin ? 'pinned' : 'unpinned'}`,
      { wid, pin: pin }
    );
  }

  await setPin(chat, pin);

  return {
    wid,
    pin: pin,
  };
}

/**
 * Unpin a chat
 *
 * @alias pin
 *
 * @example
 * ```javascript
 * // Unpin a chat
 * WPP.chat.unpin('[number]@c.us');
 *
 * // Alias for
 * WPP.chat.pin('[number]@c.us', false);
 * ```
 * @category Chat
 */
export async function unpin(chatId: string | Wid) {
  return pin(chatId, false);
}
