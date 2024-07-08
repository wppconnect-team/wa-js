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

import { Wid } from '..';
import { exportModule } from '../exportModule';

/**
 * @whatsapp 247355
 */

// @deprecated
export declare function createGroup(
  groupName: string,
  participants: Wid[],
  ephemeral?: number,
  parentGroup?: Wid
): Promise<{
  wid: Wid;
  participants: {
    wid: Wid;
    error: string;
    invite_code: string | null;
    invite_code_exp: string | null;
  }[];
}>;

export declare function createGroup(
  options: {
    title: string;
    ephemeralDuration: number;
    restrict: boolean;
    announce: boolean;
    membershipApprovalMode: boolean;
    memberAddMode: boolean;
    parentGroupId?: Wid;
  },
  participants: Wid[]
): Promise<{
  wid: Wid;
  participants: {
    wid: Wid;
    error: string;
    invite_code: string | null;
    invite_code_exp: string | null;
  }[];
}>;

exportModule(
  exports,
  {
    createGroup: 'createGroup',
  },
  (m) => m.createGroup && !m.sendForNeededAddRequest
);
