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

import { getTheme as getThemePref } from '../../whatsapp/misc/UserPrefsGeneral';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

/**
 * Get current theme setting
 *
 * @example
 * ```javascript
 * // Get current theme
 * const theme = WPP.conn.getTheme();
 * console.log(theme); // "light", "dark", or "system"
 *
 * // Using enum
 * import { Theme } from '@wppconnect/wa-js';
 * if (theme === Theme.DARK) {
 *   console.log('Dark mode is enabled');
 * }
 * ```
 *
 * @category Config
 */
export function getTheme(): Theme {
  const themeValue = getThemePref();

  // Convert string to enum
  if (themeValue === 'light') return Theme.LIGHT;
  if (themeValue === 'dark') return Theme.DARK;

  // Default to light if unknown value
  return Theme.LIGHT;
}
