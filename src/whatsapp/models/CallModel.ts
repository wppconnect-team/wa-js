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

import { CallCollection } from '../collections';
import { exportProxyModel } from '../exportModule';
import {
  Model,
  ModelOptions,
  ModelPropertiesContructor,
  ModelProxy,
} from './Model';

/**
 * @whatsapp 2.2126.14:96390
 */
interface Props {
  id?: any;
  peerJid?: any;
  offerTime?: any;
  isVideo: boolean;
  isGroup: boolean;
  groupCallParticipants?: any;
  canHandleLocally: boolean;
  outgoing?: any;
  webClientShouldHandle?: any;
  callInfo?: any;
}

/**
 * @whatsapp 2.2126.14:96390
 */
interface Session {
  stale?: any;
}

/**
 * @whatsapp 2.2126.14:96390
 */
interface Derived {}

/**
 * @whatsapp 2.2126.14:96390
 */
export declare interface CallModel
  extends ModelProxy<Props, Session, Derived> {}

/**
 * @whatsapp 2.2126.14:96390
 */
export declare class CallModel extends Model<CallCollection> {
  constructor(
    proterties?: ModelPropertiesContructor<CallModel>,
    options?: ModelOptions
  );
  getState(): any;
  setState(e?: any): any;
  handleNotification(): any;
  getCollection(): CallCollection;
}

exportProxyModel(exports, 'CallModel');
