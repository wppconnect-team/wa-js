/*!
 * Copyright 2021 WPPConnect Team
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

import { assertWid } from '../../assert';
import { ProfilePicThumbStore, Wid } from '../../whatsapp';
import { getImg, getImgFull } from '../../whatsapp/functions';

/**
 * Get the current text status
 *
 * @example
 * ```javascript
 * const url = await WPP.contact.getProfilePictureUrl('[number]@c.us');
 * ```
 *
 * @category Contact
 */

export async function getProfilePictureUrl(
  contactId: string | Wid,
  full = true
) {
  const wid = assertWid(contactId);

  const profilePic = await ProfilePicThumbStore.find(wid);

  if (!profilePic) {
    return;
  }

  // WAWebProfilePicThumbModel lost its derived img/imgFull around WA
  // 2.3000.1048; resolve through the getters module on newer builds and
  // keep the model properties as the fallback for older ones.
  // TODO: drop the model fallback when those versions are no longer
  // available in wa-version/html.
  if (full) {
    if (typeof getImgFull === 'function') {
      return getImgFull(profilePic) ?? profilePic.imgFull;
    }
    return profilePic.imgFull;
  }

  if (typeof getImg === 'function') {
    return getImg(profilePic) ?? profilePic.img;
  }
  return profilePic.img;
}
