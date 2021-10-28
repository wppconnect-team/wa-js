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
import { Wid } from '../misc';
import {
  Model,
  ModelOptions,
  ModelPropertiesContructor,
  ModelProxy,
} from './Model';

interface Props {
  id: Wid;
  type?: any;
  t?: any;
  deny?: any;
}

interface Session {
  updateTime?: any;
  expireTimerId?: any;
}

interface Derived {}

/** @whatsapp undefined:42165 */
export declare interface ChatstateModel
  extends ModelProxy<Props, Session, Derived> {}

/** @whatsapp undefined:42165 */
export declare class ChatstateModel extends Model {
  idClass: typeof Wid;
  allowedIds?: any;
  constructor(
    proterties?: ModelPropertiesContructor<ChatstateModel>,
    options?: ModelOptions
  );
  getCollection(): any;
}

exportModule(
  exports,
  {
    ChatstateModel: 'Chatstate',
  },
  (m) => m.Chatstate && m.ChatstateCollection
);
