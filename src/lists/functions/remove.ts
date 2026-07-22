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
import { callLabelDeleteAction } from '../../whatsapp/functions/callLabelDeleteAction';

/**
 * Delete a list by ID
 *
 * @example
 * ```javascript
 * await WPP.lists.remove('42');
 * ```
 *
 * @category Lists
 */
export async function remove(listId: string): Promise<void> {
  const label = LabelStore.get(listId);
  if (!label) {
    throw new WPPError('list_not_found', `List ${listId} not found`, {
      id: listId,
    });
  }
  await callLabelDeleteAction(listId, label.name, label.colorIndex ?? 0);
}
