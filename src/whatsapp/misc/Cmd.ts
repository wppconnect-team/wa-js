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

import { ChatModel } from '..';
import { exportModule } from '../exportModule';
import { getSearchContext } from '../functions';
import { MsgModel } from '../models';
import { EventEmitter } from '.';

/** @whatsapp 88102
 * @whatsapp 81572 >= 2.2218.4
 * @whatsapp 781572 >= 2.2222.8
 */
export declare class CmdClass extends EventEmitter {
  public isMainLoaded: boolean;
  public uiBusy: number;

  mainLoaded(): void;
  incrementProgress(): void;
  initialLoadReady(): void;
  logSocketSummary(): void;
  muteAll(e?: any, t?: any): void;
  muteAllCall(e?: any, t?: any): void;
  muteChat(e?: any, t?: any): void;
  muteChats(e?: any, t?: any, r?: any): void;
  deleteOrExitChat(e?: any, t?: any): void;
  clearChat(e?: any, t?: any): void;
  archiveChat(e?: any, t?: any): void;
  pinChat(e?: any, t?: any): void;
  pinChats(e?: any, t?: any): void;
  markChatUnread(e?: any, t?: any): void;
  msgInfoDrawer(e?: any): void;
  chatSearch(e?: any): void;
  chatInfoDrawer(e?: any, t?: any, r?: any): void;
  attachMediaDrawer(e?: any): void;
  attachProduct(e?: any): void;
  verificationDrawer(e?: any): void;
  liveLocationDrawer(e?: any, t?: any): void;
  expiredLocationDrawer(e?: any): void;
  mediaViewerModal(e?: any): void;
  openMediaViewerForAlbumMedia(e?: any): void;
  productImageViewerModal(e?: any, t?: any): void;
  ephemeralDrawer(e?: any, t?: any): void;
  sendStarMsgs(
    chat: ChatModel,
    msgs: MsgModel[],
    id?: any,
    toastPosition?: any
  ): void;
  sendUnstarMsgs(
    chat: ChatModel,
    msgs: MsgModel[],
    id?: any,
    toastPosition?: any
  ): void;
  sendDeleteMsgs(
    chat: ChatModel,
    msg: {
      type: string;
      list: MsgModel[];
    },
    options?: {
      clearMedia?: boolean;
      toastPosition?: any;
    }
  ): void;
  sendRevokeMsgs(
    chat: ChatModel,
    msg: {
      type: string;
      list: MsgModel[];
    },
    options?: {
      clearMedia?: boolean;
      toastPosition?: any;
    }
  ): void;
  _openChat(e?: any, t?: any): void;
  openChatAt(
    chat: ChatModel,
    context: ReturnType<typeof getSearchContext>
  ): Promise<boolean>;
  openChatFromUnread(chat: ChatModel): Promise<boolean>;
  openChatBottom(chat: ChatModel): Promise<boolean>;
  scrollToPtt(e?: any): void;
  _scrollToFocusedMsg(e?: any): void;
  _scrollChatToBottom(): void;
  flashFocusedMsg(e?: any): void;
  updateChatlistSelection(e?: any): void;
  closeChat(e?: any): void;
  focusChatTextInput(e?: any): void;
  setChatCtwaContextLinkData(e?: any, t?: any): void;
  focusShowMsg(e?: any): void;
  enterChatTextInput(e?: any): void;
  focusNextChat(e?: any): void;
  focusPrevChat(e?: any): void;
  focusChatList(): void;
  focusChatSearch(): void;
  pasteChatTextInput(e?: any, t?: any): void;
  startGroupCall(e?: any, t?: any): void;
  closeStatusViewer(): void;
  sendPasteToCompose(e?: any, t?: any): void;
  openComposeBoxPanel(e?: any): void;
  login(e?: any): void;
  logout(): void;
  openContextMenu(e?: any, t?: any): void;
  closeContextMenu(e?: any): void;
  openTooltip(e?: any, t?: any): void;
  closeTooltip(e?: any): void;
  openToast(e?: any): void;
  closeToast(e?: any): void;
  alertNewMsg(e?: any): void;
  newMediaMsg(e?: any): void;
  alertCall(e?: any, t?: any, r?: any, n?: any, i?: any): void;
  cancelCall(e?: any): void;
  windowError(): void;
  cannotReachPhone(): void;
  sentPing(): void;
  openModal(e?: any, t?: any): void;
  closeModal(e?: any): void;
  openModalMedia(e?: any, t?: any): void;
  closeModalMedia(): void;
  setDrawerContext(e?: any, t?: any): void;
  openDrawerRight(e?: any, t?: any, r?: any, n?: any, i?: any): void;
  openDrawerMid(e?: any, t?: any, r?: any, n?: any, i?: any, a?: any): void;
  openDrawerLeft(e?: any, t?: any, r?: any, n?: any, i?: any): void;
  existsDrawerRight(e?: any): void;
  existsDrawerMid(e?: any): void;
  existsDrawerLeft(e?: any): void;
  closeDrawerRight(): void;
  closeDrawerMid(): void;
  closeDrawerLeft(): void;
  onPanesWillChange(e?: any): void;
  onPanesDidChange(e?: any): void;
  openGroupInviteModal(e?: any): void;
  openGroupV4InviteRequestFlow(e?: any, t?: any, r?: any, n?: any): void;
  mediaPlaying(e?: any): void;
  pttRecording(): void;
  pttPlaying(e?: any): void;
  uiResize(): void;
  setUiBusy(e?: any): void;
  windowMouseDown(e?: any): void;
  windowClick(e?: any): void;
  midnight(): void;
  textsizeChange(e?: any): void;
  scrollMessages(): void;
  getConversationHeaderOffset(e?: any): void;
  floaterEscapeOverlap(e?: any, t?: any): void;
  autoplayPTT(e?: any): void;
  refreshMessages(): void;
  serverPropsUpdated(): void;
  storageInitializationError(): void;
  restartBackend(): void;
  downgradeWebclient(): void;
  upgradeToMDInternal(): void;
  upgradeToMDProd(): void;
  refreshQR(): void;
  setSocketState(e?: any): void;
  socketStreamDisconnected(): void;
  openSocketStream(): void;
  readyForMainStreamMode(): void;
  onInitialChatHistorySynced(): void;
  onRecentChatHistorySynced(): void;
  onFullChatHistorySynced(): void;
  onHistorySyncChunkProcessed(e?: any): void;
  handleOfflineProgressUpdate(): void;
  criticalSyncDone(): void;
  onTemporaryBan(e?: any): void;
  onStartingLogout(): void;
  handleFatalError(): void;
  merchantDetailsDrawer(e?: any): void;
  showMerchantDetailsEntityTypePopup(e?: any, t?: any): void;
  showCountrySelector(e?: any, t?: any, r?: any): void;
  toggleStickerMaker(): void;
}

/** @whatsapp 88102
 * @whatsapp 81572 >= 2.2218.4
 * @whatsapp 781572 >= 2.2222.8
 */
export declare const Cmd: CmdClass;

exportModule(
  exports,
  {
    CmdClass: 'CmdImpl',
    Cmd: 'Cmd',
  },
  (m) => m.Cmd && m.CmdImpl
);
