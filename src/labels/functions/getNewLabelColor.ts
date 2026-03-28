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

import { assertColor, assertIsBusiness } from '../../assert';
import { WPPError } from '../../util';
import { LabelStore } from '../../whatsapp';

export type LabelsGetNewLabelColorOutput = number;

/**
 * Return the color index of the next available label
 *
 * @example
 * ```javascript
 * const color = await WPP.labels.getNewLabelColor();
 * console.log(color);
 * ```
 *
 * @category Labels
 */
export async function getNewLabelColor(): Promise<LabelsGetNewLabelColorOutput> {
  assertIsBusiness();

  const newLabelColor = LabelStore.getNextAvailableColor();

  if (newLabelColor == null) {
    throw new WPPError('cannot_get_color', `Can't get new label color`);
  }

  return assertColor(newLabelColor);
}
