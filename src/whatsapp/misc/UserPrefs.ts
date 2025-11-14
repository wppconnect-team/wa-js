/*!
 * Copyright 2025 WPPConnect Team
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
import { Wid } from './Wid';

/**
 * @whatsapp >= 2.3000
 */
export declare namespace UserPrefs {
  function clearGetMaybeLidUserCache(...args: any[]): any;
  function clearGetMaybeMePnUserCache(...args: any[]): any;
  function getMaybeMeDeviceLid(...args: any[]): any;
  function getMaybeMeDevicePn(...args: any[]): any;
  function getMaybeMeDisplayName(...args: any[]): any;
  function getMaybeMeLidUser(...args: any[]): any;
  function getMaybeMePnUser(): Wid;
  function getMaybeMeUser(): Wid;
  function getMeDeviceLidOrThrow(...args: any[]): any;
  function getMeDevicePnOrThrow(...args: any[]): any;
  function getMeDisplayNameOrThrow(...args: any[]): any;
  function getMeLidUserOrThrow(...args: any[]): any;
  // getMePNandLIDWids function returns _serialized with device ID,
  // to don't need to normalize use getMaybeMeLidUser and getMaybeMePnUser
  function getMePNandLIDWids(
    ...args: any[]
  ): [Wid | undefined, Wid | undefined];
  function getMePnUserOrThrow(...args: any[]): any;
  function getUnknownId(...args: any[]): any;
  function isMeAccount(...args: any[]): any;
  function isMeAccountNonLid(...args: any[]): any;
  function isMeDevice(...args: any[]): any;
  function isMePrimary(...args: any[]): any;
  function isMePrimaryNonLid(...args: any[]): any;
  function isMeUser(...args: any[]): any;
  function isSerializedWidMe(...args: any[]): any;
  function setMe(...args: any[]): any;
  function setMeDisplayName(...args: any[]): any;
  function setMeLid(...args: any[]): any;
  function setUnknownId(...args: any[]): any;

  /**
   * @deprecated
   */
  function assertGetMe(): Wid;
  /**
   * @deprecated
   */
  function assertGetMeUser(): Wid;
  /**
   * @deprecated
   */
  function clearGetMaybeMeUserCache(...args: any[]): any;
  /**
   * @deprecated
   */
  function getMeDevicePn(...args: any[]): any;
  /**
   * @deprecated
   */
  function getMeUser(): Wid;
  /**
   * @deprecated
   */
  function getMaybeMeLid(...args: any[]): any;

  /**
   * @deprecated
   * @whatsapp 498050 >= 2.3000.1026
   **/
  function getMe(...args: any[]): any;
}

exportModule(exports, 'UserPrefs', (m: any) => {
  const hasNew = typeof m?.getMaybeMePnUser === 'function';
  const hasOld = typeof m?.getMaybeMeUser === 'function';
  if (!hasNew && !hasOld) return false; // não exporta se nenhuma existir

  try {
    // se houver prop com tipo errado, apaga antes de setar
    if (
      m &&
      typeof m.getMaybeMeUser !== 'function' &&
      //eslint-disable-next-line no-prototype-builtins
      m.hasOwnProperty?.('getMaybeMeUser')
    ) {
      try {
        delete m.getMaybeMeUser;
      } catch {}
    }
    if (
      m &&
      typeof m.getMaybeMePnUser !== 'function' &&
      //eslint-disable-next-line no-prototype-builtins
      m.hasOwnProperty?.('getMaybeMePnUser')
    ) {
      try {
        delete m.getMaybeMePnUser;
      } catch {}
    }

    if (hasNew && !hasOld) {
      Object.defineProperty(m, 'getMaybeMeUser', {
        value: m.getMaybeMePnUser.bind(m),
        configurable: true,
        writable: true,
      });
    } else if (hasOld && !hasNew) {
      Object.defineProperty(m, 'getMaybeMePnUser', {
        value: m.getMaybeMeUser.bind(m),
        configurable: true,
        writable: true,
      });
    }
  } catch {
    // silencioso: alguns módulos podem ser proxies/selados
  }

  // Alguns loaders usam o valor de retorno só como "truthy".
  // Retorne 'true' ou o próprio 'm' — ambos funcionam.
  return true;
});
