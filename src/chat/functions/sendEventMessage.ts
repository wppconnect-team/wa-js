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

import { getMyUserId } from '../../conn';
import { WPPError } from '../../util';
import { createEventCallLink } from '../../whatsapp/functions';
import {
  defaultSendMessageOptions,
  RawMessage,
  SendMessageOptions,
  SendMessageReturn,
} from '..';
import { sendRawMessage } from '.';

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
export async function sendEventMessage(
  chatId: any,
  options: EventMessageOptions
): Promise<SendMessageReturn> {
  options = {
    ...defaultSendMessageOptions,
    ...options,
  };

  if (
    typeof options.callType === 'string' &&
    options.callType != 'voice' &&
    options.callType != 'video'
  ) {
    throw new WPPError(
      `callType_is_invalid`,
      `Param callType: ${options.callType} is not a valid type call. Use voice or video`
    );
  }
  const date = new Date(options.startTime * 1000);
  date.setHours(date.getHours() + 2);
  const defaultEndTime = Math.floor(date.getTime() / 1000);

  const rawMessage: RawMessage = {
    type: 'event_creation',
    eventName: options.name || ' ',
    eventLocation: options?.location,
    eventDescription: options?.description || ' ',
    eventStartTime: options.startTime,
    eventEndTime: options?.endTime || defaultEndTime,
    isEventCanceled: false,
    callType: options.callType || 0,
    author: getMyUserId()?.toString(),
    kind: 'eventCreation',
    messageSecret: crypto.getRandomValues(new Uint8Array(32)),
    viewMode: 'VISIBLE',
    eventJoinLink:
      typeof options?.callType === 'string'
        ? await createEventCallLink(options.startTime, options.callType)
        : undefined,
  } as any;

  return await sendRawMessage(chatId, rawMessage, options);
}
