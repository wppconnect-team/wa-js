/*!
 * Copyright 2022 WPPConnect Team
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

export interface GroupEventTypes {
  /**
   * Triggered when some member of group has changed
   *
   * @example
   * ```javascript
   * WPP.on('group.participant_changed', (event) => {
   *   // Your code
   * });
   * ```
   */
  'group.participant_changed': {
    /**
     * Author of action for add, remove, demote and promote members
     */
    author?: string;
    /**
     * Author name of action for add, remove, demote and promote members
     */
    authorPushName?: string;
    /**
     * The group id
     */
    groupId: string;
    /**
     * The action by member
     */
    action: 'add' | 'remove' | 'demote' | 'promote' | 'leaver' | 'join';
    /**
     * The operation in group
     */
    operation: 'add' | 'remove' | 'demote' | 'promote';
    /**
     * List of members
     */
    participants: string[];
  };
}
