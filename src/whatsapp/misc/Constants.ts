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

/** @whatsapp 69618 */
export declare const Constants: {
  IMG_THUMB_MAX_EDGE: 100;
  DOC_THUMB_MAX_EDGE: 480;
  VIDEO_THUMB_MAX_EDGE: 480;
  MAX_PORTRAIT_MEDIA_CAPTION_LENGTH: 500;
  MAX_FILES: 30;
  STICKER_DIMENSION: 512;
  STICKER_BORDER_WIDTH: 8;
  STICKER_PADDING: 36;
  STICKER_LIST_ITEM_HEIGHT: 156;
  STICKER_MAKER_IMAGE_PADDING: 20;
  STICKER_PACK_FETCH_TIMEOUT: 86400;
  MEDIA_EDITOR_OUTLINE_TENSION: 0.4;
  MMS_THUMBNAIL_UPLOAD_TIMEOUT: 3e3;
  FREQUENTLY_FORWARDED_SENTINEL: 127;
  MAX_SMB_LABEL_COUNT: 20;
  FB_CLB_TOKEN: '1063127757113399|745146ffa34413f9dbb5469f5370b7af';
  FB_CLB_CHECK_URL: 'https://crashlogs.whatsapp.net/wa_fls_upload_check';
  FB_CLB_URL: 'https://crashlogs.whatsapp.net/wa_clb_data';
  FAKE_USER_AGENT: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36';
  WA_COMMERCE_POLICY_URL: 'https://www.whatsapp.com/policies/commerce-policy';
  SEND_UNAVAILABLE_WAIT: 15e3;
  SEND_PAUSED_WAIT: 2500;
  LOG_UPLOAD_INTERVAL: 36e5;
  REVOKE_WINDOW: 4096;
  REVOKE_WINDOW_V2: 216e3;
  REVOKE_WINDOW_V2_RECEIVER_MARGIN: 43200;
  MAX_TXT_MSG_SIZE: 65536;
  INITIAL_PAGE_SIZE: 768;
  FREQUENTLY_FORWARDED_INITIAL_PAGE_SIZE: 308;
  SUBSEQUENT_PAGE_SIZE: 3072;
  OVERFLOWING_PAGE_THRESHOLD: 0.1;
  GROUP_DESCRIPTION_INFO_PANEL_TRUNC_LENGTH: 100;
  BUSINESS_DESCRIPTION_INFO_PANEL_TRUNC_LENGTH: 200;
  GROUP_DESCRIPTION_LENGTH: 0;
  FTS_MIN_CHARS: 2;
  FTS_TTL: 6e4;
  FTS_TYPING_DELAY: 300;
  FTS_NUM_RESULTS: 30;
  HSM_ASPECT_RATIO: 1.91;
  TEMPLATE_DOC_MIME_TYPES: 1;
  TEMPLATE_URL_START: 64;
  TEMPLATE_URL_END: 32;
  SQUELCH_RESET_VALUE: -1;
  COOKIE_REF: 'ref';
  COOKIE_TOK: 'tok';
  MIN_PIC_SIDE: 192;
  MAX_PIC_SIDE: 640;
  PROF_PIC_THUMB_SIDE: 96;
  MAX_CAPTION_LENGTH: 1024;
  REACTION_CONTENT_MAX_LENGTH: 30;
  MAX_CART_MESSAGE_LENGTH: 1024;
  MAX_PRODUCT_SUBTITLE_LENGTH: 70;
  MAX_REPLY_PRODUCT_TITLE_LENGTH: 40;
  MAX_REPLY_PRODUCT_DESC_LENGTH: 95;
  ALBUM_MIN_SIZE: 4;
  ALBUM_MAX_SIZE: 102;
  ALBUM_MAX_HEIGHT: 168;
  ALBUM_PADDING: 3;
  PRESENCE_COMPOSING_TIMEOUT: 25e3;
  PRESENCE_RESEND_WAIT: 1e4;
  IMAGE_MIMES: 'image/*';
  VIDEO_MIMES: 'video/mp4,video/3gpp,video/quicktime';
  MAX_STATUS_LENGTH: 139;
  MAX_PUSHNAME_LENGTH: 25;
  KEY_BUNDLE_TYPE: '';
  NEW_MSG_SENT: 'new_msg_sent';
  ONE_BY_ONE_TRANS_GIF: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  GROUP_INVITE_LINK_URL: 'https://chat.whatsapp.com/';
  WHATSAPP_ORIGIN: 'https://whatsapp.com';
  WHATSAPP_GRAPHQL_ENDPOINT: 'https://graph.whatsapp.com/graphql';
  WHATSAPP_GRAPHQL_ACCESS_TOKEN: 'WA|438455091201276|159a64e893c734301a4db315bba22e04';
  PRODUCT_INQUIRY_TYPE: 'product_inquiry';
  SPEEDY_RESUME_MAX_CHATS: 5e3;
  LAYOUT_2COLUMNS_MAX_WIDTH: 1024;
  MUTE_ALWAYS_EXPIRATION_SENTINEL: -1;
  VOIP_LOG_COLOR: '#aa6627';
  VOIP_MAX_GROUP_CALL_PARTICIPANTS: 8;
  WAM_SYS_INFO_INIT_DELAY: 5e3;
  MARKED_AS_UNREAD: -1;
  MAS_APP_IDENTIFIER: '57T9237FN3.desktop.WhatsApp';
  RENDER_PROCESS_LOG_PATH: 'render_process_problem_log.txt';
  PS_KILLSWITCH_TOKEN: 'ps-killswitch-token';
  STORAGE_DISMISS_STATE: 'storage-dismiss-state';
  STORAGE_ALERT_FLAG: 'storage-alert-flag';
};

exportModule(
  exports,
  { Constants: 'default' },
  (m) => m.default.WHATSAPP_ORIGIN
);
