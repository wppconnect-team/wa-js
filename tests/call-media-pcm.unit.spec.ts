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

import { expect, test } from '@playwright/test';

import {
  base64ToInt16,
  encodeWav,
  floatToInt16,
  FRAME_SIZE,
  FrameAssembler,
  int16ToBase64,
  int16ToFloat,
  mixTracks,
  Resampler,
  toFloat32,
} from '../src/call/media/pcm';

test.describe('call media PCM', () => {
  test('converts between float and int16', () => {
    const int16 = floatToInt16(Float32Array.from([0, 1, -1, 2, -2, 0.5]));
    expect(Array.from(int16)).toEqual([0, 32767, -32768, 32767, -32768, 16383]);

    const back = int16ToFloat(Int16Array.from([32767, -32768, 0]));
    expect(Array.from(back)).toEqual([1, -1, 0]);
  });

  test('round trips base64 Int16', () => {
    const samples = Int16Array.from([1, -1, 32767, -32768, 1234]);
    const base64 = int16ToBase64(samples);

    expect(Array.from(base64ToInt16(base64))).toEqual(Array.from(samples));
    expect(toFloat32(base64)).toHaveLength(samples.length);
  });

  test('splits a stream into 960 sample frames', () => {
    const assembler = new FrameAssembler();

    expect(assembler.push(new Float32Array(500))).toHaveLength(0);
    const frames = assembler.push(new Float32Array(1500));

    expect(frames).toHaveLength(2);
    expect(frames[0]).toHaveLength(FRAME_SIZE);
    expect(frames[0]).not.toBe(frames[1]);
  });

  test('resamples a stream chunk by chunk', () => {
    const resampler = new Resampler(48_000, 16_000);
    let total = 0;
    for (let i = 0; i < 10; i++) {
      total += resampler.process(new Float32Array(4800).fill(0.5)).length;
    }

    // 1 second at 48 kHz gives about 1 second at 16 kHz
    expect(Math.abs(total - 16_000)).toBeLessThanOrEqual(1);
    expect(new Resampler(16_000, 16_000).process(new Float32Array(3))).toEqual(
      new Float32Array(3)
    );
  });

  test('encodes a WAV header', () => {
    const wav = encodeWav(new Float32Array(10), 16_000);
    const view = new DataView(wav.buffer);
    const text = (offset: number) =>
      String.fromCharCode(...wav.subarray(offset, offset + 4));

    expect(wav.length).toBe(44 + 20);
    expect(text(0)).toBe('RIFF');
    expect(text(8)).toBe('WAVE');
    expect(view.getUint32(24, true)).toBe(16_000);
    expect(view.getUint32(40, true)).toBe(20);
  });

  test('mixes tracks at their offsets and clips', () => {
    const mixed = mixTracks([
      { offset: 0, samples: Float32Array.from([0.5, 0.5, 0.5]) },
      { offset: 2, samples: Float32Array.from([0.75, 0.25]) },
    ]);

    expect(Array.from(mixed)).toEqual([0.5, 0.5, 1, 0.25]);
  });
});
