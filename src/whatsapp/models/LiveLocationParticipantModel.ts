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

import * as webpack from '../../webpack';
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
  msg?: any;
  lat?: any;
  lng?: any;
  accuracy?: any;
  speed?: any;
  degrees?: any;
  sequence?: any;
  comment?: any;
  expiration?: any;
  lastUpdated?: any;
}

interface Session {
  stale?: any;
  contact?: any;
  expireTimerId?: any;
  disabled?: any;
}

interface Derived {
  isMe: boolean;
  valid?: any;
}

/** @whatsapp 57465
 * @whatsapp 257465 >= 2.2222.8
 */
export declare interface LiveLocationParticipantModel
  extends ModelProxy<Props, Session, Derived> {}

/** @whatsapp 57465
 * @whatsapp 257465 >= 2.2222.8
 */
export declare class LiveLocationParticipantModel extends Model {
  idClass: typeof Wid;
  constructor(
    proterties?: ModelPropertiesContructor<LiveLocationParticipantModel>,
    options?: ModelOptions
  );
  remainingTime(): any;
  elapsedTime(): any;
  disable(): any;
}

exportProxyModel(exports, 'LiveLocationParticipantModel');

const fallback = {};
let cache: any = null;

// Lazy load
Object.defineProperty(fallback, 'LiveLocationParticipantModel', {
  configurable: true,
  enumerable: true,
  get() {
    if (!cache) {
      class LiveLocationParticipantModel extends Model {}
      LiveLocationParticipantModel.prototype.proxyName =
        'live-location-participant';
      cache = LiveLocationParticipantModel;
    }
    return cache;
  },
});

webpack.injectFallbackModule('LiveLocationParticipantModel', fallback);
