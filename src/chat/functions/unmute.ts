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
import { Wid } from '../../whatsapp';

/**
 * Unmute a chat
 *
 * @example
 * ```javascript
 * WPP.chat.unmute('[number]@c.us');
 * ```
 *
 * @category Chat
 */
export async function unmute(chatId: string | Wid) {
  const wid = assertWid(chatId);

  const chat = assertGetChat(wid);

  return chat.mute.unmute({ sendDevice: true });
}
