/*!
 * Copyright 2023 WPPConnect Team
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

import { blobToBase64, convertToFile, downloadImage } from '../../util';
import { createNewsletterQuery } from '../../whatsapp/functions';

export interface ResultCreateNewsletter {
  idJid: string;
  inviteCode: string;
  inviteLink: string;
  name: string;
  state: string;
  subscribersCount: number;
  description: string | null;
  timestamp: number;
}

/**
 * Create a newsletter
 *
 * @example
 * ```javascript
 * // To edit name
 * WPP.newsletter.create('Name for your newsletter', {
 * description: 'Description for that',
 * picture: '<base64_string',
 * });
 * ```
 * @category Newsletter
 */
export async function create(
  name: string,
  opts: { description?: string; picture?: string }
): Promise<ResultCreateNewsletter> {
  let pic = undefined;
  if (opts?.picture) {
    const file = await convertToFile(opts.picture);
    pic = await blobToBase64(file);
    ({ data: pic } = await downloadImage(pic, 'image/jpeg'));
  }
  const result = await createNewsletterQuery({
    name: name,
    description: opts?.description || null,
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
    description: opts?.description || null,
    timestamp: result?.newsletterCreationTimeMetadataMixin?.creationTimeValue,
  };
}
