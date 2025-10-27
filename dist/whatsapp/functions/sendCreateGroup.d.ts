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
import { Wid } from '..';
/** @whatsapp 79583 */
export declare function sendCreateGroup(groupName: string, participants: Wid[], ephemeral?: number, parentGroup?: Wid): Promise<{
    gid: Wid;
    participants: ({
        [key: `${number}@c.us`]: {
            code: string;
            invite_code: string | null;
            invite_code_exp: string | null;
        };
    } | {
        userWid: Wid;
        code: string;
        invite_code: string | null;
        invite_code_exp: string | null;
    })[];
}>;
