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

import { blobToBase64, convertToFile, downloadImage } from '../../util';
import { createNewsletterQuery } from '../../whatsapp/functions';

const newsletterCreateSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  picture: z.string().optional(),
});

export type NewsletterCreateInput = z.infer<typeof newsletterCreateSchema>;
export type NewsletterCreateOutput = {
  idJid: string;
  inviteCode: string;
  inviteLink: string;
  name: string;
  state: string;
  subscribersCount: number;
  description: string | null;
  timestamp: number;
};

/**
 * Create a newsletter
 *
 * @example
 * ```javascript
 * WPP.newsletter.create({
 *   name: 'Name for your newsletter',
 *   description: 'Description for that',
 *   picture: '<base64_string>',
 * });
 * ```
 * @category Newsletter
 */
export async function create(
  params: NewsletterCreateInput
): Promise<NewsletterCreateOutput> {
  const { name, description, picture } = newsletterCreateSchema.parse(params);

  let pic = undefined;
  if (picture) {
    const file = await convertToFile(picture);
    pic = await blobToBase64(file);
    ({ data: pic } = await downloadImage(pic, 'image/jpeg'));
  }
  const result = await createNewsletterQuery({
    name: name,
    description: description || null,
    picture: pic || null,
  });

  return {
    idJid: result?.idJid,
    inviteCode: result?.newsletterInviteLinkMetadataMixin.inviteCode,
    inviteLink: `https://whatsapp.com/channel/${result?.newsletterInviteLinkMetadataMixin.inviteCode}`,
    name: result?.newsletterNameMetadataMixin?.nameElementValue,
    state: result?.newsletterStateMetadataMixin?.stateType,
    subscribersCount:
      result?.newsletterSubscribersMetadataMixin.subscribersCount,
    description: description || null,
    timestamp: result?.newsletterCreationTimeMetadataMixin?.creationTimeValue,
  };
}
