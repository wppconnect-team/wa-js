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

import * as webpack from '../../webpack';
import { Wid } from '..';
import { exportModule } from '../exportModule';
import { createGroup } from './createGroup';

/** @whatsapp 79583 */
export declare function sendCreateGroup(
  groupName: string,
  participants: Wid[],
  ephemeral?: number,
  dogfooding?: boolean
): Promise<{
  gid: Wid;
  participants: (
    | {
        [key: `${number}@c.us`]: {
          code: string;
          invite_code: string | null;
          invite_code_exp: string | null;
        };
      }
    | {
        userWid: Wid;
        code: string;
        invite_code: string | null;
        invite_code_exp: string | null;
      }
  )[];
}>;

exportModule(
  exports,
  {
    sendCreateGroup: 'sendCreateGroup',
  },
  (m) => m.sendCreateGroup
);

/**
 * @whatsapp >= 2.2301.5
 */
webpack.injectFallbackModule('sendCreateGroup', {
  sendCreateGroup: async (
    groupName: string,
    participants: Wid[],
    ephemeral?: number,
    dogfooding?: boolean
  ) => {
    return await createGroup(
      groupName,
      participants,
      ephemeral,
      dogfooding
    ).then((e) => ({
      gid: e.wid,
      participants: e.participants.map((e) => ({
        userWid: e.wid,
        code: null != e.error ? e.error.toString() : '200',
        invite_code: e.invite_code,
        invite_code_exp: e.invite_code_exp,
      })),
    }));
  },
});
