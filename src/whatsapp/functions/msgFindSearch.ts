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

import { MsgKey, Wid } from '..';
import { exportModule } from '../exportModule';
import { ModelPropertiesContructor, MsgModel } from '../models';

export interface MsgFindSearchParams {
  searchTerm: string;
  page?: number;
  count: number;
  remote?: Wid;
  anchor?: MsgKey;
}

/**
 * Search for messages with a search term
 * @whatsapp WAWebDBMessageFindLocal >= 2.3000.1034162388
 */
export declare function msgFindSearch(params: MsgFindSearchParams): Promise<{
  messages: ModelPropertiesContructor<MsgModel>[];
  eof: boolean;
  canceled: boolean;
}>;

exportModule(
  exports,
  {
    msgFindSearch: 'msgFindSearch',
  },
  (m) => m.msgFindSearch
);
