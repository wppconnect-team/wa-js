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

import { WPPError } from '../../util';
import { ChatModel, MsgKey, MsgModel, Wid } from '../../whatsapp';
import {
  canEditMessage,
  fetchLinkPreview,
  findFirstWebLink,
  sendMessageEdit,
} from '../../whatsapp/functions';
import { LinkPreviewOptions, RawMessage } from '..';
import { getMessageById, prepareRawMessage } from '.';

/**
 * Send a text message
 *
 * @example
 * WPP.chat.editMessage('[number]@c.us', 'New text for message', {
 *   linkPreview: true,
 *   mentionedJidList: ['5521985232287@c.us']
 * });
 * ```
 * @category Message
 */
export async function editMessage(
  msgId: string | MsgKey,
  newText: any,
  options?: LinkPreviewOptions & { mentionedJidList?: Wid[] }
): Promise<MsgModel> {
  const msg = await getMessageById(msgId);

  const canEdit = canEditMessage(msg);
  if (!canEdit) {
    throw new WPPError(`edit_message_error`, `Cannot edit this message`);
  }
  let jidList: Wid[] | undefined = [];
  let linkPreview: any = false;

  if (options?.mentionedJidList) {
    const rawMessage: RawMessage = {
      body: newText,
      type: 'chat',
    };

    const raw = await prepareRawMessage(msg.chat as ChatModel, rawMessage, {
      mentionedList: options.mentionedJidList,
    });
    jidList = raw.mentionedJidList;
  }

  if (options?.linkPreview != false) {
    const override =
      typeof options?.linkPreview === 'object' ? options.linkPreview : {};

    if (newText) {
      try {
        const link = findFirstWebLink(newText);
        if (link) {
          const preview = await fetchLinkPreview(link);
          if (preview?.data) {
            linkPreview = { ...preview.data, ...override };
          }
        }
      } catch (error) {}
    }
  }

  await sendMessageEdit(msg as MsgModel, newText, {
    linkPreview: linkPreview,
    mentionedJidList: jidList as any,
  });

  return await getMessageById(msgId);
}
