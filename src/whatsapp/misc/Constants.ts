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

/**
 * @moduleID 3746
 * @whatsapp 2.2126.14
 */
export declare const Constants: {
  ARCHIVE_NUX_MAX_VIEWS: number;
  IMG_THUMB_MAX_EDGE: number;
  DOC_THUMB_MAX_EDGE: number;
  VIDEO_THUMB_MAX_EDGE: number;
  MAX_PORTRAIT_MEDIA_CAPTION_LENGTH: number;
  MAX_FILES: number;
  MMS_THUMBNAIL_UPLOAD_TIMEOUT: number;
  FREQUENTLY_FORWARDED_SENTINEL: number;
  MAX_SMB_LABEL_COUNT: number;
  DEFAULT_SMB__NEW_LABEL_COLOR: string;
  FB_CLB_TOKEN: string;
  FB_CLB_CHECK_URL: string;
  FB_CLB_URL: string;
  FAKE_USER_AGENT: string;
  G_MAPS_DIR_URL: string;
  G_MAPS_IMG_URL: string;
  G_MAPS_SEARCH_URL: string;
  G_MAPS_URL: string;
  G_MAPS_DARK_MODE_STYLE: string;
  FB_LEGAL_TERMS_URL: string;
  FB_COMMERCE_POLICY_URL: string;
  WA_COMMERCE_POLICY_URL: string;
  NOTIFICATION_PROMPT_DELAY: number;
  PTT_PLAYBACK_DELAY: number;
  NOTIFICATION_TIMEOUT: number;
  CALL_NOTIFICATION_TIMEOUT: number;
  IDLE_TIMEOUT: number;
  IDLE_TIMEOUT_WAIT: number;
  SEARCH_ZOOM: number;
  SEND_UNAVAILABLE_WAIT: number;
  SEND_PAUSED_WAIT: number;
  CLEAR_CHAT_DIRTY_WAIT: number;
  LOG_UPLOAD_INTERVAL: number;
  REVOKE_WINDOW: number;
  ALBUM_DIFF_INTERVAL: number;
  MAX_TXT_MSG_SIZE: number;
  INITIAL_PAGE_SIZE: number;
  FREQUENTLY_FORWARDED_INITIAL_PAGE_SIZE: number;
  SUBSEQUENT_PAGE_SIZE: number;
  OVERFLOWING_PAGE_THRESHOLD: 0.1;
  GROUP_DESCRIPTION_INFO_PANEL_TRUNC_LENGTH: number;
  BUSINESS_DESCRIPTION_INFO_PANEL_TRUNC_LENGTH: number;
  GROUP_DESCRIPTION_LENGTH: number;
  INFO_DRAWER_MAX_ROWS: number;
  INFO_DRAWER_MAX_ROWS_IN_COLLAPSED_LIST: number;
  NUM_COLORS: number;
  FTS_MIN_CHARS: number;
  FTS_TTL: number;
  FTS_TYPING_DELAY: number;
  FTS_NUM_RESULTS: number;
  HSM_ASPECT_RATIO: 1.91;
  TEMPLATE_DOC_MIME_TYPES: number;
  TEMPLATE_URL_START: number;
  TEMPLATE_URL_END: number;
  KEY_STORAGE_TEST: string;
  KEY_CLIENT_TOKEN: string;
  KEY_SERVER_TOKEN: string;
  KEY_SECRET: string;
  KEY_SECRET_BUNDLE: string;
  KEY_SECURITY_NOTIFICATIONS: string;
  KEY_BROWSER_ID: string;
  KEY_GEOCODER_LOCATION: string;
  KEY_GROUP_ASSIGNED_COLOR: string;
  KEY_GMAPS_OVER_LIMIT: string;
  KEY_GLOBAL_MUTE_SOUNDS: string;
  KEY_OUTGOING_MESSAGE_SOUND: string;
  KEY_GLOBAL_MUTE_NOTIFICATIONS: string;
  KEY_GLOBAL_MUTE_IN_APP_NOTIFICATIONS: string;
  KEY_GLOBAL_MUTE_PREVIEWS: string;
  KEY_GLOBAL_COLLAPSE_MUTED: string;
  KEY_NOTIFICATION_SOUND: string;
  KEY_AUTO_DOWNLOAD_PHOTOS: string;
  KEY_AUTO_DOWNLOAD_AUDIO: string;
  KEY_AUTO_DOWNLOAD_VIDEOS: string;
  KEY_AUTO_DOWNLOAD_DOCUMENTS: string;
  KEY_LANG: string;
  KEY_LAST_ACTIVE_EMOJI_TAB: string;
  KEY_LAST_SELECTED_COMPOSE_BOX_PANEL: string;
  KEY_LAST_CHAT_MUTE_DURATION: string;
  KEY_UNKNOWN_ID: string;
  KEY_VERSION: string;
  KEY_LOAD_RETRY_GENERATION: string;
  KEY_WHATSAPP_MUTEX: string;
  KEY_LAST_WID: string;
  KEY_LAST_WID_MD: string;
  KEY_SAVE_TO_CAMERA_ROLL: string;
  KEY_SMB_LABEL_COLOR_PALETTE: string;
  KEY_LAST_PUSHNAME: string;
  KEY_PROTO_VERSION: string;
  KEY_PTT_PLAYBACK_RATE: string;
  KEY_LOGOUT_DIRTY_BIT: string;
  KEY_LOG_PREEMPT_CLEAN_UP: string;
  KEY_PRESERVED_USER_KEYS: string;
  KEY_EMOJI_VARIANT_COLLECTION: string;
  KEY_RECENT_EMOJI_COLLECTION: string;
  KEY_CHAT_PREFERENCE_COLLECTION: string;
  LAST_STATUS_USAGE: string;
  KEY_MD_OPTED_IN: string;
  KEY_MOBILE_PLATFORM: string;
  KEY_REMEMBER_ME: string;
  KEY_LOGOUT_TOKEN: string;
  KEY_OLD_LOGOUT_CREDS: string;
  KEY_NO_TAKEOVER: string;
  KEY_WHATSAPP_LS_VERSION: string;
  KEY_WAM_BUFFER: string;
  KEY_WAM_INFO: string;
  KEY_TIME_SPENT_EVENT: string;
  KEY_VIDEO_VOLUME: string;
  KEY_VIDEO_MUTE: string;
  KEY_CONTACT_CHECKSUM: string;
  KEY_USER_PRIVACY_SETTINGS: string;
  KEY_IS_SMB: string;
  KEY_COMPOSE_CONTENTS_PREFIX: string;
  KEY_THEME: string;
  KEY_SYSTEM_THEME_MODE: string;
  KEY_ABPROPS: string;
  KEY_HISTORY_SYNC_EARLIEST_DATE: string;
  KEY_SYNCD_DISABLED_DUE_TO_FATAL: string;
  KEY_SYNCD_FIRST_CLEAR_OR_DELETE: string;
  KEY_CONTACT_SYNC_REFRESH: string;
  COOKIE_REF: string;
  COOKIE_TOK: string;
  PAGE_SIZE: number;
  MSG_PRELOAD_THRESHOLD: number;
  MEDIA_QUERY_LIMIT: number;
  MIN_PIC_SIDE: number;
  MAX_PIC_SIDE: number;
  PROF_PIC_THUMB_SIDE: number;
  MAX_CAPTION_LENGTH: number;
  MAX_CART_MESSAGE_LENGTH: number;
  MAX_PRODUCT_SUBTITLE_LENGTH: number;
  MAX_REPLY_PRODUCT_TITLE_LENGTH: number;
  MAX_REPLY_PRODUCT_DESC_LENGTH: number;
  ALBUM_MIN_SIZE: number;
  ALBUM_MAX_SIZE: number;
  ALBUM_MAX_HEIGHT: number;
  ALBUM_PADDING: number;
  PRESENCE_COMPOSING_TIMEOUT: number;
  PRESENCE_RESEND_WAIT: number;
  MIMETYPE_OGG: string;
  IMAGE_MIMES: string;
  WEBP_MIMES: string;
  VIDEO_MIMES: string;
  KEY_LOG_CURSOR: string;
  MAX_STATUS_LENGTH: number;
  MAX_PUSHNAME_LENGTH: number;
  DISP_TYPE: {
    CONVERSATION: string;
    MSG_INFO: string;
    STARRED_MSGS: string;
    GALLERY: string;
    REPLY_STAGE: string;
    QUOTED_MSG: string;
    CONTACT_CARD: string;
    ORDER: string;
  };
  SEND_LOGS_MAX_EMAIL_LENGTH: number;
  SEND_LOGS_MAX_SUBJECT_LENGTH: number;
  SEND_LOGS_MIN_DESC_LENGTH: number;
  SEND_LOGS_MAX_DESC_LENGTH: number;
  SEND_LOGS_MAX_SCREENSHOTS: number;
  SEND_LOGS_MAX_SCREENSHOT_SIZE: number;
  CONTACT_US_MIN_DESC_LENGTH: number;
  CONTACT_US_MAX_DESC_LENGTH: number;
  ACK: {
    MD_DOWNGRADE: number;
    INACTIVE: number;
    CONTENT_UNUPLOADABLE: number;
    CONTENT_TOO_BIG: number;
    CONTENT_GONE: number;
    EXPIRED: number;
    FAILED: number;
    CLOCK: number;
    SENT: number;
    RECEIVED: number;
    READ: number;
    PLAYED: number;
    PEER: number;
  };
  ACK_STRING: {
    SENDER: string;
    DELIVERY: string;
    READ: string;
    PLAYED: string;
    INACTIVE: string;
  };
  RETRY: {
    VALIDATE_OLD_SESSION: number;
    MAX_RETRY: number;
  };
  KEY_BUNDLE_TYPE: string;
  EDIT_ATTR: {
    REVOKE: number;
  };
  DEVICE: {
    PRIMARY_DEVICE: number;
    PRIMARY_VERSION: number;
  };
  BATTERY_LOW_THRESHOLD_1: number;
  BATTERY_LOW_THRESHOLD_2: number;
  BATTERY_DELAY: number;
  SOCKET_STATE: {
    OPENING: string;
    PAIRING: string;
    UNPAIRED: string;
    UNPAIRED_IDLE: string;
    CONNECTED: string;
    TIMEOUT: string;
    CONFLICT: string;
    UNLAUNCHED: string;
    PROXYBLOCK: string;
    TOS_BLOCK: string;
    SMB_TOS_BLOCK: string;
    DEPRECATED_VERSION: string;
  };
  SOCKET_STREAM: {
    DISCONNECTED: string;
    SYNCING: string;
    RESUMING: string;
    CONNECTED: string;
  };
  COLLECTION_HAS_SYNCED: string;
  NEW_MSG_SENT: string;
  DIAGNOSTIC_DELAY: number;
  ONE_BY_ONE_TRANS_GIF: string;
  DEFAULT_CHAT_WALLPAPER: string;
  L10N_PRIORITY: {
    SAVED: number;
    PHONE: number;
    PREVIOUS: number;
    URL: number;
    BROWSER: number;
    DEFAULT: number;
  };
  RENDER_CURSOR: {
    RECENT_AT_TOP: string;
    RECENT_AT_BOTTOM: string;
    CONVERSATION: string;
    GROUP_CONVERSATION: string;
    STARRED_DRAWER: string;
  };
  SECURITY_LINK: string;
  SMB_TOS_LEARN_MORE_LINK: string;
  SERVER_WID: string;
  PSA_WID: string;
  STATUS_WID: string;
  OFFICIAL_BIZ_WID: string;
  VISIBILITY: {
    ABOVE: string;
    VISIBLE: string;
    BELOW: string;
  };
  VIDEO_STREAM_URL: string;
  SPELL_CHECK_SKIP_WORDS: {
    en_us: Set<string>;
    en_gb: Set<string>;
    en: Set<string>;
  };
  GROUP_INVITE_LINK_URL: string;
  GROUP_SETTING_TYPE: {
    ANNOUNCEMENT: string;
    RESTRICT: string;
    NO_FREQUENTLY_FORWARDED: string;
    EPHEMERAL: string;
  };
  GROUP_SETTING_TO_METADATA: {
    announcement: string;
    restrict: string;
    no_frequently_forwarded: string;
    ephemeral: string;
  };
  L10N: {
    DEFAULT: string;
  };
  EMOJI: {
    BUCKET_SIZE: number;
    CATEGORIES: {
      SMILEYS_PEOPLE: string;
      ANIMALS_NATURE: string;
      FOOD_DRINK: string;
      ACTIVITY: string;
      TRAVEL_PLACES: string;
      OBJECTS: string;
      SYMBOLS: string;
      FLAGS: string;
    };
    CATEGORY_MAPPING: {
      'Smileys & People': string;
      'Animals & Nature': string;
      'Food & Drink': string;
      Activity: string;
      'Travel & Places': string;
      Objects: string;
      Symbols: string;
      Flags: string;
    };
    ORDERED_CATEGORY_IDS: string[];
    EMOJI_TYPE: {
      APPLE: string;
      WHATSAPP: string;
    };
    LARGE_EMOJI_BASE_PATH: string;
    LARGE_EMOJI_ELECTRON_BASE_PATH: string;
    EMOJI_SPRITES_BASE_PATH: string;
    EMOJI_SPRITES_ELECTRON_BASE_PATH: string;
  };
  SYSTEM_MESSAGE_TYPES: string[];
  MSG_TYPE: {
    NOTIFICATION: string;
    NOTIFICATION_TEMPLATE: string;
    GROUP_NOTIFICATION: string;
    GP2: string;
    BROADCAST_NOTIFICATION: string;
    E2E_NOTIFICATION: string;
    CALL_LOG: string;
    PROTOCOL: string;
    CHAT: string;
    LOCATION: string;
    PAYMENT: string;
    VCARD: string;
    CIPHERTEXT: string;
    MULTI_VCARD: string;
    REVOKED: string;
    OVERSIZED: string;
    GROUPS_V4_INVITE: string;
    HSM: string;
    TEMPLATE_BUTTON_REPLY: string;
    DEBUG: string;
    IMAGE: string;
    VIDEO: string;
    AUDIO: string;
    PTT: string;
    STICKER: string;
    DOCUMENT: string;
    PRODUCT: string;
    ORDER: string;
    LIST: string;
    INTERACTIVE: string;
    LIST_RESPONSE: string;
    BUTTONS_RESPONSE: string;
    UNKNOWN: string;
  };
  TEMPLATE_BUTTON_SUBTYPE: {
    QUICK_REPLY: string;
    CALL: string;
    URL: string;
  };
  ELECTRON_PREF: {
    LAST_SAVED_LOCATION: string;
    CONTENT_SETTINGS: string;
  };
  TOUCHBAR_MAX_EMOJIS: number;
  VERIFIED_LEVEL: {
    UNKNOWN: number;
    LOW: number;
    HIGH: number;
  };
  HOSTNAME: {
    YOUTUBE: string;
    YOUTUBE_MOBILE: string;
    YOUTUBE_SHORTENED: string;
    INSTAGRAM: string;
    STREAMABLE: string;
    FACEBOOK: string;
    FBWATCH: string;
    FBWATCH_ALT: string;
    LASSOVIDEOS: string;
    LASSO_SHORTENED: string;
    SHARECHAT: string;
  };
  WHATSAPP_ORIGIN: string;
  SMB_SEARCH_FILTERS: {
    UNREAD: string;
    GROUP: string;
    BROADCAST: string;
  };
  SMB_LABELS: {
    MAX_LABEL_LENGTH: number;
  };
  PRODUCT_INQUIRY_TYPE: string;
  PRODUCT_LIST_ITEM_HEIGHT: number;
  LOADABLE_DELAY: number;
  TAB_ORDERS: {
    CHAT_STARRED_DRAWER: number;
    CHAT_LIST_SEARCH: number;
    ARCHIVED_ENTRY_POINT: number;
    CHAT_LIST: number;
    CHAT_CONTACT_LIST: number;
    CHAT_IMAGE_GALLERY: number;
    CHAT_SEARCH_MSG_LIST: number;
    PANEL_SEARCH_INPUT: number;
    COMPOSE_BOX_MENU_BUTTON: number;
    COMPOSE_BOX_INPUT: number;
    PTT_BUTTON: number;
    MESSAGE_LIST: number;
    CHAT_HEADER_BUTTON: number;
  };
  SPEEDY_RESUME_MAX_CHATS: number;
  MEDIA_VIEWER: {
    ANIMATION_DURATION: number;
    CLOSE_ANIMATION_DURATION: number;
    ZOOM_IN_FACTOR: number;
  };
  DEFAULT_THEME: string;
  LAYOUT_2COLUMNS_MAX_WIDTH: number;
  MUTE_ALWAYS_EXPIRATION_SENTINEL: number;
  ANDROID_LABEL_COLOR_PALETTE: string[];
  IPHONE_LABEL_COLOR_PALETTE: string[];
  VOIP_LOG_COLOR: string;
  VOIP_MAC_MINIMUM_OS_RELEASE_VERSION: string;
  VOIP_WIN_MINIMUM_OS_RELEASE_VERSION: string;
  VOIP_MAX_GROUP_CALL_PARTICIPANTS: number;
  WAM_SYS_INFO_INIT_DELAY: number;
  KEY_NOTICE_BANNER_CLOSED_AT: string;
  KEY_NOTICE_ID: string;
  MARKED_AS_UNREAD: number;
  MAS_APP_IDENTIFIER: string;
  RENDER_PROCESS_LOG_PATH: string;
  WEB_IDB_DB_NAMES: {
    __dbnames: string;
    fts_storage: string;
    _hsm_storage_DEPRECATED: string;
    jobs_storage: string;
    lru_media_storage_idb: string;
    model_storage: string;
    offd_storage: string;
    signal_storage: string;
    sw: string;
    wawc: string;
    wawc_db_enc: string;
  };
};

exportModule(
  exports,
  { Constants: 'default' },
  (m) => m.default.ACK.CLOCK === 0
);
