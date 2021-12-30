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

import { WPPError } from '../../util';
import { MediaBlobCache } from '../../whatsapp';
import { getMessageById } from '.';

/**
 * Download the blob of a media message
 *
 * @category Message
 */
export async function downloadMedia(id: string): Promise<any> {
  const msg = await getMessageById(id);

  if (!msg.mediaData) {
    throw new WPPError(
      'message_not_contains_media',
      `Message ${id} not contains media`,
      {
        id,
      }
    );
  }

  await msg.downloadMedia({
    downloadEvenIfExpensive: true,
    rmrReason: 1,
    isUserInitiated: true,
  });

  let blob = null;

  if (msg.mediaData.mediaBlob) {
    blob = msg.mediaData.mediaBlob.forceToBlob();
  } else if (msg.mediaData.filehash) {
    blob = MediaBlobCache.get(msg.mediaData.filehash);
  }

  if (!blob) {
    throw {
      error: true,
      code: 'media_not_found',
      message: 'Media not found',
    };
  }

  return blob;
}
