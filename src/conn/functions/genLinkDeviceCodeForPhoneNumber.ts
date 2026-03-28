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

import { z } from 'zod';

import { WPPError } from '../../util';
import { functions } from '../../whatsapp';
import { isAuthenticated } from '.';

const connGenLinkDeviceCodeForPhoneNumberSchema = z.object({
  phone: z.string(),
  sendPushNotification: z.boolean().optional(),
});

export type ConnGenLinkDeviceCodeForPhoneNumberInput = z.infer<
  typeof connGenLinkDeviceCodeForPhoneNumberSchema
>;

export type ConnGenLinkDeviceCodeForPhoneNumberOutput = string;

/**
 * Alternative login method using code
 * Get the Link Device Code for Authentication using the phone number
 *
 * @example
 * ```javascript
 * const code = await WPP.conn.genLinkDeviceCodeForPhoneNumber({ phone: '[number]' });
 *
 * // Disable push notification
 * const code = await WPP.conn.genLinkDeviceCodeForPhoneNumber({ phone: '[number]', sendPushNotification: false });
 * ```
 *
 * @category Conn
 */
export async function genLinkDeviceCodeForPhoneNumber(
  params: ConnGenLinkDeviceCodeForPhoneNumberInput
): Promise<ConnGenLinkDeviceCodeForPhoneNumberOutput> {
  const { phone, sendPushNotification = true } =
    connGenLinkDeviceCodeForPhoneNumberSchema.parse(params);

  if (!phone || typeof phone !== 'string') {
    throw new WPPError(
      'send_the_phone_number_to_connect',
      "Can't get code for without phone number param"
    );
  }
  if (isAuthenticated()) {
    throw new WPPError(
      'cannot_get_code_for_already_authenticated',
      "Can't get code for already authenticated user"
    );
  }

  await functions.initializeAltDeviceLinking();
  return await functions.genLinkDeviceCodeForPhoneNumber(
    phone,
    sendPushNotification
  );
}
