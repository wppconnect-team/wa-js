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

import { AuthCode } from '../types';

export interface ConnEventTypes {
  'conn.auth_code_change': AuthCode | null;
  /**
   * Triggered afted a success QR code scan
   *
   * @example
   * ```javascript
   * WPP.conn.on('authenticated', () => {
   *   // Your code
   * });
   * ```
   */
  'conn.authenticated': undefined;
  'conn.logout': undefined;
  /**
   * Triggered when the main interface is loaded, but is syncing
   *
   * @example
   * ```javascript
   * WPP.conn.on('main_loaded', () => {
   *   // Your code
   * });
   * ```
   */
  'conn.main_loaded': undefined;
  /**
   * Triggered when the main interface is loaded, authenticated and ready to send message
   *
   * @example
   * ```javascript
   * WPP.conn.on('main_ready', () => {
   *   // Your code
   * });
   * ```
   */
  'conn.main_ready': undefined;
  'conn.qrcode_idle': undefined;
  'conn.require_auth': undefined;
}
