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
import { getColorPalette } from './getColorPalette';

/**
 * A list color, either as an index in the WhatsApp palette or as one of its
 * hex codes. See {@link getColorPalette}.
 */
export type ListColor = string | number;

/**
 * Resolve a hex color or a palette index into a valid `colorIndex`.
 *
 * The palette is fixed by WhatsApp, so an arbitrary hex code is rejected
 * instead of being silently approximated to the nearest entry.
 *
 * @internal
 */
export function resolveColorIndex(color: ListColor): number {
  const palette = getColorPalette();

  if (typeof color === 'string') {
    const index = palette.findIndex(
      (value) => value.toLowerCase() === color.trim().toLowerCase()
    );

    if (index === -1) {
      throw new WPPError(
        'list_invalid_color',
        `Color ${color} is not in the list color palette`,
        { color, palette }
      );
    }

    return index;
  }

  if (!Number.isInteger(color) || color < 0 || color >= palette.length) {
    throw new WPPError(
      'list_invalid_color',
      `colorIndex must be an integer between 0 and ${palette.length - 1}`,
      { color, palette }
    );
  }

  return color;
}
