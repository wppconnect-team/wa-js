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

import { functions } from '../../whatsapp';
import { ensureGroup } from './';

const groupRemoveIconSchema = z.object({
  groupId: z.string(),
});

export type GroupRemoveIconInput = z.infer<typeof groupRemoveIconSchema>;
export type GroupRemoveIconOutput = boolean;

/**
 * Remove the group icon (group profile picture)
 *
 * @example
 * ```javascript
 * await WPP.group.removeIcon({ groupId: '[group@g.us]' });
 * ```
 *
 * @category Group
 */
export async function removeIcon(
  params: GroupRemoveIconInput
): Promise<GroupRemoveIconOutput> {
  const { groupId } = groupRemoveIconSchema.parse(params);
  const groupChat = await ensureGroup({ groupId });

  const result = await functions.requestDeletePicture(groupChat.id);

  return result.status === 200;
}
