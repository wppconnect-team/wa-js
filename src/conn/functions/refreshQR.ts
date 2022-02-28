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

import { Cmd, Socket } from '../../whatsapp';
import { AuthCode } from '..';
import { eventEmitter } from '../eventEmitter';
import { isAuthenticated, isMultiDevice } from '.';

/**
 * Refresh the current QRCode when is waiting for scan and return the current code
 *
 * For legacy: It will wait for next code
 * For multidevice: It will generate a new one
 *
 * @example
 * ```javascript
 * await WPP.conn.refreshQR();
 * ```
 */
export async function refreshQR(): Promise<AuthCode | null> {
  if (isAuthenticated()) {
    return null;
  }

  if (isMultiDevice()) {
    Cmd.refreshQR();
  } else {
    Socket.poke();
  }
  return await eventEmitter.once('auth_code_change');
}
