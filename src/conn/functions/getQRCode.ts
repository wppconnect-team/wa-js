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

import { getPaintedQRCode } from '../events/registerQRCodeChangeEvent';
import { QRCode } from '../types';

/**
 * Return the QR code WhatsApp is showing, read from the page after its canvas
 * is painted, or null when there is none
 *
 * @example
 * ```javascript
 * const qr = WPP.conn.getQRCode();
 * console.log(qr?.fullCode); // The string encoded in the QR code
 * console.log(qr?.base64Image); // data:image/png;base64,...
 * ```
 */
export function getQRCode(): QRCode | null {
  return getPaintedQRCode();
}
