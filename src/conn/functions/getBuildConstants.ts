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

import { compare } from 'compare-versions';

import * as webpack from '../../webpack';

export interface BuildConstants {
  VERSION_STR: string;
  VERSION_BASE: string;
  VERSION_PRIMARY: string;
  VERSION_SECONDARY: string;
  VERSION_TERTIARY: string;
  WINDOWS_BUILD: string | null;
  PARSED: {
    PRIMARY: number;
    SECONDARY: number;
    TERTIARY: number;
  };
  [key: string]: any;
}

/**
 * Get the WhatsApp Web build constants
 * Retrieves the internal WAWebBuildConstants module from WhatsApp source
 *
 * @example
 * ```javascript
 * const buildConstants = WPP.conn.getBuildConstants();
 * console.log('Version:', buildConstants.VERSION_STR);
 * console.log('Base Version:', buildConstants.VERSION_BASE);
 * console.log('Windows Build:', buildConstants.WINDOWS_BUILD);
 * ```
 *
 * @returns {BuildConstants|null} Object containing version constants or null if not available
 * - VERSION_STR: Full version string (e.g., "2.3000.1234567")
 * - VERSION_BASE: Base version (e.g., "2.3000.1234567")
 * - VERSION_PRIMARY: Primary version number
 * - VERSION_SECONDARY: Secondary version number
 * - VERSION_TERTIARY: Tertiary version number
 * - WINDOWS_BUILD: Windows build number (if applicable)
 * - And other build-related constants
 */
export function getBuildConstants(): BuildConstants | null {
  const buildConstants = webpack.search((m) => m.VERSION_STR);

  if (!buildConstants) {
    return null;
  }

  return {
    ...buildConstants,
    PARSED: {
      PRIMARY: parseInt(buildConstants.VERSION_PRIMARY, 10),
      SECONDARY: parseInt(buildConstants.VERSION_SECONDARY, 10),
      TERTIARY: parseInt(buildConstants.VERSION_TERTIARY, 10),
    },
  };
}

/**
 * Check if the current WhatsApp version is greater than or equal to a specified version
 *
 * @example
 * ```javascript
 * // Check if version is >= 2.3000.1030110621
 * if (WPP.conn.isWhatsAppVersionGTE('2.3000.1030110621')) {
 *   console.log('Using new API');
 * }
 * ```
 *
 * @param version - Version string to compare against (e.g., "2.3000.1029")
 * @returns {boolean} True if current version is >= specified version
 */
export function isWhatsAppVersionGTE(version: string): boolean {
  const buildConstants = getBuildConstants();
  const currentVersion = buildConstants?.VERSION_STR || '0.0.0';

  return compare(currentVersion, version, '>=');
}
