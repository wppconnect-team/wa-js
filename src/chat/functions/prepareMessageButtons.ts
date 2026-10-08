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

import * as loader from '../../loader';
import { WPPError } from '../../util';
import { websocket } from '../../whatsapp';
import { DROP_ATTR } from '../../whatsapp/contants';
import { wrapModuleFunction } from '../../whatsapp/exportModule';
import {
  createFanoutMsgStanza,
  createMsgProtobuf,
  encodeMaybeMediaType,
  getABPropConfigValue,
  mediaTypeFromProtobuf,
  typeAttributeFromProtobuf,
} from '../../whatsapp/functions';
import { RawMessage } from '..';
import { encryptAndParserMsgButtons } from './buttonsParser';
import {
  createNativeFlowButtons,
  MessageButtonsTypes,
} from './createNativeFlowButtons';

export type { MessageButtonsTypes } from './createNativeFlowButtons';

export interface MessageButtonsOptions {
  /**
   * List of buttons, with at least 1 option and a maximum of 3
   */
  buttons?: Array<MessageButtonsTypes>;
  /**
   * Title for buttons, only for text message
   */
  title?: string;
  /**
   * Footer text for buttons
   */
  footer?: string;
}

/**
 * Prepare a message for buttons
 *
 * @category Message
 * @internal
 */

export function prepareMessageButtons<T extends RawMessage>(
  message: T,
  options: MessageButtonsOptions
): T {
  if (!options.buttons) {
    return message;
  }

  const nativeFlow = createNativeFlowButtons(options.buttons);
  const headerMediaType = getInteractiveHeaderMediaType(message.type);

  if (message.type !== 'chat' && nativeFlow.buttons.length > 2) {
    throw new WPPError(
      'not_alowed_more_then_three_buttons',
      'Not allowed more then three buttons in file messages'
    );
  }

  message.title = options.title;
  message.footer = options.footer;
  message.caption = message.body || message.caption || ' ';
  message.type = 'interactive';
  message.interactiveType = 'native_flow';
  message.nativeFlowInteractiveMsg = true;
  message.interactiveHeader = {
    title: options.title,
    hasMediaAttachment: Boolean(headerMediaType),
    ...(headerMediaType ? { mediaType: headerMediaType } : {}),
  };

  message.nativeFlowName = nativeFlow.name;
  message.interactivePayload = {
    buttons: nativeFlow.buttons,
    messageVersion: 1,
  };

  return message;
}

function getInteractiveHeaderMediaType(
  type?: string
): 'DOCUMENT' | 'IMAGE' | 'VIDEO' | undefined {
  switch (type) {
    case 'document':
      return 'DOCUMENT';
    case 'image':
      return 'IMAGE';
    case 'video':
      return 'VIDEO';
    default:
      return undefined;
  }
}

loader.onFullReady(() => {
  wrapModuleFunction(createMsgProtobuf, (func, ...args) => {
    const [message] = args;
    const r = func(...args);
    if (message.interactiveMessage?.nativeFlowMessage?.buttons !== undefined) {
      const mediaPart = [
        'documentMessage',
        'documentWithCaptionMessage',
        'imageMessage',
        'locationMessage',
        'videoMessage',
      ];
      for (let part of mediaPart) {
        if (part in r) {
          const partName = part;
          if (part === 'documentWithCaptionMessage') part = 'documentMessage';

          message.interactiveMessage.header = {
            ...message.interactiveMessage.header,
            [`${part}`]: r[partName]?.message?.documentMessage || r[partName],
            hasMediaAttachment: true,
          };
          delete r[partName];
          break;
        }
      }
      if (typeof r.extendedTextMessage !== 'undefined')
        delete r.extendedTextMessage;
      if (typeof r.conversation !== 'undefined') delete r.conversation;
      r.viewOnceMessage = {
        message: {
          interactiveMessage: message.interactiveMessage,
        },
      };
    }
    return r;
  });

  wrapModuleFunction(encodeMaybeMediaType, (func, ...args) => {
    const [type] = args;
    if (type === 'button') {
      return DROP_ATTR;
    }
    return func(...args);
  });

  wrapModuleFunction(mediaTypeFromProtobuf, (func, ...args) => {
    const [proto] = args;
    if (
      proto.documentWithCaptionMessage?.message?.templateMessage
        ?.hydratedTemplate
    ) {
      return func(
        proto.documentWithCaptionMessage?.message?.templateMessage
          ?.hydratedTemplate
      );
    }
    return func(...args);
  });

  wrapModuleFunction(typeAttributeFromProtobuf, (func, ...args) => {
    const [proto] = args;

    if (proto?.viewOnceMessage?.interactiveMessage) {
      const keys = Object.keys(proto?.viewOnceMessage?.interactiveMessage);

      const messagePart = [
        'documentMessage',
        'documentWithCaptionMessage',
        'imageMessage',
        'locationMessage',
        'videoMessage',
      ];

      if (messagePart.some((part) => keys.includes(part))) {
        return 'media';
      }

      return 'text';
    } else if (
      proto?.documentWithCaptionMessage?.message?.templateMessage
        ?.hydratedTemplate
    ) {
      const keys = Object.keys(
        proto?.documentWithCaptionMessage?.message?.templateMessage
          ?.hydratedTemplate
      );

      const messagePart = [
        'documentMessage',
        'imageMessage',
        'locationMessage',
        'videoMessage',
      ];

      if (messagePart.some((part) => keys.includes(part))) {
        return 'media';
      }

      return 'text';
    }

    if (
      proto?.buttonsMessage?.headerType === 1 ||
      proto?.buttonsMessage?.headerType === 2
    ) {
      return 'text';
    }

    return func(...args);
  });

  wrapModuleFunction(createFanoutMsgStanza, async (func, ...wrapArgs) => {
    let buttonNode: websocket.WapNode | null = null;

    const args: any[] = wrapArgs;

    // WhatsApp >= 2.3000.1043786062 uses a single named-params object
    const namedParams: any =
      args.length === 1 && typeof args[0]?.msgProtobuf !== 'undefined'
        ? args[0]
        : null;

    const proto: any = namedParams
      ? namedParams.msgProtobuf
      : args[1].id
        ? args[2]
        : args[1];

    if (proto.buttonsMessage) {
      buttonNode = websocket.smax('buttons');
    } else if (proto.listMessage) {
      // The trick to send list message is to force the 'product_list' type in the biz node
      // const listType: number = proto.listMessage.listType || 0;
      const listType = 2;

      const types = ['unknown', 'single_select', 'product_list'];

      buttonNode = websocket.smax('list', {
        v: '2',
        type: types[listType],
      });
    }

    let node = await (func as (...args: any[]) => any)(...args);
    if (proto?.viewOnceMessage?.message?.interactiveMessage) {
      if (namedParams) {
        const positionalToNamed = (
          message: any,
          msgProtobuf: any,
          deviceList: any,
          option: any,
          metricReporter: any,
          groupData: any
        ) =>
          func({
            ...namedParams,
            msgRecord: message,
            msgProtobuf,
            deviceList,
            option,
            metricReporter,
            groupData,
          });

        node = await encryptAndParserMsgButtons(
          namedParams.msgRecord,
          namedParams.msgProtobuf,
          namedParams.deviceList,
          namedParams.option,
          namedParams.metricReporter,
          namedParams.groupData,
          positionalToNamed
        );
      } else {
        node = await (encryptAndParserMsgButtons as any)(...args, func);
      }
    }

    if (!buttonNode) {
      return node;
    }

    const content =
      (node.content as websocket.WapNode[]) || (node as any).stanza.content;

    let bizNode = content.find((c) => c.tag === 'biz');

    if (!bizNode) {
      bizNode = websocket.smax('biz', {}, null);
      content.push(bizNode);
    }

    let hasButtonNode = false;

    if (Array.isArray(bizNode.content)) {
      hasButtonNode = !!bizNode.content.find((c) => c.tag === buttonNode?.tag);
    } else {
      bizNode.content = [];
    }

    if (!hasButtonNode) {
      bizNode.content.push(buttonNode);
    }

    return node;
  });

  wrapModuleFunction(getABPropConfigValue, (func, ...args) => {
    const [key] = args;
    switch (key) {
      case 'web_unwrap_message_for_stanza_attributes':
        return false;
      /*case 'enable_web_calling':
        return true;*/
    }
    return func(...args);
  });
});
