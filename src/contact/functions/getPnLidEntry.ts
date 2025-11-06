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
import { WPPError } from '../../util';
import { ContactStore, lidPnCache, Wid } from '../../whatsapp';

export interface PnLidContactInfo {
  id: Wid;
  name?: string;
  shortName?: string;
  pushname?: string;
  type?: 'in' | 'out';
  verifiedName?: string;
  isBusiness?: boolean;
  isEnterprise?: boolean;
  isSmb?: boolean;
  verifiedLevel?: number;
  privacyMode?: {
    actualActors?: number;
    hostStorage?: number;
    privacyModeTs?: number;
  };
  isContactSyncCompleted?: number;
  textStatusLastUpdateTime?: number;
  syncToAddressbook?: boolean;
}

export interface PnLidEntryResult {
  lid?: Wid;
  phoneNumber?: Wid;
  contact?: PnLidContactInfo;
}

export class InvalidWidForGetPnLidEntry extends WPPError {
  constructor(readonly id: string | { _serialized: string }) {
    super(
      'invalid_wid',
      `Invalid WID value for ${id} - getPnLidEntry only supports @c.us and @lid.`
    );
  }
}

/**
 * Get LID/PhoneNumber mapping and Contact information
 *
 * @example
 * ```javascript
 * await WPP.contact.getPnLidEntry('[number]@c.us');
 * await WPP.contact.getPnLidEntry('[number]@lid');
 * ```
 *
 * @category Contact
 */

export async function getPnLidEntry(
  contactId: string | Wid
): Promise<PnLidEntryResult> {
  const wid = assertWid(contactId);

  let lid: Wid | undefined = undefined;
  let pn: Wid | undefined = undefined;
  let contact: PnLidContactInfo | undefined = undefined;

  // getPnLidEntry is only valid for 1:1 contacts
  if (wid.server !== 'c.us' && wid.server !== 'lid') {
    throw new InvalidWidForGetPnLidEntry(wid);
  }

  if (wid.isLid()) {
    lid = wid;
    pn = lidPnCache.getPhoneNumber(wid) || undefined;
  } else if (wid.server === 'c.us') {
    pn = wid;
    lid = lidPnCache.getCurrentLid(wid) || undefined;
  }

  // This will get the contact info from ContactStore in memory
  // Avoid at any cost ContactStore.find or ContactStore.findQuery here to prevent
  // unnecessary hitting whatsapp apis
  contact = ContactStore.get(lid || pn || wid) || undefined;

  return {
    lid: lid || undefined,
    phoneNumber: pn || undefined,
    contact: contact || undefined,
  };
}
