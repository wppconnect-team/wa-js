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

import { ContactCollection } from '../collections';
import { exportProxyModel } from '../exportModule';
import { Wid } from '../misc';
import {
  Model,
  ModelOptions,
  ModelPropertiesContructor,
  ModelProxy,
} from './Model';

/**
 * @whatsapp 2.2126.14:49549
 */
interface Props {
  id: Wid;
  shortName?: any;
  pushname?: any;
  type?: any;
  verifiedName?: any;
  isBusiness: boolean;
  isEnterprise: boolean;
  verifiedLevel?: any;
  privacyMode?: any;
  statusMute?: any;
  sectionHeader?: any;
  labels?: any;
  disappearingModeDuration?: any;
  disappearingModeSettingTimestamp?: any;
}

/**
 * @whatsapp 2.2126.14:49549
 */
interface Session {
  stale?: any;
  isContactBlocked: boolean;
  verificationString?: any;
  verificationBinary?: any;
  pendingAction?: any;
  promises?: any;
  status?: any;
  profilePicThumb?: any;
  businessProfile?: any;
  commonGroups?: any;
  liveLocations?: any;
  businessCatalog?: any;
  locale?: any;
}

/**
 * @whatsapp 2.2126.14:49549
 */
interface Derived {
  notifyName?: any;
  mentionName?: any;
  displayName?: any;
  userid?: any;
  userhash?: any;
  searchName?: any;
  searchVerifiedName?: any;
  header?: any;
  isMe: boolean;
  isUser: boolean;
  isGroup: boolean;
  isBroadcast: boolean;
  isPSA: boolean;
  formattedShortNameWithNonBreakingSpaces?: any;
  formattedShortName?: any;
  formattedName?: any;
  formattedUser?: any;
  isWAContact: boolean;
  isMyContact: boolean;
  showBusinessCheckmarkAsPrimary?: any;
  showBusinessCheckmarkAsSecondary?: any;
}

/**
 * @whatsapp 2.2126.14:49549
 */
export declare interface ContactModel
  extends ModelProxy<Props, Session, Derived> {}

/**
 * @whatsapp 2.2126.14:49549
 */
export declare class ContactModel extends Model<ContactCollection> {
  idClass: typeof Wid;
  constructor(
    proterties?: ModelPropertiesContructor<ContactModel>,
    options?: ModelOptions
  );
  updateShortName(): any;
  getStatus(): any;
  getProfilePicThumb(): any;
  addPendingAction(e?: any): any;
  decPending(): any;
  isBlocked(): boolean;
  searchMatch(e?: any, t?: any, r?: any): any;
  getFormattedUser(): any;
  getCollection(): ContactCollection;
  setNotMyContact(): any;
}

exportProxyModel(exports, 'ContactModel');
