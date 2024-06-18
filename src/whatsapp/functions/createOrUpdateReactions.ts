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

import { exportModule } from '../exportModule';

export interface ReactionData {
  msgKey: string;
  orphan: number;
  orphanReason: any;
  parentMsgKey: string;
  reactionText: string;
  read: boolean;
  senderUserJid: string;
  timestamp: number;
}

/** @whatsapp 7394
 * @whatsapp 307394 >= 2.2222.8
 * @whatsapp WAWebReactionsMsgAction >= 2.3000.x
 */
export declare function createOrUpdateReactions(
  data: ReactionData[]
): Promise<any>;

exportModule(
  exports,
  {
    createOrUpdateReactions: ['addOrUpdateReactionsModelCollection'],
  },
  (m) => m.addOrUpdateReactionsModelCollection
);
