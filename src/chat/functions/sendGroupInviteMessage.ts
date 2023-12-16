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

import { getProfilePictureUrl } from '../../contact';
import { ensureGroup } from '../../group';
import { downloadImage } from '../../util';
import { Wid } from '../../whatsapp';
import {
  defaultSendMessageOptions,
  RawMessage,
  SendMessageOptions,
  SendMessageReturn,
} from '..';
import { sendRawMessage } from '.';

export interface GroupInviteMessage extends SendMessageOptions {
  jpegThumbnail?: string;
  inviteCode: string;
  inviteCodeExpiration?: number;
  groupId: string | Wid;
  groupName?: string;
  caption?: string;
}

/**
 * Send a group invite message
 *
 * @example
 * ```javascript
 * WPP.chat.sendGroupInviteMessage(
 *  '[number]@c.us',
 *  {
 *    inviteCode: '123',
 *    groupId: '789@g.us'
 *  }
 * );
 *
 * // After a invite
 * const result = await WPP.group.addParticipants('789@g.us', '123@c.us');
 * const participant = result['123@c.us'];
 * if (participant.invite_code) {
 *   WPP.chat.sendGroupInviteMessage(
 *     '123@c.us',
 *     {
 *       inviteCode: participant.invite_code,
 *       inviteCodeExpiration: participant.invite_code_exp,
 *       groupId: '789@g.us'
 *     }
 *   );
 * }
 * ```
 *
 * @category Message
 */
export async function sendGroupInviteMessage(
  chatId: any,
  options: GroupInviteMessage
): Promise<SendMessageReturn> {
  options = {
    ...defaultSendMessageOptions,
    ...options,
  };

  if (!options.groupName) {
    const group = await ensureGroup(options.groupId);
    options.groupName = group.name;
  }

  if (!options.jpegThumbnail) {
    const url = await getProfilePictureUrl(options.groupId, false);
    if (url) {
      try {
        const download = await downloadImage(url);
        options.jpegThumbnail = download.data.split(',', 2)[1];
      } catch (error) {}
    }
  }

  const rawMessage: RawMessage = {
    type: 'groups_v4_invite',
    inviteGrpJpegThum: options.jpegThumbnail,
    inviteCode: options.inviteCode,
    inviteCodeExp: options.inviteCodeExpiration,
    inviteGrp: options.groupId,
    inviteGrpName: options.groupName,
    comment: options.caption,
  };

  return await sendRawMessage(chatId, rawMessage, options);
}
