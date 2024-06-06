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

import { ParticipantCollection } from '..';
import { exportProxyModel } from '../exportModule';
import { Wid } from '../misc';
import {
  Model,
  ModelOptions,
  ModelPropertiesContructor,
  ModelProxy,
} from './Model';

interface Props {
  id: Wid;
  creation?: any;
  owner?: any;
  memberAddMode?: string;
  subject?: string;
  subjectTime?: any;
  desc?: string;
  descId?: string;
  descTime?: any;
  descOwner?: any;
  restrict?: any;
  announce?: any;
  noFrequentlyForwarded?: any;
  ephemeralDuration?: any;
  membershipApprovalMode?: any;
  growthLockExpiration?: any;
  growthLockType?: any;
  reportToAdminMode?: any;
  size?: any;
  numSubgroups?: any;
  support?: any;
  suspended?: any;
  terminated?: any;
  uniqueShortNameMap?: any;
  isLidAddressingMode: boolean;
  isParentGroup: boolean;
  isParentGroupClosed: boolean;
  parentGroup?: any;
  defaultSubgroup?: any;
  unjoinedSubgroups?: any;
  joinedSubgroups?: any;
  allowNonAdminSubGroupCreation?: any;
  lastActivityTimestamp?: any;
  lastSeenActivityTimestamp?: any;
  lastReportToAdminTimestamp?: any;
  incognito?: any;
}

interface Session {
  stale?: any;
  deviceStale?: any;
  trusted?: any;
  inviteCode?: any;
  groupInviteCodePromise?: any;
  revokeGroupInvitePromise?: any;
  participantQueryPromise?: any;
  deviceQueryPromise?: any;
  unjoinedSubgroupsQueryPromise?: any;
  displayedDesc?: any;
  revokeGroupsV4AddInvitePromise?: any;
  cachedDeviceCount?: any;
  cachedDeviceSizeBucket?: any;
}

interface Derived {
  groupInviteLink?: any;
  groupType?: string;
  isIncognitoCag?: boolean;
  isUnnamed?: boolean;
}

/** @whatsapp 14423
 * @whatsapp 614423 >= 2.2222.8
 */
export declare interface GroupMetadataModel
  extends ModelProxy<Props, Session, Derived> {}

/** @whatsapp 14423
 * @whatsapp 614423 >= 2.2222.8
 */
export declare class GroupMetadataModel extends Model {
  idClass: typeof Wid;
  participants: ParticipantCollection;
  pastParticipants: ParticipantCollection;
  constructor(
    properties?: ModelPropertiesContructor<GroupMetadataModel>,
    options?: ModelOptions
  );
  hasUniqueShortNameMention(e?: any): boolean;
  canSetSubject(): boolean;
  canSetDescription(): boolean;
  canSetGroupProperty(): boolean;
  canSetEphemeralSetting(): boolean;
  onParticipantShortNameUpdated(): any;
  triggerParticipantsChange(): any;
  isTrusted(): boolean;
  revokeGroupV4AddInvite(e?: any): any;
  queryGroupV4PendingInvite(): any;
  getCollection(): any;
}

exportProxyModel(exports, 'GroupMetadataModel');
