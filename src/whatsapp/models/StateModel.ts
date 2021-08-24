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
import {
  Model,
  ModelOptions,
  ModelPropertiesContructor,
  ModelProxy,
} from './Model';

/** @moduleID 13353
 * @whatsapp 2.2132.6
 */
interface Props {}

/** @moduleID 13353
 * @whatsapp 2.2132.6
 */
interface Session {
  socketPreload?: any;
  socket?: any;
  launchGeneration: number;
  backoffGeneration: number;
  hasSynced?: any;
  state: string;
  stream: string;
  canSend?: any;
  sendQueue?: any;
  sendHash?: any;
  cancelHash?: any;
  doubleAckHash?: any;
  sequence: number;
  shortTagBase?: any;
  socketWatcher?: any;
  refWatcher?: any;
  phoneWatchdog?: any;
  pendingPhoneReqs: number;
  isIncognito?: any;
  runPromise?: any;
  streamPromise?: any;
  conflictPromise?: any;
  resumePromise?: any;
  logoutMutex: number;
  retryTimestamp?: any;
  pokeable?: any;
  launched?: any;
  mustExitLoop?: any;
  syncTag?: any;
  lastPhoneMessage?: any;
  shouldForceReconnect: boolean;
  shouldUpgradeToMDIntern: boolean;
  shouldUpgradeToMDPord: boolean;
}

/** @moduleID 13353
 * @whatsapp 2.2132.6
 */
interface Derived {}

/** @moduleID 13353
 * @whatsapp 2.2132.6
 */
export declare interface StateModel
  extends ModelProxy<Props, Session, Derived> {}

/**
 * @moduleID 13353
 * @whatsapp 2.2132.6
 */
export declare class StateModel extends Model {
  constructor(
    proterties?: ModelPropertiesContructor<StateModel>,
    options?: ModelOptions
  );

  initialize(): any;
  preload(): any;
  send(e?: any): any;
  send2(e?: any): any;
  shortTag(): any;
  tag(e?: any): any;
  launch(e?: any, t?: number): any;
  poke(): any;
  takeover(): any;
  exitLoop(e?: any): any;
  clearCredentialsAndStoredData(): any;
  destroyStorage(): any;
  logout(e?: any): any;
  summary(): any;
  registerHandler(e?: any): any;
  onStateChange(): any;
  onStreamChange(): any;
  onRefCycle(): any;
  onActivity(e?: any): any;
  onPhoneWatchdogActivated(): any;
  onPhoneWatchdogFed(): any;
  onPhoneWatchdogDeactivated(): any;
  flushQueue(): any;
  phoneTimedOut(): any;
  clearSendHash(e?: any): any;
  sendBasic(e?: any): any;
  sendEphemeral(e?: any): any;
  sendEphemeral2(e?: any): any;
  sendEphemeralIgnore(e?: any): any;
  on5xx(e?: any): any;
  onMessage(e?: any): any;
  run(e?: any, t?: any): any;
  openSocket(): any;
  initConn(): any;
  manageRef(): any;
  requestSync(e?: any): any;
  waitForSyncInfo(): any;
  lookForAndHandleChallenge(): any;
  throwOnClose(): any;
  onCriticalSyncDone(): any;
  openStream(): any;
  queryReceivedActions(): any;
  runResume(e?: any): any;
  setPokeable(e?: any, t?: number): any;
  clearCredentials(): any;
  clearState(): any;
  maybeResendRequestEventually(e?: any): any;
  sendCurrentLogout(e?: any): any;
  sendRemainingLogouts(): any;
  updateImmediately(e?: any): any;
  deprecatedVersion(): any;
  canRequestBeSent(e?: any): any;
}

exportModule(
  exports,
  { StateModel: (m) => m.default.constructor },
  (m) => m.default.initConn
);
