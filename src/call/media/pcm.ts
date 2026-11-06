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

/**
 * Sample rate of the frames emitted by WA-JS, the same used by the VoIP
 * engine
 */
export const FRAME_SAMPLE_RATE = 16_000;

/**
 * 60 ms at 16 kHz, the frame size used by the VoIP engine
 */
export const FRAME_SIZE = 960;

export function floatToInt16(samples: Float32Array): Int16Array {
  const output = new Int16Array(samples.length);
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    output[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return output;
}

export function int16ToFloat(samples: Int16Array): Float32Array {
  const output = new Float32Array(samples.length);
  for (let i = 0; i < samples.length; i++) {
    output[i] = samples[i] / (samples[i] < 0 ? 0x8000 : 0x7fff);
  }
  return output;
}

export function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

export function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Base64 of little-endian Int16 PCM
 */
export function int16ToBase64(samples: Int16Array): string {
  const bytes = new Uint8Array(samples.length * 2);
  const view = new DataView(bytes.buffer);
  for (let i = 0; i < samples.length; i++) {
    view.setInt16(i * 2, samples[i], true);
  }
  return bytesToBase64(bytes);
}

export function base64ToInt16(base64: string): Int16Array {
  const bytes = base64ToBytes(base64);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const samples = new Int16Array(Math.floor(bytes.length / 2));
  for (let i = 0; i < samples.length; i++) {
    samples[i] = view.getInt16(i * 2, true);
  }
  return samples;
}

/**
 * Convert PCM given as Float32Array, Int16Array or base64 Int16 to Float32
 */
export function toFloat32(samples: Float32Array | Int16Array | string) {
  if (typeof samples === 'string') {
    return int16ToFloat(base64ToInt16(samples));
  }
  if (samples instanceof Int16Array) {
    return int16ToFloat(samples);
  }
  return samples;
}

/**
 * Linear resampler that keeps its position between chunks, so a stream can
 * be resampled chunk by chunk without clicks
 */
export class Resampler {
  protected position = 0;
  protected last = 0;

  constructor(
    readonly fromRate: number,
    readonly toRate: number
  ) {}

  process(input: Float32Array): Float32Array {
    if (this.fromRate === this.toRate) {
      return input;
    }

    const step = this.fromRate / this.toRate;
    const output: number[] = [];

    // `position` is relative to the start of `input`; -1 is the last sample
    // of the previous chunk
    let pos = this.position;
    while (pos < input.length - 1) {
      const index = Math.floor(pos);
      const frac = pos - index;
      const a = index < 0 ? this.last : input[index];
      const b = input[index + 1];
      output.push(a + (b - a) * frac);
      pos += step;
    }

    if (input.length) {
      this.last = input[input.length - 1];
      this.position = pos - input.length;
    }

    return Float32Array.from(output);
  }
}

/**
 * Split a stream of samples into fixed size frames
 */
export class FrameAssembler {
  protected buffer: Float32Array;
  protected length = 0;

  constructor(readonly frameSize = FRAME_SIZE) {
    this.buffer = new Float32Array(frameSize);
  }

  push(samples: Float32Array): Float32Array[] {
    const frames: Float32Array[] = [];
    let offset = 0;

    while (offset < samples.length) {
      const count = Math.min(
        this.frameSize - this.length,
        samples.length - offset
      );
      this.buffer.set(samples.subarray(offset, offset + count), this.length);
      this.length += count;
      offset += count;

      if (this.length === this.frameSize) {
        frames.push(this.buffer);
        this.buffer = new Float32Array(this.frameSize);
        this.length = 0;
      }
    }

    return frames;
  }
}

/**
 * Encode mono PCM as a 16-bit WAV file
 */
export function encodeWav(samples: Float32Array, sampleRate: number) {
  const pcm = floatToInt16(samples);
  const bytes = new Uint8Array(44 + pcm.length * 2);
  const view = new DataView(bytes.buffer);

  const writeString = (offset: number, value: string) => {
    for (let i = 0; i < value.length; i++) {
      view.setUint8(offset + i, value.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + pcm.length * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true); // fmt chunk size
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true); // byte rate
  view.setUint16(32, 2, true); // block align
  view.setUint16(34, 16, true); // bits per sample
  writeString(36, 'data');
  view.setUint32(40, pcm.length * 2, true);

  for (let i = 0; i < pcm.length; i++) {
    view.setInt16(44 + i * 2, pcm[i], true);
  }

  return bytes;
}

/**
 * Sum tracks into one, each starting at its own sample offset
 */
export function mixTracks(
  tracks: { offset: number; samples: Float32Array }[]
): Float32Array {
  const length = tracks.reduce(
    (max, t) => Math.max(max, t.offset + t.samples.length),
    0
  );
  const output = new Float32Array(length);

  for (const track of tracks) {
    for (let i = 0; i < track.samples.length; i++) {
      output[track.offset + i] += track.samples[i];
    }
  }

  for (let i = 0; i < output.length; i++) {
    output[i] = Math.max(-1, Math.min(1, output[i]));
  }

  return output;
}
