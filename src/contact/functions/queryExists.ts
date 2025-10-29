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
import { createWid } from '../../util/createWid';
import { ApiContact, USyncQuery, USyncUser, Wid } from '../../whatsapp';

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
  lid?: Wid;
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
 * @category Contact
 */
export async function queryExists(
  contactId: string | Wid
): Promise<QueryExistsResult | null> {
  const wid = assertWid(contactId);

  const id = `+${wid.toString()}`;
  if (cache.has(id)) {
    return cache.get(id)!;
  }

  const syncUser = new USyncUser();
  const syncQuery = new USyncQuery();
  const isLid = wid.isLid();
  if (isLid) {
    syncUser.withId(wid);
  } else {
    syncQuery.withContactProtocol();
    syncUser.withPhone(id.replace('@c.us', ''));
    if (wid.isUser()) {
      const lid = ApiContact.getCurrentLid(createWid(id.replace('+', '')));
      if (lid) {
        syncUser.withLid(lid);
      }
    }
  }
  syncQuery
    .withUser(syncUser)
    .withBusinessProtocol()
    .withDisappearingModeProtocol()
    .withStatusProtocol()
    .withLidProtocol();

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
      const lid = result?.lid;
      result = {
        wid: result.id,
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
        lid: lid ? createWid(lid) : undefined,
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
