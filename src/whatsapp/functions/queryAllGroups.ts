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

/**
 * @whatsapp 113269
 */

export interface Group {
  announce: boolean;
  creation: number;
  defaultSubgroup: boolean;
  id: Wid;
  incognito: boolean;
  isParentGroup: boolean;
  isParentGroupClosed: boolean;
  membershipApprovalModed: boolean;
  membershipApprovalRequest: any;
  noFrequentlyForwarded: boolean;
  numSubgroups: number;
  owner: Wid;
  participants: Wid[];
  pvId: number;
  restrict: boolean;
  size: any;
  subject: string;
  subjectTime: number;
  support: boolean;
  suspended: boolean;
}
export declare function queryAllGroups(): Promise<Group[]>;

exportModule(
  exports,
  {
    queryAllGroups: 'queryAllGroups',
  },
  (m) => m.queryAllGroups
);
