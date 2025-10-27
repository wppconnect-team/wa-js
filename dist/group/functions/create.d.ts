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
/**
 * Create a new group
 *
 * The method return a object with the result of each participant as the key
 *
 * @example
 * ```javascript
 * const result = await WPP.group.create('Test Group', ['number@c.us']);
 *
 * console.log(result.gid.toString()); // Get the group ID
 *
 * // Get participant result:
 * console.log(result['number@c.us'].code);
 * console.log(result['number@c.us'].invite_code);
 * console.log(result['number@c.us'].invite_code_exp);
 * console.log(result['number@c.us'].message);
 * console.log(result['number@c.us'].wid);
 *
 * const memberResult = result['number@c.us']; // To a variable
 * // or
 * const memberResult = Object.values(result)[0]; // Always the first member result
 *
 * // How to send a custom invite link
 * const link = 'https://chat.whatsapp.com/' + result['number@c.us'].invite_code;
 * console.log(link);
 *
 * // Create a Subgroup for a community
 * const result = await WPP.group.create('Test Group', ['number@c.us'], 'communit@g.us');
 * ```
 *
 * @category Group
 */
export declare function create(groupName: string, participantsIds: (string | Wid) | (string | Wid)[], parentGroup: string | Wid): Promise<{
    gid: Wid;
    participants: {
        [key: `${number}@c.us`]: {
            wid: string;
            code: number;
            invite_code: string | null;
            invite_code_exp: number | null;
        };
    };
}>;
