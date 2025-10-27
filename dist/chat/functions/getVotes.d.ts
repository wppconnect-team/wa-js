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
import { MsgKey, Wid } from '../../whatsapp';
/**
 * Get votes of a poll
 * @example
 * ```javascript
 * WPP.chat.getVotes('true_[number]@c.us_ABCDEF');
 * ```
 * @category Chat
 */
export declare function getVotes(id: string | MsgKey): Promise<{
    msgId: MsgKey;
    chatId: Wid;
    votes: {
        selectedOptions: number[];
        timestamp: number;
        sender: Wid;
    }[];
}>;
