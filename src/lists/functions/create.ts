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
import { ListColor, resolveColorIndex } from './resolveColorIndex';

/**
 * Create a new list and optionally add chats to it.
 * Available when WhatsApp enables list editing for the account.
 * Throws `list_editing_not_available` when the native feature is disabled.
 *
 * The color must be one of the WhatsApp palette entries — pass either its
 * index or its hex code. Use {@link getColorPalette} to list them.
 * When omitted, WhatsApp picks the next available color.
 *
 * @example
 * ```javascript
 * const id = await WPP.lists.create('Family', ['number@c.us', 'number2@c.us']);
 * console.log(id); // '42'
 *
 * // with an explicit color, by index or hex code
 * await WPP.lists.create('Work', [], 3);
 * await WPP.lists.create('Friends', [], '#64c4ff');
 * ```
 *
 * @category Lists
 */
export async function create(
  name: string,
  chatIds: (string | Wid)[] = [],
  color?: ListColor
): Promise<string> {
  if (!name?.trim()) {
    throw new WPPError('list_name_required', 'List name is required');
  }

  assertListEditingAvailable();
  const chats = chatIds.map((id) => assertGetChat(id));

  // A null color lets WhatsApp pick one, which is the only supported
  // behavior for non-business accounts.
  const colorIndex =
    color !== undefined
      ? resolveColorIndex(color)
      : isBusiness()
        ? ((await LabelStore.getNextAvailableColor()) ?? 0)
        : null;

  const listId = await labelAddAction(name.trim(), colorIndex);
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
