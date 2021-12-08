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

import { BlocklistCollection } from '../collections';
import { exportProxyModel } from '../exportModule';
import { Wid } from '../misc';
import {
  Model,
  ModelOptions,
  ModelPropertiesContructor,
  ModelProxy,
} from './Model';

interface Props {
  id: Wid;
}

interface Session {
  stale?: any;
}

interface Derived {}

/** @whatsapp 2.2147.14:43123 */
export declare interface BlocklistModel
  extends ModelProxy<Props, Session, Derived> {}

/** @whatsapp 2.2147.14:43123 */
export declare class BlocklistModel extends Model<BlocklistCollection> {
  idClass: typeof Wid;
  constructor(
    proterties?: ModelPropertiesContructor<BlocklistModel>,
    options?: ModelOptions
  );
  contact(): any;
  getCollection(): BlocklistCollection;
}

exportProxyModel(exports, 'BlocklistModel');
