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

export interface USyncQueryBizInfo {
  verifiedName?: {
    isApi: boolean;
    level: string;
    name: string;
    privacyMode: any;
    serial: string;
  };
}

export interface USyncQueryListItem {
  id?: Wid;
  business?: USyncQueryBizInfo;
  disappearing_mode?: {
    duration?: number;
    t?: number;
  };
  status?: string;
  lid?: string | { _serialized: string };
  contact?: {
    type?: 'in' | 'out';
  };
}

export interface USyncQueryResult {
  error?: {
    all?: unknown;
    contact?: unknown;
  };
  list?: USyncQueryListItem[];
}

/**
 * @whatsapp 459857
 */
export declare class USyncQuery {
  constructor();
  $1(): any;
  execute(): Promise<USyncQueryResult>;
  withBotProfileProtocol(): USyncQuery;
  withBusinessProtocol(): USyncQuery;
  withContactProtocol(): USyncQuery;
  withContext(a: any): USyncQuery;
  withDeviceProtocol(): USyncQuery;
  withDisappearingModeProtocol(): USyncQuery;
  withFeaturesProtocol(a: any): USyncQuery;
  withLidProtocol(): USyncQuery;
  withMode(a: any): USyncQuery;
  withPictureProtocol(): USyncQuery;
  withStatusProtocol(): USyncQuery;
  withTextStatusProtocol(): USyncQuery;
  withUser(a: any): USyncQuery;
  withUsernameProtocol(): USyncQuery;
}

exportModule(
  exports,
  {
    USyncQuery: 'USyncQuery',
  },
  (m) => m.USyncQuery
);
