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

import { ChatCollection } from '../collections';
import { SendMsgResult } from '../enums';
import { exportProxyModel } from '../exportModule';
import { MsgKey, MsgLoad, Wid } from '../misc';
import { GroupMetadataModel, MsgModel } from '.';
import { ModelOptions, ModelPropertiesContructor, ModelProxy } from './Model';
import { ModelChatBase, PropsChatBase, SessionChatBase } from './ModelChatBase';

interface Props extends PropsChatBase {
  lastReceivedKey?: MsgKey;
  t?: any;
  unreadCount?: any;
  archive?: any;
  isReadOnly: boolean;
  isAnnounceGrpRestrict: boolean;
  modifyTag?: any;
  muteExpiration?: any;
  notSpam?: any;
  pin?: any;
  changeNumberOldJid?: any;
  changeNumberNewJid?: any;
  ephemeralDuration?: any;
  ephemeralSettingTimestamp?: any;
  disappearingModeInitiator?: any;
  unreadMentionsOfMe?: any;
  msgUnsyncedButtonReplyMsgs?: any;
  endOfHistoryTransferType?: any;
}

interface Session extends SessionChatBase {
  stale?: any;
  createdLocally?: any;
  pendingAction?: any;
  formattedTitle?: any;
  active?: any;
  pausedTimerId?: any;
  presenceResendTimerId?: any;
  recording?: any;
  typing?: any;
  colors?: any;
  composeContents?: any;
  attachMediaContents?: any;
  squelch?: any;
  pendingSeenCount?: any;
  markedUnread?: any;
  trusted?: any;
  canSend: boolean;
  promises: { [key: string]: Promise<any> | undefined | null };
  ftsCache?: any;
  composeQuotedMsg?: any;
  composeQuotedMsgRemoteJid?: any;
  quotedMsgAdminGroupJid?: any;
  groupMetadata?: GroupMetadataModel;
  presence?: any;
  mute?: any;
  contact?: any;
  liveLocation?: any;
  liveLocationQueried?: any;
  ackedProps?: any;
  mediaCount?: any;
  linkCount?: any;
  docCount?: any;
  productCount?: any;
  vcardDismissed?: any;
  endOfHistoryTransfer?: any;
  hasEstablishedE2EESession: boolean;
  pendingInitialLoading?: any;
}

interface Derived {
  kind?: any;
  isUser: boolean;
  isPSA: boolean;
  isGroup: boolean;
  isBroadcast: boolean;
  canUnread: boolean;
  hasUnread: boolean;
  optimisticUnreadCount?: any;
  shouldShowUnreadDivider?: any;
  shouldAppearInList?: any;
  previewMessage?: any;
  showChangeNumberNotification?: any;
  shouldShowUnreadInTitle?: any;
}

/** @whatsapp 2.2144.10:58380 */
export declare interface ChatModel
  extends ModelProxy<Props, Session, Derived> {}

/** @whatsapp 2.2144.10:58380 */
export declare class ChatModel extends ModelChatBase {
  idClass: typeof Wid;
  constructor(
    proterties?: ModelPropertiesContructor<ChatModel>,
    options?: ModelOptions
  );
  isSupportGroup(): boolean;
  decPending(): any;
  onActiveUpdate(): any;
  onPendingActionUpdate(): any;
  onNotSpamChange(): any;
  hasMaybeSentMsgToChat(): boolean;
  isTrusted(): boolean;
  updateMuteExpiration(): any;
  updateTitle(): any;
  title(): any;
  updateCanSend(): any;
  isDirty(): boolean;
  resetMediaMsgs(): any;
  isMsgForMediaCollection(e?: any): boolean;
  addMediaMsgs(e?: any, t?: any): any;
  onNewMsg(e?: any): any;
  canPin(): boolean;
  canArchive(): boolean;
  sendDismissChangeNumber(): any;
  setComposeContents(e?: any): any;
  getSessionPersistedComposeContents(): any;
  getComposeContents(): any;
  setAttachMediaContents(e?: any): any;
  preload(): any;
  onEmptyMRM(): any;
  loadEarlierMsgs(e?: any, t?: any): any;
  isMostRecentCMC(e?: any): boolean;
  loadRecentMsgs(e?: any): any;
  getSearchContext(
    msg: MsgModel | MsgKey,
    options?: {
      isQuotedMsgAvailable: boolean;
    }
  ): {
    collection: MsgLoad;
    msg?: MsgModel;
    key?: MsgKey;
    highlightMsg: true;
  };
  sendStarMsgs(e?: any, t?: any): any;
  sendRevokeMsgs(
    messages: MsgModel[],
    deleteMediaInDevice?: boolean
  ): Promise<SendMsgResult>;
  sendDeleteMsgs(
    messages: MsgModel[],
    deleteMediaInDevice?: boolean
  ): Promise<SendMsgResult>;

  deleteMsgs(e?: any, t?: any): any;
  deleteMsgsOlderThan(e?: any, t?: any, r?: any): any;
  deleteMsgsBeforeMsgInclusive(e?: any, t?: boolean, r?: any): any;
  deleteMsgsPartial(e?: any, t?: boolean): any;
  getFirstMsgWithStatus(): any;
  getLastReceivedMsg(): any;
  getLastReceivedNonExpiredMsg(e?: any): any;
  getLastMsgKeyForAction(): MsgKey;
  getLastTimestampMsg(): any;
  getWebcChatType(): any;
  deregisterExpiredViewOnceBulkMessages(e?: any): any;
  sendGroupInviteMessage(
    e?: any,
    t?: any,
    r?: any,
    a?: any,
    i?: any,
    n?: any
  ): any;
  forwardMessages(e?: any, t?: boolean): any;
  updateReadOnly(): any;
  updateIsAnnounceGrpRestrict(): any;
  sortMsgs(e?: any): any;
  waitForChatLoading(): any;
  loadAssignedColors(): any;
  saveAssignedColors(): any;
  assignedColor(e?: any): any;
  unstarAll(): any;
  constructMediaMsgs(e?: any): any;
  fts(e?: any, t?: boolean, r?: any): any;
  updateSortTime(): any;
  removeFromCollection(e?: any): any;
  getMediaMsgs(): any;
  getLinkMsgs(): any;
  getDocMsgs(): any;
  getParticipantCount(): any;
  getProductMsgs(): any;
  getReceivedVcardMsgs(): any;
  dismissVcard(): any;
  updateMediasCountOnMsg(e?: any, t?: boolean): any;
  resetMediasCount(e?: any): any;
  getStarredMsgs(): any;
  setAndKeepPrevious(e?: any, t?: any): any;
  getAckedPhoneProps(): any;
  regCancellablePromise(e?: any): any;
  cancelPendingPromises(): boolean;
  matchFilter(e?: any): any;
  getEphemeralSetting(): any;
  getEphemeralSettingTimestamp(): any;
  isEphemeralSettingOn(): boolean;
  shouldShowEphemeralSetting(): any;
  getDisappearingModeInitiator(): any;
  getCollection(): ChatCollection;
  getGroupMetadataCollection(): any;
  removeMsg(e?: any): any;
  getAllCMCs(): any;
  getAllMsgs(): any;
  replaceMsgsCollection(e?: any): any;
  removeMsgsCollection(e?: any): any;
  notifyMsgCollectionMerge(e?: any, t?: any, r?: any, a?: any): any;
}

exportProxyModel(exports, 'ChatModel');
