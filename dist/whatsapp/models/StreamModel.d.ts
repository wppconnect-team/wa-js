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
import { Model, ModelOptions, ModelPropertiesContructor, ModelProxy } from './Model';
interface Props {
}
interface Session {
    info?: any;
    mode: string;
    obscurity?: any;
    needsUpdate?: any;
    clientExpired?: any;
    hardExpired?: any;
    lastSyncStart?: any;
    needsManualDownload?: any;
    couldForce?: any;
    uiActive?: any;
    available?: any;
    unavailableShiftTimer?: any;
    unavailableLogoutTimer?: any;
    unobscureShiftTimer?: any;
    timeoutEvent?: any;
    resumeCount?: any;
    phoneAuthed?: any;
}
interface Derived {
    displayInfo?: any;
}
/** @whatsapp 8080
 * @whatsapp 608080 >= 2.2222.8
 */
export declare interface StreamModel extends ModelProxy<Props, Session, Derived> {
}
/** @whatsapp 8080
 * @whatsapp 608080 >= 2.2222.8
 */
export declare class StreamModel extends Model {
    constructor(proterties?: ModelPropertiesContructor<StreamModel>, options?: ModelOptions);
    markAvailable(): void;
    markUnavailable(e?: any): void;
    onSelfUpdate(): void;
    onSocketUpdate(): void;
    unobscure(): void;
    onPhoneAuthedUpdate(): void;
    onAvailableUpdate(): void;
    sendAvailability(e?: any): void;
    updateCouldForce(): void;
    updateHardExpire(): void;
    logPageResume(): void;
    updateWamLog(): void;
    logModeChange(): void;
}
export {};
