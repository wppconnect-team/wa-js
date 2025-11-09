/*!
 * Copyright 2025 WPPConnect Team
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

import { MsgKey, MsgModel, WidFactory } from '../../whatsapp';

export function rehydrateMessage(value: any): MsgModel | undefined {
  if (!value) {
    return undefined;
  }

  if (value instanceof MsgModel) {
    return value;
  }

  const msgData = JSON.parse(value);

  // Message that is being quoted, can't have quotedMsg property
  if (msgData.quotedMsg) {
    delete msgData.quotedMsg;
  }

  // Handle msgData.id - it's a MsgKey, not a Wid
  if (typeof msgData.id === 'string') {
    // Use MsgKey.fromString to parse the serialized message key
    msgData.id = MsgKey.fromString(msgData.id);
  } else if (typeof msgData.id === 'object' && msgData.id !== null) {
    // If it's an object, convert it to MsgKey
    msgData.id = new MsgKey({
      fromMe: msgData.id.fromMe,
      remote: WidFactory.createWid(msgData.id.remote),
      id: msgData.id.id,
      participant: msgData.id.participant
        ? WidFactory.createWid(msgData.id.participant)
        : undefined,
    });
  }

  // Convert Wid fields
  if (msgData.from) {
    msgData.from = WidFactory.createWid(msgData.from);
  }
  if (msgData.to) {
    msgData.to = WidFactory.createWid(msgData.to);
  }
  if (msgData.author) {
    msgData.author = WidFactory.createWid(msgData.author);
  }

  // Convert messageSecret to Uint8Array
  if (msgData.messageSecret && typeof msgData.messageSecret === 'object') {
    msgData.messageSecret = new Uint8Array(
      Object.values(msgData.messageSecret)
    );
  }

  const msg = new MsgModel(msgData);

  // Wrap msgContextInfo to remove problematic fields (mainly for quoted medias)
  const originalMsgContextInfo = msg.msgContextInfo?.bind(msg);
  if (originalMsgContextInfo) {
    msg.msgContextInfo = function (chatId) {
      const result = originalMsgContextInfo(chatId);

      if (result?.quotedMsg) {
        delete result.quotedMsg.messageSecret;
        delete result.quotedMsg.streamingSidecar;
        delete result.quotedMsg.mediaKey;
        delete result.quotedMsg.mediaKeyTimestamp;
        delete result.quotedMsg.directPath;
        delete result.quotedMsg.filehash;
        delete result.quotedMsg.encFilehash;
      }

      return result;
    };
  }

  return msg;
}
