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

import { z } from 'zod';

import { assertIsBusiness } from '../../assert';
import { WPPError } from '../../util';
import {
  getAllLabelColors,
  getNextLabelId,
  labelAddAction,
} from '../../whatsapp/functions';
import { Label } from '..';
import { colorIsInLabelPalette, getLabelById, getNewLabelColor } from '.';

const labelsAddNewLabelSchema = z.object({
  labelName: z.string(),
  labelColor: z.string().optional(),
});

export type LabelsAddNewLabelInput = z.infer<typeof labelsAddNewLabelSchema>;
export type LabelsAddNewLabelOutput = Label;

/**
 * Add a new label
 * Use await WPP.labels.getLabelColorPalette() to get the list of available colors
 * @example
 * ```javascript
 * await WPP.labels.addNewLabel({ labelName: 'Name of label' });
 * //or
 * await WPP.labels.addNewLabel({ labelName: 'Name of label', labelColor: '#dfaef0' });
 * //or with color index
 * await WPP.labels.addNewLabel({ labelName: 'Name of label', labelColor: 16 });
 * ```
 */
export async function addNewLabel(
  params: LabelsAddNewLabelInput
): Promise<LabelsAddNewLabelOutput> {
  const { labelName, labelColor: rawLabelColor } =
    labelsAddNewLabelSchema.parse(params);
  assertIsBusiness();

  let labelColor: string | number | undefined = rawLabelColor || undefined;

  if (!labelColor) labelColor = await getNewLabelColor();

  if (typeof labelColor === 'string' && labelColor.length > 2) {
    labelColor = getAllLabelColors().findIndex(
      (value: string) => value === labelColor
    );
  }
  labelColor = parseInt(labelColor.toString());

  if (!(await colorIsInLabelPalette({ color: labelColor!.toString() }))) {
    throw new WPPError('color_not_in_pallet', `Color not in pallet`);
  }
  const labelId = await getNextLabelId();
  await labelAddAction(labelName, labelColor);
  return await getLabelById({ labelId: labelId.toString() });
}
