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
 * Mark a chat to composing state
 * and keep sending "is writting a message"
 *
 * @example
 * ```javascript
 * // Mark is composing
 * WPP.chat.markIsComposing('[number]@c.us');
 *
 * // Mark is composing for 5 seconds
 * WPP.chat.markIsComposing('[number]@c.us', 5000);
 * ```
 * @category Chat
 */
export declare function markIsComposing(chatId: string | Wid, duration?: number): Promise<void>;
