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

/**
 * Define some global configurations
 *
 * @example
 * ```javascript
 * // Global variable before injection
 * WPPConfig = {
 *   deviceName: 'WPPConnect',
 *   liveLocationLimit: 10,
 *   disableGoogleAnalytics: false,
 *   googleAnalyticsId: 'G-XXXXXXXXXX'
 * };
 * ```
 */
export interface Config {
  /**
   * Set the device name connected, false to disable
   * @default 'WPPConnect'
   */
  deviceName: string | false;

  /**
   * Number of last chats to check live location after a page reload
   */
  liveLocationLimit: number;

  /**
   * Disable Google Analytics tracking
   */
  disableGoogleAnalytics: boolean;

  /**
   * Google Analytics Id
   */
  googleAnalyticsId: string | null;

  /**
   * Google Analytics Id
   */
  googleAnalyticsUserProperty: {
    [key: string]: string | number | boolean;
  };

  /**
   * Link Preview API servers
   */
  linkPreviewApiServers: string[] | null;

  /**
   * Project name for google analytics
   */
  poweredBy: string | null;
}

export const defaultConfig: Config = {
  deviceName: false,
  liveLocationLimit: 10,
  disableGoogleAnalytics: false,
  googleAnalyticsId: null,
  googleAnalyticsUserProperty: {},
  linkPreviewApiServers: null,
  poweredBy: 'WA-JS',
};

export const config: Config = defaultConfig;

// Init config from global environment;
const w = window as unknown as { WPPConfig: Config };

w.WPPConfig = w.WPPConfig || defaultConfig;

for (const key of Object.keys(w.WPPConfig)) {
  (config as any)[key] = (w.WPPConfig as any)[key];
}
