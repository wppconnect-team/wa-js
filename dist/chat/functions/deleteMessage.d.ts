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
import { SendMsgResult } from '../../whatsapp/enums';
export interface DeleteMessageReturn {
    id: string;
    sendMsgResult: SendMsgResult;
    isRevoked: boolean;
    isDeleted: boolean;
    isSentByMe: boolean;
}
/**
 * Delete a message
 *
 * @example
 * ```javascript
 * // Delete a message
 * WPP.chat.deleteMessage('[number]@c.us', 'msgid');
 * // Delete a list of messages
 * WPP.chat.deleteMessage('[number]@c.us', ['msgid1', 'msgid2]);
 * // Delete a message and delete media
 * WPP.chat.deleteMessage('[number]@c.us', 'msgid', true);
 * // Revoke a message
 * WPP.chat.deleteMessage('[number]@c.us', 'msgid', true, true);
 * ```
 *
 * @category Message
 */
export declare function deleteMessage(chatId: string | Wid, ids: string | string[], deleteMediaInDevice?: boolean, revoke?: boolean): Promise<DeleteMessageReturn | DeleteMessageReturn[]>;
