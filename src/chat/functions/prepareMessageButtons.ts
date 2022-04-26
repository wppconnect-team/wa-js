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

import * as webpack from '../../webpack';
import {
  ButtonCollection,
  ReplyButtonModel,
  TemplateButtonCollection,
  TemplateButtonModel,
} from '../../whatsapp';
import { wrapModuleFunction } from '../../whatsapp/exportModule';
import {
  createMsgProtobuf,
  mediaTypeFromProtobuf,
  typeAttributeFromProtobuf,
} from '../../whatsapp/functions';
import { RawMessage } from '..';

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
   * Set to use template buttons instead of reply buttons.
   * @default: undefined - auto detect
   */
  useTemplateButtons?: boolean;
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
    throw 'Buttons options is not a array';
  }

  if (typeof options.useTemplateButtons === 'undefined') {
    options.useTemplateButtons = options.buttons.some(
      (button) => 'phoneNumber' in button || 'url' in button
    );
  }

  if (options.useTemplateButtons) {
    if (options.buttons.length === 0 || options.buttons.length > 5) {
      throw 'Buttons options must have between 1 and 5 options';
    }
  } else {
    if (options.buttons.length === 0 || options.buttons.length > 3) {
      throw 'Buttons options must have between 1 and 3 options';
    }
  }

  message.title = options.title;
  message.footer = options.footer;

  if (options.useTemplateButtons) {
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
  } else {
    message.isDynamicReplyButtonsMsg = true;

    message.dynamicReplyButtons = options.buttons.map((button, index) => ({
      buttonId: (button as any).id || `${index}`,
      buttonText: { displayText: button.text },
      type: 1,
    }));

    // For UI only
    message.replyButtons = new ButtonCollection();
    message.replyButtons.add(
      message.dynamicReplyButtons.map(
        (b) =>
          new ReplyButtonModel({
            id: b.buttonId,
            displayText: b.buttonText?.displayText || undefined,
          })
      )
    );
  }

  return message;
}

webpack.onInjected(() => {
  wrapModuleFunction(createMsgProtobuf, (func, ...args) => {
    const [message] = args;
    const r = func(...args);

    if (message.hydratedButtons) {
      const hydratedTemplate: any = {
        hydratedButtons: message.hydratedButtons,
      };

      if (message.footer) {
        hydratedTemplate.hydratedFooterText = message.footer;
      }

      if (message.caption) {
        hydratedTemplate.hydratedContentText = message.caption;
      }

      if (message.title) {
        hydratedTemplate.hydratedTitleText = message.title;
      }

      if (r.conversation) {
        hydratedTemplate.hydratedContentText = r.conversation;
        delete r.conversation;
      } else if (r.extendedTextMessage?.text) {
        hydratedTemplate.hydratedContentText = r.extendedTextMessage.text;
        delete r.extendedTextMessage;
      } else if (r.locationMessage) {
        hydratedTemplate.locationMessage = r.locationMessage;
        delete r.locationMessage;
      } else {
        // Search media part in message
        let found;
        const mediaPart = [
          'documentMessage',
          'imageMessage',
          'locationMessage',
          'videoMessage',
        ];
        for (const part of mediaPart) {
          if (part in r) {
            found = part;
            break;
          }
        }

        if (!found) {
          return r;
        }

        // Media message doesn't allow title
        hydratedTemplate[found] = r[found];

        // Copy title to caption if not setted
        if (
          hydratedTemplate.hydratedTitleText &&
          !hydratedTemplate.hydratedContentText
        ) {
          hydratedTemplate.hydratedContentText =
            hydratedTemplate.hydratedTitleText;
        }

        // Ensure a content text;
        hydratedTemplate.hydratedContentText =
          hydratedTemplate.hydratedContentText || ' ';

        delete hydratedTemplate.hydratedTitleText;

        delete r[found];
      }

      r.templateMessage = {
        hydratedTemplate,
      };
    }

    return r;
  });

  wrapModuleFunction(mediaTypeFromProtobuf, (func, ...args) => {
    const [proto] = args;
    if (proto.templateMessage?.hydratedTemplate) {
      return func(proto.templateMessage.hydratedTemplate);
    }
    return func(...args);
  });

  wrapModuleFunction(typeAttributeFromProtobuf, (func, ...args) => {
    const [proto] = args;
    if (proto.templateMessage?.hydratedTemplate) {
      const keys = Object.keys(proto.templateMessage?.hydratedTemplate);

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
    return func(...args);
  });
});
