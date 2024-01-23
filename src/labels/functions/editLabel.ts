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

import { assertIsBusiness } from '../../assert';
import { WPPError } from '../../util';
import { LabelStore } from '../../whatsapp';
import { getAllLabelColors, labelEditAction } from '../../whatsapp/functions';
import { colorIsInLabelPalette, getLabelById } from '.';

export interface EditLabelOptions {
  /**
   * If it's decimal, send it as a number. If it's hexadecimal, send it as a string.
   * If labelColor is omitted, the color will be generated automatically
   */
  labelColor?: string | number;
  name?: string;
}

/**
 * Edit a label
 * For get a new color, use await WPP.labels.getLabelColorPalette() to get the list of available colors
 * @example
 * ```javascript
 * await WPP.labels.editLabel(`Name of label`);
 * //or
 * await WPP.labels.editLabel(`Name of label`, { labelColor: '#dfaef0' });
 * ```
 * //or with color index
 * await WPP.labels.editLabel(`Name of label`, { labelColor: 16 });
 * ```
 */
export async function editLabel(id: string, options: EditLabelOptions = {}) {
  assertIsBusiness();
  const label = LabelStore.get(id.toString());
  if (!label) {
    throw new WPPError('label_not_exist', `Label with id ${id} not exist`);
  }

  let labelColor = options.labelColor || undefined;

  if (labelColor) {
    if (typeof labelColor === 'string' && labelColor.length > 2) {
      labelColor = getAllLabelColors().findIndex(
        (value: string) => value === labelColor
      );
    }
    labelColor = parseInt(labelColor.toString());

    if (!(await colorIsInLabelPalette(labelColor))) {
      throw new WPPError('color_not_in_pallet', `Color not in pallet`);
    }
  }
  await labelEditAction(
    id,
    options.name || label.name,
    0,
    labelColor || (label!.colorIndex as any)
  );
  return await getLabelById(id.toString());
}
