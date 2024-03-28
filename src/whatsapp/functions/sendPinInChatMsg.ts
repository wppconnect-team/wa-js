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

import { SendMsgResult } from '../enums';
import { PIN_STATE } from '../enums/PIN_STATE';
import { exportModule } from '../exportModule';
import { MsgModel } from '../models';

/** @whatsapp WAWebSendPinMessageAction >= 2.3000.1012170943
 */
export declare function sendPinInChatMsg(
  msg: MsgModel,
  type: PIN_STATE,
  time?: number,
  d?: any
): Promise<{
  count: number;
  messageSendResult: SendMsgResult;
  t: number;
}>;

exportModule(
  exports,
  {
    sendPinInChatMsg: 'sendPinInChatMsg',
  },
  (m) => m.sendPinInChatMsg
);
