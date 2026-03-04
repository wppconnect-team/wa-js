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

import { internalEv } from '../../eventEmitter';
import * as webpack from '../../webpack';
import { Stream, StreamModel } from '../../whatsapp';
import { StreamInfo, StreamMode } from '../../whatsapp/enums';

webpack.onInjected(register);

function register() {
  // Emit current StreamMode immediately
  if (Stream.mode) {
    internalEv.emit('conn.stream_mode_changed', Stream.mode);
  }

  // Emit current StreamInfo immediately
  if (Stream.info) {
    internalEv.emit('conn.stream_info_changed', Stream.info);
  }

  // Listen to StreamMode changes
  Stream.on('change:mode', (model: StreamModel, mode: StreamMode) => {
    internalEv.emit('conn.stream_mode_changed', mode);
  });

  // Listen to StreamInfo changes
  Stream.on('change:info', (model: StreamModel, info: StreamInfo) => {
    internalEv.emit('conn.stream_info_changed', info);
  });
}
