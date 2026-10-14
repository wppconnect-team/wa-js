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

import { LabelModel, LabelStore } from '../../whatsapp';

export const LIST_TYPE_CUSTOM = 5;

export function getOrderedLabels(): LabelModel[] {
  return LabelStore.getModelsArray()
    .slice()
    .sort((a, b) => {
      // Native LabelModel defaults a missing orderIndex to Number(id), and
      // WAWebListUtils.sortLabels breaks equal positions by numeric label id.
      const order =
        (a.orderIndex ?? Number(a.id)) - (b.orderIndex ?? Number(b.id));
      return order || parseInt(a.id, 10) - parseInt(b.id, 10) || 0;
    });
}
