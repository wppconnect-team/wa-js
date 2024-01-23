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

import { assertColor } from '../../assert';
import { LabelModel, LabelStore } from '../../whatsapp';
import { colorIndexToHex } from '../../whatsapp/functions';
import { Label } from '..';

export async function getAllLabels(): Promise<Label[]> {
  const labels = LabelStore.getModelsArray();
  return labels.map((e: LabelModel) => {
    return {
      id: e.id!,
      name: e.name!,
      color: e.hexColor ? assertColor(e.hexColor) : null,
      count: e.count || 0,
      hexColor: colorIndexToHex(e.colorIndex!),
      colorIndex: e.colorIndex!,
    };
  });
}
