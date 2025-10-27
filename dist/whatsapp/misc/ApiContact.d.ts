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
import { Wid } from './Wid';
/** @whatsapp WAWebApiContact
 */
export declare namespace ApiContact {
    function checkPnToLidMapping(a?: any, b?: any): any;
    function clearLidPnMappingCache(): any;
    function createOrMergeAddressBookContacts(a?: any): any;
    function deleteAddressBookContacts(a?: any): any;
    function getAccountLidFromChat(a?: any): Wid;
    function getAllLidContacts(): Wid[];
    function getAlternateDeviceWid(a?: any): Wid;
    function getAlternateUserWid(a?: any): Wid;
    function getContactHash(a?: any): any;
    function getContactRecord(a?: any): any;
    function getContactUsername(a?: any): any;
    function getCurrentLid(a?: any): any;
    function getCurrentLidDevice(a?: any): any;
    function getLatestLid(a?: any): any;
    function getPhoneNumber(wid: Wid): Wid;
    function getPnIfLidIsLatestMapping(a?: any): any;
    function hasLidMapping(a?: any): any;
    function isAddressBookContact(a?: any): any;
    function setNotAddressBookContacts(a?: any): any;
    function updateContactAdvHostedType(a?: any, b?: any): any;
    function updateLidMetadata(a?: any, b?: any): any;
}
