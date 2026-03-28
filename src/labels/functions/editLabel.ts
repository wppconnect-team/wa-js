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
import { LabelStore } from '../../whatsapp';
import { getAllLabelColors, labelEditAction } from '../../whatsapp/functions';
import { Label } from '..';
import { colorIsInLabelPalette, getLabelById } from '.';

const labelsEditLabelSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  labelColor: z.union([z.string(), z.number()]).optional(),
});

export type LabelsEditLabelInput = z.infer<typeof labelsEditLabelSchema>;
export type LabelsEditLabelOutput = Label;

/**
 * Edit a label
 * For get a new color, use await WPP.labels.getLabelColorPalette() to get the list of available colors
 * @example
 * ```javascript
 * await WPP.labels.editLabel({ id: 'labelId' });
 * //or
 * await WPP.labels.editLabel({ id: 'labelId', labelColor: '#dfaef0' });
 * ```
 * //or with color index
 * await WPP.labels.editLabel({ id: 'labelId', labelColor: 16 });
 * ```
 */
export async function editLabel(
  params: LabelsEditLabelInput
): Promise<LabelsEditLabelOutput> {
  const {
    id,
    name,
    labelColor: rawLabelColor,
  } = labelsEditLabelSchema.parse(params);
  assertIsBusiness();

  const label = LabelStore.get(id.toString());
  if (!label) {
    throw new WPPError('label_not_exist', `Label with id ${id} not exist`);
  }

  let labelColor: string | number | undefined = rawLabelColor || undefined;

  if (labelColor) {
    if (typeof labelColor === 'string' && labelColor.length > 2) {
      labelColor = getAllLabelColors().findIndex(
        (value: string) => value === labelColor
      );
    }
    labelColor = parseInt(labelColor.toString());

    if (!(await colorIsInLabelPalette({ color: labelColor.toString() }))) {
      throw new WPPError('color_not_in_pallet', `Color not in pallet`);
    }
  }
  await labelEditAction(
    id,
    name || label.name,
    0,
    labelColor || (label!.colorIndex as any)
  );
  return await getLabelById({ labelId: id.toString() });
}
