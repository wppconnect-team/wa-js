/*!
 * Copyright 2026 WPPConnect Team
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

import Debug from 'debug';

import { internalEv } from '../../eventEmitter';
import * as loader from '../../loader';
import { StreamMode } from '../../whatsapp/enums';

const debug = Debug('WA-JS:conn:main_ready');

loader.onInjected(register);

function register() {
  const isReadyMode = (mode: StreamMode) =>
    mode === StreamMode.MAIN ||
    mode === StreamMode.QR ||
    mode === StreamMode.SYNCING;

  const checkMode = (mode: StreamMode) => {
    if (isReadyMode(mode)) {
      debug('emitting conn.main_ready');
      internalEv.emit('conn.main_ready');
      // Remove listener after first emission
      internalEv.off('conn.stream_mode_changed', checkMode);
    }
  };

  // Listen to stream mode changes (includes current value on registration)
  internalEv.on('conn.stream_mode_changed', checkMode);
}
