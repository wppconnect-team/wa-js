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

import { Base64, Conn } from '../../whatsapp';
import { adv, waNoiseInfo, waSignalStore } from '../../whatsapp/multidevice';
import { AuthCode } from '..';
import { isAuthenticated, isMultiDevice, isRegistered } from '.';

/**
 * Return the current auth code
 *
 * @example
 * ```javascript
 * const authCode = await WPP.conn.getAuthCode();
 * console.log(authCode.fullCode); // Output: a long string to generate a QRCode
 * ```
 *
 * @return  {Promise<AuthCode>}[return description]
 */
export async function getAuthCode(): Promise<AuthCode | null> {
  if (!Conn.ref || Conn.connected || isAuthenticated() || isRegistered()) {
    return null;
  }

  const ref = Conn.ref;

  if (isMultiDevice()) {
    const registrationInfo = await waSignalStore.getRegistrationInfo();
    const noiseInfo = await waNoiseInfo.get();

    const staticKeyPair = Base64.encodeB64(noiseInfo.staticKeyPair.pubKey);
    const identityKeyPair = Base64.encodeB64(
      registrationInfo.identityKeyPair.pubKey
    );
    const secretKey = await Promise.resolve(adv.getADVSecretKey());

    const fullCode = [ref, staticKeyPair, identityKeyPair, secretKey].join(',');

    return {
      type: 'multidevice',
      ref,
      staticKeyPair,
      identityKeyPair,
      secretKey,
      fullCode,
    };
  }

  return null;
}
