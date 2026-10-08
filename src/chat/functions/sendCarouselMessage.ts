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

import Debug from 'debug';

import { convertToFile, isBase64, isUrl, WPPError } from '../../util';
import { MediaPrep, MsgModel, MsgStore, OpaqueData, Wid } from '../../whatsapp';
import {
  createMsgProtobuf,
  getMediaPropsNew,
  uploadMediaWithPrep,
} from '../../whatsapp/functions';
import {
  defaultSendMessageOptions,
  RawMessage,
  SendMessageOptions,
  SendMessageReturn,
} from '..';
import { generateMessageID, getMessageById, sendRawMessage } from '.';
import {
  createNativeFlowButtons,
  MessageButtonsTypes,
  NativeFlowButtons,
} from './createNativeFlowButtons';

const debug = Debug('WA-JS:chat:sendCarouselMessage');

export interface CarouselCard {
  /** Image data/base64, a Blob/File, or an existing image message/ID. */
  image: string | Blob | File | MsgModel;
  title?: string;
  description: string;
  footer?: string;
  buttons: MessageButtonsTypes[];
}

export interface CarouselMessageOptions extends SendMessageOptions {
  body: string;
  footer?: string;
  cards: CarouselCard[];
}

interface ResolvedCarouselCard {
  card: CarouselCard;
  image: MsgModel;
  imageMessage: Record<string, unknown>;
  nativeFlow: NativeFlowButtons;
}

interface CarouselProtoCard {
  header: {
    hasMediaAttachment: true;
    imageMessage: Record<string, unknown>;
  };
  body: { text: string };
  footer?: { text: string };
  nativeFlowMessage: {
    buttons: NativeFlowButtons['buttons'];
    messageVersion: 1;
  };
}

/**
 * Send an image carousel. Images can be data URLs, base64, Blob, File, or
 * IDs/models of existing WhatsApp image messages. External HTTP URLs are not
 * accepted because WhatsApp Web can block them through its CSP.
 *
 * @example
 * ```javascript
 * await WPP.chat.sendCarouselMessage('[number]@c.us', {
 *   body: 'Choose a product',
 *   cards: [
 *     {
 *       image: 'data:image/jpeg;base64,...',
 *       title: 'Product 1',
 *       description: 'First product',
 *       footer: 'Tap to choose',
 *       buttons: [{ id: 'product-1', text: 'Choose' }]
 *     }
 *   ]
 * });
 * ```
 *
 * @category Message
 */
export async function sendCarouselMessage(
  chatId: string | Wid,
  options: CarouselMessageOptions
): Promise<SendMessageReturn> {
  validateCarouselCards(options.cards);

  const resolvedCards = await Promise.all(
    options.cards.map((card) => resolveCard(chatId, card))
  );
  const rawMessage: RawMessage = {
    type: 'interactive',
    caption: options.body,
    footer: options.footer,
    nativeFlowInteractiveMsg: true,
    nativeFlowName: 'mixed',
    interactiveType: 'carousel',
    interactivePayload: {
      cards: resolvedCards.map(createProtoCard),
      messageVersion: 1,
      carouselCardType: 1,
    },
  };
  const sendOptions = createSendOptions(options);
  const result = await sendRawMessage(chatId, rawMessage, sendOptions);
  const sentMessage = MsgStore.get(result.id);

  if (sentMessage) {
    try {
      await hydrateLocalCarousel(chatId, sentMessage, resolvedCards);
    } catch (error) {
      debug('Failed to hydrate the local carousel message: %O', error);
    }
  }

  return result;
}

function validateCarouselCards(cards: CarouselCard[]): void {
  if (!Array.isArray(cards)) {
    throw new WPPError(
      'carousel_cards_not_an_array',
      'Carousel cards must be an array'
    );
  }

  if (cards.length === 0 || cards.length > 100) {
    throw new WPPError(
      'carousel_cards_out_of_range',
      'Carousel must have between 1 and 100 cards'
    );
  }
}

async function resolveCard(
  chatId: string | Wid,
  card: CarouselCard
): Promise<ResolvedCarouselCard> {
  const image = await resolveImage(chatId, card.image);

  if (image.type !== 'image') {
    throw new WPPError(
      'carousel_card_media_not_image',
      'Carousel cards currently support only image messages',
      { messageId: image.id.toString(), type: image.type }
    );
  }

  return {
    card,
    image,
    imageMessage: getImageMessage(image),
    nativeFlow: createNativeFlowButtons(card.buttons),
  };
}

async function resolveImage(
  chatId: string | Wid,
  image: CarouselCard['image']
): Promise<MsgModel> {
  if (image instanceof MsgModel) return image;

  if (typeof image === 'string' && isUrl(image)) {
    throw new WPPError(
      'carousel_external_url_not_supported',
      'External image URLs can be blocked by WhatsApp Web; use base64, a data URL, Blob, File, or an existing image message'
    );
  }

  if (typeof image === 'string' && !isImageContent(image)) {
    return getMessageById(image);
  }

  const file = await convertToFile(image);

  if (!file.type.startsWith('image/')) {
    throw new WPPError(
      'carousel_card_media_not_image',
      'Carousel cards currently support only images',
      { mimetype: file.type }
    );
  }

  const opaqueData = await OpaqueData.createFromData(file, file.type);
  const mediaPrep = MediaPrep.prepRawMedia(opaqueData, { maxDimension: 1600 });
  const mediaProps = await getMediaPropsNew(mediaPrep, {
    type: 'image',
  });
  const message = new MsgModel({
    ...mediaProps,
    id: await generateMessageID(chatId),
    isNewMsg: true,
    type: 'image',
  });
  await message.waitForPrep();
  const upload = await uploadMediaWithPrep(message, {
    isMediaCryptoExpectedForChat: true,
    type: 'image',
  });
  const mediaEntry = upload.mediaResult.mediaEntry;

  if (!mediaEntry) {
    throw new WPPError(
      'carousel_image_upload_failed',
      'Could not upload the image for a carousel card'
    );
  }

  message.set({
    body: upload.body,
    deprecatedMms3Url: mediaEntry.deprecatedMms3Url,
    directPath: mediaEntry.directPath,
    encFilehash: mediaEntry.getEncfilehash(),
    filehash: message.mediaObject?.filehash,
    firstFrameSidecar: mediaEntry.firstFrameSidecar,
    mediaKey: mediaEntry.getMediaKey(),
    mediaKeyTimestamp: mediaEntry.getMediaKeyTimestamp(),
    size: message.mediaObject?.size,
    streamingSidecar: mediaEntry.sidecar,
    ...(upload.mmsThumbnailData ?? {}),
  });

  return message;
}

function isImageContent(image: string): boolean {
  return image.startsWith('data:') || isBase64(image);
}

function createSendOptions(
  options: CarouselMessageOptions
): SendMessageOptions {
  const { body, cards, footer, ...sendOptions } = options;
  void body;
  void cards;
  void footer;

  return {
    ...defaultSendMessageOptions,
    ...sendOptions,
  };
}

function getImageMessage(image: MsgModel): Record<string, unknown> {
  const mediaMetadata: Record<string, unknown> = {
    url: image.deprecatedMms3Url,
    directPath: image.directPath,
    filehash: image.filehash,
    encFilehash: image.encFilehash,
    mediaKey: image.mediaKey,
    mediaKeyTimestamp: image.mediaKeyTimestamp,
    mimetype: image.mimetype,
    width: image.mediaData?.fullWidth ?? image.width,
    height: image.mediaData?.fullHeight ?? image.height,
    thumbnailDirectPath: image.thumbnailDirectPath,
    thumbnailSha256: image.thumbnailSha256,
    thumbnailEncSha256: image.thumbnailEncSha256,
  };
  const protobuf = createMsgProtobuf(image, mediaMetadata);
  const imageMessage = findImageMessage(protobuf);

  if (!imageMessage) {
    throw new WPPError(
      'carousel_image_protobuf_not_found',
      'Could not create the image protobuf for a carousel card',
      { messageId: image.id.toString() }
    );
  }

  return imageMessage;
}

function findImageMessage(
  value: unknown,
  visited = new WeakSet<object>()
): Record<string, unknown> | null {
  if (!isRecord(value) || visited.has(value)) return null;
  visited.add(value);

  if (isRecord(value.imageMessage)) return value.imageMessage;

  for (const child of Object.values(value)) {
    const imageMessage = findImageMessage(child, visited);
    if (imageMessage) return imageMessage;
  }

  return null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function createProtoCard({
  card,
  imageMessage,
  nativeFlow,
}: ResolvedCarouselCard): CarouselProtoCard {
  return {
    header: {
      hasMediaAttachment: true,
      imageMessage: { ...imageMessage, caption: undefined },
    },
    body: { text: getCardText(card) },
    ...(card.footer ? { footer: { text: card.footer } } : {}),
    nativeFlowMessage: {
      buttons: nativeFlow.buttons,
      messageVersion: 1,
    },
  };
}

function getCardText(card: CarouselCard): string {
  return [card.title, card.description]
    .filter((part): part is string => Boolean(part))
    .join('\n');
}

async function hydrateLocalCarousel(
  chatId: string | Wid,
  sentMessage: MsgModel,
  cards: ResolvedCarouselCard[]
): Promise<void> {
  const parsedCards = await Promise.all(
    cards.map(async ({ card, image, nativeFlow }) => ({
      ...image.toJSON(),
      id: await generateMessageID(chatId),
      parentMsgId: sentMessage.id.clone(),
      from: sentMessage.from,
      to: sentMessage.to,
      self: 'out',
      t: sentMessage.t,
      ack: sentMessage.ack,
      local: true,
      isNewMsg: true,
      type: 'interactive',
      kind: 'interactive',
      caption: getCardText(card),
      footer: null,
      interactiveType: 'native_flow',
      interactivePayload: {
        buttons: nativeFlow.buttons,
        messageVersion: 1,
      },
      interactiveHeader: {
        title: null,
        subtitle: null,
        thumbnail: image.body,
        hasMediaAttachment: true,
        mediaType: 'IMAGE',
      },
      isCarouselCard: true,
      bloksWidget: null,
    }))
  );

  sentMessage.set('carouselCardsParsed', parsedCards);
}
