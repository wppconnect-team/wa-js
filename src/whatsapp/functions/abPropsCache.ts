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

import { exportModule } from '../exportModule';

/**
 * Raw A/B test property configuration from WhatsApp
 */
export interface RawABPropConfig {
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
 * @whatsapp WAWebABPropsCache
 */

export declare function getAllABPropConfigs(): RawABPropConfig[];
export declare function getAllABPropsMap(): Map<string, RawABPropConfig>;
export declare function getABPropConfigNameFromCode(
  configCode: number | string
): string | undefined;

exportModule(
  exports,
  {
    getAllABPropConfigs: 'getAllABPropConfigs',
    getAllABPropsMap: 'getAllABPropsMap',
    getABPropConfigNameFromCode: 'getABPropConfigNameFromCode',
  },
  (m) => m.getAllABPropConfigs && m.getABPropConfigNameFromCode
);
