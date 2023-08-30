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
import * as webpack from '../../webpack';
import { MsgModel, MsgStore } from '../../whatsapp';

webpack.onInjected(() => registerUpdateOrderEvent());

function registerUpdateOrderEvent() {
  MsgStore.on('add', (msg: MsgModel) => {
    if (
      msg.type !== 'interactive' ||
      msg.interactivePayload?.buttons[0].name !== 'payment_method' ||
      !msg.isNewMsg
    ) {
      return;
    }
    const payload = JSON.parse(
      msg.interactivePayload?.buttons[0].buttonParamsJson
    );

    queueMicrotask(() => {
      internalEv.emit('order.payment_status', {
        method: payload.payment_method,
        timestamp: payload.payment_timestamp,
        reference_id: payload.reference_id,
        msgId: msg.id,
      });
    });
  });
}
