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
/** @whatsapp 46308
 * @whatsapp 24863 >= 2.2204.13
 * @whatsapp 946308 >= 2.2222.8
 */
export declare namespace adv {
    function generateADVSecretKey(): string;
    function getADVSecretKey(): string | Promise<string>;
    function setADVSignedIdentity(e: any): string;
    function getADVEncodedIdentity(): any;
    function verifyDeviceIdentityAccountSignature(): any;
    function generateDeviceSignature(e?: any, t?: any, r?: any): any;
    function verifyDeviceSignature(): any;
    function clearADVSecretKey(): void;
    function validateADVwithIdentityKey(): any;
    function validateADVwithEncs(e?: any, t?: any, r?: any, a?: boolean): any;
    function verifyKeyIndexListAccountSignature(e?: any, t?: any): any;
}
