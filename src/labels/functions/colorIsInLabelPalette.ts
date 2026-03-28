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
import { getLabelColorPalette } from '.';

const labelsColorIsInLabelPaletteSchema = z.object({
  color: z.union([z.string(), z.number()]),
});

export type LabelsColorIsInLabelPaletteInput = z.infer<
  typeof labelsColorIsInLabelPaletteSchema
>;
export type LabelsColorIsInLabelPaletteOutput = boolean;

/**
 * Check if color is in label palette
 * @example
 * ```javascript
 * await WPP.labels.colorIsInLabelPalette({ color: '#ffd429' });
 * //or
 * await WPP.labels.colorIsInLabelPalette({ color: 4284794111 });
 * ```
 */
export async function colorIsInLabelPalette(
  params: LabelsColorIsInLabelPaletteInput
): Promise<LabelsColorIsInLabelPaletteOutput> {
  const { color } = labelsColorIsInLabelPaletteSchema.parse(params);
  assertIsBusiness();

  const colorPalette = await getLabelColorPalette();
  return (
    colorPalette &&
    (colorPalette.includes(color.toString()) ||
      colorPalette[parseInt(color.toString())] != undefined)
  );
}
