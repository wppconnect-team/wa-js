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

import * as loader from '../../loader';
import { WPPError } from '../../util';
import { LabelStore } from '../../whatsapp';
import {
  isLabelReorderEnabled,
  persistLabelReorder,
} from '../../whatsapp/functions';
import { assertListEditingAvailable } from './assertListEditingAvailable';
import { getOrderedLabels, LIST_TYPE_CUSTOM } from './getOrderedLabels';

// The native action optimistically edits models before locking persistence.
// Serializing WPP calls prevents a failed action from undoing a later one.
let pendingOrder: Promise<void> = Promise.resolve();

/**
 * Set the order of custom lists using WhatsApp's native synchronized action.
 * Pass every custom list id exactly once, in the desired order. Built-in and
 * other lists retain their positions relative to the custom-list slots.
 * Requires WhatsApp to enable list reordering for the account.
 *
 * @example
 * ```javascript
 * const ids = WPP.lists.list().map(list => list.id);
 * await WPP.lists.setOrder(ids.reverse());
 * console.log(WPP.lists.list());
 * ```
 * @category Lists
 */
export async function setOrder(listIds: string[]): Promise<void> {
  if (
    !Array.isArray(listIds) ||
    listIds.length === 0 ||
    listIds.some((id) => typeof id !== 'string' || !id)
  ) {
    throw new WPPError(
      'invalid_list_order',
      'Pass all custom list ids in the desired order'
    );
  }
  const ids = [...listIds];
  const update = pendingOrder.then(() => applyOrder(ids));
  pendingOrder = update.catch(() => undefined);
  await update;
}

async function applyOrder(ids: string[]): Promise<void> {
  assertListEditingAvailable();
  await loader.ensureLazyModule('WAWebListsActions');
  if (
    typeof persistLabelReorder !== 'function' ||
    (typeof isLabelReorderEnabled === 'function' && !isLabelReorderEnabled())
  ) {
    throw new WPPError(
      'list_ordering_not_available',
      'WhatsApp has not enabled list reordering for this account'
    );
  }

  const labels = getOrderedLabels();
  const custom = labels.filter((label) => label.type === LIST_TYPE_CUSTOM);
  const customIds = new Set(custom.map((label) => String(label.id)));
  if (
    ids.length !== custom.length ||
    new Set(ids).size !== ids.length ||
    ids.some((id) => !customIds.has(id))
  ) {
    throw new WPPError(
      'invalid_list_order',
      'Pass each existing custom list id exactly once'
    );
  }
  if (custom.every((label, index) => String(label.id) === ids[index])) return;

  let index = 0;
  const sortedIds = labels.map((label) =>
    label.type === LIST_TYPE_CUSTOM ? ids[index++] : String(label.id)
  );
  // Native storage indexes the payload by numeric id, and the sync action
  // carries integer label ids. Strings would leave database records unchanged.
  const nativeIds = sortedIds.map(Number);
  if (
    nativeIds.some(
      (id, index) =>
        !Number.isSafeInteger(id) || id < 0 || String(id) !== sortedIds[index]
    )
  ) {
    throw new WPPError(
      'invalid_list_order',
      'WhatsApp list ids must be numeric'
    );
  }
  await persistLabelReorder(nativeIds);
  // Native persistence catches sync failures and rolls the models back. Do not
  // report success when that rollback or a native no-op occurred.
  if (sortedIds.some((id, index) => LabelStore.get(id)?.orderIndex !== index)) {
    throw new WPPError(
      'list_order_update_failed',
      'WhatsApp did not persist the requested list order'
    );
  }
}
