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

/**
 * @whatsapp 48826 >= 2.2238.5
 */
export declare function unixTime(): number;

/**
 * @whatsapp 48826 >= 2.2238.5
 */
export declare function unixTimeMs(): number;

let exported = false;

exportModule(
  exports,
  {
    unixTime: ['unixTime', 'Clock.globalUnixTime'],
    unixTimeMs: ['unixTimeMs', 'Clock.globalUnixTimeMilliseconds'],
  },
  (m) => {
    if (m.unixTime) {
      return true;
    }

    /**
     * Fix binding from method to function call
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
     */
    if (!exported && m.Clock?.globalUnixTime) {
      exported = true;
      m.Clock.globalUnixTime = m.Clock.globalUnixTime.bind(m.Clock);
      m.Clock.globalUnixTimeMilliseconds =
        m.Clock.globalUnixTimeMilliseconds.bind(m.Clock);
    }

    return m.Clock?.globalUnixTime;
  }
);
