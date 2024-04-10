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

import { injectFallbackModule } from '../../webpack';
import { exportModule } from '../exportModule';
import { MsgKey } from '../misc';
import { getTableVotes } from './getTableVotes';
import { VoteData } from './upsertVotes';
import { voteFromDbRow } from './voteFromDbRow';

/**
 * @whatsapp 816349
 * @whatsapp 816349 >= 2.2232.6
 */
export declare function getVotes(id: MsgKey[]): Promise<VoteData[]>;

exportModule(
  exports,
  {
    getVotes: 'getVotes',
    getVote: 'getVote',
  },
  (m) => m.getVotes && m.getVote
);

// Fix for version => 2.3000.1012654901
injectFallbackModule('getVotes', {
  getVote: (msgKey: MsgKey) => msgKey,
  getVotes: async (keys: MsgKey[]) => {
    const votes = await getTableVotes().anyOf(
      ['parentMsgKey'],
      keys.map((key) => key.toString())
    );
    return votes.map((vote: any) => voteFromDbRow(vote));
  },
});
