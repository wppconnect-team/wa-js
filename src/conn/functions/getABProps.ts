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

import * as webpack from '../../webpack';

/**
 * A/B test property configuration
 */
export interface ABPropConfig {
  /** The human-readable config name (e.g., "web_pwa_background_sync") */
  name: string | null;
  /** The internal config code (numeric key) */
  configCode: string;
  /** The actual value of the config (string, number, boolean) */
  configValue: any;
  /** Exposure key for analytics tracking */
  configExpoKey?: string;
  /** Whether this config has been accessed during this session */
  hasAccessed?: boolean;
  /** Override value if set via URL parameter */
  overriddenConfigValue?: any;
}

/**
 * Get all A/B test property configurations for the current session
 * These are experimental flags that WhatsApp uses for feature testing
 *
 * @example
 * ```javascript
 * // Get all A/B props as an array
 * const abProps = WPP.conn.getABProps();
 * console.log('Total A/B props:', abProps.length);
 *
 * // Log each prop with its name
 * abProps.forEach(prop => {
 *   console.log(`${prop.name}: ${prop.configValue}`);
 * });
 * ```
 *
 * @returns {ABPropConfig[]} Array of A/B property configurations with names
 */
export function getABProps(): ABPropConfig[] {
  const abPropsCache = webpack.search((m) => m.getAllABPropConfigs);

  if (!abPropsCache || !abPropsCache.getAllABPropConfigs) {
    return [];
  }

  const configs = abPropsCache.getAllABPropConfigs();

  return configs.map((config: ABPropConfig) => ({
    ...config,
    name: getABPropName(String(config.configCode)),
  }));
}

/**
 * Get all A/B test property configurations as a Map
 * The map is keyed by the config code for easier lookup
 *
 * @example
 * ```javascript
 * // Get all A/B props as a Map
 * const abPropsMap = WPP.conn.getABPropsMap();
 *
 * // Check a specific config by code
 * const specificProp = abPropsMap.get('12345');
 * if (specificProp) {
 *   console.log('Name:', specificProp.name);
 *   console.log('Value:', specificProp.configValue);
 * }
 *
 * // Convert to object for easy viewing
 * const result = {};
 * abPropsMap.forEach((value, key) => {
 *   result[value.name || key] = value.configValue;
 * });
 * console.table(result);
 * ```
 *
 * @returns {Map<string, ABPropConfig>} Map of config code to A/B property configuration with names
 */
export function getABPropsMap(): Map<string, ABPropConfig> {
  const abPropsCache = webpack.search((m) => m.getAllABPropsMap);

  if (!abPropsCache || !abPropsCache.getAllABPropsMap) {
    return new Map();
  }

  const originalMap = abPropsCache.getAllABPropsMap();
  const result = new Map<string, ABPropConfig>();

  originalMap.forEach((config: ABPropConfig, key: string) => {
    result.set(key, {
      ...config,
      name: getABPropName(String(config.configCode)),
    });
  });

  return result;
}

/**
 * Get the human-readable name of an A/B config from its code
 *
 * @example
 * ```javascript
 * // Get name from config code
 * const name = WPP.conn.getABPropName('12345');
 * console.log('Config name:', name);
 * ```
 *
 * @param configCode - The numeric config code
 * @returns {string|null} The human-readable config name or null if not found
 */
export function getABPropName(configCode: string): string | null {
  const abPropsCache = webpack.search((m) => m.getABPropConfigNameFromCode);

  if (!abPropsCache || !abPropsCache.getABPropConfigNameFromCode) {
    return null;
  }

  return abPropsCache.getABPropConfigNameFromCode(configCode);
}
