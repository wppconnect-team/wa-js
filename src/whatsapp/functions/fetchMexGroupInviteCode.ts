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

import { iAmAdmin } from '../../group';
import { injectFallbackModule } from '../../webpack';
import { Wid } from '..';
import { exportModule } from '../exportModule';
import { queryGroupInviteCode } from './queryGroupInviteCode';

/**
 * @whatsapp WAWebMexFetchGroupInviteCodeJob
 */
export declare function fetchMexGroupInviteCode(
  groupId: Wid
): Promise<{ inviteCode: string }>;

exportModule(
  exports,
  {
    fetchMexGroupInviteCode: 'fetchMexGroupInviteCode',
  },
  (m) => m.fetchMexGroupInviteCode
);

injectFallbackModule('fetchMexGroupInviteCode', {
  fetchMexGroupInviteCode: async (groupId: Wid) => {
    const isAdmin = await iAmAdmin(groupId);
    return await queryGroupInviteCode(groupId, isAdmin).then(
      (value) => value.code
    );
  },
});
