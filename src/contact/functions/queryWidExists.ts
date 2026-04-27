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

import Debug from 'debug';

import { assertWid } from '../../assert';
import { ApiContact, ChatStore, ContactStore, Wid } from '../../whatsapp';
import { queryWidExists as nativeQueryWidExists } from '../../whatsapp/functions/sendQueryExists';
import type { ContactModel } from '../../whatsapp/models/ContactModel';

const debug = Debug('WA-JS:contact:queryWidExists');

export interface QueryWidExistsResult {
  wid: Wid;
  biz: boolean;
  bizInfo?: {
    verifiedName?: {
      isApi: boolean;
      level: string;
      name: string;
      privacyMode: any;
      serial?: string;
    };
  };
  disappearingMode?: {
    duration: number;
    settingTimestamp: number;
  };
  status?: string;
  lid?: Wid;
  username?: string;
}

const cache = new Map<string, Promise<QueryWidExistsResult | null>>();

function buildResultFromContact(
  contact: ContactModel,
  wid: Wid
): QueryWidExistsResult {
  const lid = ApiContact.getCurrentLid(wid) || undefined;
  return {
    wid,
    biz: contact.isBusiness,
    bizInfo:
      contact.isBusiness && contact.verifiedName != null
        ? {
            verifiedName: {
              isApi: !!contact.isEnterprise,
              level: contact.verifiedLevel,
              name: contact.verifiedName,
              privacyMode: contact.privacyMode,
              serial: undefined,
            },
          }
        : undefined,
    disappearingMode:
      contact.disappearingModeDuration != null &&
      contact.disappearingModeSettingTimestamp != null
        ? {
            duration: contact.disappearingModeDuration,
            settingTimestamp: contact.disappearingModeSettingTimestamp,
          }
        : undefined,
    lid,
    username: contact.username,
  };
}

async function fetchFromServer(wid: Wid): Promise<QueryWidExistsResult | null> {
  debug('fetchFromServer: requesting %s', wid.toString());
  try {
    const native = await nativeQueryWidExists(wid);
    if (!native) {
      debug('fetchFromServer: no result for %s', wid.toString());
      return null;
    }
    const lid = ApiContact.getCurrentLid(wid) || undefined;
    const result = {
      wid: native.wid,
      biz: native.biz,
      bizInfo: native.bizInfo,
      disappearingMode: native.disappearingMode,
      lid,
      username: native.username,
    };
    debug('fetchFromServer: result for %s %o', wid.toString(), result);
    return result;
  } catch (e) {
    debug('fetchFromServer: error for %s: %o', wid.toString(), e);
    return null;
  }
}

/**
 * Check if the wid (phone number or LID) exists on WhatsApp
 *
 * This helps to identify numbers with nine digit in Brazil.
 * Results are cached via ContactStore (persistent) and a 5-min in-memory cache.
 *
 * @example
 * ```javascript
 * const result = await WPP.contact.queryWidExists('[number]@c.us');
 * console.log(result.wid); // Correct ID
 * ```
 *
 * @category Contact
 */
export async function queryWidExists(
  contactId: string | Wid
): Promise<QueryWidExistsResult | null> {
  const wid = assertWid(contactId);
  debug('queryWidExists: %s', wid.toString());

  // Tier 1: persistent ContactStore check (mirrors WA's getOrQueryUsyncInfoContact).
  // Skipped for LID wids — the ContactStore is keyed by phone, not LID.
  if (!wid.isLid()) {
    const contact = ContactStore.get(wid);
    if (
      contact != null &&
      (contact.name != null || ChatStore.get(wid) != null)
    ) {
      debug('contactStore hit for %s', wid.toString());
      return buildResultFromContact(contact, wid);
    }
    debug('contactStore miss for %s', wid.toString());
  }

  // Tier 2: in-memory promise cache (5-min TTL for hits, 15s for misses).
  // Stores Promises so parallel calls share one in-flight request.
  const cacheKey = `+${wid.toString()}`; // '+' prefix avoids collision with WID-less keys
  if (cache.has(cacheKey)) {
    debug('promise cache hit for %s', wid.toString());
    return cache.get(cacheKey)!;
  }
  debug('promise cache miss for %s, fetching from server', wid.toString());

  // Tier 3: native server call via queryWidExists.
  // WA internally runs createLidPnMappings({ flushImmediately: true }),
  // so the LID/PN mapping is persisted before we read it back.
  const promise = fetchFromServer(wid)
    .then((result) => {
      const ttl = result ? 300000 : 15000;
      debug('caching result for %s, ttl=%dms', wid.toString(), ttl);
      setTimeout(() => cache.delete(cacheKey), ttl);
      return result;
    })
    .catch(() => {
      // defensive: fetchFromServer never rejects, but guard against future changes
      setTimeout(() => cache.delete(cacheKey), 15000);
      return null;
    });

  cache.set(cacheKey, promise);
  return promise;
}
