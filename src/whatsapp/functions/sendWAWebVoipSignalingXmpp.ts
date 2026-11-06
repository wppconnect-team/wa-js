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
 * Send a signaling stanza produced by the VoIP engine.
 *
 * `xmlPayload` is the encoded inner child of the `<call>` stanza
 * (offer, accept, terminate, mute_v2, ...)
 *
 * @whatsapp WAWebVoipSendSignalingXmpp
 */
export declare function sendWAWebVoipSignalingXmpp(args: {
  peerJid: string;
  callId: string;
  xmlPayload: Uint8Array;
}): Promise<any>;

exportModule(
  exports,
  {
    sendWAWebVoipSignalingXmpp: 'sendWAWebVoipSignalingXmpp',
  },
  (m) => m.sendWAWebVoipSignalingXmpp
);
