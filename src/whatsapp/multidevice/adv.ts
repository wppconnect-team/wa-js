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
 * @moduleID 22009
 * @whatsapp 2.2132.6
 */
export declare const adv: {
  generateADVSecretKey(): string;
  getADVSecretKey(): string;
  setADVSignedIdentity(e: any): string;
  getADVEncodedIdentity(): any;
  verifyDeviceIdentityAccountSignature(): any;
  generateDeviceSignature(e?: any, t?: any, r?: any): any;
  verifyDeviceSignature(): any;
  clearADVSecretKey(): void;
  validateADVwithIdentityKey(): any;
  validateADVwithEncs(e?: any, t?: any, r?: any, a?: boolean): any;
  verifyKeyIndexListAccountSignature(e?: any, t?: any): any;
};

exportModule(
  exports,
  'adv',
  (m) => m.getADVSecretKey && m.setADVSignedIdentity
);
