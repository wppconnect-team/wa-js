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
import { BlocklistStore } from '../../whatsapp';

const blocklistIsBlockedSchema = z.object({
  chatId: z.string(),
});

export type BlocklistIsBlockedInput = z.infer<typeof blocklistIsBlockedSchema>;

export type BlocklistIsBlockedOutput = boolean;

export function isBlocked(
  params: BlocklistIsBlockedInput
): BlocklistIsBlockedOutput {
  const { chatId } = blocklistIsBlockedSchema.parse(params);

  const wid = assertWid(chatId);

  const contact = BlocklistStore.get(wid);

  return !!contact;
}
