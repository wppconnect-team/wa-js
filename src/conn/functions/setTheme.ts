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

import { setTheme as setThemePref } from '../../whatsapp/misc/UserPrefsGeneral';
import { Theme } from './getTheme';

const connSetThemeSchema = z.object({
  theme: z.enum(Theme),
});

export type ConnSetThemeInput = z.infer<typeof connSetThemeSchema>;

export type ConnSetThemeOutput = void;

/**
 * Set theme and reload the page to apply changes
 *
 * @example
 * ```javascript
 * // Using Enum
 * import { Theme } from '@wppconnect/wa-js';
 * await WPP.conn.setTheme({ theme: Theme.LIGHT });
 * await WPP.conn.setTheme({ theme: Theme.DARK });
 * await WPP.conn.setTheme({ theme: Theme.SYSTEM });
 *
 * // Using string ("light", "dark", "system")
 * await WPP.conn.setTheme({ theme: 'light' });
 * await WPP.conn.setTheme({ theme: 'dark' });
 * await WPP.conn.setTheme({ theme: 'system' });
 * ```
 *
 * @category Config
 */
export async function setTheme(
  params: ConnSetThemeInput
): Promise<ConnSetThemeOutput> {
  const { theme } = connSetThemeSchema.parse(params);

  setThemePref(theme);

  setTimeout(() => {
    window.location.reload();
  }, 500);
}
