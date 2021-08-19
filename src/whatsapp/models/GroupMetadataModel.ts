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

import { Wid } from '../misc';
import {
  Model,
  ModelOptions,
  ModelPropertiesContructor,
  ModelProxy,
} from './Model';

/** @moduleID 22770
 * @whatsapp 2.2126.14
 */
interface Props {
  id: Wid;
  creation?: any;
  owner?: any;
  desc?: any;
  descId?: any;
  descTime?: any;
  descOwner?: any;
  restrict?: any;
  announce?: any;
  noFrequentlyForwarded?: any;
  ephemeralDuration?: any;
  size?: any;
  support?: any;
  uniqueShortNameMap?: any;
}

/** @moduleID 22770
 * @whatsapp 2.2126.14
 */
interface Session {
  stale?: any;
  trusted?: any;
  inviteCode?: any;
  groupInviteCodePromise?: any;
  revokeGroupInvitePromise?: any;
  revokeGroupV4AddInvitePromise?: any;
}

/** @moduleID 22770
 * @whatsapp 2.2126.14
 */
interface Derived {
  groupInviteLink?: any;
}

/** @moduleID 22770
 * @whatsapp 2.2126.14
 */
export declare interface GroupMetadataModel
  extends ModelProxy<Props, Session, Derived> {}

/**
 * @moduleID 22770
 * @whatsapp 2.2126.14
 */
export declare class GroupMetadataModel extends Model {
  idClass: typeof Wid;
  constructor(
    proterties?: ModelPropertiesContructor<GroupMetadataModel>,
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
