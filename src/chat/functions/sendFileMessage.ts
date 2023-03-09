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

import { assertFindChat, assertGetChat } from '../../assert';
import { blobToArrayBuffer, getVideoInfoFromBuffer } from '../../util';
import { convertToFile } from '../../util/convertToFile';
import * as webpack from '../../webpack';
import { MediaPrep, MsgModel, OpaqueData } from '../../whatsapp';
import { wrapModuleFunction } from '../../whatsapp/exportModule';
import {
  generateVideoThumbsAndDuration,
  isAnimatedWebp,
  processRawSticker,
} from '../../whatsapp/functions';
import {
  defaultSendMessageOptions,
  RawMessage,
  SendMessageOptions,
  SendMessageReturn,
} from '..';
import {
  markIsRead,
  MessageButtonsOptions,
  prepareMessageButtons,
  prepareRawMessage,
} from '.';
import { prepareAudioWaveform } from './prepareAudioWaveform';

const debug = Debug('WA-JS:message');

export interface FileMessageOptions extends SendMessageOptions {
  type?: string;
  caption?: string;
  footer?: string;
  filename?: string;
  mimetype?: string;
}

export interface AutoDetectMessageOptions extends FileMessageOptions {
  type: 'auto-detect';
}

/**
 * Send an audio message as a PTT, like a recorded message
 *
 * @example
 * ```javascript
 * // PTT audio
 * WPP.chat.sendFileMessage(
 *  '[number]@c.us',
 *  'data:audio/mp3;base64,<a long base64 file...>',
 *  {
 *    type: 'audio',
 *    isPtt: true // false for common audio
 *  }
 * );
 * ```
 */
export interface AudioMessageOptions extends FileMessageOptions {
  type: 'audio';
  isPtt?: boolean;
  /**
   * Send an audio message as a PTT with waveform
   *
   * @example
   * ```javascript
   * // Enable waveform
   * WPP.chat.sendFileMessage(
   *  '[number]@c.us',
   *  'data:audio/mp3;base64,<a long base64 file...>',
   *  {
   *    type: 'audio',
   *    isPtt: true,
   *    waveform: true // false to disable
   *  }
   * );
   * // Disable waveform
   * WPP.chat.sendFileMessage(
   *  '[number]@c.us',
   *  'data:audio/mp3;base64,<a long base64 file...>',
   *  {
   *    type: 'audio',
   *    isPtt: true,
   *    waveform: false
   *  }
   * );
   * ```
   */
  waveform?: boolean;
}

export interface DocumentMessageOptions
  extends FileMessageOptions,
    MessageButtonsOptions {
  type: 'document';
}

export interface ImageMessageOptions
  extends FileMessageOptions,
    MessageButtonsOptions {
  type: 'image';
  isViewOnce?: boolean;
}

export interface StickerMessageOptions extends FileMessageOptions {
  type: 'sticker';
}

export interface VideoMessageOptions
  extends FileMessageOptions,
    MessageButtonsOptions {
  type: 'video';
  isGif?: boolean;
}

/**
 * Send a file message, that can be an audio, document, image, sticker or video
 *
 * @example
 * ```javascript
 * // Single document
 * WPP.chat.sendFileMessage(
 *  '[number]@c.us',
 *  'data:application/msword;base64,<a long base64 file...>',
 *  {
 *    type: 'document',
 *    caption: 'My document', // Optional
 *    filename: 'myfile.doc', // Optional
 *    mimetype: 'application/msword' // Optional
 *  }
 * );
 *
 * // Image with view once
 * WPP.chat.sendFileMessage(
 *  '[number]@c.us',
 *  'data:image/jpeg;base64,<a long base64 file...>',
 *  {
 *    type: 'image',
 *    caption: 'My image', // Optional
 *    isViewOnce: true
 *  }
 * );
 *
 * // PTT audio
 * WPP.chat.sendFileMessage(
 *  '[number]@c.us',
 *  'data:audio/mp3;base64,<a long base64 file...>',
 *  {
 *    type: 'audio',
 *    isPtt: true // false for common audio
 *  }
 * );
 *
 * // Image with view buttons
 * WPP.chat.sendFileMessage(
 *  '[number]@c.us',
 *  'data:image/jpeg;base64,<a long base64 file...>',
 *  {
 *    type: 'image',
 *    caption: 'My image'
 *    buttons: [
 *      {
 *        id: 'your custom id 1',
 *        text: 'Some text'
 *      },
 *      {
 *        id: 'another id 2',
 *        text: 'Another text'
 *      }
 *    ],
 *    footer: 'Footer text' // Optional
 *  }
 * );
 *
 * // Image as Sticker
 * WPP.chat.sendFileMessage(
 *   '[number]@c.us',
 *   'data:image/png;base64,<a long base64 file...>',
 *   {
 *     type: 'sticker'
 *   }
 * );
 * ```
 * @category Message
 * @return  {SendMessageReturn} The result
 */
export async function sendFileMessage(
  chatId: any,
  content: string | Blob | File,
  options:
    | AutoDetectMessageOptions
    | AudioMessageOptions
    | DocumentMessageOptions
    | ImageMessageOptions
    | VideoMessageOptions
    | StickerMessageOptions
): Promise<SendMessageReturn> {
  options = {
    ...defaultSendMessageOptions,
    ...{
      type: 'auto-detect',
      waveform: true,
    },
    ...options,
  };

  const chat = options.createChat
    ? await assertFindChat(chatId)
    : assertGetChat(chatId);

  const file = await convertToFile(content, options.mimetype, options.filename);

  const filename = file.name;

  const opaqueData = await OpaqueData.createFromData(file, file.type);

  const rawMediaOptions: {
    isPtt?: boolean;
    asDocument?: boolean;
    asGif?: boolean;
    isAudio?: boolean;
    asSticker?: boolean;
    precomputedFields?: {
      duration: number;
      waveform: Uint8Array;
    };
  } = {};

  let isViewOnce: boolean | undefined;

  if (options.type === 'audio') {
    rawMediaOptions.isPtt = options.isPtt;
    rawMediaOptions.precomputedFields = await prepareAudioWaveform(
      options as any,
      file
    );
  } else if (options.type === 'image') {
    isViewOnce = options.isViewOnce;
  } else if (options.type === 'video') {
    rawMediaOptions.asGif = options.isGif;
  } else if (options.type === 'document') {
    rawMediaOptions.asDocument = true;
  } else if (options.type === 'sticker') {
    rawMediaOptions.asSticker = true;
  }

  const mediaPrep = MediaPrep.prepRawMedia(opaqueData, rawMediaOptions);

  // The generated message in `sendToChat` is merged with `productMsgOptions`
  let rawMessage = await prepareRawMessage<RawMessage>(
    chat,
    {
      caption: options.caption || filename,
      filename: filename,
      footer: options.footer,
    },
    options
  );

  rawMessage = prepareMessageButtons(rawMessage, options as any);

  if (options.markIsRead) {
    debug(`marking chat is read before send file`);
    // Try to mark is read and ignore errors
    await markIsRead(chat.id).catch(() => null);
  }

  await mediaPrep.waitForPrep();

  debug(`sending message (${options.type}) with id ${rawMessage.id}`);
  const sendMsgResult = mediaPrep.sendToChat(chat, {
    caption: options.caption,
    footer: options.footer,
    isViewOnce,
    productMsgOptions: rawMessage,
  });

  // Wait for message register
  const message = await new Promise<MsgModel>((resolve) => {
    chat.msgs.on('add', function fn(msg: MsgModel) {
      if (msg.id === rawMessage.id) {
        chat.msgs.off('add', fn);
        resolve(msg);
      }
    });
  });
  debug(`message file ${message.id} queued`);

  function uploadStage(mediaData: any, stage: string) {
    debug(`message file ${message.id} is ${stage}`);
  }

  message.on('change:mediaData.mediaStage', uploadStage);

  sendMsgResult.finally(() => {
    message.off('change:mediaData.mediaStage', uploadStage);
  });

  if (options.waitForAck) {
    debug(`waiting ack for ${message.id}`);

    const sendResult = await sendMsgResult;

    debug(
      `ack received for ${message.id} (ACK: ${message.ack}, SendResult: ${sendResult})`
    );
  }

  return {
    id: message.id.toString(),
    ack: message.ack!,
    sendMsgResult,
  };
}

/**
 * Generate a white thumbnail as WhatsApp generate for video files
 */
function generateWhiteThumb(width: number, height: number, maxSize: number) {
  let r = null != height ? height : maxSize,
    i = null != width ? width : maxSize;
  r > i
    ? r > maxSize && ((i *= maxSize / r), (r = maxSize))
    : i > maxSize && ((r *= maxSize / i), (i = maxSize));

  const bounds = { width: Math.max(r, 1), height: Math.max(i, 1) };

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  canvas.width = bounds.width;
  canvas.height = bounds.height;

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  return {
    url: canvas.toDataURL('image/jpeg'),
    width: bounds.width,
    height: bounds.height,
    fullWidth: width,
    fullHeight: height,
  };
}

webpack.onReady(() => {
  wrapModuleFunction(generateVideoThumbsAndDuration, async (func, ...args) => {
    const [data] = args;

    try {
      return await func(...args);
    } catch (error: any) {
      if (
        typeof error.message === 'string' &&
        error.message.includes('MEDIA_ERR_SRC_NOT_SUPPORTED')
      ) {
        try {
          const arrayBuffer = await data.file.arrayBuffer();
          const info = getVideoInfoFromBuffer(arrayBuffer);

          return {
            duration: info.duration,
            thumbs: data.maxDimensions.map((d) =>
              generateWhiteThumb(info.width, info.height, d)
            ),
          };
        } catch (error) {
          console.error(error);
        }
      }

      throw error;
    }
  });

  wrapModuleFunction(processRawSticker, async (func, ...args) => {
    const [data] = args;
    const result = await func(...args);

    if (data.type() === 'image/webp') {
      const blob = data.forceToBlob();
      const buffer = await blobToArrayBuffer(blob);

      if (isAnimatedWebp(buffer)) {
        result.mediaBlob = await OpaqueData.createFromData(blob, data.type());
      }
    }

    return result;
  });
});
