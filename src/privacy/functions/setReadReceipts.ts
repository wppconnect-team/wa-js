/*!
 * Copyright 2024 WPPConnect Team
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

/**
 * Set who send your read receipts
 *
 * @example
 * ```javascript
 * Set value for who can see your online status like 'all'
 * await WPP.privacy.setReadReceipts('all');
 *
 * Set value for who can see your online status like 'none'
 * await WPP.privacy.setReadReceipts('none');
 * ```
 *
 * @category Privacy
 */

import { WPPError } from '../../util';
import {
  getUserPrivacySettings,
  setPrivacyForOneCategory,
} from '../../whatsapp/functions';

export enum setReadReceiptsTypes {
  all = 'all',
  none = 'none',
}
export async function setReadReceipts(
  value: setReadReceiptsTypes
): Promise<setReadReceiptsTypes> {
  if (
    typeof value !== 'string' ||
    !Object.values(setReadReceiptsTypes).includes(value)
  ) {
    throw new WPPError(
      'incorrect_type',
      `Incorrect type ${value || '<empty>'} for set read receipts privacy`,
      {
        value,
      }
    );
  }
  await setPrivacyForOneCategory({
    name: 'readreceipts',
    value: value,
  });
  return getUserPrivacySettings().readReceipts as any;
}
