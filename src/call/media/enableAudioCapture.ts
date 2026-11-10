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

import { internalEv } from '../../eventEmitter';
import {
  addAudioFrameListener,
  AudioFrameListener,
  removeAudioFrameListener,
} from './audioCapture';
import { installAudioInjector } from './audioInjector';
import {
  armMediaSession,
  isMediaSessionCurrent,
  onMediaSessionEnd,
} from './mediaSession';
import { floatToInt16, FRAME_SAMPLE_RATE, int16ToBase64 } from './pcm';

export interface AudioCaptureOptions {
  /**
   * `float32` (default) emits Float32Array samples; `int16-base64` emits a
   * base64 string, which passes through `page.exposeFunction` unchanged
   */
  format?: 'float32' | 'int16-base64';
  /**
   * Which side to emit, both by default
   */
  source?: 'both' | 'remote' | 'local';
}

let emitter: AudioFrameListener | null = null;
let releaseHook: (() => void) | undefined;
let releaseSession: (() => void) | undefined;

/**
 * Emit the call audio as `call.audio_frame` events: 16 kHz mono frames of
 * 60 ms. `remote` frames are what you hear, `local` frames what you send.
 *
 * Enable it before the call starts: the audio graph of the call is created
 * when the call starts and cannot be tapped afterwards.
 *
 * Applies to one call and stops when it ends or is replaced. Re-enable for
 * another call. Pass `false` to stop early.
 *
 * @example
 * ```javascript
 * WPP.call.enableAudioCapture({ format: 'int16-base64', source: 'remote' });
 * WPP.on('call.audio_frame', (frame) => {
 *   // frame.samples
 * });
 *
 * // Stop
 * WPP.call.enableAudioCapture(false);
 * ```
 *
 * @category Call
 */
export function enableAudioCapture(
  options: AudioCaptureOptions | boolean = {}
): void {
  const previous = emitter;
  const previousHook = releaseHook;
  const previousSession = releaseSession;
  if (options === false) {
    emitter = null;
    releaseHook = undefined;
    releaseSession = undefined;
    if (previous) removeAudioFrameListener(previous);
    previousHook?.();
    previousSession?.();
    return;
  }

  const { format = 'float32', source: wanted = 'both' } =
    options === true ? {} : options;

  const owner = armMediaSession();
  emitter = (source, samples, timestamp) => {
    if (!isMediaSessionCurrent(owner) || !owner.id) return;
    if (wanted !== 'both' && wanted !== source) {
      return;
    }

    internalEv.emit('call.audio_frame', {
      id: owner.id,
      source,
      sampleRate: FRAME_SAMPLE_RATE,
      format,
      samples:
        format === 'int16-base64'
          ? int16ToBase64(floatToInt16(samples))
          : samples,
      timestamp,
    });
  };

  releaseHook = installAudioInjector();
  releaseSession = onMediaSessionEnd(owner, () => enableAudioCapture(false));
  addAudioFrameListener(emitter);
  if (previous) removeAudioFrameListener(previous);
  previousHook?.();
  previousSession?.();
}
