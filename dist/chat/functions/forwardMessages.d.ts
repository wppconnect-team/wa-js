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
import { MsgKey, MsgModel, Wid } from '../../whatsapp';
export interface ForwardMessagesOptions {
    displayCaptionText?: boolean;
    multicast?: boolean;
    appendedText?: boolean;
}
/**
 * Forward many messages to a chat
 *
 * @example
 * ```javascript
 * // Forward messages
 * WPP.chat.forwardMessagesWhatsApp('[number]@c.us', ['true_[number]@c.us_ABCDEF', ...]);
 * ```
 * @category Message
 * @return  {any} Any
 */
export declare function forwardMessages(toChatId: string | Wid, msgsId: string[] | MsgKey[] | MsgModel[], options?: ForwardMessagesOptions): Promise<Array<any>>;
