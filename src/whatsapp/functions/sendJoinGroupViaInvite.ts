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

import { getGroupInfoFromInviteCode, iAmMember } from '../../group';
import * as loader from '../../loader';
import { ChatStore, Wid } from '..';
import { exportModule } from '../exportModule';
import { joinGroupViaInvite } from './joinGroupViaInvite';

/**
 * Result shape returned by {@link sendJoinGroupViaInvite}.
 *
 * `membershipApprovalMode` mirrors the flag queried via
 * `getGroupInfoFromInviteCode` and signals whether the bot's join request is
 * pending admin approval (`true`) or the bot joined immediately (`false`).
 */
export interface SendJoinGroupViaInviteResult {
  gid: Wid;
  membershipApprovalMode: boolean;
}

/** @whatsapp 69586
 * @whatsapp 769586 >= 2.2222.8
 */
export declare function sendJoinGroupViaInvite(
  code: string
): Promise<SendJoinGroupViaInviteResult>;

exportModule(
  exports,
  {
    sendJoinGroupViaInvite: 'sendJoinGroupViaInvite',
  },
  (m) => m.sendJoinGroupViaInvite
);

/**
 * @whatsapp >= 2.2301.5
 *
 * Fallback used when the native `sendJoinGroupViaInvite` module is absent.
 * Queries group metadata first to obtain `membershipApprovalMode`, then
 * forwards that flag to the low-level `joinGroupViaInvite` IQ call so the
 * WAP response parser knows which node type (`<group>` vs
 * `<membership_approval_request>`) to expect.
 */
loader.injectFallbackModule('sendJoinGroupViaInvite', {
  sendJoinGroupViaInvite: async (
    code: string
  ): Promise<SendJoinGroupViaInviteResult> => {
    const group = await getGroupInfoFromInviteCode(code);
    const existChat = ChatStore.get(group.id.toString());
    if (existChat) {
      const isMember = await iAmMember(group.id.toString());
      if (isMember) return { gid: existChat.id, membershipApprovalMode: false };
    }
    const result = await joinGroupViaInvite(code, group.membershipApprovalMode);
    return {
      gid: result.gid,
      membershipApprovalMode: group.membershipApprovalMode,
    };
  },
});
