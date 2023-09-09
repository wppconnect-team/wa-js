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

import { injectFallbackModule } from '../../webpack';
import { exportModule } from '../exportModule';
import { ContactModel } from '../models';

/**
 * @whatsapp 660666 >= 2.2327.4
 */
export declare function getMentionName(contact: ContactModel): string;

/**
 * @whatsapp 660666 >= 2.2327.4
 */
export declare function getNotifyName(contact: ContactModel): string;

/**
 * @whatsapp 660666 >= 2.2327.4
 */
export declare function getPremiumMessageName(contact: ContactModel): string;

/**
 * @whatsapp 660666 >= 2.2327.4
 */
export declare function getUserid(contact: ContactModel): any;

/**
 * @whatsapp 660666 >= 2.2327.4
 */
export declare function getUserhash(contact: ContactModel): any;

/**
 * @whatsapp 660666 >= 2.2327.4
 */
export declare function getSearchVerifiedName(contact: ContactModel): any;

/**
 * @whatsapp 660666 >= 2.2327.4
 */
export declare function getHeader(contact: ContactModel): any;

/**
 * @whatsapp 660666 >= 2.2327.4
 */
export declare function getIsMe(contact: ContactModel): any;

/**
 * @whatsapp 660666 >= 2.2327.4
 */
export declare function getIsUser(contact: ContactModel): any;

/**
 * @whatsapp 660666 >= 2.2327.4
 */
export declare function getIsGroup(contact: ContactModel): any;

/**
 * @whatsapp 660666 >= 2.2327.4
 */
export declare function getIsBroadcast(contact: ContactModel): any;

/**
 * @whatsapp 660666 >= 2.2327.4
 */
export declare function getIsPSA(contact: ContactModel): any;

/**
 * @whatsapp 660666 >= 2.2327.4
 */
export declare function getIsIAS(contact: ContactModel): any;

/**
 * @whatsapp 660666 >= 2.2327.4
 */
export declare function getIsSupportAccount(contact: ContactModel): any;

/**
 * @whatsapp 660666 >= 2.2327.4
 */
export declare function getIsWAContact(contact: ContactModel): any;

/**
 * @whatsapp 660666 >= 2.2327.4
 */
export declare function getIsMyContact(contact: ContactModel): boolean;

/**
 * @whatsapp 660666 >= 2.2327.4
 */
export declare function getCanRequestPhoneNumber(
  contact: ContactModel
): boolean;

/**
 * @whatsapp 660666 >= 2.2327.4
 */
export declare function getShowBusinessCheckmarkAsPrimary(
  contact: ContactModel
): any;

/**
 * @whatsapp 660666 >= 2.2327.4
 */
export declare function getShowBusinessCheckmarkAsSecondary(
  contact: ContactModel
): any;

/**
 * @whatsapp 660666 >= 2.2327.4
 */
export declare function getShowBusinessCheckmarkInChatlist(
  contact: ContactModel
): any;

/**
 * @whatsapp 660666 >= 2.2327.4
 */
export declare function getIsDisplayNameApproved(contact: ContactModel): any;

/**
 * @whatsapp 660666 >= 2.2327.4
 */
export declare function getShouldForceBusinessUpdate(
  contact: ContactModel
): any;

exportModule(
  exports,
  {
    getNotifyName: 'getNotifyName',
    getMentionName: 'getMentionName',
    getPremiumMessageName: 'getPremiumMessageName',
    getUserid: 'getUserid',
    getUserhash: 'getUserhash',
    getSearchVerifiedName: 'getSearchVerifiedName',
    getHeader: 'getHeader',
    getIsMe: 'getIsMe',
    getIsUser: 'getIsUser',
    getIsGroup: 'getIsGroup',
    getIsBroadcast: 'getIsBroadcast',
    getIsPSA: 'getIsPSA',
    getIsIAS: 'getIsIAS',
    getIsSupportAccount: 'getIsSupportAccount',
    getIsWAContact: 'getIsWAContact',
    getIsMyContact: 'getIsMyContact',
    getCanRequestPhoneNumber: 'getCanRequestPhoneNumber',
    getShowBusinessCheckmarkAsPrimary: 'getShowBusinessCheckmarkAsPrimary',
    getShowBusinessCheckmarkAsSecondary: 'getShowBusinessCheckmarkAsSecondary',
    getShowBusinessCheckmarkInChatlist: 'getShowBusinessCheckmarkInChatlist',
    getIsDisplayNameApproved: 'getIsDisplayNameApproved',
    getShouldForceBusinessUpdate: 'getShouldForceBusinessUpdate',
  },
  (m) => m.getIsMyContact
);

injectFallbackModule('getIsMyContact', {
  getNotifyName: (contact: ContactModel) => contact.notifyName,
  getMentionName: (contact: ContactModel) => contact.mentionName,
  getPremiumMessageName: (contact: ContactModel) => contact.premiumMessageName,
  getUserid: (contact: ContactModel) => contact.userid,
  getUserhash: (contact: ContactModel) => contact.userhash,
  getSearchVerifiedName: (contact: ContactModel) => contact.searchVerifiedName,
  getHeader: (contact: ContactModel) => contact.header,
  getIsMe: (contact: ContactModel) => contact.isMe,
  getIsUser: (contact: ContactModel) => contact.isUser,
  getIsGroup: (contact: ContactModel) => contact.isGroup,
  getIsBroadcast: (contact: ContactModel) => contact.isBroadcast,
  getIsPSA: (contact: ContactModel) => contact.isPSA,
  getIsIAS: (contact: ContactModel) => contact.isIAS,
  getIsSupportAccount: (contact: ContactModel) => contact.isSupportAccount,
  getIsWAContact: (contact: ContactModel) => contact.isWAContact,
  getIsMyContact: (contact: ContactModel) => contact.isMyContact,
  getCanRequestPhoneNumber: (contact: ContactModel) =>
    contact.canRequestPhoneNumber,
  getShowBusinessCheckmarkAsPrimary: (contact: ContactModel) =>
    contact.showBusinessCheckmarkAsPrimary,
  getShowBusinessCheckmarkAsSecondary: (contact: ContactModel) =>
    contact.showBusinessCheckmarkAsSecondary,
  getShowBusinessCheckmarkInChatlist: (contact: ContactModel) =>
    contact.showBusinessCheckmarkInChatlist,
  getIsDisplayNameApproved: (contact: ContactModel) =>
    contact.isDisplayNameApproved,
  getShouldForceBusinessUpdate: (contact: ContactModel) =>
    contact.shouldForceBusinessUpdate,
});

/**
 * @whatsapp 714574 >= 2.2327.4
 */
export declare function getDisplayName(contact: ContactModel): string;

/**
 * @whatsapp 714574 >= 2.2327.4
 */
export declare function getPnForLid(contact: ContactModel): any;

/**
 * @whatsapp 714574 >= 2.2327.4
 */
export declare function getDisplayNameOrPnForLid(contact: ContactModel): any;

/**
 * @whatsapp 714574 >= 2.2327.4
 */
export declare function getFormattedPhone(contact: ContactModel): any;

/**
 * @whatsapp 714574 >= 2.2327.4
 */
export declare function getSearchName(contact: ContactModel): any;

/**
 * @whatsapp 714574 >= 2.2327.4
 */
export declare function getFormattedShortNameWithNonBreakingSpaces(
  contact: ContactModel
): any;

/**
 * @whatsapp 714574 >= 2.2327.4
 */
export declare function getFormattedShortName(contact: ContactModel): any;

/**
 * @whatsapp 714574 >= 2.2327.4
 */
export declare function getFormattedName(contact: ContactModel): any;

/**
 * @whatsapp 714574 >= 2.2327.4
 */
export declare function getFormattedUser(contact: ContactModel): any;

exportModule(
  exports,
  {
    getDisplayName: 'getDisplayName',
    getPnForLid: 'getPnForLid',
    getDisplayNameOrPnForLid: [
      'getUserDisplayNameForLid',
      'getDisplayNameOrPnForLid',
    ],
    getFormattedPhone: 'getFormattedPhone',
    getSearchName: 'getSearchName',
    getFormattedShortNameWithNonBreakingSpaces:
      'getFormattedShortNameWithNonBreakingSpaces',
    getFormattedShortName: 'getFormattedShortName',
    getFormattedName: 'getFormattedName',
    getFormattedUser: 'getFormattedUser',
  },
  (m) => m.getDisplayName
);
injectFallbackModule('getDisplayName', {
  getDisplayName: (contact: ContactModel) => contact.displayName,
  getPnForLid: (contact: ContactModel) => contact.pnForLid,
  getDisplayNameOrPnForLid: (contact: ContactModel) =>
    contact.displayNameOrPnForLid,
  getFormattedPhone: (contact: ContactModel) => contact.formattedPhone,
  getSearchName: (contact: ContactModel) => contact.searchName,
  getFormattedShortNameWithNonBreakingSpaces: (contact: ContactModel) =>
    contact.formattedShortNameWithNonBreakingSpaces,
  getFormattedShortName: (contact: ContactModel) => contact.formattedShortName,
  getFormattedName: (contact: ContactModel) => contact.formattedName,
  getFormattedUser: (contact: ContactModel) => contact.formattedUser,
});
