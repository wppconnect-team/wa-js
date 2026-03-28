/*!
 * Copyright 2022 WPPConnect Team
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

import { WPPError } from '../../util';
import { MsgKey, Wid } from '../../whatsapp';
import { getVotes as GetVotes } from '../../whatsapp/functions';
import { getMessageById } from './getMessageById';

const chatGetVotesSchema = z.object({
  msgId: z.string(),
});
export type ChatGetVotesInput = z.infer<typeof chatGetVotesSchema>;
export type ChatGetVotesOutput = {
  msgId: MsgKey;
  chatId: Wid;
  votes: {
    selectedOptions: number[];
    timestamp: number;
    sender: Wid;
  }[];
};

/**
 * Get votes of a poll
 * @example
 * ```javascript
 * WPP.chat.getVotes({ msgId: 'true_[number]@c.us_ABCDEF' });
 * ```
 * @category Chat
 */
export async function getVotes(
  params: ChatGetVotesInput
): Promise<ChatGetVotesOutput> {
  const { msgId } = chatGetVotesSchema.parse(params);
  const msg = await getMessageById({ id: msgId });

  if (msg.type != 'poll_creation') {
    throw new WPPError('msg_not_found', `Message ${msgId} not a poll`, {
      msgId,
    });
  }

  const msgKey = MsgKey.fromString(msgId);

  const votes = await GetVotes([msgKey]);
  const returnData = {
    msgId: msgKey,
    chatId: msgKey.remote,
    votes: <
      {
        selectedOptions: number[];
        timestamp: number;
        sender: Wid;
      }[]
    >[],
  };
  for (const vote of votes) {
    const arr = {
      selectedOptions: <any>[],
      timestamp: vote.senderTimestampMs,
      sender: vote.sender,
    };
    for (const d of vote.selectedOptionLocalIds) {
      arr.selectedOptions[d] = msg.pollOptions.filter(
        (i: any) => i.localId == d
      )[0];
    }
    returnData.votes.push(arr);
  }
  return returnData;
}
