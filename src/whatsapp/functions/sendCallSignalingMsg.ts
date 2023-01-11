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
import { exportModule } from '../exportModule';

/** @whatsapp 56981
 * @whatsapp 383674 >= 2.2228.4
 */
export declare function sendCallSignalingMsg(
  data: {
    common: {
      type?: string;
      call_id?: string;
      peer_jid: string;
    };
    payload: [
      string,
      {
        'call-id': string;
        'call-creator': string;
        count?: any;
      },
      null
    ];
  },
  tagId?: string
): Promise<{ payload: any; status: 200 }>;

exportModule(
  exports,
  {
    sendCallSignalingMsg: 'sendCallSignalingMsg',
  },
  (m) => m.sendCallSignalingMsg
);

/**
 * @todo, create a full fallback based on sendCallSignalingMsg for WhatsApp >= 2.2301.5
 */
webpack.injectFallbackModule('sendCallSignalingMsg', {
  sendCallSignalingMsg: async () => {
    console.error('Unsupported for WhatsApp >= 2.2301.5');
    return { payload: null, status: 500 };
  },
});
