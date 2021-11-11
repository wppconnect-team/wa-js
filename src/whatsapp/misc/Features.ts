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
import { EventEmitter } from './EventEmitter';

type FeaturesNames =
  | 'RESEND_ICON'
  | 'DELETE_MSG_CLEAR_MEDIA'
  | 'DEBUG_COMMANDS'
  | 'MD_BACKEND'
  | 'MD_ADV'
  | 'MD_PAYMENT'
  | 'MD_E2E'
  | 'MD_VOIP_GROUP'
  | 'MD_SYNCD_ANTI_TAMPERING'
  | 'CATALOG_MANAGER'
  | 'WEB_VOIP_VOICE_CALL'
  | 'WEB_VOIP_VIDEO_CALL'
  | 'MEDIA_AUTO_DOWNLOAD'
  | 'DOWNLOAD_STATUS_THUMB_MMS'
  | 'MEDIA_EXISTENCE_CHECK'
  | 'LOG_MISSING_REQUIRED_PROPERTIES'
  | 'HIGH_QUALITY_VIDEO_THUMBNAILS'
  | 'HIGH_QUALITY_LINK_PREVIEWS'
  | 'YOUTUBE_VIDEO_PREVIEW_WITHOUT_BLUR'
  | 'GROUP_CONVERSATIONS_MEDIA_TOOLTIPS'
  | 'DROP_LAST_NAME_MENTIONS'
  | 'RICH_TEXT_INPUT'
  | 'PTT_DRAFT_ENABLED'
  | 'PTT_WAVEFORM_SEND'
  | 'PTT_CONVERSATION_WAVEFORM'
  | 'SEE_STATUS_VIEWERS'
  | 'GROUP_CATCH_UP'
  | 'FORMAT_BULLETED_MSG'
  | 'ARCHIVE_V2_MD_SUPPORTED'
  | 'MEDIA_GALLERY_HEADERS'
  | 'PIP_VIDEO_REDESIGN'
  | 'LABELS_DISPLAY'
  | 'VOIP_INDIVIDUAL_OUTGOING'
  | 'GROUPS_V_3'
  | 'GROUPS_V_3_CREATE'
  | 'CHANGE_NUMBER_V_2'
  | 'QUERY_STATUS_V_3_THUMBNAIL'
  | 'LIVE_LOCATIONS'
  | 'QUERY_VNAME'
  | 'VOIP_INDIVIDUAL_INCOMING'
  | 'QUICK_REPLIES_QUERY'
  | 'PAYMENTS'
  | 'STICKER_PACK_QUERY'
  | 'LIVE_LOCATIONS_FINAL'
  | 'LABELS_EDIT'
  | 'MEDIA_UPLOAD'
  | 'MEDIA_UPLOAD_RICH_QUICK_REPLIES'
  | 'VNAME_V_2'
  | 'VIDEO_PLAYBACK_URL'
  | 'STATUS_RANKING'
  | 'VOIP_INDIVIDUAL_VIDEO'
  | 'THIRD_PARTY_STICKERS'
  | 'FREQUENTLY_FORWARDED_SETTING'
  | 'GROUPS_V_4_JOIN_PERMISSION'
  | 'RECENT_STICKERS'
  | 'CATALOG'
  | 'STARRED_STICKERS'
  | 'VOIP_GROUP_CALL'
  | 'TEMPLATE_MESSAGE'
  | 'TEMPLATE_MESSAGE_INTERACTIVITY'
  | 'EPHEMERAL_MESSAGES'
  | 'E_2_E_NOTIFICATION_SYNC'
  | 'RECENT_STICKERS_V_2'
  | 'RECENT_STICKERS_V_3'
  | 'USER_NOTICE'
  | 'SUPPORT'
  | 'GROUP_UII_CLEANUP'
  | 'GROUP_DOGFOODING_INTERNAL_ONLY'
  | 'SETTINGS_SYNC'
  | 'ARCHIVE_V_2'
  | 'EPHEMERAL_ALLOW_GROUP_MEMBERS'
  | 'EPHEMERAL_24_H_DURATION'
  | 'MD_FORCE_UPGRADE'
  | 'DISAPPEARING_MODE'
  | 'EXTERNAL_MD_OPT_IN_AVAILABLE'
  | 'ARCHIVE_BROADCAST'
  | 'RECENT_EMOJI_SYNC'
  | 'STARRED_GIFS'
  | 'INDEX_RECEIVED_VCARD'
  | 'STATUS_V3_UI_SENDING'
  | 'MEDIAS_COUNT'
  | 'VOIP_VOICE_CALL'
  | 'DESKTOP_VOIP_VOICE_CALL'
  | 'DESKTOP_VOIP_VIDEO_CALL'
  | 'DESKTOP_VOIP_GROUP_VOICE_CALL'
  | 'DESKTOP_VOIP_GROUP_VIDEO_CALL'
  | 'KEY_PARTICIPANT'
  | 'RICH_TEXT';

declare class FeatureClass extends EventEmitter {
  FEATURE_CHANGE_EVENT: string;
  F: { [key: string]: string };
  VF: { [key: string]: string };
  silenceChangeEvents: boolean;
  triggerFeaturesChangedDebounced: any;
  features: { [key in FeaturesNames]: boolean };
  proto: [number, number];
  setVersion(version: [number, number]): void;
  setPlatform(platform: string): void;
  setFeatureFromFlags(e?: any, t?: any, r?: any): any;
  setFeature(feature: FeaturesNames, supported: boolean): any;
  setFeatures(features: { [key in FeaturesNames]: boolean }): any;
  supportsFeature(feature: FeaturesNames): boolean;
  supportsFeatureFromFlags(flag: any): boolean;
  supportsAllFeatures(...features: FeaturesNames[]): boolean;
  supportsAnyFeature(...features: FeaturesNames[]): boolean;
  supportsAnyFeature(...features: FeaturesNames[]): boolean;
  resetFeatures(): void;
  lt(version: [number, number]): boolean;
  ltr(version: [number, number]): boolean;
  gt(version: [number, number]): boolean;
  gte(version: [number, number]): boolean;
  gte(version: [number, number]): boolean;
  triggerFeaturesChanged(): void;
  overwriteDebugGKs(): void;
  isThirdPartyStickersEnabled(): boolean;
  isRecentStickersEnabled(): boolean;
  isStarredStickersEnabled(): boolean;
  isCatalogManagerEnabled(): boolean;
  isEphemeralAllowGroupMembersEnabled(): boolean;
  isEphemeral24HDurationEnabled(): boolean;
  isDisappearingModeEnabled(): boolean;
  isDropLastNameEnabled(): boolean;
  isGroupCatchUpEnabled(): boolean;
  isInAppSupportEnabled(): boolean;
}

/** @whatsapp 2.2144.8:12950 */
export declare const Features: FeatureClass;

exportModule(
  exports,
  { Features: 'default' },
  (m) => m.default.supportsFeature
);
