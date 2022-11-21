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
import { Wid } from '../../whatsapp';
import { sendQueryExists } from '../../whatsapp/functions';

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
}

const cache = new Map<string, QueryExistsResult | null>();

let useInternationalMode: boolean | null = null;

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

  /**
   * @whatsapp >= 2.2244.5
   * Since 2.2244.5 there are a problem with queryExists function,
   * that not prepend the `+` sign
   */
  if (useInternationalMode === null) {
    const source = sendQueryExists.toString();

    useInternationalMode = !/`\+\$\{\w+\.toString\(\)\}`/.test(source);
  }

  let result: QueryExistsResult | null = null;

  if (useInternationalMode) {
    const internationalWid = assertWid(contactId);

    // Make a backup of original method
    const originalToString = internationalWid.toString;

    // Change 'toString' function without enumerating it
    Object.defineProperty(internationalWid, 'toString', {
      configurable: true,
      enumerable: false,
      value: () => `+${internationalWid._serialized}`,
    });

    result = await sendQueryExists(internationalWid).catch(() => null);

    // Restore 'toString' function without enumerating it
    // Note: using `internationalWid = toString` make it enumerable
    Object.defineProperty(internationalWid, 'toString', {
      configurable: true,
      enumerable: false,
      value: originalToString,
    });
  }

  if (!result) {
    result = await sendQueryExists(wid).catch(() => null);
  }

  cache.set(id, result);

  return result;
}
