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

import { assertColor } from '../../assert';
import { WPPError } from '../../util';
import { LabelStore } from '../../whatsapp';
import { colorIndexToHex } from '../../whatsapp/functions';
import { Label } from '..';
import { patchLabelCount } from '../patch';

const labelsGetLabelByIdSchema = z.object({
  labelId: z.string(),
});

export type LabelsGetLabelByIdInput = z.infer<typeof labelsGetLabelByIdSchema>;
export type LabelsGetLabelByIdOutput = Label;

export async function getLabelById(
  params: LabelsGetLabelByIdInput
): Promise<LabelsGetLabelByIdOutput> {
  const { labelId } = labelsGetLabelByIdSchema.parse(params);

  const label = LabelStore.get(labelId);

  if (!label) {
    throw new WPPError('canot_get_label_error', `Can't get label by id`);
  }
  return {
    id: label.id,
    name: label.name,
    color: label.hexColor ? assertColor(label.hexColor) : null,
    count: patchLabelCount(label),
    hexColor: colorIndexToHex(label.colorIndex!),
    colorIndex: label.colorIndex!,
  };
}
