/*!
 * Copyright 2022 WPPConnect Team
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

import { internalEv } from '../../eventEmitter';
import * as webpack from '../../webpack';
import { CallModel, CallStore, WidFactory } from '../../whatsapp';
import { CALL_STATES } from '../../whatsapp/enums';

webpack.onInjected(() => register());

function register() {
  CallStore.on('add', (call: CallModel) => {
    if (call.isGroup) {
      internalEv.emit('call.incoming_call', {
        id: call.id,
        isGroup: call.isGroup,
        isVideo: call.isVideo,
        offerTime: call.offerTime,
        sender: WidFactory.toChatWid(call.peerJid),
        peerJid: call.peerJid,
      });
    }
  });

  CallStore.on('change', (call: CallModel) => {
    if (call.getState() === CALL_STATES.INCOMING_RING) {
      internalEv.emit('call.incoming_call', {
        id: call.id,
        isGroup: call.isGroup,
        isVideo: call.isVideo,
        offerTime: call.offerTime,
        sender: WidFactory.toChatWid(call.peerJid),
        peerJid: call.peerJid,
      });
    }
  });
}
