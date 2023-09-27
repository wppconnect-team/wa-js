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
import { wrapModuleFunction } from '../../whatsapp/exportModule';
import {
  createMsgProtobuf,
  typeAttributeFromProtobuf,
} from '../../whatsapp/functions';
import {
  defaultSendMessageOptions,
  RawMessage,
  SendMessageOptions,
  SendMessageReturn,
} from '..';
import { sendRawMessage } from '.';

export enum SCHEDULED_CALL_TYPE {
  UNKNOWN = 0,
  VOICE = 1,
  VIDEO = 2,
}

export interface ScheduledCallMessageOptions extends SendMessageOptions {
  scheduledTimestampMs: number | string;
  callType: "video" | "voice" | SCHEDULED_CALL_TYPE;
  title: string;
}

/**
 * Send a scheduled call message
 *
 * @example
 * ```javascript
 * WPP.chat.sendScheduledCallMessage('[number]@c.us', {
 *  title: "Title of event"
 *  callType: 'voice'
 *  scheduledTimestampMs: 1696084222000
 * });
 * ```
 * @category Message
 */
export async function sendScheduledCallMessage(
  chatId: any,
  options: ScheduledCallMessageOptions
): Promise<SendMessageReturn> {
  options = {
    ...defaultSendMessageOptions,
    ...options,
  };

  if (typeof options.callType === 'string') {
    options.callType = options.callType == 'voice' ? 1 : 2;
  }
  const rawMessage: RawMessage = {
    type: 'scheduled_call',
    title: options.title,
    callType: options.callType,
    scheduledTimestampMs: options.scheduledTimestampMs,
  };

  return await sendRawMessage(chatId, rawMessage, options);
}

webpack.onReady(() => {
  wrapModuleFunction(createMsgProtobuf, (func, ...args) => {
    const [message] = args;
    const r = func(...args);
    if (message?.type == 'scheduled_call') {
      r.scheduledCallCreationMessage = {
        title: message.title,
        scheduledTimestampMs: (message as any).scheduledTimestampMs,
        callType: (message as any).callType,
      };
    }
    return r;
  });
  wrapModuleFunction(typeAttributeFromProtobuf, (func, ...args) => {
    const [proto] = args;
    if (proto.scheduledCallCreationMessage) {
      return 'text';
    }
    return func(...args);
  });
});
