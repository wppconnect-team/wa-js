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

import { WPPError } from '../../util';
import { LabelStore } from '../../whatsapp';
import { labelEditAction } from '../../whatsapp/functions';
import { assertListEditingAvailable } from './assertListEditingAvailable';
import { ListColor, resolveColorIndex } from './resolveColorIndex';

/**
 * Change the color of an existing list.
 * Available when WhatsApp enables list editing for the account.
 * Throws `list_editing_not_available` when the native feature is disabled.
 *
 * The color must be one of the WhatsApp palette entries — pass either its
 * index or its hex code. Use {@link getColorPalette} to list them.
 *
 * @example
 * ```javascript
 * // by palette index
 * await WPP.lists.setColor('42', 3);
 *
 * // by hex code
 * await WPP.lists.setColor('42', '#64c4ff');
 * ```
 *
 * @category Lists
 */
export async function setColor(
  listId: string,
  color: ListColor
): Promise<void> {
  assertListEditingAvailable();
  const label = LabelStore.get(listId);
  if (!label) {
    throw new WPPError('list_not_found', `List ${listId} not found`, {
      id: listId,
    });
  }

  await labelEditAction(
    listId,
    label.name,
    label.predefinedId ?? 0,
    resolveColorIndex(color),
    label.isActive,
    label.type
  );
}
