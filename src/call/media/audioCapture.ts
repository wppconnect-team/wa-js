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

import { currentMediaSession, isMediaSessionCurrent } from './mediaSession';
import { FRAME_SAMPLE_RATE, FrameAssembler, Resampler } from './pcm';

const debug = Debug('WA-JS:call:audioCapture');

export type AudioSource = 'remote' | 'local';

export type AudioFrameListener = (
  source: AudioSource,
  samples: Float32Array,
  timestamp: number
) => void;

/**
 * Processors registered by WhatsApp's VoIP playback drivers
 * (`WAWebVoipAudioPlayback*Worklet`). Their output is the decoded, mixed
 * audio of the other participants.
 */
const PLAYBACK_PROCESSORS = new Set([
  'voip-shared-buffer-playback-processor',
  'voip-playback-worklet-processor',
]);

const TAP_BUFFER_SIZE = 2048;

interface Tap {
  processor: ScriptProcessorNode;
  sink: GainNode;
}

const listeners = new Set<AudioFrameListener>();
const playbackNodes = new Set<AudioNode>();
const taps = new WeakMap<AudioNode, Tap>();

let restoreConstructor: (() => void) | undefined;
const restoreDisconnect = new Map<AudioNode, () => void>();
const pendingTaps = new Set<ReturnType<typeof setTimeout>>();
let localStream: MediaStream | null = null;
let localContext: AudioContext | null = null;
let localTap: { source: MediaStreamAudioSourceNode; tap: Tap } | null = null;

function isActive() {
  return listeners.size > 0;
}

/**
 * Create a ScriptProcessor that converts the audio of `node` to 16 kHz frames
 */
function createTap(
  context: BaseAudioContext,
  source: AudioSource,
  channels: number
): Tap {
  const owner = currentMediaSession();
  const processor = context.createScriptProcessor(TAP_BUFFER_SIZE, channels, 1);
  const resampler = new Resampler(context.sampleRate, FRAME_SAMPLE_RATE);
  const assembler = new FrameAssembler();

  processor.onaudioprocess = (event) => {
    if (!isActive() || !owner || !isMediaSessionCurrent(owner) || !owner.id) {
      return;
    }
    const input = event.inputBuffer.getChannelData(0);
    const frames = assembler.push(resampler.process(new Float32Array(input)));
    const timestamp = performance.now();

    const recipients = [...listeners];
    for (const frame of frames) {
      for (const listener of recipients) {
        if (!isMediaSessionCurrent(owner)) return;
        if (!listeners.has(listener)) continue;
        try {
          listener(source, frame, timestamp);
        } catch (error) {
          debug('audio frame listener failed', error);
        }
      }
    }
  };

  // A ScriptProcessor only runs while connected to the destination; the
  // muted gain keeps the tap silent
  const sink = context.createGain();
  sink.gain.value = 0;
  processor.connect(sink);
  sink.connect(context.destination);

  return { processor, sink };
}

function attachPlaybackTap(node: AudioNode) {
  if (
    !isActive() ||
    !currentMediaSession() ||
    taps.has(node) ||
    node.context.state === 'closed'
  ) {
    return;
  }

  try {
    const tap = createTap(node.context, 'remote', node.channelCount || 1);
    node.connect(tap.processor);
    taps.set(node, tap);
    debug('remote audio tap attached');
  } catch (error) {
    debug('failed to attach remote audio tap', error);
  }
}

function disconnect(node: AudioNode, target?: AudioNode) {
  try {
    if (target) node.disconnect(target);
    else node.disconnect();
  } catch (_error) {
    /* The native graph may already be closed or disconnected. */
  }
}

function detachLocalTap() {
  if (localTap) {
    localTap.tap.processor.onaudioprocess = null;
    disconnect(localTap.source);
    disconnect(localTap.tap.processor);
    disconnect(localTap.tap.sink);
    localTap = null;
  }
}

function detachTaps() {
  for (const timer of pendingTaps) clearTimeout(timer);
  pendingTaps.clear();
  for (const node of playbackNodes) {
    const tap = taps.get(node);
    if (tap) {
      tap.processor.onaudioprocess = null;
      disconnect(node, tap.processor);
      disconnect(tap.processor);
      disconnect(tap.sink);
      taps.delete(node);
    }
    restoreDisconnect.get(node)?.();
  }
  restoreDisconnect.clear();
  playbackNodes.clear();
  detachLocalTap();
  localStream = null;
  if (localContext && localContext.state !== 'closed')
    localContext.close().catch(() => undefined);
  localContext = null;
  restoreConstructor?.();
  restoreConstructor = undefined;
}

function attachLocalTap() {
  if (localTap || !localStream) {
    return;
  }

  const track = localStream.getAudioTracks()[0];
  if (!track || track.readyState !== 'live') {
    return;
  }

  try {
    if (!localContext || localContext.state === 'closed') {
      localContext = new AudioContext({ sampleRate: FRAME_SAMPLE_RATE });
    }
    localContext.resume().catch(() => undefined);

    const source = localContext.createMediaStreamSource(
      new MediaStream([track])
    );
    const tap = createTap(localContext, 'local', 1);
    source.connect(tap.processor);
    localTap = { source, tap };
    debug('local audio tap attached');
  } catch (error) {
    debug('failed to attach local audio tap', error);
  }
}

function attachAll() {
  for (const node of playbackNodes) {
    if (node.context.state === 'closed') {
      playbackNodes.delete(node);
      continue;
    }
    attachPlaybackTap(node);
  }
  attachLocalTap();
}

/**
 * Called with every microphone stream handed to WhatsApp, injected or not
 */
export function setLocalStream(stream: MediaStream) {
  detachLocalTap();
  localStream = stream;
  if (isActive()) {
    attachLocalTap();
  }
}

/**
 * Track the playback nodes WhatsApp creates. Installed early and always,
 * because the node is created when a call starts and may already exist when
 * capture is enabled.
 */
export function installAudioCapture() {
  if (restoreConstructor || typeof AudioWorkletNode === 'undefined') {
    return;
  }

  let active = true;
  const OriginalAudioWorkletNode = AudioWorkletNode;

  const PatchedAudioWorkletNode = new Proxy(OriginalAudioWorkletNode, {
    construct(target, args, newTarget) {
      const node: AudioWorkletNode = Reflect.construct(
        target,
        args,
        newTarget === PatchedAudioWorkletNode ? target : newTarget
      );

      if (active && PLAYBACK_PROCESSORS.has(args[1])) {
        debug(`playback node created: ${args[1]}`);
        trackPlaybackNode(node);
      }

      return node;
    },
  });

  (window as any).AudioWorkletNode = PatchedAudioWorkletNode;
  restoreConstructor = () => {
    active = false;
    if (window.AudioWorkletNode === PatchedAudioWorkletNode)
      (window as any).AudioWorkletNode = OriginalAudioWorkletNode;
  };
}

function trackPlaybackNode(node: AudioNode) {
  const owner = currentMediaSession();
  if (!owner || !isActive()) return;
  playbackNodes.add(node);

  // When the media element output fails, WhatsApp falls back to the direct
  // route by calling `disconnect()` with no arguments, dropping the tap
  const originalDisconnect = node.disconnect;
  const patchedDisconnect = function (this: AudioNode, ...args: any[]) {
    const result = (originalDisconnect as any).apply(this, args);
    const tap = taps.get(node);
    if (!args.length && tap) {
      node.connect(tap.processor);
    }
    return result;
  } as any;
  node.disconnect = patchedDisconnect;
  restoreDisconnect.set(node, () => {
    if (node.disconnect === patchedDisconnect)
      node.disconnect = originalDisconnect;
  });

  if (isActive()) {
    // WhatsApp connects the node right after creating it
    const timer = setTimeout(() => {
      pendingTaps.delete(timer);
      if (isMediaSessionCurrent(owner)) attachPlaybackTap(node);
    }, 0);
    pendingTaps.add(timer);
  }
}

export function addAudioFrameListener(listener: AudioFrameListener) {
  installAudioCapture();
  listeners.add(listener);
  attachAll();
}

export function removeAudioFrameListener(listener: AudioFrameListener) {
  listeners.delete(listener);
  if (!isActive()) {
    detachTaps();
  }
}
