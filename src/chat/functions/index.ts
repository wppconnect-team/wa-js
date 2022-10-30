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

export { archive, unarchive } from './archive';
export { canMarkPlayed } from './canMarkPlayed';
export { canMute } from './canMute';
export { canReply } from './canReply';
export { clear } from './clear';
export { delete } from './delete';
export { deleteMessage, DeleteMessageReturn } from './deleteMessage';
export { downloadMedia } from './downloadMedia';
export { find } from './find';
export { generateMessageID } from './generateMessageID';
export { get } from './get';
export { getLastSeen } from './getLastSeen';
export { getMessageById } from './getMessageById';
export { getMessages, GetMessagesOptions } from './getMessages';
export { getPlatformFromMessage } from './getPlatformFromMessage';
export { ChatListOptions, list } from './list';
export { markIsComposing } from './markIsComposing';
export { markIsPaused } from './markIsPaused';
export { markIsRead } from './markIsRead';
export { markIsRecording } from './markIsRecording';
export { markIsUnread } from './markIsUnread';
export { markPlayed } from './markPlayed';
export { mute } from './mute';
export { openChatAt } from './openChatAt';
export { openChatBottom } from './openChatBottom';
export { openChatFromUnread } from './openChatFromUnread';
export { pin, unpin } from './pin';
export { LinkPreviewOptions, prepareLinkPreview } from './prepareLinkPreview';
export {
  MessageButtonsOptions,
  prepareMessageButtons,
} from './prepareMessageButtons';
export { prepareRawMessage } from './prepareRawMessage';
export {
  PoolMessageOptions,
  sendCreatePollMessage,
} from './sendCreatePollMessage';
export {
  AudioMessageOptions,
  AutoDetectMessageOptions,
  DocumentMessageOptions,
  FileMessageOptions,
  ImageMessageOptions,
  sendFileMessage,
  StickerMessageOptions,
  VideoMessageOptions,
} from './sendFileMessage';
export { ListMessageOptions, sendListMessage } from './sendListMessage';
export {
  LocationMessageOptions,
  sendLocationMessage,
} from './sendLocationMessage';
export { sendRawMessage } from './sendRawMessage';
export { sendReactionToMessage } from './sendReactionToMessage';
export { sendTextMessage, TextMessageOptions } from './sendTextMessage';
export {
  sendVCardContactMessage,
  VCardContact,
} from './sendVCardContactMessage';
export { starMessage, StarMessageReturn } from './starMessage';
export { unmute } from './unmute';
