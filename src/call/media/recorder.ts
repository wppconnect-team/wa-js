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

import { WPPError } from '../../util';
import {
  addAudioFrameListener,
  AudioFrameListener,
  AudioSource,
  removeAudioFrameListener,
} from './audioCapture';
import { installAudioInjector } from './audioInjector';
import {
  armMediaSession,
  isMediaSessionCurrent,
  onMediaSessionEnd,
} from './mediaSession';
import { bytesToBase64, encodeWav, FRAME_SAMPLE_RATE, mixTracks } from './pcm';

export interface RecordingOptions {
  /**
   * What to record: both sides mixed (default), only what you hear
   * (`remote`) or only what you send (`local`)
   */
  source?: 'both' | AudioSource;
}

interface Track {
  /**
   * When the first frame arrived, in ms
   */
  start: number;
  frames: Float32Array[];
}

let recording: {
  start: number;
  tracks: Map<AudioSource, Track>;
  listener: AudioFrameListener;
  stop: () => void;
  active: boolean;
} | null = null;

/**
 * Start recording the call audio. Frames captured before the call connects
 * are silence.
 *
 * Start it before the call starts (or enable `enableAudioCapture` before):
 * the audio graph of the call is created when the call starts.
 *
 * @example
 * ```javascript
 * WPP.call.startRecording();
 * await WPP.call.offer('[number]@c.us');
 * WPP.on('call.ended', async () => {
 *   const wav = await WPP.call.stopRecording({ format: 'base64' });
 * });
 * ```
 *
 * @category Call
 */
export function startRecording(options: RecordingOptions = {}): void {
  if (recording?.active) {
    throw new WPPError('recording_in_progress', 'A recording is in progress');
  }

  const owner = armMediaSession();
  const wanted = options.source || 'both';
  const tracks = new Map<AudioSource, Track>();

  const listener: AudioFrameListener = (source, samples, timestamp) => {
    if (!isMediaSessionCurrent(owner) || !owner.id) return;
    if (wanted !== 'both' && wanted !== source) {
      return;
    }
    let track = tracks.get(source);
    if (!track) {
      // `timestamp` is taken when the frame is complete
      const frameMs = (samples.length / FRAME_SAMPLE_RATE) * 1000;
      track = { start: timestamp - frameMs, frames: [] };
      tracks.set(source, track);
    }
    track.frames.push(samples.slice());
  };

  const releaseHook = installAudioInjector();
  let releaseSession: () => void = () => undefined;
  const current = {
    start: performance.now(),
    tracks,
    listener,
    active: true,
    stop: () => {
      if (!current.active) return;
      current.active = false;
      removeAudioFrameListener(listener);
      releaseHook();
      releaseSession();
    },
  };
  releaseSession = onMediaSessionEnd(owner, current.stop);
  recording = current;
  addAudioFrameListener(listener);
}

export interface StopRecordingOptions {
  /**
   * `blob` (default) returns a WAV Blob; `base64` returns the WAV file as
   * base64, ready to send to Node.js
   */
  format?: 'blob' | 'base64';
}

/**
 * Stop the recording and return it as a 16 kHz mono WAV file. When the call
 * ends, capture stops automatically and the completed recording remains
 * available until retrieved here or replaced by a new recording.
 *
 * @category Call
 */
export function stopRecording(options?: { format?: 'blob' }): Blob;
export function stopRecording(options: { format: 'base64' }): string;
export function stopRecording(
  options: StopRecordingOptions = {}
): Blob | string {
  if (!recording) {
    throw new WPPError('recording_not_started', 'No recording in progress');
  }

  const { tracks } = recording;
  recording.stop();
  recording = null;

  const starts = [...tracks.values()].map((t) => t.start);
  const start = starts.length ? Math.min(...starts) : 0;

  // Each side is contiguous; only its start is aligned by time
  const samples = mixTracks(
    [...tracks.values()].map((track) => {
      const length = track.frames.reduce((sum, f) => sum + f.length, 0);
      const data = new Float32Array(length);
      let offset = 0;
      for (const frame of track.frames) {
        data.set(frame, offset);
        offset += frame.length;
      }
      return {
        offset: Math.max(
          0,
          Math.round(((track.start - start) / 1000) * FRAME_SAMPLE_RATE)
        ),
        samples: data,
      };
    })
  );

  const wav = encodeWav(samples, FRAME_SAMPLE_RATE);

  if (options.format === 'base64') {
    return bytesToBase64(wav);
  }

  return new Blob([wav], { type: 'audio/wav' });
}

export function isRecording(): boolean {
  return !!recording?.active;
}
