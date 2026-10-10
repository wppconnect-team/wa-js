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
    for (const part of mediaPart) {
      if (part in interactiveMessage.header) {
        const partName = part;

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
function getParticipantsNode(node: any): websocket.WapNode | null {
  const first = node?.stanza?.content?.[0];
  return first?.tag === 'participants' && Array.isArray(first.content)
    ? first
    : null;
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
  const node = await func(
    message,
    proto,
    devices,
    options,
    reporter,
    typeof groupData !== 'function' ? groupData : undefined
  );

  if (!proto?.viewOnceMessage?.message?.interactiveMessage) {
    return node;
  }

  // Only `<participants>` can be replaced. In groups it is absent when nobody
  // needs the sender key, and `content[0]` is then the encrypted `<enc>`
  const target = getParticipantsNode(node);
  if (!target) {
    return node;
  }

  const results = await Promise.all(
    parserButtons(proto, devices).map(async (btn) => {
      if (btn.devices.length === 0) {
        return [];
      }
      const result = await func(
        message,
        btn.proto,
        btn.devices,
        options,
        reporter,
        typeof groupData !== 'function' ? groupData : undefined
      );
      return (getParticipantsNode(result)?.content ??
        []) as websocket.WapNode[];
    })
  );

  const parts = results.flat();

  if (parts.length > 0) target.content = parts;

  return node;
}
