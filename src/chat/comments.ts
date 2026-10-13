/*!
 * Copyright 2026 WPPConnect Team
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

import { assertGetChat } from '../assert';
import { WPPError } from '../util';
import { ContactStore, MsgKey, MsgModel } from '../whatsapp';
import { CommentModel } from '../whatsapp/models/CommentModel';
import { getMessageById } from './functions/getMessageById';

/** Safe, serializable comment data. No encryption keys or internal model fields. */
export interface Comment {
  id: string;
  parentMsgId: string;
  chatId: string;
  author?: string;
  authorName?: string;
  fromMe: boolean;
  body?: string;
  timestamp: number;
  type: CommentModel['type'];
  ack?: number;
  read?: boolean;
  protocolMessageId?: string;
}

export interface CommentEvent {
  /** Adds can include cached history hydrated by WhatsApp. Deduplicate by id. */
  action: 'add' | 'update' | 'remove';
  comment: Comment;
}

export function serializeComment(comment: CommentModel): Comment {
  const contact = comment.author
    ? ContactStore?.get(comment.author)
    : undefined;
  const authorName = [contact?.name, contact?.pushname].find(
    (value) => typeof value === 'string' && value.trim()
  );
  return {
    id: comment.id.toString(),
    parentMsgId: comment.parentMsgKey.toString(),
    chatId: comment.parentMsgKey.remote.toString(),
    author: comment.author?.toString(),
    authorName: authorName?.trim(),
    fromMe: comment.id.fromMe === true || contact?.isMe === true,
    body: comment.type === 'comment' ? comment.body : undefined,
    timestamp: comment.t,
    type: comment.type,
    ack: comment.ack,
    read: comment.read,
    protocolMessageId: comment.protocolMessageKey?.toString(),
  };
}

export async function getCommentParent(
  messageId: string | MsgKey
): Promise<MsgModel> {
  if (!messageId || typeof messageId.toString !== 'function') {
    throw new WPPError('invalid_message_id', 'A message id is required');
  }
  const msg = await getMessageById(messageId.toString());
  const chat = assertGetChat(msg.id.remote);
  if (!chat.groupMetadata?.defaultSubgroup) {
    throw new WPPError(
      'not_community_announcement',
      'Comments require a community announcement'
    );
  }
  return msg;
}
