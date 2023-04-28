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

import {
  fetchRemoteLinkPreviewData,
  generateThumbnailLinkPreviewData,
} from '../../util/linkPreview';
import * as webpack from '../../webpack';
import { wrapModuleFunction } from '../../whatsapp/exportModule';
import {
  fetchLinkPreview,
  findFirstWebLink,
  genMinimalLinkPreview,
  getABPropConfigValue,
} from '../../whatsapp/functions';
import { RawMessage } from '..';

export interface LinkPreviewOptions {
  /**
   * Send text message with link preview
   *
   * @default true
   *
   * @example
   * ```javascript
   * // Automatic detection
   * WPP.chat.sendTextMessage('[number]@c.us', 'See https://www.youtube.com/watch?v=v1PBptSDIh8');
   *
   * // Overriding the title and description
   * WPP.chat.sendTextMessage('[number]@c.us', 'See https://www.youtube.com/watch?v=v1PBptSDIh8', {
   *   linkPreview: {
   *     title: 'Another text',
   *     description: 'Another description'
   *   }
   * });
   * ```
   */
  linkPreview?:
    | boolean
    | {
        title?: string;
        description?: string;
        canonicalUrl?: string;
        matchedText?: string;
        richPreviewType?: number;
        thumbnail?: string;
        doNotPlayInline: boolean;
      };
}

/**
 * Prepare a message for link preview
 *
 * @category Message
 * @internal
 */
export async function prepareLinkPreview<T extends RawMessage>(
  message: T,
  options: LinkPreviewOptions
): Promise<T> {
  if (!options.linkPreview) {
    return message as any;
  }

  if (options.linkPreview) {
    const override =
      typeof options.linkPreview === 'object' ? options.linkPreview : {};

    const text = message.type === 'chat' ? message.body : '';

    if (text) {
      try {
        const link = findFirstWebLink(text);
        if (link) {
          const preview = await fetchLinkPreview(link);
          if (preview?.data) {
            options.linkPreview = { ...preview.data, ...override };
          }
        }
      } catch (error) {}
    }
  }

  if (typeof options.linkPreview === 'object') {
    message.subtype = 'url';
    message = {
      ...message,
      ...options.linkPreview,
    };
  }

  return message;
}

webpack.onReady(() => {
  wrapModuleFunction(getABPropConfigValue, (func, ...args) => {
    const [key] = args;
    switch (key) {
      case 'high_quality_link_preview_enabled':
        return true;
      case 'link_preview_wait_time':
        return 1;
    }
    return func(...args);
  });

  wrapModuleFunction(genMinimalLinkPreview, async (func, ...args) => {
    const [uri] = args;

    const url = typeof uri === 'string' ? uri : uri.url;

    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      try {
        const previewData = await fetchRemoteLinkPreviewData(url);

        if (!previewData) {
          throw new Error(`preview not found for ${url}`);
        }

        const { imageUrl, ...data } = previewData;

        let thumbnailData: any = {};
        if (imageUrl) {
          thumbnailData = await generateThumbnailLinkPreviewData(
            imageUrl
          ).catch(() => null);
        }

        const result = {
          url: url,
          data: {
            ...data,
            ...thumbnailData,
          },
        };

        resolve(result);
      } catch (error) {
        resolve(func(...args));
      }
    });
  });
});
