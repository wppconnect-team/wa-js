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

import { createWid } from '../../util';
import { MsgKey } from '../../whatsapp';
import { getReactions as GetReaction } from '../../whatsapp/functions';

/**
 * Get all reactions in a message
 * @example
 * ```javascript
 * WPP.chat.getReactions('true_[number]@c.us_ABCDEF');
 * ```
 * @category Chat
 */

export async function getReactions(msgId: string): Promise<{
  reactionByMe: {
    id: MsgKey;
    orphan: number;
    msgId: MsgKey;
    reactionText: string;
    read: boolean;
    senderUserJid: string;
    timestamp: number;
  };
  reactions: {
    aggregateEmoji: string;
    hasReactionByMe: boolean;
    senders: {
      id: MsgKey;
      orphan: number;
      msgId: MsgKey;
      reactionText: string;
      read: boolean;
      senderUserJid: string;
      timestamp: number;
    }[];
  }[];
}> {
  const reactions = await GetReaction(msgId);

  const returnData: any = [];
  for (const d of reactions.reactions) {
    const data = {
      aggregateEmoji: d.aggregateEmoji,
      hasReactionByMe: d.hasReactionByMe,
      senders: <any>[],
    };
    for (const e of d.senders) {
      data.senders.push({
        id: e.msgKey as MsgKey,
        msgId: e.parentMsgKey,
        reactionText: e.reactionText,
        read: e.read,
        sender: createWid(e.senderUserJid)!,
        orphan: e.orphan,
        timestamp: e.timestamp,
      });
    }
    returnData.push(data);
  }
  return {
    reactionByMe: reactions.reactionByMe
      ? <any>{
          id: reactions.reactionByMe.msgKey as MsgKey,
          orphan: reactions.reactionByMe.orphan as number,
          msgId: reactions.reactionByMe.parentMsgKey as MsgKey,
          reactionText: reactions.reactionByMe.reactionText as string,
          read: reactions.reactionByMe.read as boolean,
          senderUserJid: createWid(reactions.reactionByMe.senderUserJid)!,
          timestamp: reactions.reactionByMe.timestamp as number,
        }
      : undefined,
    ...returnData,
  };
}
