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
import { ChatModel, MsgModel } from '../models';

/** @whatsapp 74109 */
export declare function markUnread(
  chat: ChatModel,
  whenAvailable: boolean
): Promise<ChatModel>;

/** @whatsapp 74109 */
export declare function sendSeen(
  chat: ChatModel,
  whenAvailable: boolean
): Promise<ChatModel>;

/** @whatsapp 64850 */
export declare function markPlayed(msg: MsgModel): Promise<void>;

/**
 * @whatsapp 2.2146.9:64850
 */
export declare function canMarkPlayed(msg: MsgModel): boolean;

exportModule(
  exports,
  {
    markUnread: 'markUnread',
    sendSeen: 'sendSeen',
  },
  (m) => m.markUnread && m.sendSeen
);

exportModule(
  exports,
  {
    markPlayed: 'markPlayed',
  },
  (m) => m.markPlayed
);
