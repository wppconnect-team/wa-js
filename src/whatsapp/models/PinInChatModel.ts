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

import { CartCollection } from '../collections';
import { PinInChatCollection } from '../collections/PinInChatCollection';
import { exportModule } from '../exportModule';
import { MsgKey, Wid } from '../misc';
import {
  Model,
  ModelOptions,
  ModelPropertiesContructor,
  ModelProxy,
} from './Model';

interface Props {
  msgKey: MsgKey;
  parentMsgKey: MsgKey;
  senderTimestampMs: number;
  t: number;
  sender: Wid;
  chatId: Wid;
  pinType: number; //todo
  pinExpiryDuration: number;
  id: MsgKey;
  read: boolean;
}

interface Session {}

interface Derived {}

/**
 * @whatsapp WAWebPinInChatModel >= 2.3000.1012170943
 */
export declare interface PinInChatModel
  extends ModelProxy<Props, Session, Derived> {}

/**
 * @whatsapp WAWebPinInChatModel >= 2.3000.1012170943
 */
export declare class PinInChatModel extends Model<CartCollection> {
  constructor(
    proterties?: ModelPropertiesContructor<PinInChatModel>,
    options?: ModelOptions
  );
  deleteByParentMessageKey(): void;
  getByMsgKey(): CartCollection;
  getByParentMsgKey(): PinInChatCollection;
}

exportModule(
  exports,
  {
    PinInChatModel: 'PinInChat',
  },
  (m) => m.PinInChat
);
