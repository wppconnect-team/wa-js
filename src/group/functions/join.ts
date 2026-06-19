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

import { Wid } from '../../whatsapp';
import { sendJoinGroupViaInvite } from '../../whatsapp/functions';

/**
 * Thrown by `joinGroupViaInvite` (WAWebBackendErrors) when the server returns
 * a different node type than the one the parser was configured to expect.
 * This happens when `membershipApprovalMode` changed between the group-info
 * query and the actual join IQ (race condition).
 *
 * Properties mirrored from the WhatsApp error class constructor:
 *   `constructor(gid: Wid, membershipApprovalMode: boolean, message?: string)`
 */
interface UnexpectedJoinGroupViaInviteResponseError extends Error {
  readonly name: 'UnexpectedJoinGroupViaInviteResponse';
  readonly gid: Wid;
  readonly membershipApprovalMode: boolean;
}

function isUnexpectedJoinGroupViaInviteResponseError(
  error: Error
): error is UnexpectedJoinGroupViaInviteResponseError {
  return (
    error.name === 'UnexpectedJoinGroupViaInviteResponse' &&
    'gid' in error &&
    'membershipApprovalMode' in error
  );
}

/**
 * Result returned by {@link join}.
 *
 * `pendingApproval` is `true` when the group has `membershipApprovalMode`
 * enabled and the join request was submitted successfully but still requires
 * an admin to approve it before the bot becomes a member.
 */
export interface JoinGroupResult {
  id: string;
  pendingApproval: boolean;
}

/**
 * Join in a group from an invite code.
 *
 * When the group requires admin approval (`membershipApprovalMode: true`),
 * the method returns `{ id, pendingApproval: true }` instead of throwing
 * `UnexpectedJoinGroupViaInviteResponse` (issues #2221 / #2746).
 *
 * @example
 * ```javascript
 * const result = await WPP.group.join('abcde....');
 * if (result.pendingApproval) {
 *   console.log('Request sent — waiting for admin approval');
 * }
 * ```
 *
 * @category Group
 */
export async function join(inviteCode: string): Promise<JoinGroupResult> {
  inviteCode = inviteCode.replace('chat.whatsapp.com/', '');
  inviteCode = inviteCode.replace('invite/', '');
  inviteCode = inviteCode.replace('https://', '');
  inviteCode = inviteCode.replace('http://', '');

  try {
    const result = await sendJoinGroupViaInvite(inviteCode);
    return {
      id: result.gid.toString(),
      pendingApproval: result.membershipApprovalMode,
    };
  } catch (error) {
    // Race condition: membershipApprovalMode changed between the group-info
    // query inside sendJoinGroupViaInvite and the actual join IQ response.
    // The WhatsApp web client handles this silently.
    if (
      error instanceof Error &&
      isUnexpectedJoinGroupViaInviteResponseError(error)
    ) {
      return {
        id: error.gid.toString(),
        pendingApproval: error.membershipApprovalMode,
      };
    }
    throw error;
  }
}
