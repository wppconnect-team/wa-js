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
import { ChatStore, Wid } from '../../whatsapp';

/**
 * Get timestamp of last seen
 * @example
 * ```javascript
 * WPP.chat.getLastSeen('[number]@c.us');
 * ```
 * @category Chat
 */
export async function getLastSeen(
  chatId: string | Wid
): Promise<number | boolean> {
  const wid = assertWid(chatId);
  const chat = await ChatStore.get(wid);
  if (!chat) {
    return false;
  }
  if (!chat.presence.hasData) {
    await chat.presence.subscribe();
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  return chat.presence.chatstate.t || false;
}
