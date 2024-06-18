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

import { Wid } from '../../whatsapp';

export interface CallEventTypes {
  /**
   * Triggered when you a incoming call
   *
   * @example
   * ```javascript
   * WPP.on('call.incoming_call', (call) => {
   *   // Your code
   *   //Example: Reject any incoming call
   *   WPP.call.rejectCall(call.id);
   * });
   * ```
   */
  'call.incoming_call': {
    /**
     * The call id
     */
    id: string;
    /**
     * Is a call from a group
     */
    isGroup: boolean;
    /**
     * Is call with video
     */
    isVideo: boolean;
    /**
     * timestamp of offer
     */
    offerTime: number;
    /**
     * Wid of sender without device id
     */
    sender: Wid;
    /**
     * Wid of sender with device id
     */
    peerJid: Wid;
  };
}
