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

/** @whatsapp 64369
 * @whatsapp 69618 >= 2.2204.13
 */
export declare const Constants: {
  IMG_THUMB_MAX_EDGE: 100;
  DOC_THUMB_MAX_EDGE: 480;
  VIDEO_THUMB_MAX_EDGE: 480;
  MAX_PORTRAIT_MEDIA_CAPTION_LENGTH: 500;
  MAX_FILES: 30;
  MEDIA_EDITOR_OUTLINE_TENSION: 0.4;
  MMS_THUMBNAIL_UPLOAD_TIMEOUT: 3e3;
  FREQUENTLY_FORWARDED_SENTINEL: 127;
  MAX_SMB_LABEL_COUNT: 20;
  WA_COMMERCE_POLICY_URL: 'https://www.whatsapp.com/policies/commerce-policy';
  MAX_TXT_MSG_SIZE: 65536;
  GROUP_DESCRIPTION_INFO_PANEL_TRUNC_LENGTH: 100;
  BUSINESS_DESCRIPTION_INFO_PANEL_TRUNC_LENGTH: 200;
  TEMPLATE_URL_START: 64;
  TEMPLATE_URL_END: 32;
  SQUELCH_RESET_VALUE: -1;
  MAX_CAPTION_LENGTH: 1024;
  REACTION_CONTENT_MAX_LENGTH: 30;
  MAX_CART_MESSAGE_LENGTH: 1024;
  MAX_PUSHNAME_LENGTH: 25;
  KEY_BUNDLE_TYPE: '';
  NEW_MSG_SENT: 'new_msg_sent';
  ONE_BY_ONE_TRANS_GIF: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  VOIP_LOG_COLOR: '#aa6627';
  VOIP_MAX_GROUP_CALL_PARTICIPANTS: 8;
  WAM_SYS_INFO_INIT_DELAY: 5e3;
  MARKED_AS_UNREAD: -1;
};

exportModule(
  exports,
  { Constants: 'default' },
  (m) => m.default.IMG_THUMB_MAX_EDGE
);
