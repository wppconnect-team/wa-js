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

import { setLocalStream } from './audioCapture';
import { base64ToBytes, FRAME_SAMPLE_RATE, toFloat32 } from './pcm';

const debug = Debug('WA-JS:call:audioInjector');

export const VIRTUAL_MIC_DEVICE_ID = 'wa-js-virtual-microphone';

let isInstalled = false;
let isEnabled = false;

let context: AudioContext | null = null;
let output: GainNode | null = null;
let destination: MediaStreamAudioDestinationNode | null = null;

/**
 * Sources currently playing, so they can be stopped
 */
const sources = new Set<AudioBufferSourceNode>();

/**
 * When the next pushed chunk starts, in context time
 */
let streamTime = 0;

function getGraph() {
  if (!context || context.state === 'closed') {
    context = new AudioContext();
    output = context.createGain();
    destination = context.createMediaStreamDestination();
    output.connect(destination);
    streamTime = 0;
  }
  if (context.state === 'suspended') {
    // Needs a user gesture or `--autoplay-policy=no-user-gesture-required`
    context.resume().catch(() => undefined);
    warnIfSuspended(context);
  }
  return { context, output: output!, destination: destination! };
}

let hasWarned = false;

/**
 * WhatsApp's own call audio contexts are blocked the same way, which leaves
 * the call without audio and reconnecting
 */
function warnIfSuspended(ctx: AudioContext) {
  setTimeout(() => {
    if (ctx.state === 'suspended' && !hasWarned) {
      hasWarned = true;
      console.warn(
        '[WA-JS] Audio is blocked by the autoplay policy, calls will have no ' +
          'audio. Launch the browser with ' +
          '--autoplay-policy=no-user-gesture-required'
      );
    }
  }, 1_000);
}

/**
 * A new track for each `getUserMedia` call: WhatsApp stops the previous track
 * on every device switch or cleanup
 */
function createInjectedTrack(): MediaStreamTrack {
  const track = getGraph().destination.stream.getAudioTracks()[0].clone();

  // Report the browser processing as applied, so the VoIP engine does not
  // run its own echo cancellation, noise suppression and gain control on the
  // injected audio
  const getSettings = track.getSettings.bind(track);
  track.getSettings = () => ({
    ...getSettings(),
    deviceId: VIRTUAL_MIC_DEVICE_ID,
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
  });

  return track;
}

/**
 * Install the microphone hooks. Also needed without injection, to capture
 * the real microphone audio
 */
export function installAudioInjector() {
  if (isInstalled || !navigator.mediaDevices) {
    return;
  }
  isInstalled = true;

  const proto = Object.getPrototypeOf(navigator.mediaDevices);

  const originalGetUserMedia: MediaDevices['getUserMedia'] = proto.getUserMedia;
  proto.getUserMedia = async function (
    this: MediaDevices,
    constraints?: MediaStreamConstraints
  ) {
    if (!constraints?.audio) {
      return originalGetUserMedia.call(this, constraints);
    }

    if (isEnabled) {
      debug('providing the virtual microphone', constraints);
      const stream = constraints.video
        ? await originalGetUserMedia.call(this, {
            ...constraints,
            audio: false,
          })
        : new MediaStream();
      stream.addTrack(createInjectedTrack());
      setLocalStream(stream);
      return stream;
    }

    const stream = await originalGetUserMedia.call(this, constraints);
    setLocalStream(stream);
    return stream;
  };

  // WhatsApp refuses to start the capture without an audio input device
  const originalEnumerateDevices: MediaDevices['enumerateDevices'] =
    proto.enumerateDevices;
  proto.enumerateDevices = async function (this: MediaDevices) {
    const devices = await originalEnumerateDevices.call(this);
    if (
      !isEnabled ||
      devices.some((d) => d.kind === 'audioinput' && d.deviceId)
    ) {
      return devices;
    }

    const virtual = {
      deviceId: VIRTUAL_MIC_DEVICE_ID,
      groupId: VIRTUAL_MIC_DEVICE_ID,
      kind: 'audioinput',
      label: 'WA-JS Virtual Microphone',
      toJSON() {
        return { ...this };
      },
    } as MediaDeviceInfo;

    return [...devices, virtual];
  };

  // WhatsApp fails fast when the microphone permission is denied
  const permissions: any = navigator.permissions;
  if (permissions?.query) {
    const originalQuery = permissions.query.bind(permissions);
    permissions.query = async (descriptor: PermissionDescriptor) => {
      const status = await originalQuery(descriptor);
      if (isEnabled && descriptor?.name === 'microphone') {
        return new Proxy(status, {
          get(target, prop) {
            if (prop === 'state') {
              return 'granted';
            }
            const value = Reflect.get(target, prop, target);
            return typeof value === 'function' ? value.bind(target) : value;
          },
        });
      }
      return status;
    };
  }
}

/**
 * Replace the microphone with a virtual one fed by `playAudio` and
 * `pushAudio`. While nothing is playing it sends silence.
 *
 * Enable it before the call starts: WhatsApp gets the microphone when the
 * call is placed or accepted.
 *
 * The page must be allowed to play audio without a user gesture, for
 * example by launching Chrome with `--autoplay-policy=no-user-gesture-required`.
 *
 * @example
 * ```javascript
 * WPP.call.enableAudioInjection();
 * await WPP.call.offer('[number]@c.us');
 * ```
 *
 * @category Call
 */
export function enableAudioInjection(enabled = true): void {
  installAudioInjector();
  isEnabled = enabled;
  if (enabled) {
    getGraph();
  }
}

export function isAudioInjectionEnabled(): boolean {
  return isEnabled;
}

export interface PlayAudioOptions {
  /**
   * Repeat until `stopAudio` is called
   */
  loop?: boolean;
  /**
   * Volume, from 0 to 1 (default)
   */
  volume?: number;
}

async function readAudio(
  source: string | Blob | ArrayBuffer | Uint8Array
): Promise<ArrayBuffer> {
  if (source instanceof ArrayBuffer) {
    return source;
  }
  if (source instanceof Uint8Array) {
    return source.slice().buffer;
  }
  if (source instanceof Blob) {
    return source.arrayBuffer();
  }

  // Decode data URLs locally: the page CSP may block fetching them
  const dataUrl = /^data:[^;,]*(;base64)?,([\s\S]*)$/.exec(source);
  if (dataUrl) {
    return dataUrl[1]
      ? base64ToBytes(dataUrl[2]).slice().buffer
      : new TextEncoder().encode(decodeURIComponent(dataUrl[2])).buffer;
  }

  const response = await fetch(source);
  if (!response.ok) {
    throw new Error(`Failed to download ${source}: ${response.status}`);
  }
  return response.arrayBuffer();
}

/**
 * Play an audio file (mp3, wav, ogg/opus, ...) in the call, through the
 * virtual microphone. Resolves when the audio finishes or is stopped.
 *
 * The page CSP may block downloading from other domains; pass the file
 * content (ArrayBuffer, Blob or a base64 data URL) in that case.
 *
 * @example
 * ```javascript
 * WPP.call.enableAudioInjection();
 * WPP.on('call.accepted', async () => {
 *   await WPP.call.playAudio('data:audio/mpeg;base64,...');
 *   await WPP.call.end();
 * });
 * ```
 *
 * @category Call
 */
export async function playAudio(
  source: string | Blob | ArrayBuffer | Uint8Array,
  options: PlayAudioOptions = {}
): Promise<void> {
  enableAudioInjection();
  const { context, output } = getGraph();

  const buffer = await context.decodeAudioData(await readAudio(source));

  const node = context.createBufferSource();
  node.buffer = buffer;
  node.loop = !!options.loop;

  const gain = context.createGain();
  gain.gain.value = options.volume ?? 1;
  node.connect(gain);
  gain.connect(output);

  sources.add(node);

  await new Promise<void>((resolve) => {
    node.onended = () => {
      sources.delete(node);
      gain.disconnect();
      resolve();
    };
    node.start();
  });
}

export interface PushAudioOptions {
  /**
   * Sample rate of the samples, default 16000
   */
  sampleRate?: number;
}

/**
 * Stream PCM audio to the call, for audio generated on the fly (TTS,
 * voice bots, audio coming from Node.js). Chunks are queued and played back
 * to back.
 *
 * Accepts a Float32Array (-1 to 1), an Int16Array or a base64 string of
 * little-endian Int16 PCM.
 *
 * Returns the seconds of audio still queued.
 *
 * @example
 * ```javascript
 * WPP.call.enableAudioInjection();
 * // From Node.js, for example with puppeteer:
 * await page.evaluate((chunk) => WPP.call.pushAudio(chunk), base64Pcm16k);
 * ```
 *
 * @category Call
 */
export function pushAudio(
  samples: Float32Array | Int16Array | string,
  options: PushAudioOptions = {}
): number {
  enableAudioInjection();
  const { context, output } = getGraph();

  const data = toFloat32(samples);
  const sampleRate = options.sampleRate || FRAME_SAMPLE_RATE;

  if (data.length) {
    const buffer = context.createBuffer(1, data.length, sampleRate);
    buffer.getChannelData(0).set(data);

    const node = context.createBufferSource();
    node.buffer = buffer;
    node.connect(output);

    // A small lead avoids gaps when the queue is empty
    streamTime = Math.max(streamTime, context.currentTime + 0.05);
    node.start(streamTime);
    streamTime += buffer.duration;

    sources.add(node);
    node.onended = () => sources.delete(node);
  }

  return Math.max(0, streamTime - context.currentTime);
}

/**
 * Stop everything playing or queued in the virtual microphone
 *
 * @category Call
 */
export function stopAudio(): void {
  for (const node of sources) {
    try {
      node.stop();
    } catch (_error) {
      // Not started yet
    }
  }
  sources.clear();
  streamTime = 0;
}
