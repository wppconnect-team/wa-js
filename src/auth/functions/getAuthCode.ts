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

import { Base64, Browser, Conn, Features, UserPrefs } from '../../whatsapp';
import { getOrGenerate } from '../../whatsapp/functions';
import { adv, waNoiseInfo, waSignalStore } from '../../whatsapp/multidevice';
import { AuthCode } from '..';

/**
 * Return the current auth code
 *
 * @return  {Promise<AuthCode>}[return description]
 */
export async function getAuthCode(): Promise<AuthCode | null> {
  if (!Conn.ref || Conn.connected || UserPrefs.knowsPhone()) {
    return null;
  }

  const ref = Conn.ref;

  if (Features.supportsFeature('MD_BACKEND')) {
    const registrationInfo = await waSignalStore.getRegistrationInfo();
    const noiseInfo = await waNoiseInfo.get();

    const staticKeyPair = Base64.encodeB64(noiseInfo.staticKeyPair.pubKey);
    const identityKeyPair = Base64.encodeB64(
      registrationInfo.identityKeyPair.pubKey
    );
    const secretKey = adv.getADVSecretKey();

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

  const keyPair = getOrGenerate();
  const browserId = Browser.id();

  const fullCode = [ref, keyPair, browserId].join(',');

  return {
    type: 'single',
    ref,
    keyPair,
    browserId,
    fullCode,
  };
}
