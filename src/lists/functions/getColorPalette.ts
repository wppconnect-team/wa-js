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

import { WPPError } from '../../util';
import { getAllLabelColors } from '../../whatsapp/functions';

/**
 * Return the list color palette as hex codes.
 * The index of each entry is the `colorIndex` accepted by
 * {@link create} and {@link setColor}.
 * Works for both personal and business accounts.
 *
 * @example
 * ```javascript
 * const palette = WPP.lists.getColorPalette();
 * console.log(palette); // ['#ff9485', '#64c4ff', ...]
 * ```
 *
 * @category Lists
 */
export function getColorPalette(): string[] {
  const palette = getAllLabelColors();

  if (!palette) {
    throw new WPPError(
      'list_cannot_get_color_palette',
      `Can't get list color palette`
    );
  }

  return palette;
}
