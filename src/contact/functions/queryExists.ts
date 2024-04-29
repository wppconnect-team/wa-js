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

import { assertWid } from '../../assert';
import { USyncQuery, USyncUser, Wid } from '../../whatsapp';

export interface QueryExistsResult {
  wid: Wid;
  biz: boolean;
  bizInfo?: {
    verifiedName?: {
      isApi: boolean;
      level: string;
      name: string;
      privacyMode: any;
      serial: string;
    };
  };
  disappearingMode?: {
    duration: number;
    settingTimestamp: number;
  };
  status?: string;
}

const cache = new Map<string, QueryExistsResult | null>();

/**
 * Check if the number exists and what is correct ID
 *
 * This help to identify numbers with nine digit in Brazil
 *
 * @example
 * ```javascript
 * const result = await WPP.contact.queryExists('[number]@c.us');
 * console.log(result.wid); // Correct ID
 * ```
 *
 * @category Chat
 */
export async function queryExists(
  contactId: string | Wid
): Promise<QueryExistsResult | null> {
  const wid = assertWid(contactId);

  const id = wid.toString();
  if (cache.has(id)) {
    return cache.get(id)!;
  }

  const syncUser = new USyncUser();
  const syncQuery = new USyncQuery();
  const isLid = wid.toString().includes('@lid');
  if (isLid) {
    syncUser.withId(wid);
  } else {
    syncQuery.withContactProtocol();
    syncUser.withPhone('+' + id);
  }
  syncQuery.withUser(syncUser);
  syncQuery.withBusinessProtocol();
  syncQuery.withDisappearingModeProtocol();
  syncQuery.withStatusProtocol();
  syncQuery.withLidProtocol();
  const get = await syncQuery.execute();
  let result = null;

  if (get?.error?.all || get?.error?.contact) {
    result = null;
  }
  if (Array.isArray(get.list)) {
    result = get.list[0];
    if (result?.contact?.type === 'out') {
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
