/*!
 * Copyright 2026 WPPConnect Team
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

export { ContactGetInput, ContactGetOutput, get } from './get';
export {
  ContactGetBusinessProfileInput,
  ContactGetBusinessProfileOutput,
  getBusinessProfile,
} from './getBusinessProfile';
export {
  ContactGetCommonGroupsInput,
  ContactGetCommonGroupsOutput,
  getCommonGroups,
} from './getCommonGroups';
export {
  ContactGetPnLidEntryInput,
  ContactGetPnLidEntryOutput,
  getPnLidEntry,
  InvalidWidForGetPnLidEntry,
  PnLidContactInfo,
  PnLidEntryResult,
  PnLidWid,
} from './getPnLidEntry';
export {
  ContactGetProfilePictureUrlInput,
  ContactGetProfilePictureUrlOutput,
  getProfilePictureUrl,
} from './getProfilePictureUrl';
export {
  ContactGetStatusInput,
  ContactGetStatusOutput,
  getStatus,
} from './getStatus';
export { ContactListInput, ContactListOutput, list } from './list';
export {
  ContactQueryExistsInput,
  ContactQueryExistsOutput,
  queryExists,
  QueryExistsResult,
} from './queryExists';
export { ContactRemoveInput, ContactRemoveOutput, remove } from './remove';
export {
  ContactReportContactInput,
  ContactReportContactOutput,
  reportContact,
  ReportContactResult,
} from './reportContact';
export { ContactSaveInput, ContactSaveOutput, save } from './save';
export {
  ContactSubscribePresenceInput,
  ContactSubscribePresenceOutput,
  subscribePresence,
} from './subscribePresence';
export {
  ContactUnsubscribePresenceInput,
  ContactUnsubscribePresenceOutput,
  unsubscribePresence,
} from './unsubscribePresence';
