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
 * Pin a chat
 *
 * @example
 * ```javascript
 * // Pin a chat
 * WPP.chat.pin('[number]@c.us');
 *
 * // Unpin a chat
 * WPP.chat.pin('[number]@c.us', false);
 * // or
 * WPP.chat.unpin('[number]@c.us');
 * ```
 * @category Chat
 */
export declare function pin(chatId: string | Wid, pin?: boolean): Promise<{
    wid: Wid;
    pin: boolean;
}>;
/**
 * Unpin a chat
 *
 * @alias pin
 *
 * @example
 * ```javascript
 * // Unpin a chat
 * WPP.chat.unpin('[number]@c.us');
 *
 * // Alias for
 * WPP.chat.pin('[number]@c.us', false);
 * ```
 * @category Chat
 */
export declare function unpin(chatId: string | Wid): Promise<{
    wid: Wid;
    pin: boolean;
}>;
