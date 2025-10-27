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
declare global {
    interface Window {
        Debug: {
            VERSION: string;
        };
    }
}
/**
 * Add one or more participants to a group
 *
 * The method return a object with the result of each participant as the key
 *
 * @example
 * ```javascript
 * const result = await WPP.group.addParticipants('[group@g.us]', [number@c.us]);
 *
 * // Get participant result:
 * console.log(result['123@c.us'].code);
 * console.log(result['123@c.us'].invite_code);
 * console.log(result['123@c.us'].invite_code_exp);
 * console.log(result['123@c.us'].message);
 * console.log(result['123@c.us'].wid);
 *
 * const memberResult = result['123@c.us']; // To a variable
 * // or
 * const memberResult = Object.values(result)[0]; // Always the first member result
 *
 * // How to send a custom invite link
 * const link = 'https://chat.whatsapp.com/' + result['123@c.us'].invite_code;
 * console.log(link);
 * ```
 *
 * @category Group
 */
export declare function addParticipants(groupId: string | Wid, participantsIds: (string | Wid) | (string | Wid)[]): Promise<{
    [key: `${number}@c.us`]: {
        wid: string;
        code: number;
        message: string;
        invite_code: string | null;
        invite_code_exp: number | null;
    };
}>;
