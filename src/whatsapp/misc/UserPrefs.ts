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
import { Wid } from './Wid';

/**
 * @whatsapp 2.2132.6:26226
 */
export declare const UserPrefs: {
  setMe(wid: Wid): void;
  getMe(): Wid;
  assertGetMe(): Wid;
  assertGetMeUser(): Wid;
  getMeUser(): Wid;
  getMaybeMeUser(): Wid;
  setPushname(name: string): void;
  getPushname(): string;
  getLoginTokens(): { client: string; server: string };
  setLoginTokens(token: { client: string; server: string }): void;
  knowsPhone(): boolean;
  setRefTok(e?: any, t?: any): void;
  clearDeprecatedKeys(...args: any[]): any;
  mdOptedIn(...args: any[]): any;
  setMdOptedIn(...args: any[]): any;
  getSecretBundle(...args: any[]): any;
  clearTokens(...args: any[]): any;
  shouldShowNUX(...args: any[]): any;
  viewNUX(...args: any[]): any;
  getNUX(...args: any[]): any;
  setNUX(...args: any[]): any;
  removeNUX(...args: any[]): any;
  getUnknownId(...args: any[]): any;
  setUnknownId(...args: any[]): any;
  getBrowserId(...args: any[]): any;
  setBrowserId(...args: any[]): any;
  getLastMobilePlatform(...args: any[]): any;
  setLastMobilePlatform(...args: any[]): any;
  setLastChatMuteDuration(...args: any[]): any;
  getLastChatMuteDuration(...args: any[]): any;
  setTheme(...args: any[]): any;
  getTheme(...args: any[]): any;
  setSystemThemeMode(...args: any[]): any;
  getSystemThemeMode(...args: any[]): any;
  setLastComposeBoxPanel(...args: any[]): any;
  getLastComposeBoxPanel(...args: any[]): any;
  setSeenGroupDesc(...args: any[]): any;
  getSeenGroupDesc(...args: any[]): any;
  getGlobalSounds(...args: any[]): any;
  setGlobalSounds(...args: any[]): any;
  getGlobalNotifications(...args: any[]): any;
  setGlobalNotifications(...args: any[]): any;
  getGlobalSecurityNotifications(...args: any[]): any;
  setGlobalSecurityNotifications(...args: any[]): any;
  getUserPrivacySettings(...args: any[]): any;
  setUserPrivacySettings(...args: any[]): any;
  getGlobalPreviews(...args: any[]): any;
  setGlobalPreviews(...args: any[]): any;
  getCollapseMuted(...args: any[]): any;
  setCollapseMuted(...args: any[]): any;
  getAutoDownloadPhotos(...args: any[]): any;
  setAutoDownloadPhotos(...args: any[]): any;
  getAutoDownloadAudio(...args: any[]): any;
  setAutoDownloadAudio(...args: any[]): any;
  getAutoDownloadVideos(...args: any[]): any;
  setAutoDownloadVideos(...args: any[]): any;
  setAutoDownloadDocuments(...args: any[]): any;
  getGeocoderLocation(...args: any[]): any;
  setGeocoderLocation(...args: any[]): any;
  getMapsOverQuota(...args: any[]): any;
  setMapsOverQuota(...args: any[]): any;
  setSmbLabelPalette(...args: any[]): any;
  getSmbLabelPalette(...args: any[]): any;
  getGroupParticipantAssignedColor(...args: any[]): any;
  setGroupParticipantAssignedColor(...args: any[]): any;
  getMutex(...args: any[]): any;
  setMutex(...args: any[]): any;
  removeMutex(...args: any[]): any;
  parseMutex(...args: any[]): any;
  mutexFilter(...args: any[]): any;
  localTakeoverSuccess(...args: any[]): any;
  parseTakeover(...args: any[]): any;
  takeoverFilter(...args: any[]): any;
  getLangPref(...args: any[]): any;
  setLangPref(...args: any[]): any;
  getLogoutToken(...args: any[]): any;
  setLogoutToken(...args: any[]): any;
  getOldLogoutCreds(...args: any[]): any;
  setOldLogoutCreds(...args: any[]): any;
  setNoTakeover(...args: any[]): any;
  getNoTakeover(...args: any[]): any;
  getWamBuffer(...args: any[]): any;
  setWamBuffer(...args: any[]): any;
  getWamInfo(...args: any[]): any;
  setWamInfo(...args: any[]): any;
  setVideoVolumeSettings(...args: any[]): any;
  setVideoVolumeSetting(...args: any[]): any;
  setVideoMutedSetting(...args: any[]): any;
  getVideoVolumeSettings(...args: any[]): any;
  setComposeContents(...args: any[]): any;
  getComposeContents(...args: any[]): any;
  deleteComposeContents(...args: any[]): any;
  setVersion(...args: any[]): any;
  getVersion(...args: any[]): any;
  setContactChecksum(...args: any[]): any;
  getContactChecksum(...args: any[]): any;
  getNoticeBannerClosedAt(...args: any[]): any;
  setNoticeBannerClosedAt(...args: any[]): any;
  getNoticeId(...args: any[]): any;
  setNoticeId(...args: any[]): any;
  getPttPlaybackRate(...args: any[]): any;
  setPttPlaybackRate(...args: any[]): any;
  getLastStatusUsage(...args: any[]): any;
  setLastStatusUsage(...args: any[]): any;
  getOutgoingMessageSound(...args: any[]): any;
  setOutgoingMessageSound(...args: any[]): any;
  getHistorySyncEarliestDate(...args: any[]): any;
  setHistorySyncEarliestDate(...args: any[]): any;
  setShouldPreemptivelyCleanupLogs(...args: any[]): any;
  getShouldPreemptivelyCleanupLogs(...args: any[]): any;
  readonly getRememberMe: any;
  readonly setRememberMe: any;
  readonly clearAllLocalState: any;
  readonly clearAllTemporaryStorageData: any;
  readonly _setAllKeyValues: any;
  readonly getCollection: any;
  readonly setCollection: any;
  readonly updatePreservedUserKeys: any;
  thisTabId: string;
};

exportModule(exports, 'UserPrefs', (m) => m.getMaybeMeUser);
