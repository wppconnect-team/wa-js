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
import { Wid } from './Wid';

/**
 * @whatsapp 459857
 */
export declare class USyncQuery {
  constructor();
  $1(): any;
  execute(): any;
  withBotProfileProtocol(): any;
  withBusinessProtocol(): any;
  withContactProtocol(): any;
  withContext(a: any): any;
  withDeviceProtocol(): Wid;
  withDisappearingModeProtocol(): any;
  withFeaturesProtocol(a: any): any;
  withLidProtocol(): Wid;
  withMode(a: any): any;
  withPictureProtocol(): any;
  withStatusProtocol(): any;
  withTextStatusProtocol(): any;
  withUser(a: any): any;
  withUsernameProtocol(): any;
}

exportModule(
  exports,
  {
    USyncQuery: 'USyncQuery',
  },
  (m) => m.USyncQuery
);
