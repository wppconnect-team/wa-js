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

import { blobToBase64, convertToFile, resizeImage } from '../../util';
import { UserPrefs } from '../../whatsapp';
import { sendSetPicture } from '../../whatsapp/functions';

/**
 * Update your profile picture
 *
 * @example
 * ```javascript
 * await WPP.profile.setMyProfilePicture('Example text');
 * ```
 *
 * @category Chat
 */

export async function setMyProfilePicture(content: string): Promise<{
  eurl: string;
  status: number;
  tag: string;
  token: string;
  _duplicate: boolean;
}> {
  const file = await convertToFile(content);

  const thumbFile = await resizeImage(file, {
    width: 96,
    height: 96,
    mimeType: 'image/jpeg',
    resize: 'cover',
  });

  const pictureFile = await resizeImage(file, {
    width: 640,
    height: 640,
    mimeType: 'image/jpeg',
    resize: 'cover',
  });

  const thumbBase64 = await blobToBase64(thumbFile);
  const pictureBase64 = await blobToBase64(pictureFile);

  const me = UserPrefs.getMaybeMeUser();
  return sendSetPicture(me, thumbBase64, pictureBase64);
}
