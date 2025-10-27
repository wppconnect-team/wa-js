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
import { SendMessageOptions, SendMessageReturn } from '..';
export interface ScheduledCallMessageOptions extends SendMessageOptions {
    scheduledTimestampMs: number | string;
    callType: 'video' | 'voice';
    title: string;
    description?: string;
}
/**
 * Send a scheduled call message
 *
 * @example
 * ```javascript
 * WPP.chat.sendScheduledCallMessage('[number]@c.us', {
 *  title: "Title of event call"
 *  description: 'Description for Call",
 *  callType: 'voice'
 *  scheduledTimestampMs: 1696084222000
 * });
 * ```
 * @category Message
 */
export declare function sendScheduledCallMessage(chatId: any, options: ScheduledCallMessageOptions): Promise<SendMessageReturn>;
