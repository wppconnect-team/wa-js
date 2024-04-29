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

import { assertWid } from '../../assert';
import { createWid } from '../../util';
import { USyncQuery, USyncUser } from '../../whatsapp';
import { getCurrentLid, isWid } from '../../whatsapp/functions';
import { QueryExistsResult } from './queryExists';

const cache = new Map<string, QueryExistsResult | null>();

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
  const wid = assertWid(number);

  const id = wid.toString();
  if (cache.has(id)) {
    return cache.get(id)!;
  }

  const syncUser = new USyncUser();
  const syncQuery = new USyncQuery();
  syncQuery.withContactProtocol();
  syncUser.withPhone('+' + id);
  const prependedID = '+' + id;
  if (isWid(prependedID)) {
    const lid = getCurrentLid(createWid(prependedID) as any);
    lid && syncUser.withLid(lid);
  }
  syncQuery.withUser(syncUser);
  syncQuery.withBusinessProtocol();
  syncQuery.withDisappearingModeProtocol();
  syncQuery.withStatusProtocol();
  //syncQuery.withLidProtocol();
  //syncQuery.withUsernameProtocol();
  const get = await syncQuery.execute();
  let result = null;

  if (get?.error?.all || get?.error?.contact) {
    result = null;
  }
  if (Array.isArray(get.list)) {
    result = get.list[0];
    if (result.contact.type === 'out') {
      result = null;
    } else {
      result = {
        wid: wid,
        biz: typeof result.business !== 'undefined',
        bizInfo: result.business,
        disappearingMode:
          typeof result.disappearing_mode !== 'undefined'
            ? {
                duration: result.disappearing_mode?.duration,
                settingTimestamp: result.disappearing_mode?.t,
              }
            : undefined,
        status: result.status,
      };
    }
  } else {
    result = null;
  }
  cache.set(id, result);

  // Delete from cache after 5min is success or 15s for failure
  const timeout = result ? 300000 : 15000;
  setTimeout(() => {
    cache.delete(id);
  }, timeout);

  return result;
}
