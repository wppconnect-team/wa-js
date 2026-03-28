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

export enum SetReadReceiptsTypes {
  all = 'all',
  none = 'none',
}

const privacySetReadReceiptsSchema = z.object({
  value: z.enum(SetReadReceiptsTypes),
});

export type PrivacySetReadReceiptsInput = z.infer<
  typeof privacySetReadReceiptsSchema
>;

export type PrivacySetReadReceiptsOutput = SetReadReceiptsTypes;

/**
 * Set who can see your read receipts.
 *
 * @example
 * ```javascript
 * await WPP.privacy.setReadReceipts({ value: 'all' });
 *
 * await WPP.privacy.setReadReceipts({ value: 'none' });
 * ```
 *
 * @category Privacy
 */
export async function setReadReceipts(
  params: PrivacySetReadReceiptsInput
): Promise<PrivacySetReadReceiptsOutput> {
  const { value } = privacySetReadReceiptsSchema.parse(params);
  await setPrivacyForOneCategory({
    name: 'readreceipts',
    value: value,
  });
  return getUserPrivacySettings().readReceipts as SetReadReceiptsTypes;
}
