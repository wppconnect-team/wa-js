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
  id: string;
  ref?: string;
  refTTL?: number;
  refId?: any;
  wid?: Wid;
  connected?: boolean;
  protoVersion?: string;
  clientToken?: string;
  serverToken?: string;
  secret?: string;
  isResponse?: boolean;
  battery?: any;
  plugged?: any;
  lc?: any;
  lg?: any;
  locales?: any;
  is24h?: boolean;
  platform?: string;
  phone?: string;
  tos?: any;
  smbTos?: any;
  pushname?: string;
}

interface Session {
  blockStoreAdds?: any;
  isVoipInitialized?: boolean;
}

interface Derived {
  refExpiry?: number;
  locale?: any;
  localesList?: any;
  allLocales?: any;
  allLanguages?: any;
  platformField?: any;
  tosShowCallNotification?: any;
  isSMB?: boolean;
}

/** @whatsapp 13798 */
export declare interface ConnModel
  extends ModelProxy<Props, Session, Derived> {}

/** @whatsapp 13798 */
export declare class ConnModel extends Model {
  constructor(
    proterties?: ModelPropertiesContructor<ConnModel>,
    options?: ModelOptions
  );

  canSetMyPushname(): boolean;
  updateVoipAvailability(): void;
  handlePlatformChange(): void;
  formatLocale(e?: any, t?: any): any;
  shouldSaveToCache(): any;
}

exportModule(
  exports,
  {
    ConnModel: (m) => (m.ConnImpl ? m.Conn.constructor : m.default.constructor),
  },
  (m) => (m.Conn && m.ConnImpl) || (m.Conn && m.default)
);
