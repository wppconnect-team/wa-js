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
import { getNextLabelId, labelAddAction } from '../../whatsapp/functions';

/**
 * Create a new list and optionally add chats to it.
 * Works for both personal and business accounts.
 *
 * @example
 * ```javascript
 * const id = await WPP.lists.create('Family', ['number@c.us', 'number2@c.us']);
 * console.log(id); // '42'
 * ```
 *
 * @category Lists
 */
export async function create(
  name: string,
  chatIds: (string | Wid)[] = [],
  colorIndex?: number
): Promise<string> {
  if (!name?.trim()) {
    throw new WPPError('list_name_required', 'List name is required');
  }

  if (
    colorIndex !== undefined &&
    (!Number.isInteger(colorIndex) || colorIndex < 0)
  ) {
    throw new WPPError(
      'list_invalid_color',
      'colorIndex must be a non-negative integer'
    );
  }

  const color =
    colorIndex !== undefined
      ? colorIndex
      : ((await LabelStore.getNextAvailableColor()) ?? 0);

  // Capture the next ID before calling labelAddAction — the action's return
  // value is untyped (Promise<any>) and cannot be relied on as the list ID.
  const listId = await getNextLabelId();
  await labelAddAction(name.trim(), color);

  if (chatIds.length > 0) {
    const chats = chatIds.map((id) => assertGetChat(id));
    await LabelStore.addOrRemoveLabels(
      [{ id: String(listId), type: 'add' }],
      chats
    );
  }

  return String(listId);
}
