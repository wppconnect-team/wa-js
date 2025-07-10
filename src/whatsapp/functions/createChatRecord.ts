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
import { Wid } from '../misc';

/**
 * @whatsapp WAWebCreateChat >= 2.3000.0
 */
export declare function createChatRecord(
  id: Wid,
  chatRecord: {
    id: string;
    accountLid?: string;
    bizBotSystemMsgType?: string;
    createdLocally: boolean;
    disappearingModeInitiatedByMe?: boolean;
    disappearingModeInitiator?: string;
    disappearingModeTrigger?: string;
    ephemeralDuration?: number;
    ephemeralSettingTimestamp?: number;
    isAutoMuted: boolean;
    lidOriginType?: string;
    notSpam?: boolean;
    t?: number;
    tcToken: ArrayBuffer;
    tcTokenSenderTimestamp?: number;
    tcTokenTimestamp: number;
    unreadCount: number;
  }
): Promise<undefined>;

exportModule(
  exports,
  {
    createChatRecord: 'createChatRecord',
  },
  (m) => m.createChatRecord
);
