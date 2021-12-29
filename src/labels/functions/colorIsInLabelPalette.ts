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
import { getLabelColorPalette } from '.';

/**
 * Check if color is in label palette
 * @param color If it's decimal, send it as a number. If it's hexadecimal, send it as a string
 * @example
 * ```javascript
 * await WPP.labels.colorIsInLabelPalette('#ffd429');
 * //or
 * await WPP.labels.colorIsInLabelPalette(4284794111);
 * ```
 */
export async function colorIsInLabelPalette(
  color: string | number
): Promise<boolean> {
  assertIsBusiness();

  const colorPalette = await getLabelColorPalette();
  return colorPalette && colorPalette.includes(assertColor(color));
}
