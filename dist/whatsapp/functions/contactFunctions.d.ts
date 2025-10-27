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
export declare function getIsNewsletter(contact: ContactModel): any;
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
export declare function getCanRequestPhoneNumber(contact: ContactModel): boolean;
/**
 * @whatsapp 660666 >= 2.2327.4
 */
export declare function getShowBusinessCheckmarkAsPrimary(contact: ContactModel): any;
/**
 * @whatsapp 660666 >= 2.2327.4
 */
export declare function getShowBusinessCheckmarkAsSecondary(contact: ContactModel): any;
/**
 * @whatsapp 660666 >= 2.2327.4
 */
export declare function getShowBusinessCheckmarkInChatlist(contact: ContactModel): any;
/**
 * @whatsapp 660666 >= 2.2327.4
 */
export declare function getIsDisplayNameApproved(contact: ContactModel): any;
/**
 * @whatsapp 660666 >= 2.2327.4
 */
export declare function getShouldForceBusinessUpdate(contact: ContactModel): any;
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
 * @deprecated Use getFormattedUsernameOrPhone instead
 */
export declare function getFormattedPhone(contact: ContactModel): any;
/**
 * @whatsapp 714574 >= 2.2327.4
 */
export declare function getFormattedUsernameOrPhone(contact: ContactModel): any;
/**
 * @whatsapp 714574 >= 2.2327.4
 */
export declare function getSearchName(contact: ContactModel): any;
/**
 * @whatsapp 714574 >= 2.2327.4
 */
export declare function getFormattedShortNameWithNonBreakingSpaces(contact: ContactModel): any;
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
