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

import { WPPError } from '../util';

export class InvalidColor extends WPPError {
  constructor(readonly color?: string | number | { _serialized: string }) {
    super('invalid_color', `Invalid Color value for ${color}`);
  }
}

export function assertColor(color?: string | number): number {
  let assertedColor: number;
  if (typeof color === 'number') {
    assertedColor = color;
  } else if (typeof color === 'string') {
    let hex = color.trim().replace('#', '');
    if (hex.length <= 6) {
      hex = 'FF' + hex.padStart(6, '0');
    }
    assertedColor = parseInt(hex, 16);
  } else {
    throw new InvalidColor(color);
  }
  return assertedColor;
}
