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
 * Mute a chat, you can use duration or expiration
 * For expiration, use unix timestamp (seconds only)
 * For duration, use seconds
 *
 * @example
 * ```javascript
 * // Mute for 60 seconds
 * WPP.chat.mute('[number]@c.us', {duration: 60});
 *
 * // Mute util 2021-01-01
 * WPP.chat.mute('[number]@c.us', {expiration: 1641006000});
 *
 * // or using date
 * const expiration = new Date('2022-01-01 00:00:00');
 * WPP.chat.mute('[number]@c.us', {expiration: expiration});
 * ```
 *
 * @category Chat
 */
export declare function mute(chatId: string | Wid, time: {
    expiration: number | Date;
} | {
    duration: number;
}): Promise<{
    wid: Wid;
    expiration: number;
    isMuted: boolean;
}>;
