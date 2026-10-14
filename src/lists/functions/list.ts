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

import { colorIndexToHex } from '../../whatsapp/functions';
import { getOrderedLabels, LIST_TYPE_CUSTOM } from './getOrderedLabels';

export interface ListInfo {
  id: string;
  name: string;
  /** Position synchronized by WhatsApp across devices. */
  orderIndex?: number;
  colorIndex: number;
  /** The `colorIndex` as a hex code, e.g. `'#64c4ff'` */
  hexColor: string;
}

/**
 * Return custom lists in the order synchronized by WhatsApp.
 *
 * @example
 * ```javascript
 * const lists = WPP.lists.list();
 * for (const l of lists) {
 *   console.log(l.id, l.name);
 * }
 * ```
 *
 * @category Lists
 */
export function list(): ListInfo[] {
  return getOrderedLabels()
    .filter((l) => l.type === LIST_TYPE_CUSTOM)
    .map((l) => {
      const colorIndex = l.colorIndex ?? 0;
      return {
        id: String(l.id),
        name: l.name,
        orderIndex: l.orderIndex ?? undefined,
        colorIndex,
        hexColor: colorIndexToHex(colorIndex),
      };
    });
}
