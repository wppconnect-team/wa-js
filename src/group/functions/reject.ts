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

import { assertWid } from '../../assert';
import { WPPError } from '../../util';
import { Wid } from '../../whatsapp';
import { membershipApprovalRequestAction } from '../../whatsapp/functions';

/**
 * Reject a membership request to group
 *
 * @example
 * ```javascript
 * await WPP.group.reject(12345645@g.us, 5554999999999@c.us);
 * ```
 *
 * @category Group
 */
export async function reject(
  groupId: string | Wid,
  membershipIds: (string | Wid) | (string | Wid)[]
): Promise<
  {
    error: any;
    wid: Wid;
  }[]
> {
  groupId = assertWid(groupId);
  if (!Array.isArray(membershipIds)) {
    membershipIds = [membershipIds];
  }
  const wids = membershipIds.map(assertWid);

  try {
    return await membershipApprovalRequestAction(groupId, wids, 'Reject');
  } catch (error) {
    throw new WPPError(
      'error_on_reject_membership_request',
      `Error on reject member on group ${groupId.toString()}`
    );
  }
}
