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
 * Set who can see your online status.
 *
 * @example
 * ```javascript
 * Set value for who can see your online status like 'all'
 * await WPP.privacy.setAbout('all');
 *
 * Set value for who can see your online status like 'match_last_seen'
 * await WPP.privacy.setAbout('match_last_seen');
 * ```
 *
 * @category Privacy
 */

import { WPPError } from '../../util';
import {
  getUserPrivacySettings,
  setPrivacyForOneCategory,
} from '../../whatsapp/functions';

export enum setOnlineTypes {
  all = 'all',
  match_last_seen = 'match_last_seen',
}
export async function setOnline(
  value: setOnlineTypes
): Promise<setOnlineTypes> {
  if (
    typeof value !== 'string' ||
    !Object.values(setOnlineTypes).includes(value)
  ) {
    throw new WPPError(
      'incorrect_type',
      `Incorrect type ${value || '<empty>'} for set online privacy`,
      {
        value,
      }
    );
  }
  await setPrivacyForOneCategory({
    name: 'online',
    value: value,
  });
  return getUserPrivacySettings().online as any;
}
