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

import {
  getUserPrivacySettings,
  setPrivacyForOneCategory,
} from '../../whatsapp/functions';

export enum SetOnlineTypes {
  all = 'all',
  match_last_seen = 'match_last_seen',
}

const privacySetOnlineSchema = z.object({
  value: z.enum(SetOnlineTypes),
});

export type PrivacySetOnlineInput = z.infer<typeof privacySetOnlineSchema>;

export type PrivacySetOnlineOutput = SetOnlineTypes;

/**
 * Set who can see your online status.
 *
 * @example
 * ```javascript
 * await WPP.privacy.setOnline({ value: 'all' });
 *
 * await WPP.privacy.setOnline({ value: 'match_last_seen' });
 * ```
 *
 * @category Privacy
 */
export async function setOnline(
  params: PrivacySetOnlineInput
): Promise<PrivacySetOnlineOutput> {
  const { value } = privacySetOnlineSchema.parse(params);
  await setPrivacyForOneCategory({
    name: 'online',
    value: value,
  });
  return getUserPrivacySettings().online as SetOnlineTypes;
}
