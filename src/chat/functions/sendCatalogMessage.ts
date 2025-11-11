/*!
 * Copyright 2024 WPPConnect Team
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
import { downloadImage } from '../../util';
import { CatalogStore, Wid } from '../../whatsapp';
import {
  defaultSendMessageOptions,
  RawMessage,
  SendMessageOptions,
  SendMessageReturn,
} from '..';
import { sendRawMessage } from '.';

export interface CatalogMessageOptions extends SendMessageOptions {
  jpegThumbnail?: string;
  title?: string;
  description?: string;
  textMessage?: string;
}

/**
 * Send catalog message
 *
 * @example
 * ```javascript
 * WPP.chat.sendCatalogMessage(
 *  '[number]@c.us',
 *  '[number]@c.us',
 * {
 *   title: 'My Catalog',
 *   description: 'This is my catalog',
 *   textMessage: 'Check out my catalog',
 *   jpegThumbnail: 'data:image/jpeg;base64,...'
 * }
 * );
 * ```
 *
 * @category Message
 */
export async function sendCatalogMessage(
  chatToSend: string | Wid,
  chatFromCatalog: string | Wid,
  opts: CatalogMessageOptions
): Promise<SendMessageReturn> {
  const options = {
    ...defaultSendMessageOptions,
    ...opts,
  };
  chatToSend = assertWid(chatToSend);
  chatFromCatalog = assertWid(chatFromCatalog);
  const catalog = CatalogStore.get(chatFromCatalog);

  if (!options.jpegThumbnail) {
    const url = (catalog?.productCollection as any)?._models[0]?.imageCdnUrl;
    if (url) {
      try {
        const download = await downloadImage(url);
        options.jpegThumbnail = download.data.split(',', 2)[1];
      } catch (_error) {}
    }
  }

  const catalogLink = `https://wa.me/c/${chatFromCatalog.toString().split('@')[0]}`;
  let rawMessage: RawMessage = {};
  rawMessage = {
    type: 'chat',
    description: options?.description ?? 'Learn more about this catalog',
    matchedText: catalogLink,
    subtype: 'url',
    thumbnail: options.jpegThumbnail,
    thumbnailHeight: options.jpegThumbnail ? 100 : undefined,
    thumbnailWidth: options.jpegThumbnail ? 100 : undefined,
    title: options?.title ?? `View catalog on WhatsApp`,
    body: options.textMessage
      ? `${options.textMessage}\n${catalogLink}`
      : catalogLink,
    richPreviewType: 0,
  } as any;
  return await sendRawMessage(chatToSend, rawMessage, options);
}
