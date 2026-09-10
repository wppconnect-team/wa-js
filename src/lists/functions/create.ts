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
import { isBusiness } from '../../profile/functions/isBusiness';
import { WPPError } from '../../util';
import { LabelStore, Wid } from '../../whatsapp';
import { labelAddAction } from '../../whatsapp/functions';
import { assertListEditingAvailable } from './assertListEditingAvailable';

/**
 * Create a new list and optionally add chats to it.
 * Available when WhatsApp enables list editing for the account.
 * Throws `list_editing_not_available` when the native feature is disabled.
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

  assertListEditingAvailable();
  const chats = chatIds.map((id) => assertGetChat(id));
  const color =
    colorIndex !== undefined
      ? colorIndex
      : isBusiness()
        ? ((await LabelStore.getNextAvailableColor()) ?? 0)
        : null;

  const listId = await labelAddAction(name.trim(), color);
  if (listId == null) {
    throw new WPPError(
      'list_create_failed',
      'WhatsApp did not create the list'
    );
  }

  if (chats.length > 0) {
    await LabelStore.addOrRemoveLabels(
      [{ id: String(listId), type: 'add' }],
      chats
    );
  }

  return String(listId);
}
