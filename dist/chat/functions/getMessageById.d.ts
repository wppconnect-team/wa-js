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
import { MsgKey, MsgModel } from '../../whatsapp';
/**
 * Get message by a single ID or array of IDs
 *
 * @example
 * ```javascript
 * // Single message
 * WPP.chat.getMessageById('true_[number]@c.us_ABCDEF');
 *
 * // List of messages
 * WPP.chat.getMessageById(['true_[number]@c.us_ABCDEF', 'false_[number]@c.us_789456']);
 * ```
 *
 * @category Message
 * @return  {Promise<MsgModel> | Promise<MsgModel[]>} List of raw messages
 */
export declare function getMessageById(id: string | MsgKey): Promise<MsgModel>;
export declare function getMessageById(ids: (string | MsgKey)[]): Promise<MsgModel[]>;
