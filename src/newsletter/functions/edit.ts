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

import { convertToFile, convertURLToJPEG } from '../../util';
import {
  editNewsletterMetadataAction,
  queryNewsletterMetadataByJid,
} from '../../whatsapp/functions';
import { ensureNewsletter } from './ensureNewsletter';

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
 * Edit the newsletter data
 *
 * @example
 * ```javascript
 * // To edit name
 * const code = WPP.newsletter.edit('[newsletter-id]@newsletter', {
 * name: 'New Name'
 * });
 *
 * // To edit description
 * const code = WPP.newsletter.edit('[newsletter-id]@newsletter', {
 * description: 'New description'
 * });
 *
 * // To change picture
 * const code = WPP.newsletter.edit('[newsletter-id]@newsletter', {
 * picture: '<base64_image>'
 * });
 *
 * // To remove picture
 * const code = WPP.newsletter.edit('[newsletter-id]@newsletter', {
 * picture: null
 * });
 * ```
 *
 * @category Newsletter
 */
export async function edit(
  newsletterId: string,
  opts: {
    name?: string;
    description?: string;
    picture?: string;
  }
): Promise<ResultCreateNewsletter> {
  let pic = undefined;
  if (opts?.picture) {
    pic = await convertToFile(opts.picture);
    pic = URL.createObjectURL(pic);
    pic = await convertURLToJPEG(pic);
  }

  await editNewsletterMetadataAction(
    await ensureNewsletter(newsletterId),
    {
      editDescription: opts.description ? true : false,
      editName: opts.name ? true : false,
      editPicture: pic || opts.picture == null ? true : false,
    },
    {
      name: opts.name,
      description: opts.description,
      picture: opts.picture == null ? null : pic,
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
