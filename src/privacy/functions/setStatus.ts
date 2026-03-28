/*!
 * Copyright 2026 WPPConnect Team
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

import { z } from 'zod';

import { assertWid } from '../../assert';
import { WPPError } from '../../util';
import {
  getStatusPrivacySetting,
  setStatusPrivacyConfig,
} from '../../whatsapp/functions';

export enum SetStatusTypes {
  contact = 'contact',
  DENY_LIST = 'deny-list',
  ALLOW_LIST = 'allow-list',
}

const privacySetStatusSchema = z.object({
  value: z.enum(SetStatusTypes),
  list: z.array(z.string()).optional(),
});

export type PrivacySetStatusInput = z.infer<typeof privacySetStatusSchema>;

export type PrivacySetStatusOutput = SetStatusTypes;

/**
 * Set who can see your status story media.
 *
 * @example
 * ```javascript
 * await WPP.privacy.setStatus({ value: 'contact' });
 *
 * await WPP.privacy.setStatus({
 *   value: 'allow-list',
 *   list: ['[chatId]', '[chatId]'],
 * });
 *
 * await WPP.privacy.setStatus({
 *   value: 'deny-list',
 *   list: ['[chatId]', '[chatId]'],
 * });
 * ```
 *
 * @category Privacy
 */
export async function setStatus(
  params: PrivacySetStatusInput
): Promise<PrivacySetStatusOutput> {
  const { value, list } = privacySetStatusSchema.parse(params);
  if (
    (value == SetStatusTypes.ALLOW_LIST || value == SetStatusTypes.DENY_LIST) &&
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
    const listWid = list.map(assertWid);
    await setStatusPrivacyConfig({
      setting: value,
      list: listWid,
    });
  }
  return getStatusPrivacySetting();
}
