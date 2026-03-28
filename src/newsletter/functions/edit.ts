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
  blobToBase64,
  convertToFile,
  downloadImage,
  resizeImage,
} from '../../util';
import {
  editNewsletterMetadataAction,
  queryNewsletterMetadataByJid,
} from '../../whatsapp/functions';
import { ensureNewsletter } from './ensureNewsletter';

const newsletterEditSchema = z.object({
  newsletterId: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  picture: z.string().nullable().optional(),
});

export type NewsletterEditInput = z.infer<typeof newsletterEditSchema>;
export type NewsletterEditOutput = {
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
 * Edit the newsletter data
 *
 * @example
 * ```javascript
 * // To edit name
 * const code = WPP.newsletter.edit({
 *   newsletterId: '[newsletter-id]@newsletter',
 *   name: 'New Name'
 * });
 *
 * // To edit description
 * const code = WPP.newsletter.edit({
 *   newsletterId: '[newsletter-id]@newsletter',
 *   description: 'New description'
 * });
 *
 * // To change picture
 * const code = WPP.newsletter.edit({
 *   newsletterId: '[newsletter-id]@newsletter',
 *   picture: '<base64_image>'
 * });
 *
 * // To remove picture
 * const code = WPP.newsletter.edit({
 *   newsletterId: '[newsletter-id]@newsletter',
 *   picture: null
 * });
 * ```
 *
 * @category Newsletter
 */
export async function edit(
  params: NewsletterEditInput
): Promise<NewsletterEditOutput> {
  const { newsletterId, name, description, picture } =
    newsletterEditSchema.parse(params);

  let pic: string | undefined = undefined;

  if (picture) {
    let base64 = picture;
    if (picture.includes('http'))
      ({ data: base64 } = await downloadImage(picture, 'image/jpeg'));

    const file = await convertToFile(base64 as string);
    const pictureFile = await resizeImage(file, {
      width: 640,
      height: 640,
      mimeType: 'image/jpeg',
      resize: 'cover',
    });
    pic = await blobToBase64(pictureFile);
  }

  await editNewsletterMetadataAction(
    await ensureNewsletter({
      newsletterId,
    }),
    {
      editDescription: description ? true : false,
      editName: name ? true : false,
      editPicture: pic || picture == null ? true : false,
    },
    {
      name: name,
      description: description,
      picture: picture == null ? null : pic,
    }
  );

  const result = await queryNewsletterMetadataByJid(newsletterId, {
    picture: true,
    description: true,
    name: true,
    state: true,
    creationTime: true,
  });
  return {
    idJid: result?.idJid,
    inviteCode: result?.newsletterInviteLinkMetadataMixin.inviteCode,
    inviteLink: `https://whatsapp.com/channel/${result?.newsletterInviteLinkMetadataMixin.inviteCode}`,
    name: result?.newsletterNameMetadataMixin?.nameElementValue,
    state: result?.newsletterStateMetadataMixin?.stateType,
    subscribersCount:
      result?.newsletterSubscribersMetadataMixin.subscribersCount,
    description:
      result?.newsletterDescriptionMetadataMixin
        ?.descriptionQueryDescriptionResponseMixin?.elementValue,
    timestamp: result?.newsletterCreationTimeMetadataMixin?.creationTimeValue,
  };
}
