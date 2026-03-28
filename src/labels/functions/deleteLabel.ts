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
import { LabelStore } from '../../whatsapp';
import { labelDeleteAction } from '../../whatsapp/functions';

export interface DeleteLabelReturn {
  id: string;
  deleteLabelResult: any;
}

const labelsDeleteLabelSchema = z.object({
  labelIds: z.array(z.string()),
});

export type LabelsDeleteLabelInput = z.infer<typeof labelsDeleteLabelSchema>;
export type LabelsDeleteLabelOutput = DeleteLabelReturn[];

export async function deleteLabel(
  params: LabelsDeleteLabelInput
): Promise<LabelsDeleteLabelOutput> {
  const { labelIds } = labelsDeleteLabelSchema.parse(params);
  assertIsBusiness();

  const results: DeleteLabelReturn[] = [];
  for (const id of labelIds) {
    const label = LabelStore.get(id.toString());
    if (label)
      await labelDeleteAction(id.toString(), label.name, label.colorIndex!);
    results.push({
      id: id,
      deleteLabelResult:
        label != undefined
          ? LabelStore.get(id.toString()) != undefined
            ? false
            : true
          : false,
    });
  }

  return results;
}
