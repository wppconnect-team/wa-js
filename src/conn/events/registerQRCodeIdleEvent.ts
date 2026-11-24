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

import { internalEv } from '../../eventEmitter';
import * as loader from '../../loader';
import { BackendEvent, BackendEventBus } from '../../whatsapp';
import { isIdle } from '..';

loader.onInjected(registerQRCodeIdleEvent);

function registerQRCodeIdleEvent() {
  let wasIdle = false;
  const trigger = () => {
    const idle = isIdle();
    // Emit once when the QR codes run out, not on every socket state update
    if (idle && !wasIdle) {
      internalEv.emit('conn.qrcode_idle');
    }
    wasIdle = idle;
  };
  trigger();
  BackendEventBus.on(BackendEvent.SET_SOCKET_STATE, trigger);
}
