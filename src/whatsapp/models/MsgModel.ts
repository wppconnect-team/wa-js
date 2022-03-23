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

import { TextFontStyle } from '../../enums';
import {
  ButtonCollection,
  MsgCollection,
  TemplateButtonCollection,
} from '../collections';
import { exportProxyModel } from '../exportModule';
import { MediaObject, MsgKey, Wid } from '../misc';
import { ChatModel, MediaDataModel } from '.';
import {
  Model,
  ModelOptions,
  ModelPropertiesContructor,
  ModelProxy,
} from './Model';

interface Props {
  id: MsgKey;
  rowId?: any;
  body?: string;
  type?: string;
  subtype?: string | null;
  t?: number;
  notifyName?: any;
  from?: Wid;
  to?: Wid;
  author?: Wid;
  self?: string;
  /**
   * See {@link Constants}
   */
  ack?: number;
  invis?: any;
  isNewMsg: boolean;
  star?: any;
  recvFresh?: any;
  caption?: string;
  interactiveAnnotations?: any;
  clientUrl?: any;
  loc?: any;
  lat?: number;
  lng?: number;
  isLive: boolean;
  accuracy?: number;
  speed?: number;
  degrees?: number;
  comment?: string;
  sequence?: number;
  shareDuration?: number;
  finalLat?: any;
  finalLng?: any;
  finalAccuracy?: any;
  finalThumbnail?: any;
  finalSpeed?: any;
  finalDegrees?: any;
  finalTimeOffset?: any;
  deprecatedMms3Url?: any;
  directPath?: any;
  mimetype?: any;
  duration?: any;
  filehash?: any;
  encFilehash?: any;
  size?: any;
  filename?: any;
  streamingSidecar?: any;
  mediaKey?: any;
  mediaKeyTimestamp?: any;
  pageCount?: any;
  isGif: boolean;
  gifAttribution?: any;
  isViewOnce: boolean;
  streamable?: any;
  width?: any;
  height?: any;
  thumbnailDirectPath?: any;
  thumbnailSha256?: any;
  thumbnailEncSha256?: any;
  thumbnailHeight?: any;
  thumbnailWidth?: any;
  scanLengths?: any;
  scansSidecar?: any;
  isFromTemplate: boolean;
  devicesAdded?: any;
  devicesRemoved?: any;
  isThisDeviceAdded: boolean;
  firstFrameLength?: any;
  firstFrameSidecar?: any;
  isAnimated: boolean;
  canonicalUrl: boolean;
  matchedText?: any;
  thumbnail?: any;
  thumbnailHQ?: any;
  richPreviewType?: any;
  doNotPlayInline?: any;
  title?: string;
  description?: any;
  businessOwnerJid?: any;
  productId?: any;
  currencyCode?: any;
  priceAmount1000?: any;
  salePriceAmount1000?: any;
  retailerId?: any;
  url?: any;
  productImageCount?: any;
  sessionId?: any;
  recipients?: any;
  broadcast?: any;
  quotedMsg?: MsgModel;
  quotedStanzaID?: any;
  quotedRemoteJid?: any;
  quotedParticipant?: any;
  mentionedJidList?: Wid[];
  footer?: string;
  hydratedButtons?: Array<{
    index?: number;
    quickReplyButton?: {
      displayText: string;
      id: string;
    };
    urlButton?: {
      displayText: string;
      url: string;
    };
    callButton?: {
      displayText: string;
      phoneNumber: string;
    };
  }>;
  buttons?: TemplateButtonCollection;
  selectedId?: any;
  selectedIndex?: any;
  multicast?: any;
  urlText?: string | null;
  urlNumber?: string | null;
  clearMedia?: any;
  isVcardOverMmsDocument: boolean;
  vcardList?: any;
  vcardFormattedName?: any;
  protocolMessageKey?: any;
  templateParams?: any;
  textColor?: number;
  backgroundColor?: number;
  font?: TextFontStyle;
  isForwarded: boolean;
  forwardingScore?: any;
  labels?: any;
  paymentCurrency?: any;
  paymentAmount1000?: any;
  paymentMessageReceiverJid?: any;
  paymentTransactionTimestamp?: any;
  paymentStatus?: any;
  paymentTxnStatus?: any;
  paymentNoteMsg?: any;
  paymentRequestMessageKey?: any;
  paymentExpiryTimestamp?: any;
  ephemeralStartTimestamp?: any;
  ephemeralDuration?: any;
  ephemeralSettingTimestamp?: any;
  ephemeralOutOfSync?: any;
  ephemeralSharedSecret?: any;
  disappearingModeInitiator?: any;
  bizPrivacyStatus?: any;
  privacyModeWhenSent?: any;
  verifiedBizName?: any;
  inviteCode?: any;
  inviteCodeExp?: any;
  inviteGrp?: any;
  inviteGrpName?: any;
  inviteGrpJpegThum?: any;
  sellerJid?: any;
  message?: any;
  orderTitle?: any;
  itemCount?: any;
  orderId?: any;
  surface?: any;
  status?: any;
  token?: any;
  totalAmount1000?: any;
  totalCurrencyCode?: any;
  historySyncMetaData?: any;
  mdDowngrade?: any;
  isSendFailure: boolean;
  appStateSyncKeyShare?: any;
  appStateSyncKeyRequest?: any;
  appStateFatalExceptionNotification?: any;
  broadcastParticipants?: any;
  broadcastEphSettings?: any;
  broadcastId?: any;
  ctwaContext?: any;
  list?: {
    buttonText: string;
    description: string;
    sections: Array<{
      title: string;
      rows: Array<{
        title: string;
        description: string;
        rowId: string;
      }>;
    }>;
    listType: number;
  };
  listResponse?: any;
  productListItemCount?: any;
  productHeaderImageRejected?: any;
  isDynamicReplyButtonsMsg: boolean;
  dynamicReplyButtons?: Array<{
    buttonId: string;
    buttonText: {
      displayText: string;
    };
    type: number;
  }>;
  replyButtons?: ButtonCollection;
  buttonsResponse?: any;
  selectedButtonId?: string;
  interactiveMessage?: any;
  isMdHistoryMsg: boolean;
}

interface Session {
  stale?: any;
  sendDeferred?: any;
  local?: true;
  search?: any;
  msgChunk?: any;
  phoneUploading?: any;
  startOfDay?: any;
  startOfDaySkew?: any;
  isQuotedMsgAvailable: boolean;
  senderObj?: any;
  mediaData?: MediaDataModel;
  forwardedFromWeb?: any;
  linksIndexParsed?: any;
}

interface Derived {
  chat?: ChatModel;
  hasTemplateButtons: boolean;
  ephemeralExpirationTimestamp?: any;
  isEphemeral: boolean;
  isQuickReply: boolean;
  isFutureproof: boolean;
  isGroupMsg: boolean;
  isStatusV3: boolean;
  isPSA: boolean;
  isRTL: boolean;
  asProductInquiry?: any;
  statusV3TextBg?: any;
  isSentByMe: boolean;
  isSentByMeFromWeb: boolean;
  isInternational: boolean;
  isNotification: boolean;
  asGroupNotification?: any;
  asBroadcastNotification?: any;
  isBizNotification: boolean;
  asProduct?: any;
  asAlbumAsset?: any;
  asGroupedSticker?: any;
  isMedia: boolean;
  asDoc?: any;
  asImage?: any;
  asVideo?: any;
  asMms?: any;
  asUrl?: any;
  asRevoked?: any;
  asViewOnce?: any;
  asVisualMedia?: any;
  numTimesForwarded?: any;
  isFrequentlyForwarded: boolean;
  eventType?: any;
  sender?: Wid;
  text?: any;
  containsEmoji?: any;
  isFailed: boolean;
  vcard?: any;
  isUnsentMedia: boolean;
  dir?: any;
  rtl?: any;
  linkPreview?: {
    title?: string;
    description?: string;
    canonicalUrl?: string;
    matchedText: string;
    richPreviewType: number;
    thumbnail?: string;
    doNotPlayInline: boolean;
  };
  isGroupsV4InviteExpired: boolean;
  isPersistent: boolean;
  isUnreadType: boolean;
  isUserCreatedType: boolean;
  supportsMessageFooter?: any;
  supportsMessageFooterLinks?: any;
  hasBodyOrFooter: boolean;
  initialPageSize?: any;
  productListHeaderImage?: any;
}

/** @whatsapp 17304 */
export declare interface MsgModel extends ModelProxy<Props, Session, Derived> {}

/** @whatsapp 17304 */
export declare class MsgModel extends Model {
  idClass: typeof MsgKey;
  constructor(
    proterties: ModelPropertiesContructor<MsgModel, 'id'>,
    options?: ModelOptions
  );
  mediaObject?: MediaObject;
  getLinks(e?: number): any;
  getHeaderLinks(): any;
  getFooterLinks(): any;
  getGalleryLinks(): any;
  getSuspiciousLinks(): any;
  hasSymbol(): boolean;
  mayFail(): any;
  isUnsentPhoneMsg(): boolean;
  canReply(): boolean;
  canPrivateReply(): boolean;
  canPrivateReplyInRestrictedGrp(): boolean;
  canForward(): boolean;
  canQuickForward(): boolean;
  canStar(): boolean;
  interactiveButtonsReleased(): any;
  isGroupLeave(): boolean;
  isTrusted(): boolean;
  getVcardWids(): any;
  getLocObject(): any;
  resumeRemoteUpload(): any;
  forceRMR(): any;
  isForcingRMR(): boolean;
  cancelDownload(): boolean;
  resumeUpload(): any;
  cancelUpload(): boolean;
  waitForPhoneUpload(): any;
  downloadMedia(e?: any): any;
  applyUpdate(e?: any): any;
  waitForPrep(): any;
  quotedMsgObj(): any;
  getQuotedMsgAdminGroupJid(): any;
  msgContextInfo(e?: any): any;
  displayName(e?: any, t?: any): any;
  isQuoted(e?: any): boolean;
  isMentioned(e?: any): boolean;
  mentionMap(): any;
  updateAck(e?: any, t?: any): any;
  avParams(): any;
  resend(): any;
  onCiphertextDecrypted(): any;
  onViewOnceMediaStatusChanged(): any;
  canRevoke(): boolean;
  getWamMessageType(): any;
  getWamMediaType(): any;
  getForwardingScoreWhenForwarded(): any;
  updateEphemeralStartTimestamp(e?: any): any;
  isExpired(): boolean;
  getCollection(): MsgCollection;
  isDownloadable(): boolean;
  safe(): any;
  unsafe(): any;
}

exportProxyModel(exports, 'MsgModel');
