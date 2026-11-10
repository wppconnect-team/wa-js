/*!
 * Copyright 2026 WPPConnect Team
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
 * The native VoIP stack. Every method acts on the single current call.
 *
 * Methods returning a number return a native status, where `0` means OK.
 *
 * @whatsapp WAWebVoipStackInterfaceWeb
 */
export interface VoipStackInterface {
  type: 'web' | string;
  parsers: {
    parseCallInfo(json: string): any;
    [key: string]: any;
  };
  acceptCall(
    audioEnabled: boolean,
    videoEnabled: boolean,
    lobbyEntryPoint?: number | null
  ): Promise<void>;
  rejectCall(): Promise<void>;
  endCall(reason: number, isUserInitiated: boolean): Promise<void>;
  setCallMute(muted: boolean): Promise<number>;
  setCallVideoMute(muted: boolean): Promise<number>;
  requestVideoUpgrade(): Promise<number>;
  sendReaction(emoji: string): Promise<void>;
  raiseHand(raised: boolean): Promise<void>;
  getCallInfo(): Promise<string>;
  previewAndJoinCallLink(
    token: string,
    isVideo: boolean,
    lobbyEntryPoint?: number,
    username?: string
  ): Promise<number>;
  handleIncomingSignalingOffer(voipNode: any, ...args: any[]): Promise<any>;
  handleIncomingSignalingMessage(args: {
    xmlNode: any;
    peerJid?: string;
    [key: string]: any;
  }): Promise<any>;
  [key: string]: any;
}

/**
 * Resolves to `null` when VoIP download is disabled
 *
 * @whatsapp WAWebVoipStackInterface
 */
export declare function getVoipStackInterface(): Promise<VoipStackInterface | null>;

/**
 * @whatsapp WAWebVoipStackInterface
 */
export declare function getCachedVoipStackInterface(): VoipStackInterface | null;

exportModule(
  exports,
  {
    getVoipStackInterface: 'getVoipStackInterface',
    getCachedVoipStackInterface: 'getCachedVoipStackInterface',
  },
  (m) => m.getVoipStackInterface
);
