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

import { assertGetChat } from '../../assert';
import { Wid } from '../../whatsapp';
import { sendSeen as SendSeenEv } from '../../whatsapp/functions';

/**
 * Send seen event for a chat
 *
 * @example
 * ```javascript
 * // Some messages
 * WPP.chat.sendSeen('[number]@c.us');
 * ```
 * @category Chat
 */
export async function sendSeen(chatId: string | Wid) {
  const chat = assertGetChat(chatId);

  await SendSeenEv(chat, false);

  return {
    wid: chat.id,
  };
}
