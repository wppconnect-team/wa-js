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

import * as webpack from './webpack';

webpack.onInjected(() => {
  // allow to send backgroundColor, textColor and font for status
  const m = webpack.search((m) => m.createMsgProtobuf);

  const original = m.createMsgProtobuf;

  m.createMsgProtobuf = (e: any, t: any) => {
    const r = original(e, t);
    if (r.extendedTextMessage) {
      if (typeof e.backgroundColor === 'number') {
        r.extendedTextMessage.backgroundArgb = e.backgroundColor;
      }
      if (typeof e.textColor === 'number') {
        r.extendedTextMessage.textArgb = e.textColor;
      }
      if (typeof e.font === 'number') {
        r.extendedTextMessage.font = e.font;
      }
    }
    return r;
  };
});
