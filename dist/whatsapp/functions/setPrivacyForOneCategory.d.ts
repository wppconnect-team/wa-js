/*!
 * Copyright 2024 WPPConnect Team
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
import { Wid } from '../misc';
/** @whatsapp WAWebSetPrivacyForOneCategoryAction >= 2.3000.0
 */
/** For set privacy who can you see your last seen, profile pic, or status */
export declare function setPrivacyForOneCategory(attrs: {
    name: 'last' | 'profile' | 'status';
    value: 'contacts' | 'all' | 'contact_blacklist' | 'none';
    users?: {
        action: 'add' | 'remove';
        wid: Wid;
    }[];
    dhash?: any;
}, disallowedList?: Wid[]): Promise<void>;
/** set privacy for who has permission to add a group */
export declare function setPrivacyForOneCategory(attrs: {
    name: 'groupadd';
    value: 'contacts' | 'all' | 'contact_blacklist';
    users?: {
        action: 'add' | 'remove';
        wid: Wid;
    }[];
    dhash?: any;
}, disallowedList?: Wid[]): Promise<void>;
/** For set privacy who can you see your last online */
export declare function setPrivacyForOneCategory(attrs: {
    name: 'online';
    value: 'all' | 'match_last_seen';
}): Promise<void>;
/** For set privacy who can you see your read receipts */
export declare function setPrivacyForOneCategory(attrs: {
    name: 'readreceipts';
    value: 'all' | 'none';
}): Promise<void>;
