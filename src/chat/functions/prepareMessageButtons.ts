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

import { WPPError } from '../../util';
import * as webpack from '../../webpack';
import {
  TemplateButtonCollection,
  TemplateButtonModel,
  websocket,
} from '../../whatsapp';
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

export type MessageButtonsTypes =
  | {
      id: string;
      text: string;
    }
  | {
      phoneNumber: string;
      text: string;
    }
  | {
      url: string;
      text: string;
    }
  | {
      code: string;
      text: string;
    };

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
    return message as any;
  }

  if (!Array.isArray(options.buttons)) {
    throw new WPPError('buttons_not_a_array', 'Buttons options is not a array');
  } else if (message.type !== 'chat' && options.buttons.length > 2) {
    throw new WPPError(
      'not_alowed_more_then_three_buttons',
      'Not allowed more then three buttons in file messages'
    );
  } else if (options.buttons.length === 0 || options.buttons.length > 3) {
    throw new WPPError(
      'buttons_must_between_1_and_3_options',
      'Buttons options must have between 1 and 3 options'
    );
  } else if (
    options.buttons.find((i: any) => i.phoneNumber || i.url) &&
    options.buttons.find((i: any) => i.id && i.text)
  ) {
    throw new WPPError(
      'reply_and_cta_btn_not_allowed',
      'It is not possible to send reply buttons and action buttons togetherButtons options must have between 1 and 3 options'
    );
  }

  message.title = options.title;
  message.footer = options.footer;

  message.interactiveMessage = {
    header: {
      title: options.title || ' ',
      hasMediaAttachment: false,
    },
    body: {
      text: message.body || message.caption || ' ',
    },
    footer: {
      text: options.footer || ' ',
    },
    nativeFlowMessage: {
      buttons: options.buttons.map((button, index) => {
        if ('phoneNumber' in button) {
          return {
            name: 'cta_call',
            buttonParamsJson: JSON.stringify({
              display_text: button.text,
              phone_number: button.phoneNumber,
            }),
          };
        }
        if ('url' in button) {
          return {
            name: 'cta_url',
            buttonParamsJson: JSON.stringify({
              display_text: button.text,
              url: button.url,
              merchant_url: button.url,
            }),
          };
        }
        if ('code' in button) {
          return {
            name: 'cta_copy',
            buttonParamsJson: JSON.stringify({
              display_text: button.text,
              copy_code: button.code,
            }),
          };
        }
        if ('raw' in button) {
          return button.raw;
        }
        return {
          name: 'quick_reply',
          buttonParamsJson: JSON.stringify({
            display_text: button.text,
            id: button.id || `${index}`,
          }),
        };
      }),
    },
  };

  // This code is only for see buttons on sended device
  message.isFromTemplate = true;
  message.buttons = new TemplateButtonCollection();
  message.hydratedButtons = options.buttons.map((button, index) => {
    if ('phoneNumber' in button) {
      return {
        index: index,
        callButton: {
          displayText: button.text,
          phoneNumber: button.phoneNumber,
        },
      };
    }
    if ('url' in button) {
      return {
        index: index,
        urlButton: {
          displayText: button.text,
          url: button.url,
        },
      };
    }
    if ('code' in button) {
      return {
        index: index,
        urlButton: {
          displayText: button.text,
          url: `https://www.whatsapp.com/otp/code/?otp_type=COPY_CODE&code=otp${button.code}`,
        },
      };
    }

    return {
      index: index,
      quickReplyButton: {
        displayText: button.text,
        id: button.id || `${index}`,
      },
    };
  });

  message.buttons.add(
    message.hydratedButtons.map((e, t: number) => {
      const i = `${null != e.index ? e.index : t}`;

      if (e.urlButton) {
        return new TemplateButtonModel({
          id: i,
          displayText: e.urlButton?.displayText,
          url: e.urlButton?.url,
          subtype: 'url',
        });
      }

      if (e.callButton) {
        return new TemplateButtonModel({
          id: i,
          displayText: e.callButton.displayText,
          phoneNumber: e.callButton.phoneNumber,
          subtype: 'call',
        });
      }

      return new TemplateButtonModel({
        id: i,
        displayText: e.quickReplyButton?.displayText,
        selectionId: e.quickReplyButton?.id,
        subtype: 'quick_reply',
      });
    })
  );

  return message;
}

webpack.onFullReady(() => {
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

  wrapModuleFunction(createFanoutMsgStanza, async (func, ...args) => {
    let buttonNode: websocket.WapNode | null = null;
    const proto: any = args[1].id ? args[2] : args[1];

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

    let node = await func(...args);
    if (proto?.viewOnceMessage?.message?.interactiveMessage) {
      node = await encryptAndParserMsgButtons(...args, func);
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
      case 'enable_web_calling':
        return true;
    }
    return func(...args);
  });
});
