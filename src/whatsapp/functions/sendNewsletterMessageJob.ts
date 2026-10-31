/*!
 * Copyright 2023 WPPConnect Team
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

import { exportModule } from '../exportModule';
import { ChatModel, MsgModel } from '../models';
import { SendMsgResultObject } from '../types';

/** @whatsapp 397995
 */
export declare function sendNewsletterMessageJob(data: {
  msgData?: any;
  msg?: MsgModel;
  newsletterJid: string;
  type: string;
  editType?: 'media' | 'text';
}): Promise<{ ack: { t: number }; serverId: number; success: boolean }>;

exportModule(
  exports,
  {
    sendNewsletterMessageJob: [
      'sendNewsletterMessageJob',
      'sendNewsletterMessage', // <= 2.2326.x
    ],
  },
  (m) => m.sendNewsletterMessageJob || m.sendNewsletterMessage // <= 2.2326.x
);

/**
 * Keep the native export name available: the job and the higher-level action
 * have different input, result and message-lifecycle contracts.
 */
export declare const newsletterMessageSender: {
  sendNewsletterMessageJob?: typeof sendNewsletterMessageJob;
  sendNewsletterMessage?: (data: {
    chat: ChatModel;
    msg: MsgModel;
    type: string;
  }) => Promise<SendMsgResultObject>;
};

exportModule(
  exports,
  'newsletterMessageSender',
  (m) => m.sendNewsletterMessageJob || m.sendNewsletterMessage
);
