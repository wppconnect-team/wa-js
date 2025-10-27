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
import { MsgKey, MsgModel } from '../../whatsapp';
import { SendMsgResult } from '../../whatsapp/enums';
/**
 * Pin a message in chat
 *
 * @example
 * ```javascript
 * // Pin a message in chat
 * WPP.chat.pinMsg('true_[number]@c.us_ABCDEF');
 *
 * // Pin a message in chat for 30 days
 * WPP.chat.pinMsg('true_[number]@c.us_ABCDEF', 2592000);
 *
 * // Unpin a message
 * WPP.chat.pinMsg('true_[number]@c.us_ABCDEF', false);
 * // or
 * WPP.chat.unpinMsg('true_[number]@c.us_ABCDEF');
 * ```
 * @category Chat
 */
export declare function pinMsg(msgId: string | MsgKey, pin?: boolean, seconds?: number): Promise<{
    message: MsgModel;
    pinned: boolean;
    result: SendMsgResult;
}>;
/**
 * Unpin a message in chat
 *
 * @alias pin
 *
 * @example
 * ```javascript
 * // Unpin a message
 * WPP.chat.unpinMsg('true_[number]@c.us_ABCDEF');
 *
 * // Alias for
 * WPP.chat.pinMsg('true_[number]@c.us_ABCDEF', false);
 * ```
 * @category Chat
 */
export declare function unpinMsg(msgId: string | MsgKey): Promise<{
    message: MsgModel;
    pinned: boolean;
    result: SendMsgResult;
}>;
