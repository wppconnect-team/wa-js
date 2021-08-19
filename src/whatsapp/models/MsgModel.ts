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

/** @moduleID 94490
 * @whatsapp 2.2126.14
 */
import { MsgCollection } from '../collections';
import { MsgKey } from '../misc';
import {
  Model,
  ModelOptions,
  ModelPropertiesContructor,
  ModelProxy,
} from './Model';

interface Props {
  id: MsgKey;
  rowId?: any;
  body?: any;
  type?: any;
  subtype?: any;
  t?: any;
  notifyName?: any;
  from?: any;
  to?: any;
  author?: any;
  self?: any;
  ack?: any;
  invis?: any;
  isNewMsg: boolean;
  star?: any;
  recvFresh?: any;
  caption?: any;
  interactiveAnnotations?: any;
  clientUrl?: any;
  loc?: any;
  lat?: any;
  lng?: any;
  isLive: boolean;
  accuracy?: any;
  speed?: any;
  degrees?: any;
  comment?: any;
  sequence?: any;
  shareDuration?: any;
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
  title?: any;
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
  quotedMsg?: any;
  quotedStanzaID?: any;
  quotedRemoteJid?: any;
  quotedParticipant?: any;
  mentionedJidList?: any;
  footer?: any;
  hydratedButtons?: any;
  buttons?: any;
  selectedId?: any;
  selectedIndex?: any;
  multicast?: any;
  urlText?: any;
  urlNumber?: any;
  clearMedia?: any;
  isVcardOverMmsDocument: boolean;
  vcardList?: any;
  vcardFormattedName?: any;
  protocolMessageKey?: any;
  templateParams?: any;
  textColor?: any;
  backgroundColor?: any;
  font?: any;
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
  list?: any;
  listResponse?: any;
  productListItemCount?: any;
  productHeaderImageRejected?: any;
  isDynamicReplyButtonsMsg: boolean;
  dynamicReplyButtons?: any;
  replyButtons?: any;
  buttonsResponse?: any;
  selectedButtonId?: any;
  interactiveMessage?: any;
  isMdHistoryMsg: boolean;
}

/** @moduleID 94490
 * @whatsapp 2.2126.14
 */
interface Session {
  stale?: any;
  sendDeferred?: any;
  local?: any;
  search?: any;
  msgChunk?: any;
  phoneUploading?: any;
  startOfDay?: any;
  startOfDaySkew?: any;
  isQuotedMsgAvailable: boolean;
  senderObj?: any;
  mediaData?: any;
  forwardedFromWeb?: any;
  linksIndexParsed?: any;
}

/** @moduleID 94490
 * @whatsapp 2.2126.14
 */
interface Derived {
  chat?: any;
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
  sender?: any;
  text?: any;
  containsEmoji?: any;
  isFailed: boolean;
  vcard?: any;
  isUnsentMedia: boolean;
  dir?: any;
  rtl?: any;
  linkPreview?: any;
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

/** @moduleID 94490
 * @whatsapp 2.2126.14
 */
export declare interface MsgModel extends ModelProxy<Props, Session, Derived> {}

/**
 * @moduleID 94490
 * @whatsapp 2.2126.14
 */
export declare class MsgModel extends Model {
  idClass: typeof MsgKey;
  constructor(
    proterties?: ModelPropertiesContructor<MsgModel>,
    options?: ModelOptions
  );
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
