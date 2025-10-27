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
/**
 * @whatsapp 135963 >= 2.2310.5
 * @whatsapp WAWebUserPrefsGeneral >= 2.3000.0
 */
export declare function getPushname(): string;
export declare function getUserPrivacySettings(): {
    about: string;
    callAdd: string;
    groupAdd: string;
    lastSeen: string;
    online: string;
    profilePicture: string;
    readReceipts: string;
};
