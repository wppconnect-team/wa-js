/*!
 * Copyright 2026 WPPConnect Team
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
import { WPPError } from '../../util';
import { LabelStore, Wid } from '../../whatsapp';

/**
 * Add chats to an existing list
 *
 * @example
 * ```javascript
 * await WPP.lists.addChats('42', ['number@c.us', 'number2@c.us']);
 * ```
 *
 * @category Lists
 */
export async function addChats(
  listId: string,
  chatIds: (string | Wid)[]
): Promise<void> {
  if (chatIds.length === 0) return;
  if (!LabelStore.get(listId)) {
    throw new WPPError('list_not_found', `List ${listId} not found`, {
      id: listId,
    });
  }
  const chats = chatIds.map((id) => assertGetChat(id));
  await LabelStore.addOrRemoveLabels([{ id: listId, type: 'add' }], chats);
}
