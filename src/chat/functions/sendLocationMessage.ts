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

import { dmChatIdSchema, groupIdSchema } from '../../types';
import * as webpack from '../../webpack';
import { wrapModuleFunction } from '../../whatsapp/exportModule';
import {
  mediaTypeFromProtobuf,
  typeAttributeFromProtobuf,
} from '../../whatsapp/functions';
import {
  defaultSendMessageOptions,
  RawMessage,
  SendMessageOptions,
  sendMessageOptionsSchema,
  SendMessageReturn,
} from '..';
import { sendRawMessage } from '.';
import {
  MessageButtonsOptions,
  messageButtonsOptionsSchema,
  prepareMessageButtons,
} from './prepareMessageButtons';

export interface LocationMessageOptions
  extends SendMessageOptions, MessageButtonsOptions {
  /**
   * latitude in degrees
   */
  lat: number | string;
  /**
   * longitude in degrees
   */
  lng: number | string;
  /**
   * The full address of place
   */
  address?: string;
  /**
   * Name of the place
   */
  name?: string;
  /**
   * URL to open when click on the address/name
   */
  url?: string;
}

const locationMessageOptionsSchema = sendMessageOptionsSchema.extend({
  ...messageButtonsOptionsSchema.shape,
  lat: z.union([z.number(), z.string()]),
  lng: z.union([z.number(), z.string()]),
  address: z.string().optional(),
  name: z.string().optional(),
  url: z.string().optional(),
});

const chatSendLocationMessageSchema = z.object({
  chatId: z.union([dmChatIdSchema, groupIdSchema]),
  options: locationMessageOptionsSchema,
});
export type ChatSendLocationMessageInput = z.infer<
  typeof chatSendLocationMessageSchema
>;
export type ChatSendLocationMessageOutput = SendMessageReturn;

/**
 * Send a location message
 *
 * @example
 * ```javascript
 * // full example
 * WPP.chat.sendLocationMessage({
 *   chatId: '[number]@c.us',
 *   options: {
 *     lat: -22.95201,
 *     lng: -43.2102601,
 *     name: 'Cristo Rendentor',
 *     address: 'Parque Nacional da Tijuca - Alto da Boa Vista, Rio de Janeiro - RJ',
 *     url: 'https://santuariocristoredentor.com.br/'
 *   }
 * });
 *
 * // minimal
 * WPP.chat.sendLocationMessage({
 *   chatId: '[number]@c.us',
 *   options: { lat: -22.95201, lng: -43.2102601 }
 * });
 * ```
 *
 * @category Message
 */
export async function sendLocationMessage(
  params: ChatSendLocationMessageInput
): Promise<ChatSendLocationMessageOutput> {
  const { chatId, options: opts } = chatSendLocationMessageSchema.parse(params);
  const options: LocationMessageOptions = {
    ...defaultSendMessageOptions,
    ...(opts as LocationMessageOptions),
  };

  const location =
    options.name && options.address
      ? `${options.name}\n${options.address}`
      : options.name || options.address || '';

  if (typeof options.lat === 'string') {
    options.lat = parseFloat(options.lat);
  }

  if (typeof options.lng === 'string') {
    options.lng = parseFloat(options.lng);
  }

  let rawMessage: RawMessage = {
    type: 'location',
    lat: options.lat,
    lng: options.lng,
    loc: location,
    clientUrl: options.url,
  };

  rawMessage = prepareMessageButtons({
    message: rawMessage,
    options: options as any,
  });

  return await sendRawMessage({ chatId, rawMessage, options });
}

webpack.onFullReady(() => {
  wrapModuleFunction(mediaTypeFromProtobuf, (func, ...args) => {
    const [proto] = args;
    if (proto.locationMessage) {
      return null;
    }
    return func(...args);
  });

  wrapModuleFunction(typeAttributeFromProtobuf, (func, ...args) => {
    const [proto] = args;
    if (proto.locationMessage) {
      return 'text';
    }
    return func(...args);
  });
});
