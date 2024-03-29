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
import { getAllLabelColors } from '../../whatsapp/functions';

/**
 * Returns an array of color palette in hex code
 */
export async function getLabelColorPalette(): Promise<string[]> {
  assertIsBusiness();

  const colorPalette = getAllLabelColors();

  if (!colorPalette) {
    throw new WPPError('canot_get_color_palette', `Can't get color palette`);
  }

  return colorPalette;
}
