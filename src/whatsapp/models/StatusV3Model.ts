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

import { StatusV3Collection } from '../collections';
import { exportProxyModel } from '../exportModule';
import { Wid } from '../misc';
import {
  Model,
  ModelOptions,
  ModelPropertiesContructor,
  ModelProxy,
} from './Model';
import { PropsChatBase, SessionChatBase } from './ModelChatBase';

interface Props extends PropsChatBase {
  t?: any;
  unreadCount?: any;
  totalCount?: any;
  pic?: any;
}

interface Session extends SessionChatBase {
  stale?: any;
  readKeys?: any;
  contact?: any;
  expireTimer?: any;
  expireTs?: any;
}

interface Derived {
  hasUnread: boolean;
  readCount?: any;
  lastStatus?: any;
}

/** @whatsapp 2.2144.10:96944 */
export declare interface StatusV3Model
  extends ModelProxy<Props, Session, Derived> {}

/** @whatsapp 2.2144.10:96944 */
export declare class StatusV3Model extends Model<StatusV3Collection> {
  idClass: typeof Wid;
  constructor(
    proterties?: ModelPropertiesContructor<StatusV3Model>,
    options?: ModelOptions
  );
  setupStatusExpiration(): any;
  expireMsg(): any;
  onEmptyMRM(): any;
  loadMore(e?: number): any;
  handleReadStatus(e?: any): any;
  sendReadStatus(e?: any, t?: any): any;
  getCollection(): StatusV3Collection;
  removeMsg(e?: any): any;
  getAllCMCs(): any;
  getAllMsgs(): any;
  replaceMsgsCollection(e?: any): any;
  removeMsgsCollection(e?: any): any;
  notifyMsgCollectionMerge(e?: any, t?: any, r?: any, a?: any): any;
}

exportProxyModel(exports, 'StatusV3Model');
