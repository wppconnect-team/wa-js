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
 * Set who can see your status storie media
 *
 * @example
 * ```javascript
 * Set value for who can see your status like 'contacts'
 * await WPP.privacy.setStatus('contact');
 *
 * Set value for who can see your status with allow list
 * await WPP.privacy.setStatus('allow-list', ['[number]@c.us', '[number]@c.us']);
 *
 * Set value for who can see your status with deny list
 * await WPP.privacy.setStatus('deny-list', ['[number]@c.us', '[number]@c.us']);
 *
 * ```
 *
 * @category Privacy
 */

import { assertWid } from '../../assert';
import { WPPError } from '../../util';
import { Wid } from '../../whatsapp';
import {
  getStatusPrivacySetting,
  setStatusPrivacyConfig,
} from '../../whatsapp/functions';

export enum setStatusTypes {
  contact = 'contact',
  DENY_LIST = 'deny-list',
  ALLOW_LIST = 'allow-list',
}
export async function setStatus(
  value: setStatusTypes,
  list?: string[] | Wid[]
): Promise<setStatusTypes> {
  if (
    typeof value !== 'string' ||
    !Object.values(setStatusTypes).includes(value)
  ) {
    throw new WPPError(
      'incorrect_type',
      `Incorrect type ${value || '<empty>'} for set about privacy`,
      {
        value,
      }
    );
  }
  if (
    (value == setStatusTypes.ALLOW_LIST || value == setStatusTypes.DENY_LIST) &&
    !list
  ) {
    throw new WPPError(
      'list_is_mandatory',
      `List is empty <empty>, send the list to allow or deny`
    );
  }
  if (!list) {
    await setStatusPrivacyConfig({
      setting: value,
      list: [],
    });
  } else {
    if (!Array.isArray(list)) {
      list = [list];
    }
    const listWid = list.map(assertWid);

    await setStatusPrivacyConfig({
      setting: value,
      list: listWid,
    });
  }
  return getStatusPrivacySetting();
}
