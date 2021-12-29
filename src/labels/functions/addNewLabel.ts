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

import { assertColor, assertIsBusiness } from '../../assert';
import { WPPError } from '../../util';
import { LabelStore } from '../../whatsapp';
import { colorIsInLabelPalette, getNewLabelColor } from '.';

export interface NewLabelOptions {
  /**
   * If it's decimal, send it as a number. If it's hexadecimal, send it as a string.
   * If labelColor is omitted, the color will be generated automatically
   */
  labelColor?: string | number;
}

/**
 * Add a new label
 * Use await WPP.labels.getLabelColorPalette() to get the list of available colors
 * @example
 * ```javascript
 * await WPP.labels.addNewLabel(`Name of label`);
 * //or
 * await WPP.labels.addNewLabel(`Name of label`, { labelColor: '#dfaef0' });
 * //or
 * await WPP.labels.addNewLabel(`Name of label`, { labelColor: 4292849392 });
 * ```
 */
export async function addNewLabel(
  labelName: string,
  options: NewLabelOptions = {}
) {
  assertIsBusiness();

  let labelColor: number | false;

  if (['number', 'string'].includes(typeof options.labelColor)) {
    labelColor = assertColor(options.labelColor);
  } else {
    labelColor = await getNewLabelColor();
  }

  if (!(await colorIsInLabelPalette(labelColor))) {
    throw new WPPError('color_not_in_pallet', `Color not in pallet`);
  }
  return await LabelStore.addNewLabel(labelName, labelColor.toString());
}
