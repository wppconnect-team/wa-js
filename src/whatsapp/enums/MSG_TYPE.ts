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

import { exportModule } from '../exportModule';

/** @whatsapp 15461 */
export declare enum MSG_TYPE {
  NOTIFICATION = 'notification',
  NOTIFICATION_TEMPLATE = 'notification_template',
  GROUP_NOTIFICATION = 'group_notification',
  GP2 = 'gp2',
  BROADCAST_NOTIFICATION = 'broadcast_notification',
  E2E_NOTIFICATION = 'e2e_notification',
  CALL_LOG = 'call_log',
  PROTOCOL = 'protocol',
  CHAT = 'chat',
  LOCATION = 'location',
  PAYMENT = 'payment',
  VCARD = 'vcard',
  CIPHERTEXT = 'ciphertext',
  MULTI_VCARD = 'multi_vcard',
  REVOKED = 'revoked',
  OVERSIZED = 'oversized',
  GROUPS_V4_INVITE = 'groups_v4_invite',
  HSM = 'hsm',
  TEMPLATE_BUTTON_REPLY = 'template_button_reply',
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  PTT = 'ptt',
  STICKER = 'sticker',
  DOCUMENT = 'document',
  PRODUCT = 'product',
  ORDER = 'order',
  LIST = 'list',
  INTERACTIVE = 'interactive',
  LIST_RESPONSE = 'list_response',
  BUTTONS_RESPONSE = 'buttons_response',
  REACTION = 'reaction',
  NATIVE_FLOW = 'native_flow',
  UNKNOWN = 'unknown',
}

/** @whatsapp 15461 */
export declare const SYSTEM_MESSAGE_TYPES: string[];

exportModule(
  exports,
  {
    MSG_TYPE: (m) => m.MSG_TYPE || m.default.MSG_TYPE,
    SYSTEM_MESSAGE_TYPES: (m) =>
      m.SYSTEM_MESSAGE_TYPES || m.default.SYSTEM_MESSAGE_TYPES,
  },
  (m) => m.MSG_TYPE || m.default.MSG_TYPE
);
