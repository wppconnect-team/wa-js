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

import { StreamInfo, StreamMode } from '../enums';
import { exportModule } from '../exportModule';
import {
  Model,
  ModelOptions,
  ModelPropertiesContructor,
  ModelProxy,
} from './Model';

interface Props {}

interface Session {
  info?: StreamInfo;
  mode: StreamMode;
  obscurity?: any;
  needsUpdate?: any;
  isHardRefresh?: boolean;
  lastSyncStart?: any;
  needsManualDownload?: any;
  couldForce?: any;
  uiActive?: any;
  isInConnectedCall?: boolean;
  available?: any;
  unavailableShiftTimer?: any;
  unavailableAutoLockTimer?: any;
  unavailableLogoutTimer?: any;
  unobscureShiftTimer?: any;
  resumeCount?: any;
  phoneAuthed?: any;
}

interface Derived {
  displayInfo?: any;
}

/** @whatsapp 8080
 * @whatsapp 608080 >= 2.2222.8
 */
export declare interface StreamModel extends ModelProxy<
  Props,
  Session,
  Derived
> {}

/** @whatsapp 8080
 * @whatsapp 608080 >= 2.2222.8
 */
export declare class StreamModel extends Model {
  constructor(
    proterties?: ModelPropertiesContructor<StreamModel>,
    options?: ModelOptions
  );
  initialize(): void;
  delete(): void;
  markAvailable(): void;
  markUnavailable(e?: any): void;
  unobscure(): void;
  sendAvailability(e?: any): void;
  updateCouldForce(): void;
  logPageResume(): void;
  updateWamLog(): void;
  logModeChange(): void;
}

exportModule(
  exports,
  {
    StreamModel: 'Stream.constructor',
  },
  (m) => m.Stream
);
