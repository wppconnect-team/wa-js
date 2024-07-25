/*!
 * Copyright 2024 WPPConnect Team
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

export enum PrivacyDisallowedListType {
  About = 'status',
  GroupAdd = 'groupadd',
  LastSeen = 'last',
  ProfilePicture = 'profile',
}

declare class DisallowedListTable {
  get(type: PrivacyDisallowedListType): Promise<{
    dhash: number;
    disallowedList: string[];
    id: PrivacyDisallowedListType;
  } | null>;
}

/**
 * @whatsapp WAWebSchemaPrivacyDisallowedList >= 2.3000.0
 */
export declare function getPrivacyDisallowedListTable(): DisallowedListTable;

exportModule(
  exports,
  {
    getPrivacyDisallowedListTable: 'getPrivacyDisallowedListTable',
  },
  (m) => m.getPrivacyDisallowedListTable
);
