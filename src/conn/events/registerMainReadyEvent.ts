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

import Debug from 'debug';

import { internalEv } from '../../eventEmitter';
import * as webpack from '../../webpack';
import { Cmd, Stream } from '../../whatsapp';

const debug = Debug('WA-JS:conn:main_ready');

webpack.onInjected(register);
let isMainReady = false;

function register() {
  const trigger = async () => {
    debug('trigger called, isMainReady:', isMainReady);
    if (!isMainReady) {
      isMainReady = true;
      setTimeout(() => (isMainReady = false), 1000);
      debug('emitting conn.main_ready');
      internalEv.emit('conn.main_ready');
    }
  };

  if (Stream.mode === 'MAIN') {
    debug('Stream.mode is already MAIN, triggering immediately');
    trigger();
  } else {
    debug('Stream.mode is not MAIN, registering listeners');
    Cmd.on('main_stream_mode_ready', () => {
      debug('main_stream_mode_ready event received');
      trigger();
    });
    Cmd.on('main_stream_mode_ready_legacy', () => {
      debug('main_stream_mode_ready_legacy event received');
      trigger();
    });

    // Also listen for Stream mode changes in case events were missed
    const checkMode = () => {
      debug('Stream.mode changed to:', Stream.mode);
      if (Stream.mode === 'MAIN') {
        debug('Stream.mode is now MAIN, triggering');
        trigger();
      }
    };

    // Listen to Stream model changes
    debug('typeof Stream.on:', typeof Stream.on);
    if (typeof Stream.on === 'function') {
      debug('Registering Stream change:mode listener');
      Stream.on('change:mode', checkMode);
    } else {
      debug('Stream.on is not a function, trying alternative approach');
      // Try polling as fallback
      const pollInterval = setInterval(() => {
        debug('Polling Stream.mode:', Stream.mode);
        if (Stream.mode === 'MAIN') {
          clearInterval(pollInterval);
          trigger();
        }
      }, 500);
    }
  }
}
