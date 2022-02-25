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

import { MsgInfoCollection } from '../collections';
import { exportProxyModel } from '../exportModule';
import { MsgKey } from '../misc';
import {
  Model,
  ModelOptions,
  ModelPropertiesContructor,
  ModelProxy,
} from './Model';

interface Props {
  id: MsgKey;
  usePlayReceipt?: any;
  playedRemaining?: any;
  readRemaining?: any;
  deliveryRemaining?: any;
  deliveryPrivacyMode?: any;
}

interface Session {
  stale?: any;
}

interface Derived {
  settled?: any;
}

/** @whatsapp 54311 */
export declare interface MsgInfoModel
  extends ModelProxy<Props, Session, Derived> {}

/** @whatsapp 54311 */
export declare class MsgInfoModel extends Model<MsgInfoCollection> {
  idClass: typeof MsgKey;
  constructor(
    proterties?: ModelPropertiesContructor<MsgInfoModel>,
    options?: ModelOptions
  );
  getCollection(): MsgInfoCollection;
}

exportProxyModel(exports, 'MsgInfoModel');
