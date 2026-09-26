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
import * as loader from '../../loader';
import { Stream, StreamModel } from '../../whatsapp';
import { StreamInfo, StreamMode } from '../../whatsapp/enums';

loader.onInjected(register);

let finished = false;
let startedAt: number | undefined;
let retryTimer: ReturnType<typeof setTimeout> | undefined;

function register() {
  if (finished || retryTimer !== undefined) {
    return;
  }

  const stream = Stream;
  if (!stream) {
    startedAt ??= Date.now();
    if (Date.now() - startedAt >= 60_000) {
      finished = true;
      console.error('WA-JS: Stream events could not be registered after 60s');
      return;
    }
    // Retry only the missing binding, never an already installed registrar.
    retryTimer = setTimeout(() => {
      retryTimer = undefined;
      register();
    }, 1_000);
    return;
  }

  finished = true;

  // Listen to StreamMode changes
  stream.on('change:mode', (model: StreamModel, mode: StreamMode) => {
    internalEv.emit('conn.stream_mode_changed', mode);
  });

  // Listen to StreamInfo changes
  stream.on('change:info', (model: StreamModel, info: StreamInfo) => {
    internalEv.emit('conn.stream_info_changed', info);
  });

  // Install both listeners before dispatching the current state. A listener
  // exception must not leave the native hooks missing or trigger duplicates.
  if (stream.mode) {
    internalEv.emit('conn.stream_mode_changed', stream.mode);
  }
  if (stream.info) {
    internalEv.emit('conn.stream_info_changed', stream.info);
  }
}
