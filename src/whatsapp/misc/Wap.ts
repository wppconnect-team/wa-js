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
import { Wid } from '.';

/** @whatsapp 69610 */
export declare class WapClass {
  queryExist(contactId: string): Promise<{
    status: 200;
    jid: Wid;
    biz?: true;
  }>;
  queryDisappearingMode(contactId: Wid): Promise<{
    status: 200;
    duration: number;
    settingTimestamp: number;
  }>;
}

/** @whatsapp 69162 */
export declare const Wap: WapClass;

exportModule(
  exports,
  {
    Wap: (m) => m.instance || m.Cmd,
  },
  (m) => !m.default && m.instance.queryExist
);
