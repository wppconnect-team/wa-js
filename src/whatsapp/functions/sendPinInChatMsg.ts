/*!
 * Copyright 2024 WPPConnect Team
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

import { ACK, PIN_STATE, PinExpiryDurationOption } from '../enums';
import { exportModule } from '../exportModule';
import { MsgModel } from '../models';
import { SendMsgResultObject } from '../types';

/** @whatsapp WAWebSendPinMessageAction >= 2.3000.1029839609
 */
export declare function sendPinInChatMsg(
  msg: MsgModel,
  type: PIN_STATE,
  pinExpiryOption?: PinExpiryDurationOption,
  ack?: ACK
): Promise<SendMsgResultObject | null>;

exportModule(
  exports,
  {
    sendPinInChatMsg: 'sendPinInChatMsg',
  },
  (m) => m.sendPinInChatMsg
);
