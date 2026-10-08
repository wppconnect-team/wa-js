/*!
 * Copyright 2026 WPPConnect Team
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

import { expect, test } from '@playwright/test';
import { existsSync, readFileSync } from 'fs';
import * as path from 'path';
import { ModuleKind, transpileModule } from 'typescript';
import { runInNewContext } from 'vm';

import { WPPError } from '../src/util/errors';

interface MessageKey {
  clone(): MessageKey;
  toString(): string;
}

interface MediaMessage {
  body: string;
  directPath: string;
  encFilehash: string;
  filehash: string;
  height: number;
  id: MessageKey;
  mediaData: {
    fullHeight: number;
    fullWidth: number;
  };
  mediaKey: string;
  mediaKeyTimestamp: number;
  mimetype: string;
  thumbnailDirectPath: string;
  thumbnailEncSha256: string;
  thumbnailSha256: string;
  type: 'image' | 'video';
  width: number;
  toJSON(): Record<string, unknown>;
}

interface SentMessage {
  ack: number;
  from: string;
  id: MessageKey;
  t: number;
  to: string;
  set(name: string, value: unknown): void;
}

interface SendResult {
  ack: number;
  id: string;
  sendMsgResult: null;
}

type SendCarouselMessage = (
  chatId: string,
  options: {
    body: string;
    cards: Array<{
      buttons: Array<{ id: string; text: string }>;
      description: string;
      footer?: string;
      image: string;
      title?: string;
    }>;
  }
) => Promise<SendResult>;

async function captureError(promise: Promise<unknown>): Promise<unknown> {
  try {
    await promise;
  } catch (error) {
    return error;
  }

  return undefined;
}

function loadSendCarouselMessage(mediaType: 'image' | 'video' = 'image') {
  const sourcePath = path.join(
    __dirname,
    '../src/chat/functions/sendCarouselMessage.ts'
  );
  const moduleExports: { sendCarouselMessage?: SendCarouselMessage } = {};

  if (!existsSync(sourcePath)) return moduleExports;

  const parentKey: MessageKey = {
    clone: () => parentKey,
    toString: () => 'true_123@c.us_PARENT',
  };
  const childKey: MessageKey = {
    clone: () => childKey,
    toString: () => 'true_123@c.us_CHILD',
  };
  const imageKey: MessageKey = {
    clone: () => imageKey,
    toString: () => 'true_123@c.us_IMAGE',
  };
  const image: MediaMessage = {
    body: 'thumbnail',
    directPath: '/image/path',
    encFilehash: 'enc-hash',
    filehash: 'hash',
    height: 600,
    id: imageKey,
    mediaData: { fullHeight: 600, fullWidth: 800 },
    mediaKey: 'media-key',
    mediaKeyTimestamp: 123,
    mimetype: 'image/jpeg',
    thumbnailDirectPath: '/thumbnail/path',
    thumbnailEncSha256: 'thumbnail-enc-hash',
    thumbnailSha256: 'thumbnail-hash',
    type: mediaType,
    width: 800,
    toJSON: () => ({ type: mediaType, filehash: 'hash' }),
  };
  const hydration: { name?: string; value?: unknown } = {};
  const sentMessage: SentMessage = {
    ack: 1,
    from: 'me@c.us',
    id: parentKey,
    t: 123,
    to: '123@c.us',
    set(name, value) {
      hydration.name = name;
      hydration.value = value;
    },
  };
  const captured: {
    events: string[];
    messageId?: string;
    rawMessage?: Record<string, unknown>;
    uploaded?: boolean;
  } = { events: [] };

  class TestMsgModel {
    body?: string;
    filehash?: string;
    id: MessageKey;
    mediaObject: { filehash: string; size: number };
    type: string;

    constructor(properties: Record<string, unknown>) {
      Object.assign(this, properties);
      this.id = properties.id as MessageKey;
      this.type = properties.type as string;
      this.mediaObject = { filehash: 'fresh-hash', size: 123 };
    }

    set(properties: Record<string, unknown>) {
      Object.assign(this, properties);
    }

    async waitForPrep() {
      captured.events.push('prepared');
    }

    toJSON() {
      return { type: this.type, filehash: this.filehash };
    }
  }

  runInNewContext(
    transpileModule(readFileSync(sourcePath, 'utf8'), {
      compilerOptions: { module: ModuleKind.CommonJS },
    }).outputText,
    {
      exports: moduleExports,
      require(id: string) {
        if (id === 'debug') return () => () => undefined;
        if (id === '../../util') {
          return {
            convertToFile: async () => ({ type: 'image/jpeg' }),
            isBase64: () => false,
            isUrl: (value: string) => value.startsWith('https://'),
            WPPError,
          };
        }
        if (id === '../../whatsapp') {
          return {
            MediaPrep: {
              prepRawMedia: () => ({}),
            },
            MsgModel: TestMsgModel,
            MsgStore: {
              get: (id: string) =>
                id === 'true_123@c.us_PARENT' ? sentMessage : undefined,
            },
            OpaqueData: {
              createFromData: async () => ({}),
            },
          };
        }
        if (id === '../../whatsapp/functions') {
          return {
            createMsgProtobuf: () => ({
              imageMessage: {
                directPath: '/image/path',
                fileSha256: 'hash',
              },
            }),
            getMediaPropsNew: async () => ({
              filehash: 'fresh-hash',
              height: 600,
              mimetype: 'image/jpeg',
              width: 800,
            }),
            uploadMediaWithPrep: async () => {
              captured.events.push('uploaded');
              captured.uploaded = true;
              return {
                body: 'fresh-thumbnail',
                mediaResult: {
                  mediaEntry: {
                    deprecatedMms3Url: 'https://mmg.whatsapp.net/fresh',
                    directPath: '/fresh/image/path',
                    firstFrameSidecar: undefined,
                    getEncfilehash: () => 'fresh-enc-hash',
                    getMediaKey: () => 'fresh-media-key',
                    getMediaKeyTimestamp: () => 456,
                    sidecar: undefined,
                  },
                },
                mmsThumbnailData: null,
              };
            },
          };
        }
        if (id === '..') {
          return { defaultSendMessageOptions: { waitForAck: true } };
        }
        if (id === '.') {
          return {
            generateMessageID: async () => childKey,
            getMessageById: async (id: string) => {
              captured.messageId = id;
              return image;
            },
            sendRawMessage: async (
              _chatId: string,
              rawMessage: Record<string, unknown>
            ) => {
              captured.rawMessage = rawMessage;
              return {
                ack: 1,
                id: 'true_123@c.us_PARENT',
                sendMsgResult: null,
              };
            },
          };
        }
        if (id === './createNativeFlowButtons') {
          const nativeFlowExports: Record<string, unknown> = {};
          runInNewContext(
            transpileModule(
              readFileSync(
                path.join(
                  __dirname,
                  '../src/chat/functions/createNativeFlowButtons.ts'
                ),
                'utf8'
              ),
              { compilerOptions: { module: ModuleKind.CommonJS } }
            ).outputText,
            {
              exports: nativeFlowExports,
              require(dependency: string) {
                if (dependency === '../../util') return { WPPError };
                throw new Error(`Unexpected dependency: ${dependency}`);
              },
            }
          );
          return nativeFlowExports;
        }
        throw new Error(`Unexpected dependency: ${id}`);
      },
    }
  );

  return { captured, hydration, moduleExports };
}

test('exports a carousel API that sends native cards and hydrates the local message', async () => {
  const loaded = loadSendCarouselMessage();

  expect(typeof loaded.moduleExports?.sendCarouselMessage).toBe('function');

  const result = await loaded.moduleExports!.sendCarouselMessage!('123@c.us', {
    body: 'Choose a product',
    cards: [
      {
        image: 'true_123@c.us_IMAGE',
        title: 'Product 1',
        description: 'First product',
        footer: 'Tap to choose',
        buttons: [{ id: 'product-1', text: 'Choose' }],
      },
    ],
  });

  expect(result.id).toBe('true_123@c.us_PARENT');
  expect(loaded.captured?.rawMessage).toMatchObject({
    type: 'interactive',
    caption: 'Choose a product',
    nativeFlowInteractiveMsg: true,
    nativeFlowName: 'mixed',
    interactiveType: 'carousel',
    interactivePayload: {
      messageVersion: 1,
      carouselCardType: 1,
      cards: [
        {
          header: {
            hasMediaAttachment: true,
            imageMessage: {
              directPath: '/image/path',
              fileSha256: 'hash',
            },
          },
          body: { text: 'Product 1\nFirst product' },
          footer: { text: 'Tap to choose' },
          nativeFlowMessage: {
            messageVersion: 1,
            buttons: [{ name: 'quick_reply' }],
          },
        },
      ],
    },
  });
  expect(loaded.hydration?.name).toBe('carouselCardsParsed');
  expect(loaded.hydration?.value).toEqual([
    expect.objectContaining({
      type: 'interactive',
      caption: 'Product 1\nFirst product',
      isCarouselCard: true,
      interactiveHeader: expect.objectContaining({
        hasMediaAttachment: true,
        mediaType: 'IMAGE',
      }),
    }),
  ]);
  const hydratedCards = loaded.hydration?.value as Array<{
    parentMsgId: MessageKey;
  }>;
  expect(hydratedCards[0].parentMsgId.toString()).toBe('true_123@c.us_PARENT');
});

test('rejects an empty carousel before sending', async () => {
  const loaded = loadSendCarouselMessage();
  const sendCarouselMessage = loaded.moduleExports.sendCarouselMessage;

  expect(sendCarouselMessage).toBeDefined();
  const error = await captureError(
    sendCarouselMessage!('123@c.us', {
      body: 'Choose a product',
      cards: [],
    })
  );

  expect(error).toMatchObject({ code: 'carousel_cards_out_of_range' });
  expect(loaded.captured.rawMessage).toBeUndefined();
});

test('rejects a card that references a non-image message', async () => {
  const loaded = loadSendCarouselMessage('video');
  const sendCarouselMessage = loaded.moduleExports.sendCarouselMessage;

  expect(sendCarouselMessage).toBeDefined();
  const error = await captureError(
    sendCarouselMessage!('123@c.us', {
      body: 'Choose a product',
      cards: [
        {
          image: 'true_123@c.us_VIDEO',
          description: 'Video is unsupported',
          buttons: [{ id: 'product-1', text: 'Choose' }],
        },
      ],
    })
  );

  expect(error).toMatchObject({ code: 'carousel_card_media_not_image' });
  expect(loaded.captured.rawMessage).toBeUndefined();
});

test('prepares and uploads image content without requiring an existing message', async () => {
  const loaded = loadSendCarouselMessage();
  const sendCarouselMessage = loaded.moduleExports.sendCarouselMessage;

  expect(sendCarouselMessage).toBeDefined();
  await sendCarouselMessage!('123@c.us', {
    body: 'Choose a product',
    cards: [
      {
        image: 'data:image/jpeg;base64,ZmFrZQ==',
        description: 'Uploaded directly',
        buttons: [{ id: 'product-1', text: 'Choose' }],
      },
    ],
  });

  expect(loaded.captured.messageId).toBeUndefined();
  expect(loaded.captured.uploaded).toBe(true);
  expect(loaded.captured.events).toEqual(['prepared', 'uploaded']);
  expect(loaded.captured.rawMessage).toMatchObject({
    interactivePayload: {
      cards: [
        {
          header: {
            imageMessage: {
              directPath: '/image/path',
            },
          },
        },
      ],
    },
  });
});

test('rejects external image URLs before upload', async () => {
  const loaded = loadSendCarouselMessage();
  const sendCarouselMessage = loaded.moduleExports.sendCarouselMessage;

  expect(sendCarouselMessage).toBeDefined();
  const error = await captureError(
    sendCarouselMessage!('123@c.us', {
      body: 'Choose a product',
      cards: [
        {
          image: 'https://example.com/product.jpg',
          description: 'External image',
          buttons: [{ id: 'product-1', text: 'Choose' }],
        },
      ],
    })
  );

  expect(error).toMatchObject({
    code: 'carousel_external_url_not_supported',
  });
  expect(loaded.captured.uploaded).toBeUndefined();
});
