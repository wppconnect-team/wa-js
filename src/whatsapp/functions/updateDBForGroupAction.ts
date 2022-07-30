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

export interface GroupActionChange {
  actionType: string;
  isInvite?: boolean;
  isLinkedGroupJoin?: boolean;
  participants: Wid[];
  prevVersion: number;
  version: number;
}

/**
 * @whatsapp 970041
 */
export declare function updateDBForGroupAction(
  meta: {
    actions: GroupActionChange[];
    author: Wid;
    chatId: Wid;
    externalId: string;
    offline: null;
    pushname: string;
    ts: number;
  },
  action: GroupActionChange
): any;

exportModule(
  exports,
  {
    updateDBForGroupAction: 'updateDBForGroupAction',
  },
  (m) => m.updateDBForGroupAction
);
