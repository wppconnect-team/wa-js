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

export {
  addParticipants,
  GroupAddParticipantsInput,
  GroupAddParticipantsOutput,
} from './addParticipants';
export { approve, GroupApproveInput, GroupApproveOutput } from './approve';
export { canAdd, GroupCanAddInput, GroupCanAddOutput } from './canAdd';
export {
  canDemote,
  GroupCanDemoteInput,
  GroupCanDemoteOutput,
} from './canDemote';
export {
  canPromote,
  GroupCanPromoteInput,
  GroupCanPromoteOutput,
} from './canPromote';
export {
  canRemove,
  GroupCanRemoveInput,
  GroupCanRemoveOutput,
} from './canRemove';
export { create, GroupCreateInput, GroupCreateOutput } from './create';
export {
  demoteParticipants,
  GroupDemoteParticipantsInput,
  GroupDemoteParticipantsOutput,
} from './demoteParticipants';
export {
  ensureGroup,
  GroupEnsureGroupInput,
  GroupEnsureGroupOutput,
} from './ensureGroup';
export {
  ensureGroupAndParticipants,
  GroupEnsureGroupAndParticipantsInput,
  GroupEnsureGroupAndParticipantsOutput,
} from './ensureGroupAndParticipants';
export { getAllGroups, GroupGetAllGroupsOutput } from './getAllGroups';
export {
  getGroupInfoFromInviteCode,
  GroupGetGroupInfoFromInviteCodeInput,
  GroupGetGroupInfoFromInviteCodeOutput,
} from './getGroupInfoFromInviteCode';
export {
  getGroupSizeLimit,
  GroupGetGroupSizeLimitOutput,
} from './getGroupSizeLimit';
export {
  getInviteCode,
  GroupGetInviteCodeInput,
  GroupGetInviteCodeOutput,
} from './getInviteCode';
export {
  getMembershipRequests,
  GroupGetMembershipRequestsInput,
  GroupGetMembershipRequestsOutput,
} from './getMembershipRequests';
export {
  getParticipants,
  GroupGetParticipantsInput,
  GroupGetParticipantsOutput,
} from './getParticipants';
export {
  getPastParticipants,
  GroupGetPastParticipantsInput,
  GroupGetPastParticipantsOutput,
} from './getPastParticipants';
export { GroupIAmAdminInput, GroupIAmAdminOutput, iAmAdmin } from './iAmAdmin';
export {
  GroupIAmMemberInput,
  GroupIAmMemberOutput,
  iAmMember,
} from './iAmMember';
export {
  GroupIAmRestrictedMemberInput,
  GroupIAmRestrictedMemberOutput,
  iAmRestrictedMember,
} from './iAmRestrictedMember';
export {
  GroupIAmSuperAdminInput,
  GroupIAmSuperAdminOutput,
  iAmSuperAdmin,
} from './iAmSuperAdmin';
export { GroupJoinInput, GroupJoinOutput, join } from './join';
export { GroupLeaveInput, GroupLeaveOutput, leave } from './leave';
export {
  GroupPromoteParticipantsInput,
  GroupPromoteParticipantsOutput,
  promoteParticipants,
} from './promoteParticipants';
export { GroupRejectInput, GroupRejectOutput, reject } from './reject';
export {
  GroupRemoveIconInput,
  GroupRemoveIconOutput,
  removeIcon,
} from './removeIcon';
export {
  GroupRemoveParticipantsInput,
  GroupRemoveParticipantsOutput,
  removeParticipants,
} from './removeParticipants';
export {
  GroupRevokeInviteCodeInput,
  GroupRevokeInviteCodeOutput,
  revokeInviteCode,
} from './revokeInviteCode';
export {
  GroupSetDescriptionInput,
  GroupSetDescriptionOutput,
  setDescription,
} from './setDescription';
export { GroupSetIconInput, GroupSetIconOutput, setIcon } from './setIcon';
export {
  GroupProperty,
  GroupSetPropertyInput,
  GroupSetPropertyOutput,
  setProperty,
} from './setProperty';
export {
  GroupSetSubjectInput,
  GroupSetSubjectOutput,
  setSubject,
} from './setSubject';
