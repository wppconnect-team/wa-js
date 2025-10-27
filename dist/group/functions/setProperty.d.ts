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
import { Wid } from '../../whatsapp';
export declare enum GroupProperty {
    ANNOUNCEMENT = "announcement",
    EPHEMERAL = "ephemeral",
    RESTRICT = "restrict"
}
/**
 * Set the group property
 *
 * @example
 * ```javascript
 * // Only admins can send message
 * await WPP.group.setProperty('[group-id]@g.us', 'announcement', true);
 *
 * // All can send message
 * await WPP.group.setProperty('[group-id]@g.us', 'announcement', false);
 *
 * // Disatble temporary messages
 * await WPP.group.setProperty('[group-id]@g.us', 'ephemeral', 0);
 *
 * // Enable temporary messages for 24 hours
 * await WPP.group.setProperty('[group-id]@g.us', 'ephemeral', 86400);
 *
 * // Enable temporary messages for 7 days
 * await WPP.group.setProperty('[group-id]@g.us', 'ephemeral', 604800);
 *
 * // Enable temporary messages for 90 days
 * await WPP.group.setProperty('[group-id]@g.us', 'ephemeral', 7776000);
 *
 * // Only admins can edit group properties
 * await WPP.group.setProperty('[group-id]@g.us', 'restrict', true);
 *
 * // All can edit group properties
 * await WPP.group.setProperty('[group-id]@g.us', 'restrict', false);
 * ```
 *
 * @category Group
 */
export declare function setProperty(groupId: string | Wid, property: GroupProperty, value: 0 | 1 | 86400 | 604800 | 7776000 | boolean): Promise<boolean>;
