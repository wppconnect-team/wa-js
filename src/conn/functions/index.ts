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

export {
  changeEnviromentDevice,
  ConnChangeEnviromentDeviceOutput,
} from './changeEnviromentDevice';
export {
  ConnGenLinkDeviceCodeForPhoneNumberInput,
  ConnGenLinkDeviceCodeForPhoneNumberOutput,
  genLinkDeviceCodeForPhoneNumber,
} from './genLinkDeviceCodeForPhoneNumber';
export {
  ABPropConfig,
  ConnGetABPropNameInput,
  ConnGetABPropNameOutput,
  ConnGetABPropsMapOutput,
  ConnGetABPropsOutput,
  getABPropName,
  getABProps,
  getABPropsMap,
} from './getABProps';
export { ConnGetAuthCodeOutput, getAuthCode } from './getAuthCode';
export {
  ConnGetAutoDownloadSettingsOutput,
  getAutoDownloadSettings,
} from './getAutoDownloadSettings';
export {
  BuildConstants,
  ConnGetBuildConstantsOutput,
  ConnIsWhatsAppVersionGTEInput,
  ConnIsWhatsAppVersionGTEOutput,
  ConnIsWhatsAppVersionLTEInput,
  ConnIsWhatsAppVersionLTEOutput,
  getBuildConstants,
  isWhatsAppVersionGTE,
  isWhatsAppVersionLTE,
} from './getBuildConstants';
export {
  ConnGetHistorySyncProgressOutput,
  getHistorySyncProgress,
} from './getHistorySyncProgress';
export {
  ConnGetMigrationStateOutput,
  getMigrationState,
} from './getMigrationState';
export { ConnGetMyDeviceIdOutput, getMyDeviceId } from './getMyDeviceId';
export { ConnGetMyUserIdOutput, getMyUserId } from './getMyUserId';
export { ConnGetMyUserLidOutput, getMyUserLid } from './getMyUserLid';
export { ConnGetMyUserWidOutput, getMyUserWid } from './getMyUserWid';
export { ConnGetPlatformOutput, getPlatform } from './getPlatform';
export { ConnGetStreamDataOutput, getStreamData } from './getStreamData';
export { ConnGetThemeOutput, getTheme, Theme } from './getTheme';
export { ConnIsAuthenticatedOutput, isAuthenticated } from './isAuthenticated';
export { ConnIsIdleOutput, isIdle } from './isIdle';
export { ConnIsMainInitOutput, isMainInit } from './isMainInit';
export { ConnIsMainLoadedOutput, isMainLoaded } from './isMainLoaded';
export { ConnIsMainReadyOutput, isMainReady } from './isMainReady';
export { ConnIsMultiDeviceOutput, isMultiDevice } from './isMultiDevice';
export { ConnIsOnlineOutput, isOnline } from './isOnline';
export { ConnIsRegisteredOutput, isRegistered } from './isRegistered';
export {
  ConnJoinWebBetaInput,
  ConnJoinWebBetaOutput,
  joinWebBeta,
} from './joinWebBeta';
export { ConnLogoutOutput, logout } from './logout';
export {
  ConnMarkAvailableInput,
  ConnMarkAvailableOutput,
  ConnMarkUnavailableOutput,
  markAvailable,
  markUnavailable,
} from './markAvailable';
export { ConnNeedsUpdateOutput, needsUpdate } from './needsUpdate';
export { ConnRefreshQROutput, refreshQR } from './refreshQR';
export {
  ConnSetAutoDownloadSettingsInput,
  ConnSetAutoDownloadSettingsOutput,
  setAutoDownloadSettings,
} from './setAutoDownloadSettings';
export {
  ConnSetKeepAliveInput,
  ConnSetKeepAliveOutput,
  setKeepAlive,
} from './setKeepAlive';
export { ConnSetLimitInput, ConnSetLimitOutput, setLimit } from './setLimit';
export {
  ConnSetMultiDeviceInput,
  ConnSetMultiDeviceOutput,
  setMultiDevice,
} from './setMultiDevice';
export { ConnSetThemeInput, ConnSetThemeOutput, setTheme } from './setTheme';
