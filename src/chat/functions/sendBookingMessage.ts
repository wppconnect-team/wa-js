/*!
 * Copyright 2026 WPPConnect Team
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

import { WPPError } from '../../util';
import { Wid } from '../../whatsapp';
import {
  defaultSendMessageOptions,
  RawMessage,
  SendMessageOptions,
  SendMessageReturn,
} from '..';
import { sendRawMessage } from '.';

export interface BookingMessageOptions extends SendMessageOptions {
  /** Text shown above the booking details. */
  body: string;
  /** URL where the customer can make the booking. */
  bookingUrl?: string;
  description?: string;
  endTime?: Date | string;
  /** Address or human-readable location. */
  location?: string;
  /** URL where the customer can manage an existing booking. */
  managementUrl?: string;
  phoneNumber?: string;
  startTime: Date | string;
  title?: string;
}

/**
 * Send a native booking confirmation message.
 *
 * At least one of `location`, `bookingUrl`, or `phoneNumber` is required by
 * WhatsApp. Dates can be supplied as ISO strings or JavaScript `Date` values.
 *
 * @example
 * ```javascript
 * await WPP.chat.sendBookingMessage('[number]@c.us', {
 *   body: 'Your appointment is confirmed.',
 *   title: 'Appointment',
 *   startTime: new Date('2026-10-11T15:00:00.000Z'),
 *   endTime: new Date('2026-10-11T16:00:00.000Z'),
 *   location: '10 Main Street',
 *   managementUrl: 'https://example.com/bookings/123'
 * });
 * ```
 *
 * @category Message
 */
export async function sendBookingMessage(
  chatId: string | Wid,
  options: BookingMessageOptions
): Promise<SendMessageReturn> {
  if (!options.location && !options.bookingUrl && !options.phoneNumber) {
    throw new WPPError(
      'booking_destination_required',
      'Booking messages require a location, booking URL, or phone number'
    );
  }

  const {
    body,
    bookingUrl,
    description,
    endTime,
    location,
    managementUrl,
    phoneNumber,
    startTime,
    title,
    ...sendOptions
  } = options;
  const buttonParams = {
    start_datetime: normalizeBookingDate(startTime),
    ...(endTime ? { end_datetime: normalizeBookingDate(endTime) } : {}),
    ...(location ? { location } : {}),
    ...(bookingUrl ? { booking_url: bookingUrl } : {}),
    ...(phoneNumber ? { phone_number: phoneNumber } : {}),
    ...(managementUrl ? { booking_management_url: managementUrl } : {}),
    ...(description ? { description } : {}),
  };
  const message: RawMessage = {
    type: 'interactive',
    caption: body,
    nativeFlowName: 'booking_confirmation',
    interactiveType: 'native_flow',
    nativeFlowInteractiveMsg: true,
    interactiveHeader: {
      title,
      subtitle: undefined,
      thumbnail: undefined,
      hasMediaAttachment: false,
      mediaType: undefined,
    },
    interactivePayload: {
      buttons: [
        {
          name: 'booking_confirmation',
          buttonParamsJson: JSON.stringify(buttonParams),
        },
      ],
      messageVersion: 1,
    },
  };

  return sendRawMessage(chatId, message, {
    ...defaultSendMessageOptions,
    ...sendOptions,
  });
}

function normalizeBookingDate(value: Date | string): string {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new WPPError(
      'invalid_booking_date',
      'Booking dates must be valid Date values or ISO date strings'
    );
  }

  return date.toISOString();
}
