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
export interface EventMessageOptions extends SendMessageOptions {
    callType?: 'video' | 'voice';
    name: string;
    description?: string;
    startTime: number;
    endTime?: number;
    location?: {
        degreesLatitude: number;
        degreesLongitude: number;
        name: string;
    };
}
/**
 * Send a Event Message
 *
 * @example
 * ```javascript
 * // Simple com start time and end
 * WPP.chat.sendEventMessage('[number]@c.us', {
 *  name: "Title of event"
 *  description: 'Description of your event',
 *  startTime: 1729551600
 *  endTime: 1729551900
 * });
 *
 * // Event with location
 * WPP.chat.sendEventMessage('[number]@c.us', {
 *  name: "Title of event"
 *  description: 'Description of your event',
 *  startTime: 1729551600
 *  location: {
 *   degreesLatitude: -22.9518551,
 *   degreesLongitude: -43.2108338,
 *   name: 'Cristo Redentor - RJ',
 *  }
 * });
 *
 * // Event with link for call (use voice or video)
 * WPP.chat.sendEventMessage('[number]@c.us', {
 *  name: "Title of event"
 *  callType: 'voice',
 *  description: 'Description of your event',
 *  startTime: 1729551600
 * });
 * ```
 * @category Message
 */
export declare function sendEventMessage(chatId: any, options: EventMessageOptions): Promise<SendMessageReturn>;
