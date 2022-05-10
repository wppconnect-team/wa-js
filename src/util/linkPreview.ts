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

import { Base64, Clock, OpaqueData } from '../whatsapp';
import { uploadThumbnail } from '../whatsapp/functions';
import { downloadImage } from './downloadImage';
import { fetchDataFromPNG } from './fetchDataFromPNG';

const debug = Debug('WA-JS:link-preview');

/**
 * Server Source: wa-js-api-server
 * @see https://github.com/wppconnect-team/wa-js-api-server
 *
 * An article about how this server work: https://www.secjuice.com/hiding-javascript-in-png-csp-bypass/
 */
const apiServers = [
  'https://linkpreview.ddns.info',
  'https://linkpreview.eletroinfo.site',
  'https://linkpreview.hps.net.br:2053',
  'https://wajsapi.titanwhats.com.br',
  'https://wppc-linkpreview.cloudtrix.com.br',
  'https://wppserver.comunicabh.com.br',
];

const thumbHeight = 100;
const thumbWidth = 140;

shuffleArray(apiServers);

/**
 * Fetch preview link data from a remote server
 */
export async function fetchRemoteLinkPreviewData(url: string) {
  const textDecoder = new TextDecoder();

  while (apiServers.length > 0) {
    const server = apiServers[0];

    debug(`Fetching link preview using ${server}`, url);

    const imageUrl =
      `${server}/v1/link-preview/fetch-data.png?url=` + encodeURI(url);

    const data = await fetchDataFromPNG(imageUrl)
      .then((text) => textDecoder.decode(text))
      .then((text) => JSON.parse(text))
      .catch(() => null);

    // Discard servers with bad response
    if (data === null || (!('title' in data) && !('status' in data))) {
      debug(`The server ${server} is unavailable for link preview`);
      apiServers.shift();
      continue;
    }

    if (!data.title && data.status !== 200) {
      return null;
    }

    const isVideo = /^video/.test(data.mediaType);

    return {
      title: data.title,
      description: data.description,
      canonicalUrl: data.url,
      matchedText: url,
      richPreviewType: isVideo ? 1 : 0,
      doNotPlayInline: !isVideo,
      imageUrl: data.image,
    };
  }

  return null;
}

/**
 * Generate a thumbnail in base64 format
 */
function generateThumbnail(url: string) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;

    img.onerror = reject;
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;

        canvas.width = thumbWidth;
        canvas.height = thumbWidth;

        const min = Math.min(img.width, img.height);

        const sx = (img.width - min) / 2;
        const sy = (img.height - min) / 2;

        ctx.drawImage(img, sx, sy, min, min, 0, 0, thumbWidth, thumbWidth);

        resolve(
          canvas
            .toDataURL('image/jpeg')
            .replace(/^data:image\/jpeg;base64,/, '')
        );
      } catch (e) {
        reject();
      }
    };
  });
}

/**
 * Generate the preview link thumbnail data
 */
export async function generateThumbnailLinkPreviewData(url: string) {
  if (!apiServers[0]) {
    return null;
  }

  const server = apiServers[0];

  debug(`Downloading the preview image using ${server}`, url);

  const downloadUrl =
    `${server}/v1/link-preview/download-image?url=` + encodeURI(url);

  const download = await downloadImage(downloadUrl).catch(() => null);

  // Ignore image not found
  if (!download) {
    return null;
  }

  // Ignore too small image
  if (download.width < thumbWidth || download.height < thumbHeight) {
    return null;
  }

  const thumbnail = await generateThumbnail(download.data);

  // Only display High Quality in link preview for wide images
  if (download.width / download.height < 1.4) {
    return {
      thumbnail,
    };
  }

  const thumbnailHQ = download.data.replace('data:image/jpeg;base64,', '');

  const opaque = await OpaqueData.createFromBase64Jpeg(thumbnailHQ);

  const e = new Uint8Array(32);
  const mediaKeyInfo =
    (window.crypto.getRandomValues(e),
    {
      key: Base64.encodeB64(e),
      timestamp: Clock.globalUnixTime(),
    });

  const abort = new AbortController();

  const mediaData = await uploadThumbnail({
    thumbnail: opaque,
    mediaType: 'thumbnail-link',
    mediaKeyInfo: mediaKeyInfo,
    uploadOrigin: 1,
    forwardedFromWeb: false,
    signal: abort.signal,
    timeout: 3000,
    isViewOnce: false,
  });

  const mediaEntry = mediaData.mediaEntry;

  return {
    thumbnail,
    thumbnailHQ,
    mediaKey: mediaEntry.mediaKey,
    mediaKeyTimestamp: mediaEntry.mediaKeyTimestamp,
    thumbnailDirectPath: mediaEntry.directPath,
    thumbnailSha256: mediaData.filehash,
    thumbnailEncSha256: mediaEntry.encFilehash,
    thumbnailWidth: download.width,
    thumbnailHeight: download.height,
  };
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
