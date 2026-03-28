/*!
 * Copyright 2023 WPPConnect Team
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
  archive,
  ChatArchiveInput,
  ChatArchiveOutput,
  unarchive,
} from './archive';
export {
  canMarkPlayed,
  ChatCanMarkPlayedInput,
  ChatCanMarkPlayedOutput,
} from './canMarkPlayed';
export { canMute, ChatCanMuteInput, ChatCanMuteOutput } from './canMute';
export { canReply, ChatCanReplyInput, ChatCanReplyOutput } from './canReply';
export { ChatClearInput, ChatClearOutput, clear } from './clear';
export { ChatCloseChatOutput, closeChat } from './closeChat';
export { ChatDeleteInput, ChatDeleteOutput, delete } from './delete';
export {
  ChatDeleteMessageInput,
  ChatDeleteMessageOutput,
  DeleteMessageReturn,
  deleteMessages,
} from './deleteMessages';
export {
  ChatDownloadMediaInput,
  ChatDownloadMediaOutput,
  downloadMedia,
} from './downloadMedia';
export {
  ChatEditMessageInput,
  ChatEditMessageOutput,
  editMessage,
} from './editMessage';
export { ChatFindInput, ChatFindOutput, find } from './find';
export {
  ChatForwardMessageInput,
  ChatForwardMessageOutput,
  forwardMessage,
} from './forwardMessage';
export {
  ChatForwardMessagesInput,
  ChatForwardMessagesOutput,
  forwardMessages,
} from './forwardMessages';
export {
  ChatGenerateMessageIDInput,
  ChatGenerateMessageIDOutput,
  generateMessageID,
} from './generateMessageID';
export { ChatGetInput, ChatGetOutput, get } from './get';
export { ChatGetActiveChatOutput, getActiveChat } from './getActiveChat';
export {
  ChatGetLastSeenInput,
  ChatGetLastSeenOutput,
  getLastSeen,
} from './getLastSeen';
export {
  ChatGetMessageACKInput,
  ChatGetMessageACKOutput,
  getMessageACK,
} from './getMessageACK';
export {
  ChatGetMessageByIdInput,
  ChatGetMessageByIdOutput,
  getMessageById,
} from './getMessageById';
export {
  ChatGetMessagesInput,
  ChatGetMessagesOutput,
  getMessages,
} from './getMessages';
export { ChatGetNotesInput, ChatGetNotesOutput, getNotes } from './getNotes';
export {
  ChatGetPlatformFromMessageInput,
  ChatGetPlatformFromMessageOutput,
  getPlatformFromMessage,
} from './getPlatformFromMessage';
export {
  ChatGetQuotedMsgInput,
  ChatGetQuotedMsgOutput,
  getQuotedMsg,
} from './getQuotedMsg';
export {
  ChatGetQuotedMsgKeyInput,
  ChatGetQuotedMsgKeyOutput,
  getQuotedMsgKey,
} from './getQuotedMsgKey';
export {
  ChatGetReactionsInput,
  ChatGetReactionsOutput,
  getReactions,
} from './getReactions';
export {
  ChatGetUnreadChatsInput,
  ChatGetUnreadChatsOutput,
  getUnreadChats,
} from './getUnreadChats';
export { ChatGetVotesInput, ChatGetVotesOutput, getVotes } from './getVotes';
export {
  ChatKeepMessageInput,
  ChatKeepMessageOutput,
  keepMessage,
} from './keepMessage';
export { ChatListInput, ChatListOutput, list } from './list';
export {
  ChatMarkIsComposingInput,
  ChatMarkIsComposingOutput,
  markIsComposing,
} from './markIsComposing';
export {
  ChatMarkIsPausedInput,
  ChatMarkIsPausedOutput,
  markIsPaused,
} from './markIsPaused';
export {
  ChatMarkIsReadInput,
  ChatMarkIsReadOutput,
  markIsRead,
} from './markIsRead';
export {
  ChatMarkIsRecordingInput,
  ChatMarkIsRecordingOutput,
  markIsRecording,
} from './markIsRecording';
export {
  ChatMarkIsUnreadInput,
  ChatMarkIsUnreadOutput,
  markIsUnread,
} from './markIsUnread';
export {
  ChatMarkPlayedInput,
  ChatMarkPlayedOutput,
  markPlayed,
} from './markPlayed';
export { ChatMuteInput, ChatMuteOutput, mute } from './mute';
export {
  ChatOpenChatAtInput,
  ChatOpenChatAtOutput,
  openChatAt,
} from './openChatAt';
export {
  ChatOpenChatBottomInput,
  ChatOpenChatBottomOutput,
  openChatBottom,
} from './openChatBottom';
export {
  ChatOpenChatFromUnreadInput,
  ChatOpenChatFromUnreadOutput,
  openChatFromUnread,
} from './openChatFromUnread';
export { ChatPinInput, ChatPinOutput, pin, unpin } from './pin';
export { ChatPinMsgInput, ChatPinMsgOutput, pinMsg, unpinMsg } from './pinMsg';
export {
  ChatPrepareAudioWaveformInput,
  ChatPrepareAudioWaveformOutput,
  prepareAudioWaveform,
} from './prepareAudioWaveform';
export {
  ChatPrepareLinkPreviewInput,
  LinkPreviewOptions,
  prepareLinkPreview,
} from './prepareLinkPreview';
export {
  ChatPrepareMessageButtonsInput,
  MessageButtonsOptions,
  prepareMessageButtons,
} from './prepareMessageButtons';
export {
  ChatPrepareRawMessageInput,
  ChatPrepareRawMessageOutput,
  prepareRawMessage,
} from './prepareRawMessage';
export {
  ButtonReplyOptions,
  ChatReplyToButtonMessageInput,
  ChatReplyToButtonMessageOutput,
  replyToButtonMessage,
} from './replyToButtonMessage';
export {
  ChatRequestPhoneNumberInput,
  ChatRequestPhoneNumberOutput,
  requestPhoneNumber,
} from './requestPhoneNumber';
export {
  ChatSendCatalogMessageInput,
  ChatSendCatalogMessageOutput,
  sendCatalogMessage,
} from './sendCatalogMessage';
export {
  ChatSendChargeMessageInput,
  ChatSendChargeMessageOutput,
  OrderItems,
  OrderMessageOptions,
  sendChargeMessage,
} from './sendChargeMessage';
export {
  ChatSendCreatePollMessageInput,
  ChatSendCreatePollMessageOutput,
  PoolMessageOptions,
  sendCreatePollMessage,
} from './sendCreatePollMessage';
export {
  ChatSendEventMessageInput,
  ChatSendEventMessageOutput,
  sendEventMessage,
} from './sendEventMessage';
export {
  AudioMessageOptions,
  AutoDetectMessageOptions,
  ChatSendFileMessageInput,
  ChatSendFileMessageOutput,
  DocumentMessageOptions,
  FileMessageOptions,
  ImageMessageOptions,
  sendFileMessage,
  StickerMessageOptions,
  VideoMessageOptions,
} from './sendFileMessage';
export {
  ChatSendGroupInviteMessageInput,
  ChatSendGroupInviteMessageOutput,
  sendGroupInviteMessage,
} from './sendGroupInviteMessage';
export {
  ChatSendListMessageInput,
  ChatSendListMessageOutput,
  ListMessageOptions,
  sendListMessage,
} from './sendListMessage';
export {
  ChatSendLocationMessageInput,
  ChatSendLocationMessageOutput,
  LocationMessageOptions,
  sendLocationMessage,
} from './sendLocationMessage';
export {
  ChatSendPixKeyMessageInput,
  ChatSendPixKeyMessageOutput,
  sendPixKeyMessage,
} from './sendPixKeyMessage';
export {
  ChatSendRawMessageInput,
  ChatSendRawMessageOutput,
  sendRawMessage,
} from './sendRawMessage';
export {
  ChatSendReactionToMessageInput,
  ChatSendReactionToMessageOutput,
  sendReactionToMessage,
} from './sendReactionToMessage';
export {
  ChatSendScheduledCallMessageInput,
  ChatSendScheduledCallMessageOutput,
  ScheduledCallMessageOptions,
  sendScheduledCallMessage,
} from './sendScheduledCallMessage';
export {
  ChatSendTextMessageInput,
  ChatSendTextMessageOutput,
  sendTextMessage,
  TextMessageOptions,
} from './sendTextMessage';
export {
  ChatSendVCardContactMessageInput,
  ChatSendVCardContactMessageOutput,
  sendVCardContactMessage,
  VCardContact,
} from './sendVCardContactMessage';
export {
  ChatSetChatListInput,
  ChatSetChatListOutput,
  FilterChatListTypes,
  setChatList,
} from './setChatList';
export {
  ChatSetInputTextInput,
  ChatSetInputTextOutput,
  setInputText,
} from './setInputText';
export { ChatSetNotesInput, ChatSetNotesOutput, setNotes } from './setNotes';
export {
  ChatStarMessageInput,
  ChatStarMessageOutput,
  starMessage,
  StarMessageReturn,
} from './starMessage';
export { ChatUnmuteInput, ChatUnmuteOutput, unmute } from './unmute';
