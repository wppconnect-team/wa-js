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

import { blobToBase64, convertToFile, resizeImage, WPPError } from '../../util';
import { Wid } from '../../whatsapp';
import { sendSetPicture } from '../../whatsapp/functions';
import { ensureGroup, iAmRestrictedMember } from './';

/**
 * Set the group icon (group profile picture)
 *
 * @example
 * ```javascript
 * await WPP.group.setIcon('[group@g.us]', 'data:image/jpeg;base64,.....');
 * ```
 */
export async function setIcon(
  groupId: string | Wid,
  content: string
): Promise<{
  eurl: string;
  status: number;
  tag: string;
  token: string;
  _duplicate: boolean;
}> {
  const groupChat = await ensureGroup(groupId);

  if (await iAmRestrictedMember(groupId)) {
    throw new WPPError(
      'group_you_are_restricted_member',
      `You are a restricted member in ${groupChat.id._serialized}`
    );
  }

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

  return sendSetPicture(groupChat.id, thumbBase64, pictureBase64);
}
