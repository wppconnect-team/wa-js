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

import { z } from 'zod';

import { getProfilePictureUrl } from '../../contact';
import { ensureGroup } from '../../group';
import { downloadImage } from '../../util';
import {
  defaultSendMessageOptions,
  RawMessage,
  SendMessageOptions,
  sendMessageOptionsSchema,
  SendMessageReturn,
} from '..';
import { sendRawMessage } from '.';

export interface GroupInviteMessageOptions extends SendMessageOptions {
  jpegThumbnail?: string;
  inviteCode: string;
  inviteCodeExpiration?: number;
  groupId: string;
  groupName?: string;
  caption?: string;
}

const groupInviteMessageOptionsSchema = sendMessageOptionsSchema.extend({
  jpegThumbnail: z.string().optional(),
  inviteCode: z.string(),
  inviteCodeExpiration: z.number().optional(),
  groupId: z.string(),
  groupName: z.string().optional(),
  caption: z.string().optional(),
});

const chatSendGroupInviteMessageSchema = z.object({
  chatId: z.string(),
  options: groupInviteMessageOptionsSchema,
});
export type ChatSendGroupInviteMessageInput = z.infer<
  typeof chatSendGroupInviteMessageSchema
>;
export type ChatSendGroupInviteMessageOutput = SendMessageReturn;

/**
 * Send a group invite message
 *
 * @example
 * ```javascript
 * WPP.chat.sendGroupInviteMessage({
 *   chatId: '[number]@c.us',
 *   options: {
 *     inviteCode: '123',
 *     groupId: '789@g.us'
 *   }
 * });
 *
 * // After a invite
 * const result = await WPP.group.addParticipants({ groupId: '789@g.us', participantsIds: ['123@c.us'] });
 * const participant = result['123@c.us'];
 * if (participant.invite_code) {
 *   WPP.chat.sendGroupInviteMessage({
 *     chatId: '123@c.us',
 *     options: {
 *       inviteCode: participant.invite_code,
 *       inviteCodeExpiration: participant.invite_code_exp,
 *       groupId: '789@g.us'
 *     }
 *   });
 * }
 * ```
 *
 * @category Message
 */
export async function sendGroupInviteMessage(
  params: ChatSendGroupInviteMessageInput
): Promise<ChatSendGroupInviteMessageOutput> {
  const { chatId, options: opts } =
    chatSendGroupInviteMessageSchema.parse(params);
  const options: GroupInviteMessageOptions = {
    ...defaultSendMessageOptions,
    ...(opts as GroupInviteMessageOptions),
  };

  if (!options.groupName) {
    const group = await ensureGroup({ groupId: options.groupId.toString() });
    options.groupName = group.name;
  }

  if (!options.jpegThumbnail) {
    const url = await getProfilePictureUrl({
      chatId: options.groupId,
      full: false,
    });
    if (url) {
      try {
        const download = await downloadImage(url);
        options.jpegThumbnail = download.data.split(',', 2)[1];
      } catch (_error) {}
    }
  }
  const inviteLink = `https://chat.whatsapp.com/${options.inviteCode}`;
  let rawMessage: RawMessage = {};
  if (options.inviteCodeExpiration) {
    rawMessage = {
      type: 'groups_v4_invite',
      inviteGrpJpegThum: options.jpegThumbnail,
      inviteCode: options.inviteCode,
      inviteCodeExp: options.inviteCodeExpiration || '',
      inviteGrp: options.groupId,
      inviteGrpName: options.groupName,
      comment: options.caption,
    };
  } else {
    rawMessage = {
      type: 'chat',
      subtype: 'url',
      thumbnail: options.jpegThumbnail,
      thumbnailHeight: options.jpegThumbnail ? 100 : undefined,
      thumbnailWidth: options.jpegThumbnail ? 100 : undefined,
      title: options.groupName,
      inviteGrpType: 'DEFAULT',
      canonicalUrl: `https://chat.whatsapp.com/${options.inviteCode}`,
      description: options.caption
        ? `${options.caption}\n${inviteLink}`
        : inviteLink,
      body: options.caption ? `${options.caption}\n${inviteLink}` : inviteLink,
      matchedText: `https://chat.whatsapp.com/${options.inviteCode}`,
      richPreviewType: 0,
    } as any;
  }
  return await sendRawMessage({ chatId, rawMessage, options });
}
