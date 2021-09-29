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

interface RegistrationInfo {
  registrationId: number;
  identityKeyPair: {
    pubKey: ArrayBuffer;
    privKey: ArrayBuffer;
  };
}

/**
 * @whatsapp 2.2132.6:40362
 */
declare class SignalStore {
  getMeta(e?: any): any;
  putMeta(e?: any): any;
  setServerHasPreKeys(e?: any): any;
  getServerHasPreKeys(): any;
  putADVSignedIdentity(e?: any): any;
  getADVSignedIdentity(): any;
  getPreKeysByRange(e?: any, t?: any): any;
  getPreKeyById(e?: any): any;
  removePreKeyById(e?: any): any;
  bulkRmovePreKey(e?: any): any;
  putPreKeys(e?: any): any;
  markPreKeyAsDirectDistribution(e?: any): any;
  getSignedPreKey(): any;
  getSignedPreKeyById(e?: any): any;
  putSignedPreKeys(e?: any): any;
  putSession(e?: any, t?: any): any;
  bulkPutSession(e?: any): any;
  removeSession(e?: any): any;
  bulkRemoveSession(e?: any): any;
  getSession(e?: any): any;
  bulkGetSession(e?: any): any;
  putIdentity(e?: any, t?: any): any;
  bulkPutIdentity(e?: any): any;
  bulkGetIdentity(e?: any): any;
  getIdentity(e?: any): any;
  removeIdentity(e?: any): any;
  bulkRemoveIdentity(e?: any): any;
  getIdentityKeyWithRowId(e?: any): any;
  bulkGetIdentityKeyWithRowId(e?: any): any;
  bulkPutIdentityKeyWithRowId(e?: any): any;
  saveBaseKey(e?: any, t?: any, r?: any): any;
  loadBaseKey(e?: any, t?: any): any;
  deleteBaseKey(e?: any, t?: any): any;
  putSenderKey(e?: any, t?: any, r?: any): any;
  bulkPutSenderKey(e?: any): any;
  removeSenderKey(e?: any): any;
  getSenderKey(e?: any): any;
  removeSenderKeyBySenderId(e?: any): any;
  clearCredential(): any;
  getRegistrationInfo(): Promise<RegistrationInfo>;
  setRegistrationInfo(e: RegistrationInfo): Promise<any>;
  getOrGenPreKeys(e?: any, t?: any): any;
  getOrGenSinglePreKey(e?: any): any;
  savePreKeys(e?: any): any;
  markKeyAsUploaded(e?: any): any;
  rotateSignedPreKey(e?: any, t?: any): any;
}

/**
 * @whatsapp 2.2138.10:93381
 */
export declare const waSignalStore: SignalStore;

exportModule(
  exports,
  { waSignalStore: 'waSignalStore' },
  (m) => m.waSignalStore
);
