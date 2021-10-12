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

/** @whatsapp 2.2138.13:86723 */
export declare namespace UserPrefs {
  function setMe(wid: Wid): void;
  function getMe(): Wid;
  function assertGetMe(): Wid;
  function assertGetMeUser(): Wid;
  function getMeUser(): Wid;
  function getMaybeMeUser(): Wid;
  function setPushname(name: string): void;
  function getPushname(): string;
  function getLoginTokens(): { client: string; server: string };
  function setLoginTokens(token: { client: string; server: string }): void;
  function knowsPhone(): boolean;
  function setRefTok(e?: any, t?: any): void;
  function clearDeprecatedKeys(...args: any[]): any;
  function mdOptedIn(...args: any[]): any;
  function setMdOptedIn(...args: any[]): any;
  function getSecretBundle(...args: any[]): any;
  function clearTokens(...args: any[]): any;
  function shouldShowNUX(...args: any[]): any;
  function viewNUX(...args: any[]): any;
  function getNUX(...args: any[]): any;
  function setNUX(...args: any[]): any;
  function removeNUX(...args: any[]): any;
  function getUnknownId(...args: any[]): any;
  function setUnknownId(...args: any[]): any;
  function getBrowserId(...args: any[]): any;
  function setBrowserId(...args: any[]): any;
  function getLastMobilePlatform(...args: any[]): any;
  function setLastMobilePlatform(...args: any[]): any;
  function setLastChatMuteDuration(...args: any[]): any;
  function getLastChatMuteDuration(...args: any[]): any;
  function setTheme(...args: any[]): any;
  function getTheme(...args: any[]): any;
  function setSystemThemeMode(...args: any[]): any;
  function getSystemThemeMode(...args: any[]): any;
  function setLastComposeBoxPanel(...args: any[]): any;
  function getLastComposeBoxPanel(...args: any[]): any;
  function setSeenGroupDesc(...args: any[]): any;
  function getSeenGroupDesc(...args: any[]): any;
  function getGlobalSounds(...args: any[]): any;
  function setGlobalSounds(...args: any[]): any;
  function getGlobalNotifications(...args: any[]): any;
  function setGlobalNotifications(...args: any[]): any;
  function getGlobalSecurityNotifications(...args: any[]): any;
  function setGlobalSecurityNotifications(...args: any[]): any;
  function getUserPrivacySettings(...args: any[]): any;
  function setUserPrivacySettings(...args: any[]): any;
  function getGlobalPreviews(...args: any[]): any;
  function setGlobalPreviews(...args: any[]): any;
  function getCollapseMuted(...args: any[]): any;
  function setCollapseMuted(...args: any[]): any;
  function getAutoDownloadPhotos(...args: any[]): any;
  function setAutoDownloadPhotos(...args: any[]): any;
  function getAutoDownloadAudio(...args: any[]): any;
  function setAutoDownloadAudio(...args: any[]): any;
  function getAutoDownloadVideos(...args: any[]): any;
  function setAutoDownloadVideos(...args: any[]): any;
  function setAutoDownloadDocuments(...args: any[]): any;
  function getGeocoderLocation(...args: any[]): any;
  function setGeocoderLocation(...args: any[]): any;
  function getMapsOverQuota(...args: any[]): any;
  function setMapsOverQuota(...args: any[]): any;
  function setSmbLabelPalette(...args: any[]): any;
  function getSmbLabelPalette(...args: any[]): any;
  function getGroupParticipantAssignedColor(...args: any[]): any;
  function setGroupParticipantAssignedColor(...args: any[]): any;
  function getMutex(...args: any[]): any;
  function setMutex(...args: any[]): any;
  function removeMutex(...args: any[]): any;
  function parseMutex(...args: any[]): any;
  function mutexFilter(...args: any[]): any;
  function localTakeoverSuccess(...args: any[]): any;
  function parseTakeover(...args: any[]): any;
  function takeoverFilter(...args: any[]): any;
  function getLangPref(...args: any[]): any;
  function setLangPref(...args: any[]): any;
  function getLogoutToken(...args: any[]): any;
  function setLogoutToken(...args: any[]): any;
  function getOldLogoutCreds(...args: any[]): any;
  function setOldLogoutCreds(...args: any[]): any;
  function setNoTakeover(...args: any[]): any;
  function getNoTakeover(...args: any[]): any;
  function getWamBuffer(...args: any[]): any;
  function setWamBuffer(...args: any[]): any;
  function getWamInfo(...args: any[]): any;
  function setWamInfo(...args: any[]): any;
  function setVideoVolumeSettings(...args: any[]): any;
  function setVideoVolumeSetting(...args: any[]): any;
  function setVideoMutedSetting(...args: any[]): any;
  function getVideoVolumeSettings(...args: any[]): any;
  function setComposeContents(...args: any[]): any;
  function getComposeContents(...args: any[]): any;
  function deleteComposeContents(...args: any[]): any;
  function setVersion(...args: any[]): any;
  function getVersion(...args: any[]): any;
  function setContactChecksum(...args: any[]): any;
  function getContactChecksum(...args: any[]): any;
  function getNoticeBannerClosedAt(...args: any[]): any;
  function setNoticeBannerClosedAt(...args: any[]): any;
  function getNoticeId(...args: any[]): any;
  function setNoticeId(...args: any[]): any;
  function getPttPlaybackRate(...args: any[]): any;
  function setPttPlaybackRate(...args: any[]): any;
  function getLastStatusUsage(...args: any[]): any;
  function setLastStatusUsage(...args: any[]): any;
  function getOutgoingMessageSound(...args: any[]): any;
  function setOutgoingMessageSound(...args: any[]): any;
  function getHistorySyncEarliestDate(...args: any[]): any;
  function setHistorySyncEarliestDate(...args: any[]): any;
  function setShouldPreemptivelyCleanupLogs(...args: any[]): any;
  function getShouldPreemptivelyCleanupLogs(...args: any[]): any;
  const getRememberMe: any;
  const setRememberMe: any;
  const clearAllLocalState: any;
  const clearAllTemporaryStorageData: any;
  const _setAllKeyValues: any;
  const getCollection: any;
  const setCollection: any;
  const updatePreservedUserKeys: any;
  const thisTabId: string;
}

exportModule(exports, 'UserPrefs', (m) => m.getMaybeMeUser);
