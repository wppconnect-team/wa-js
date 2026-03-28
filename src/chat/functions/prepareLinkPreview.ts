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

import { z } from 'zod';

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

export const linkPreviewOptionsSchema = z.object({
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
  linkPreview: z
    .union([
      z.boolean(),
      z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        canonicalUrl: z.string().optional(),
        matchedText: z.string().optional(),
        richPreviewType: z.number().optional(),
        thumbnail: z.string().optional(),
        doNotPlayInline: z.boolean(),
      }),
    ])
    .optional(),
});

export type LinkPreviewOptions = z.infer<typeof linkPreviewOptionsSchema>;

const chatPrepareLinkPreviewSchema = z.object({
  message: z.custom<RawMessage>(),
  options: linkPreviewOptionsSchema,
});
export type ChatPrepareLinkPreviewInput = z.infer<
  typeof chatPrepareLinkPreviewSchema
>;
export type ChatPrepareLinkPreviewOutput = RawMessage;

/**
 * Prepare a message for link preview
 *
 * @category Message
 * @internal
 */
export async function prepareLinkPreview(
  params: ChatPrepareLinkPreviewInput
): Promise<ChatPrepareLinkPreviewOutput> {
  const { message: rawMessage, options } =
    chatPrepareLinkPreviewSchema.parse(params);

  let message: RawMessage = rawMessage;

  if (!options.linkPreview) {
    return message;
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
      } catch (_error) {}
    }
  }

  if (typeof options.linkPreview === 'object') {
    message.subtype = 'url';
    message = {
      ...message,
      ...(options.linkPreview as Partial<RawMessage>),
    };
  }

  return message;
}

webpack.onFullReady(() => {
  wrapModuleFunction(getABPropConfigValue, (func, ...args) => {
    const [key] = args;
    switch (key) {
      case 'link_preview_wait_time':
        return 7;
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
      } catch (_error) {
        resolve(await func(...args));
      }
    });
  });
});
