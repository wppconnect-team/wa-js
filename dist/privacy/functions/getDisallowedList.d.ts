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
/**
 * Get the disallowed list to get the contacts who cannot see your privacy (this applies when enabled: my contacts, except...).
 *
 * @example
 * ```javascript
 * // get disalowed list for group Last seen
 * const disalowed = WPP.privacy.getDisalowedList('last');
 *
 * // get disalowed list for profile
 * const disalowed = WPP.privacy.getDisalowedList('profile');
 *
 * // get disalowed list for status
 * const disalowed = WPP.privacy.getDisalowedList('status');
 *
 * // get disalowed list for group add
 * const disalowed = WPP.privacy.getDisalowedList('groupadd');
 *
 * ```
 *
 * @category Privacy
 */
import { PrivacyDisallowedListType } from '../../enums';
export declare function getDisallowedList(type: PrivacyDisallowedListType): Promise<string[] | null>;
