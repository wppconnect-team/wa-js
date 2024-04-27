/*!
 * Copyright 2023 WPPConnect Team
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

import { createWid } from '../../util';
import { USyncQuery, USyncUser } from '../../whatsapp';
import { getCurrentLid, isWid } from '../../whatsapp/functions';

/**
 * Check number is on whatsapp by socket
 *
 * THis is a alternative for queryExists
 *
 * @example
 * ```javascript
 * WPP.contact.isOnWhatsapp('[number]@c.us');
 * ```
 */
export async function isOnWhatsapp(number: string): Promise<any> {
  const syncUser = new USyncUser();
  const syncQuery = new USyncQuery();
  syncQuery.withContactProtocol();
  syncUser.withPhone('+' + number);
  const f = '+' + number;
  if (isWid(f)) {
    const lid = getCurrentLid(createWid(f) as any);
    lid && syncUser.withLid(lid);
  }
  syncQuery.withUser(syncUser);
  syncQuery.withBusinessProtocol();
  syncQuery.withDisappearingModeProtocol();
  //syncQuery.withLidProtocol();
  //syncQuery.withUsernameProtocol();
  const result = await syncQuery.execute();
  if (Array.isArray(result.list)) {
    return result.list[0];
  } else {
    return null;
  }
}
