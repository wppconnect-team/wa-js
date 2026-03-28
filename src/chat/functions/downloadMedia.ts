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

import Debug from 'debug';
import { z } from 'zod';

import { toArrayBuffer, WPPError } from '../../util';
import { LruMediaStore, MediaBlobCache } from '../../whatsapp';
import { getMessageById } from '.';

const debug = Debug('WA-JS:chat:downloadMedia');

const chatDownloadMediaSchema = z.object({
  msgId: z.string(),
});
export type ChatDownloadMediaInput = z.infer<typeof chatDownloadMediaSchema>;
export type ChatDownloadMediaOutput = Blob;

/**
 * Download the blob of a media message
 *
 * ```javascript
 * // Get a blob file
 * await WPP.chat.downloadMedia({ msgId: 'true_[number]@c.us_ABCDEF' });
 *
 * // Get a base64Content
 * await WPP.chat.downloadMedia({ msgId: 'true_[number]@c.us_ABCDEF' }).then(WPP.util.blobToBase64);
 * ```
 *
 * @category Message
 */
export async function downloadMedia(
  params: ChatDownloadMediaInput
): Promise<ChatDownloadMediaOutput> {
  const { msgId } = chatDownloadMediaSchema.parse(params);
  const msg = await getMessageById({ id: msgId });

  if (!msg.mediaData) {
    throw new WPPError(
      'message_not_contains_media',
      `Message ${msgId} not contains media`,
      {
        msgId,
      }
    );
  }

  const mediaData = msg.mediaData;

  const getFromCache = async () => {
    const filehash = mediaData.filehash;

    // 1) Persistent cache (used by WhatsApp Web download manager) (LruMediaStore)
    if (filehash && typeof LruMediaStore?.get === 'function') {
      const cachedBuffer = await LruMediaStore.get(filehash).catch(() => null);
      const cachedArrayBuffer = toArrayBuffer(cachedBuffer);
      if (cachedArrayBuffer) {
        debug('Media found in LruMediaStore cache for filehash', filehash);
        return new Blob([cachedArrayBuffer], {
          type: mediaData.mimetype || 'application/octet-stream',
        });
      }
    }

    // 2) In-memory cache (MediaBlobCache); this is only available when chat is opened
    if (filehash && MediaBlobCache?.has?.(filehash)) {
      debug('Media found in MediaBlobCache for filehash', filehash);
      return MediaBlobCache.get(filehash);
    }

    // 3) Already attached opaque data
    if (mediaData.mediaBlob) {
      const cachedBlob = mediaData.mediaBlob.forceToBlob();
      if (cachedBlob) {
        debug('Media found in mediaBlob for message', msgId);
        return cachedBlob;
      }
    }

    return null;
  };

  const cached = await getFromCache();

  if (cached) {
    return cached;
  }

  debug('Downloading media for message', msgId);
  await msg.downloadMedia({
    downloadEvenIfExpensive: true,
    rmrReason: 1,
    isUserInitiated: true,
  });

  const blob = await getFromCache();

  if (!blob && msg.mediaObject?.type === 'VIDEO') {
    debug('Retrying download as document for message', msgId);
    try {
      msg.type = 'document';
      msg.mediaObject.type = 'DOCUMENT';
      return await downloadMedia({ msgId });
    } finally {
      msg.type = 'video';
      msg.mediaObject.type = 'VIDEO';
    }
  }

  if (!blob) {
    debug('Media not found after download for message', msgId);
    throw {
      error: true,
      code: 'media_not_found',
      message: 'Media not found',
    };
  }

  return blob;
}
