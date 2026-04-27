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
import Debug from 'debug';

import { internalEv } from '../../eventEmitter';
import * as loader from '../../loader';
import { createWid } from '../../util/createWid';
import { CallModel, CallStore } from '../../whatsapp';

const debug = Debug('WA-JS:call:registerIncomingCallEvent');

loader.onInjected(() => register());

function register() {
  debug('Registering incoming call event listeners');

  const registeredCalls = new Set<string>();

  const originalProcessIncomingCall =
    CallStore.processIncomingCall.bind(CallStore);
  (CallStore as any).processIncomingCall = function (...args: any[]) {
    const call: CallModel = originalProcessIncomingCall(...args);
    if (!call || registeredCalls.has(call.id)) return call;

    registeredCalls.add(call.id);

    debug('New call via processIncomingCall', call);

    internalEv.emit('call.incoming_call', {
      id: call.id,
      isGroup: call.isGroup,
      isVideo: call.isVideo,
      offerTime: call.offerTime,
      sender: createWid(call.peerJid),
      peerJid: call.peerJid,
    });

    return call;
  };
}
