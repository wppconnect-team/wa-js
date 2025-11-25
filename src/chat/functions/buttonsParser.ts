/*!
 * Copyright 2022 WPPConnect Team
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

import { MsgModel, websocket, Wid } from '../../whatsapp';

function parserButtons(
  proto: any,
  devices: Wid[]
): { proto: any; devices: Wid[] }[] {
  const mobileDevices = devices.filter((p: Wid) => !p.device);
  const webDevices = devices.filter((p: Wid) => p.device);
  const interactiveMessage = proto.viewOnceMessage?.message?.interactiveMessage;
  let useTemplateMessage = false;

  const protoForWeb = JSON.parse(JSON.stringify(proto));

  if (interactiveMessage) {
    const mediaPart = [
      'documentMessage',
      'documentWithCaptionMessage',
      'imageMessage',
      'videoMessage',
    ];
    let header = undefined;
    let headerType = 1;
    for (let part of mediaPart) {
      if (part in interactiveMessage.header) {
        const partName = part;
        if (part === 'documentWithCaptionMessage') part = 'documentMessage';

        header = { [partName]: interactiveMessage.header[partName] };
        headerType =
          partName == 'imageMessage'
            ? 4
            : partName.includes('document')
              ? 3
              : partName == 'videoMessage'
                ? 5
                : 1;
        break;
      }
    }
    const buttonsMessage = {
      message: {
        buttonsMessage: {
          headerType,
          contentText: interactiveMessage?.body?.text || ' ',
          footerText: interactiveMessage?.footer?.text || ' ',
          ...header,
          buttons: interactiveMessage?.nativeFlowMessage?.buttons
            .map((button: any, index: number) => {
              if (button.name == 'quick_reply') {
                return {
                  type: 1,
                  buttonId:
                    JSON.parse(button.buttonParamsJson)?.id || `${index}`,
                  buttonText: {
                    displayText:
                      JSON.parse(button.buttonParamsJson)?.display_text || ' ',
                  },
                };
              } else {
                useTemplateMessage = true;
                return null;
              }
            })
            .filter((i: any) => i != null),
        },
      },
    };

    const templateMessage = {
      message: {
        templateMessage: {
          hydratedTemplate: {
            hydratedButtons: interactiveMessage?.nativeFlowMessage?.buttons
              .map((button: any, index: number) => {
                if (button.name == 'quick_reply') {
                  return {
                    index: index,
                    quickReplyButton: {
                      displayText:
                        JSON.parse(button.buttonParamsJson)?.display_text ||
                        ' ',
                      id: JSON.parse(button.buttonParamsJson)?.id || `${index}`,
                    },
                  };
                } else if (button.name == 'cta_url') {
                  return {
                    index: index,
                    urlButton: {
                      displayText:
                        JSON.parse(button.buttonParamsJson)?.display_text ||
                        ' ',
                      url: JSON.parse(button.buttonParamsJson)?.url,
                    },
                  };
                } else if (button.name == 'cta_copy') {
                  return {
                    index: index,
                    urlButton: {
                      displayText:
                        JSON.parse(button.buttonParamsJson)?.display_text ||
                        ' ',
                      url: `https://www.whatsapp.com/otp/code/?otp_type=COPY_CODE&code=otp${JSON.parse(button.buttonParamsJson)?.copy_code}`,
                    },
                  };
                } else if (button.name == 'cta_call') {
                  return {
                    index: index,
                    callButton: {
                      displayText:
                        JSON.parse(button.buttonParamsJson)?.display_text ||
                        ' ',
                      phoneNumber: JSON.parse(button.buttonParamsJson)
                        ?.phone_number,
                    },
                  };
                } else {
                  return null;
                }
              })
              .filter((i: any) => i != null),
            ...header,
            ...(headerType == 1
              ? { hydratedTitleText: interactiveMessage.header?.title || ' ' }
              : undefined),
            hydratedContentText: interactiveMessage?.body?.text || ' ',
            hydratedFooterText: interactiveMessage?.footer?.text || ' ',
          },
        },
      },
    };
    delete protoForWeb.viewOnceMessage;
    protoForWeb.documentWithCaptionMessage = useTemplateMessage
      ? templateMessage
      : buttonsMessage;
    protoForWeb.messageContextInfo = proto.messageContextInfo;
  }

  return [
    { proto: proto, devices: mobileDevices },
    { proto: protoForWeb, devices: webDevices },
  ];
}
export async function encryptAndParserMsgButtons<
  TFunc extends (...args: any[]) => any,
>(
  message: { type: string; data: MsgModel },
  proto: { [key: string]: any },
  devices: Wid[],
  options: { [key: string]: any },
  reporter: any,
  groupData: any,
  func: TFunc
): Promise<websocket.WapNode> {
  if (typeof groupData === 'function') {
    func = groupData;
  }
  const parts: any[] = [];
  if (proto?.viewOnceMessage?.message?.interactiveMessage) {
    const buttons = parserButtons(proto, devices);
    buttons.map(async (btn) => {
      const result = await func(
        message,
        btn.proto,
        btn.devices,
        options,
        reporter,
        typeof groupData !== 'function' ? groupData : undefined
      );
      parts.push(...(result as any).stanza.content[0].content);
    });
  }

  const node = await func(
    message,
    proto,
    devices,
    options,
    reporter,
    typeof groupData !== 'function' ? groupData : undefined
  );
  if (parts.length > 0) (node as any).stanza.content[0].content = parts;

  return node;
}
