/*!
 * Copyright 2022 WPPConnect Team
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

import { assertWid } from '../../assert';
import { StatusV3Store, Wid } from '../../whatsapp';

/**
 * Mark status as read/seen
 *
 * @example
 * ```javascript
 * WPP.status.sendReadStatus('[phone_number]@c.us', 'false_status@broadcast_3A169E0FD4BC6E92212F_5521526232927@c.us');
 * ```
 */
export async function sendReadStatus(
  chatId: string | Wid,
  statusId: string
): Promise<any> {
  const wid = assertWid(chatId);
  const statusStore = StatusV3Store.get(wid);

  const status = statusStore?.msgs.get(statusId);
  await statusStore?.sendReadStatus(status, status?.mediaKeyTimestamp);

  const statusStoreReturn = StatusV3Store.get(wid);
  return statusStoreReturn?.msgs.get(statusId)?.serialize() || [];
}
