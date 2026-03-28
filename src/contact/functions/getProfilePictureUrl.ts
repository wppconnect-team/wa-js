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
import { ProfilePicThumbStore } from '../../whatsapp';

const contactGetProfilePictureUrlSchema = z.object({
  chatId: z.string(),
  full: z.boolean().optional(),
});

export type ContactGetProfilePictureUrlInput = z.infer<
  typeof contactGetProfilePictureUrlSchema
>;

export type ContactGetProfilePictureUrlOutput = string | undefined | null;

/**
 * Get the profile picture URL
 *
 * @example
 * ```javascript
 * const url = await WPP.contact.getProfilePictureUrl({ chatId: '[chatId]' });
 * ```
 *
 * @category Contact
 */

export async function getProfilePictureUrl(
  params: ContactGetProfilePictureUrlInput
): Promise<ContactGetProfilePictureUrlOutput> {
  const { chatId, full = true } =
    contactGetProfilePictureUrlSchema.parse(params);

  const wid = assertWid(chatId);

  const profilePic = await ProfilePicThumbStore.find(wid);

  if (!profilePic) {
    return;
  }

  if (full) {
    return profilePic.imgFull;
  }

  return profilePic.img;
}
