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

interface Props {
  id: Wid;
  name?: any;
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
  labels?: string[];
  disappearingModeDuration?: any;
  disappearingModeSettingTimestamp?: any;
}

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

interface Derived {
  /**
   * Deprecated in favor of getNotifyName
   * @deprecated
   */
  notifyName?: any;
  /**
   * Deprecated in favor of getMentionName
   * @deprecated
   */
  mentionName?: any;
  /**
   * Deprecated in favor of getDisplayName
   * @deprecated
   */
  displayName?: any;
  /**
   * Deprecated in favor of getPnForLid
   * @deprecated
   */
  pnForLid?: any;
  /**
   * Deprecated in favor of getPremiumMessageName
   * @deprecated
   */
  premiumMessageName?: any;
  /**
   * Deprecated in favor of getDisplayNameOrPnForLid
   * @deprecated
   */
  displayNameOrPnForLid?: any;
  /**
   * Deprecated in favor of getFormattedPhone
   * @deprecated
   */
  formattedPhone?: any;
  /**
   * Deprecated in favor of getUserid
   * @deprecated
   */
  userid?: any;
  /**
   * Deprecated in favor of getUserhash
   * @deprecated
   */
  userhash?: any;
  /**
   * Deprecated in favor of getSearchName
   * @deprecated
   */
  searchName?: any;
  /**
   * Deprecated in favor of getSearchVerifiedName
   * @deprecated
   */
  searchVerifiedName?: any;
  /**
   * Deprecated in favor of getHeader
   * @deprecated
   */
  header?: any;
  /**
   * Deprecated in favor of getIsMe
   * @deprecated
   */
  isMe: boolean;
  /**
   * Deprecated in favor of getIsUser
   * @deprecated
   */
  isUser: boolean;
  /**
   * Deprecated in favor of getIsGroup
   * @deprecated
   */
  isGroup: boolean;
  /**
   * Deprecated in favor of getIsBroadcast
   * @deprecated
   */
  isBroadcast: boolean;
  /**
   * Deprecated in favor of getIsPSA
   * @deprecated
   */
  isPSA: boolean;
  /**
   * Deprecated in favor of getIsIAS
   * @deprecated
   */
  isIAS: boolean;
  /**
   * Deprecated in favor of getIsSupportAccount
   * @deprecated
   */
  isSupportAccount: boolean;
  /**
   * Deprecated in favor of getFormattedShortNameWithNonBreakingSpaces
   * @deprecated
   */
  formattedShortNameWithNonBreakingSpaces?: any;
  /**
   * Deprecated in favor of getFormattedShortName
   * @deprecated
   */
  formattedShortName?: any;
  /**
   * Deprecated in favor of getFormattedName
   * @deprecated
   */
  formattedName?: any;
  /**
   * Deprecated in favor of getFormattedUser
   * @deprecated
   */
  formattedUser?: any;
  /**
   * Deprecated in favor of getIsWAContact
   * @deprecated
   */
  isWAContact: boolean;
  /**
   * Deprecated in favor of getIsMyContact
   * @deprecated
   */
  isMyContact: boolean;
  /**
   * Deprecated in favor of getCanRequestPhoneNumber
   * @deprecated
   */
  canRequestPhoneNumber: boolean;
  /**
   * Deprecated in favor of getShowBusinessCheckmarkAsPrimary
   * @deprecated
   */
  showBusinessCheckmarkAsPrimary?: any;
  /**
   * Deprecated in favor of getShowBusinessCheckmarkAsSecondary
   * @deprecated
   */
  showBusinessCheckmarkAsSecondary?: any;
  /**
   * Deprecated in favor of getShowBusinessCheckmarkInChatlist
   * @deprecated
   */
  showBusinessCheckmarkInChatlist?: any;
  /**
   * Deprecated in favor of getIsDisplayNameApproved
   * @deprecated
   */
  isDisplayNameApproved?: any;
  /**
   * Deprecated in favor of getShouldForceBusinessUpdate
   * @deprecated
   */
  shouldForceBusinessUpdate?: any;
}

/** @whatsapp 121
 * @whatsapp 400121 >= 2.2222.8
 */
export declare interface ContactModel
  extends ModelProxy<Props, Session, Derived> {}

/** @whatsapp 121
 * @whatsapp 400121 >= 2.2222.8
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
