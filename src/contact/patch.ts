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

import * as webpack from '../webpack';
import { ContactModel, functions } from '../whatsapp';

webpack.onInjected(applyPatch);

function applyPatch() {
  const funcs: {
    [key: string]: (...args: any[]) => any;
  } = {
    isMyContact: functions.getIsMyContact,
    mentionName: functions.getMentionName,
    notifyName: functions.getNotifyName,
    pnForLid: functions.getPnForLid,
    displayNameOrPnForLid: functions.getDisplayNameOrPnForLid,
    formattedPhone: functions.getFormattedPhone,
    userid: functions.getUserid,
    userhash: functions.getUserhash,
    searchName: functions.getSearchName,
    searchVerifiedName: functions.getSearchVerifiedName,
    header: functions.getHeader,
    isMe: functions.getIsMe,
    isUser: functions.getIsUser,
    isGroup: functions.getIsGroup,
    isBroadcast: functions.getIsBroadcast,
    isPSA: functions.getIsPSA,
    isIAS: functions.getIsIAS,
    isSupportAccount: functions.getIsSupportAccount,
    formattedShortNameWithNonBreakingSpaces:
      functions.getFormattedShortNameWithNonBreakingSpaces,
    formattedShortName: functions.getFormattedShortName,
    formattedName: functions.getFormattedName,
    formattedUser: functions.getFormattedUser,
    isWAContact: functions.getIsWAContact,
    canRequestPhoneNumber: functions.getCanRequestPhoneNumber,
    showBusinessCheckmarkAsPrimary: functions.getShowBusinessCheckmarkAsPrimary,
    showBusinessCheckmarkAsSecondary:
      functions.getShowBusinessCheckmarkAsSecondary,
    showBusinessCheckmarkInChatlist:
      functions.getShowBusinessCheckmarkInChatlist,
    isDisplayNameApproved: functions.getIsDisplayNameApproved,
    shouldForceBusinessUpdate: functions.getShouldForceBusinessUpdate,
  };

  for (const attr in funcs) {
    const func = funcs[attr];
    if (typeof (ContactModel.prototype as any)[attr] === 'undefined') {
      Object.defineProperty(ContactModel.prototype, attr, {
        get: function () {
          return func(this);
        },
        configurable: true,
      });
    }
  }
}
