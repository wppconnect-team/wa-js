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

import { exportModule } from '../exportModule';
import { MsgKey } from '../misc';

/**
 * @whatsapp 297673
 * @whatsapp 297673 >= 2.2232.6
 */
export interface ReactionReturn {
  reactionByMe: any;
  reactions: {
    aggregateEmoji: string;
    hasReactionByMe: boolean;
    senders: {
      msgKey: MsgKey;
      orphan: number;
      parentMsgKey: MsgKey;
      reactionText: string;
      read: boolean;
      senderUserJid: string;
      timestamp: number;
    }[];
  }[];
}
export declare function getReactions(msgId: string): Promise<ReactionReturn>;

exportModule(
  exports,
  {
    getReactions: 'getReactions',
  },
  (m) => m.getReactions
);
