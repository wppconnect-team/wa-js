/*!
 * Copyright 2025 WPPConnect Team
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
/**
 * @whatsapp 459857 >= 2.2310.5
 */
export declare namespace UserPrefs {
    function getMaybeMeDevicePn(...args: any[]): any;
    function assertGetMe(): Wid;
    function assertGetMeUser(): Wid;
    function clearGetMaybeMePnUserCache(...args: any[]): any;
    function getMaybeMeDisplayName(...args: any[]): any;
    function getMaybeMeDeviceLid(...args: any[]): any;
    function getMaybeMeLidUser(...args: any[]): any;
    function getMaybeMePnUser(): Wid;
    function getMaybeMeUser(): Wid;
    function getMePNandLIDWids(...args: any[]): any;
    function getMeUser(): Wid;
    function isMeAccount(...args: any[]): any;
    function isMeDevice(...args: any[]): any;
    function isMePrimary(...args: any[]): any;
    function isMePrimaryNonLid(...args: any[]): any;
    function isSerializedWidMe(...args: any[]): any;
    function setMe(...args: any[]): any;
    function setMeDisplayName(...args: any[]): any;
    function setMeLid(...args: any[]): any;
    /**
     * @deprecated
     */
    function clearGetMaybeMeUserCache(...args: any[]): any;
    /**
     * @deprecated
     */
    function getMeDevicePn(...args: any[]): any;
    /**
     * @deprecated
     */
    function getMaybeMeLid(...args: any[]): any;
    /**
     * @deprecated
     * @whatsapp 498050 >= 2.3000.1026
     **/
    function getMe(...args: any[]): any;
}
