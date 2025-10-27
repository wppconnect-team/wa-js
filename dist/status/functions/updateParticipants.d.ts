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
import { MsgKey, Wid } from '../../whatsapp';
export interface SendStatusOptions {
    waitForAck?: boolean;
    messageId?: string | MsgKey;
}
/**
 * Define a custom list of participants to send the status message
 *
 * @example
 * ```javascript
 * // Use a custom list
 * await WPP.status.updateParticipants(['123@c.us', '456@c.us']);
 * // Use the contacts by default
 * await WPP.status.updateParticipants(null);
 * ```
 */
export declare function updateParticipants(ids?: (string | Wid)[] | null): Promise<void>;
