/*!
 * Copyright 2023 WPPConnect Team
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

/**
 * @whatsapp 650348
 */
export declare function sendCreateCommunity(e: {
  name: string;
  desc: string;
  closed: boolean;
}): Promise<any>;

/**
 * @whatsapp 650348
 */
export declare function sendDeactivateCommunity(e: {
  parentGroupId: Wid;
}): Promise<any>;

/**
 * @whatsapp 650348
 */
export declare function sendLinkSubgroups(e: {
  parentGroupId: Wid;
  subgroupIds: Wid | Wid[];
}): Promise<any>;

/**
 * @whatsapp 650348
 */
export declare function sendUnlinkSubgroups(e: {
  parentGroupId: Wid;
  subgroupIds: Wid | Wid[];
}): Promise<any>;

exportModule(
  exports,
  {
    sendCreateCommunity: 'sendCreateCommunity',
    sendDeactivateCommunity: 'sendDeactivateCommunity',
    sendLinkSubgroups: 'sendLinkSubgroups',
    sendUnlinkSubgroups: 'sendUnlinkSubgroups',
  },
  (m) => m.sendCreateCommunity
);
