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
import { readFileSync } from 'fs';
import * as path from 'path';
import { ModuleKind, transpileModule } from 'typescript';

function mediaApi() {
  const store: any = { activeCall: { id: 'A' } };
  const contexts: any[] = [];
  const nodes: any[] = [];
  const timers = new Map<number, () => void>();
  const events: any[] = [];
  let eventHandler: (() => void) | undefined;
  let startError: Error | undefined;
  let decode: (() => Promise<any>) | undefined;
  let mediaError: Error | undefined;
  let request: ((constraints: any) => Promise<any>) | undefined;
  let timer = 0;
  let clock = 0;
  let startFailure: Error | undefined;
  class Track {
    readyState = 'live';
    stop() {
      this.readyState = 'ended';
    }
    clone() {
      return new Track();
    }
    getSettings() {
      return {};
    }
  }
  class Stream {
    constructor(public tracks: any[] = []) {}
    addTrack(track: any) {
      this.tracks.push(track);
    }
    getTracks() {
      return this.tracks;
    }
    getAudioTracks() {
      return this.tracks;
    }
  }
  class Node {
    connections = new Set<any>();
    gain = { value: 1 };
    channelCount = 1;
    onended: any;
    onaudioprocess: any;
    started = false;
    constructor(public context: any) {
      nodes.push(this);
    }
    connect(node: any) {
      this.connections.add(node);
      return node;
    }
    disconnect(node?: any) {
      if (node) this.connections.delete(node);
      else this.connections.clear();
    }
    start() {
      if (startError) throw startError;
      this.started = true;
    }
    stop() {
      this.onended?.();
    }
  }
  class Context {
    state = 'running';
    currentTime = 0;
    sampleRate = 16000;
    destination: any;
    constructor() {
      contexts.push(this);
      this.destination = new Node(this);
    }
    createGain() {
      return new Node(this);
    }
    createMediaStreamDestination() {
      return Object.assign(new Node(this), {
        stream: new Stream([new Track()]),
      });
    }
    createMediaStreamSource() {
      return new Node(this);
    }
    createScriptProcessor() {
      return new Node(this);
    }
    createBufferSource() {
      return new Node(this);
    }
    createBuffer(_channels: number, length: number, rate: number) {
      return {
        duration: length / rate,
        getChannelData: () => new Float32Array(length),
      };
    }
    async decodeAudioData() {
      if (decode) return decode();
      return { duration: 1 };
    }
    async close() {
      this.state = 'closed';
    }
    async resume() {
      this.state = 'running';
    }
  }
  const realTrack = new Track();
  const proto = {
    getUserMedia: async (constraints?: any) => {
      if (mediaError) throw mediaError;
      return request ? request(constraints) : new Stream([realTrack]);
    },
    enumerateDevices: async () => [],
  };
  const permissions = { query: async () => ({ state: 'denied' }) };
  const original = { ...proto, query: permissions.query };
  const navigator = { mediaDevices: Object.create(proto), permissions };
  const window: any = { AudioWorkletNode: Node };
  let fetcher: any = async () => ({
    ok: true,
    arrayBuffer: async () => new ArrayBuffer(2),
  });
  const globals: any = {
    Date: class extends Date {
      static now() {
        return clock;
      }
    },
    navigator,
    window,
    AudioContext: Context,
    MediaStream: Stream,
    get AudioWorkletNode() {
      return window.AudioWorkletNode;
    },
    setTimeout: (fn: () => void) => {
      timers.set(++timer, fn);
      return timer;
    },
    clearTimeout: (id: number) => timers.delete(id),
    fetch: (...args: any[]) => fetcher(...args),
  };
  const cache: any = {};
  const ready: Array<() => void> = [];
  let bridge: any;
  function load(name: string): any {
    const filename = path.resolve(__dirname, '../src/call/media', `${name}.ts`);
    if (cache[filename]) return cache[filename];
    const compiled = transpileModule(readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ModuleKind.CommonJS },
    }).outputText;
    const exports = (cache[filename] = {});
    new Function('exports', 'require', ...Object.keys(globals), compiled)(
      exports,
      (id: string) => {
        if (id === './enableCallInterface')
          return { enableCallInterface: async () => undefined };
        if (id === '../../assert')
          return {
            assertWid: (id: string) => ({
              isUser: () => true,
              isGroup: () => true,
              toString: () => id,
            }),
            assertFindChat: async () => ({ id: 'group' }),
          };
        if (id === '../../contact/functions/queryExists')
          return { queryExists: async (wid: any) => ({ wid }) };
        if (id === '../../loader')
          return {
            onInjected: (fn: () => void) => ready.push(fn),
            onFullReady: () => undefined,
            ensureLazyModule: async () => undefined,
          };
        if (id === '../../whatsapp/exportModule')
          return {
            wrapModuleFunction: (_fn: any, wrapper: any) => {
              bridge = wrapper;
            },
          };
        if (id === '../../whatsapp/functions')
          return {
            frontendFireAndForget: () => undefined,
            getVoipStackInterface: async () => ({
              previewAndJoinCallLink: async () => {
                if (startFailure) throw startFailure;
                return 0;
              },
            }),
            generateAndStoreNewCallId: () => 'RESERVED',
            startWAWebVoipCall: async () => {
              if (startFailure) throw startFailure;
            },
            startWAWebVoipGroupCallFromChat: async () => {
              if (startFailure) throw startFailure;
            },
            startWAWebVoipGroupCallFromWids: async () => {
              if (startFailure) throw startFailure;
            },
          };
        if (id === 'debug') return () => () => undefined;
        if (id === '../../whatsapp')
          return {
            CallStore: {
              get activeCall() {
                return store.activeCall;
              },
              getModelsArray: () => [],
            },
          };
        if (id === '../../util')
          return {
            WPPError: class extends Error {
              constructor(
                public code: string,
                message: string
              ) {
                super(message);
              }
            },
          };
        if (id === '../../eventEmitter')
          return {
            internalEv: {
              emit: (...args: any[]) => {
                events.push(args);
                eventHandler?.();
              },
            },
          };
        if (id.startsWith('.'))
          return load(
            path.posix.normalize(path.posix.join(path.posix.dirname(name), id))
          );
        throw new Error(`Unexpected dependency ${id}`);
      },
      ...Object.values(globals)
    );
    return exports;
  }
  const injection = load('audioInjector');
  const capture = load('enableAudioCapture');
  const recorder = load('recorder');
  return {
    bridge: (callState: number, id: string) => {
      if (!bridge) {
        load('../events/registerCallStateEvents');
        ready.forEach((fn) => fn());
      }
      bridge(() => undefined, 'setCallState', {
        callState,
        callInfo: { callId: id, peerJid: 'peer', isCaller: false },
      });
    },
    store,
    contexts,
    nodes,
    navigator,
    proto,
    original,
    window,
    realTrack,
    events,
    ...injection,
    ...capture,
    ...recorder,
    load,
    onEvent: (fn: () => void) => {
      eventHandler = fn;
    },
    failCallStart: (error: Error) => {
      startFailure = error;
    },
    setDecode: (fn: () => Promise<any>) => {
      decode = fn;
    },
    failStart: (error: Error) => {
      startError = error;
    },
    failMedia: (error: Error) => {
      mediaError = error;
    },
    setRequest: (fn: any) => {
      request = fn;
    },
    Stream,
    Track,
    setFetch: (fn: any) => {
      fetcher = fn;
    },
    drain: () => {
      clock += 1000;
      const pending = [...timers.values()];
      timers.clear();
      pending.forEach((fn) => fn());
    },
    playback: () => {
      const context = new Context();
      return new window.AudioWorkletNode(
        context,
        'voip-playback-worklet-processor'
      );
    },
    frame: () =>
      nodes
        .filter((n) => n.onaudioprocess)
        .forEach((n) =>
          n.onaudioprocess({
            inputBuffer: {
              getChannelData: () => new Float32Array(2048).fill(0.5),
            },
          })
        ),
  };
}

test('disabling injection restores hooks and closes owned tracks and context', async () => {
  const api = mediaApi();
  api.enableAudioInjection();
  const stream = await api.navigator.mediaDevices.getUserMedia({ audio: true });
  const status = await api.navigator.permissions.query({ name: 'microphone' });
  expect(status.state).toBe('granted');
  api.enableAudioInjection(false);
  expect(api.proto.getUserMedia).toBe(api.original.getUserMedia);
  expect(api.proto.enumerateDevices).toBe(api.original.enumerateDevices);
  expect(api.navigator.permissions.query).toBe(api.original.query);
  expect(stream.getAudioTracks()[0].readyState).toBe('ended');
  expect(api.contexts.every((c) => c.state === 'closed')).toBe(true);
  expect(status.state).toBe('denied');
});

test('pending audio cannot start after stop and disable', async () => {
  const api = mediaApi();
  let deliver: any;
  api.setFetch(
    () =>
      new Promise((resolve) => {
        deliver = resolve;
      })
  );
  const playing = api.playAudio('https://example.test/audio.wav');
  api.stopAudio();
  api.enableAudioInjection(false);
  deliver({ ok: true, arrayBuffer: async () => new ArrayBuffer(2) });
  await Promise.race([
    playing,
    new Promise((_resolve, reject) =>
      setTimeout(() => reject(new Error('Cancellation did not settle')), 100)
    ),
  ]);
  expect(api.nodes.some((n) => n.started)).toBe(false);
});

test('capture teardown cancels deferred tap and restores constructor', () => {
  const api = mediaApi();
  const original = api.window.AudioWorkletNode;
  api.enableAudioCapture();
  api.playback();
  api.enableAudioCapture(false);
  api.drain();
  expect(api.window.AudioWorkletNode).toBe(original);
  expect(
    api.nodes.filter((n) => n.onaudioprocess).every((n) => !n.connections.size)
  ).toBe(true);
});

test('ending one call releases media and retains its completed recording', async () => {
  const api = mediaApi();
  api.enableAudioCapture();
  api.startRecording();
  await api.navigator.mediaDevices.getUserMedia({ audio: true });
  api.frame();
  expect(api.events.length).toBeGreaterThan(0);
  api.load('mediaSession').updateMediaSession('A', true);
  expect(api.isRecording()).toBe(false);
  const wav = api.stopRecording();
  expect(wav.size).toBeGreaterThan(44);
  expect(api.realTrack.readyState).toBe('live');
  expect(api.contexts.every((c) => c.state === 'closed')).toBe(true);
  api.store.activeCall = { id: 'B' };
  api.frame();
  expect(api.events.every((e) => e[1].id === 'A')).toBe(true);
});

test('replacement drops old frames and cannot tear down a newly armed call', async () => {
  const api = mediaApi();
  api.enableAudioInjection();
  api.enableAudioCapture();
  await api.navigator.mediaDevices.getUserMedia({ audio: true });
  api.store.activeCall = { id: 'B' };
  api.frame();
  expect(api.events).toHaveLength(0);
  expect(api.isAudioInjectionEnabled()).toBe(false);
  api.enableAudioInjection();
  api.load('mediaSession').updateMediaSession('A', true);
  expect(api.isAudioInjectionEnabled()).toBe(true);
  api.enableAudioInjection(false);
});

test('ordinary microphone is passed through and survives capture shutdown', async () => {
  const api = mediaApi();
  api.enableAudioCapture();
  const stream = await api.navigator.mediaDevices.getUserMedia({ audio: true });
  expect(stream.getAudioTracks()[0]).toBe(api.realTrack);
  api.enableAudioCapture(false);
  expect(api.realTrack.readyState).toBe('live');
  expect(api.proto.getUserMedia).toBe(api.original.getUserMedia);
});

test('permission denial releases capture and recording without changing the error', async () => {
  const api = mediaApi();
  const error = new DOMException('Denied', 'NotAllowedError');
  api.failMedia(error);
  api.enableAudioCapture();
  api.startRecording();
  await expect(
    api.navigator.mediaDevices.getUserMedia({ audio: true })
  ).rejects.toBe(error);
  expect(api.isRecording()).toBe(false);
  expect(api.proto.getUserMedia).toBe(api.original.getUserMedia);
  expect(api.stopRecording().size).toBe(44);
});

test('a stale video request cannot reactivate injection after off/on', async () => {
  const api = mediaApi();
  let deliver: any;
  api.setRequest(
    () =>
      new Promise((resolve) => {
        deliver = resolve;
      })
  );
  api.enableAudioInjection();
  const request = api.navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  api.enableAudioInjection(false);
  api.enableAudioInjection();
  const track = new api.Track();
  deliver(new api.Stream([track]));
  await expect(request).rejects.toMatchObject({ name: 'AbortError' });
  expect(track.readyState).toBe('ended');
  expect(api.isAudioInjectionEnabled()).toBe(true);
  api.enableAudioInjection(false);
});

test('a throwing start rejects playback and disconnects its nodes', async () => {
  const api = mediaApi();
  const error = new Error('start failed');
  api.failStart(error);
  await expect(api.playAudio(new ArrayBuffer(2))).rejects.toBe(error);
  api.enableAudioInjection(false);
  expect(api.nodes.every((n) => !n.connections.size)).toBe(true);
});

test('capture reconfiguration retains the remote playback tap', () => {
  const api = mediaApi();
  api.enableAudioCapture();
  api.playback();
  api.drain();
  api.enableAudioCapture({ source: 'remote', format: 'int16-base64' });
  api.frame();
  expect(api.events.length).toBeGreaterThan(0);
  expect(
    api.events.every(
      (e) => e[1].source === 'remote' && typeof e[1].samples === 'string'
    )
  ).toBe(true);
  api.enableAudioCapture(false);
});

test('capture and recorder share hooks until the last consumer stops', async () => {
  const api = mediaApi();
  api.enableAudioCapture();
  api.startRecording();
  await api.navigator.mediaDevices.getUserMedia({ audio: true });
  api.enableAudioCapture(false);
  expect(api.proto.getUserMedia).not.toBe(api.original.getUserMedia);
  api.frame();
  expect(api.stopRecording().size).toBeGreaterThan(44);
  expect(api.proto.getUserMedia).toBe(api.original.getUserMedia);
});

test('a frame callback that switches calls cannot deliver old samples to the new listeners', async () => {
  const api = mediaApi();
  api.enableAudioCapture();
  await api.navigator.mediaDevices.getUserMedia({ audio: true });
  api.onEvent(() => {
    api.store.activeCall = { id: 'B' };
    api.enableAudioCapture();
    api.startRecording();
  });
  api.frame();
  expect(api.events).toHaveLength(1);
  expect(api.events[0][1].id).toBe('A');
  expect(api.stopRecording().size).toBe(44);
  api.enableAudioCapture(false);
});

test('foreign wrappers survive shutdown and old hook leases stay inert', async () => {
  const api = mediaApi();
  api.enableAudioInjection();
  api.enableAudioCapture();
  const previous = api.proto.getUserMedia;
  const foreign = async (constraints: any) =>
    previous.call(api.navigator.mediaDevices, constraints);
  api.proto.getUserMedia = foreign;
  const oldConstructor = api.window.AudioWorkletNode;
  const foreignConstructor = new Proxy(oldConstructor, {});
  api.window.AudioWorkletNode = foreignConstructor;
  api.enableAudioInjection(false);
  api.enableAudioCapture(false);
  expect(api.proto.getUserMedia).toBe(foreign);
  expect(api.window.AudioWorkletNode).toBe(foreignConstructor);
  api.enableAudioInjection();
  api.enableAudioCapture();
  const stream = await api.navigator.mediaDevices.getUserMedia({ audio: true });
  expect(stream.getAudioTracks()).toHaveLength(1);
  api.enableAudioInjection(false);
  api.enableAudioCapture(false);
});

test('armed media consumes a call that ends before microphone acquisition', () => {
  const api = mediaApi();
  api.store.activeCall = null;
  api.enableAudioInjection();
  api.enableAudioCapture();
  api.load('mediaSession').updateMediaSession('INCOMING');
  api.load('mediaSession').updateMediaSession('INCOMING', true);
  api.store.activeCall = { id: 'NEXT' };
  expect(api.isAudioInjectionEnabled()).toBe(false);
  expect(api.proto.getUserMedia).toBe(api.original.getUserMedia);
});

test('a provisional link token transitions into the same selected call', async () => {
  const api = mediaApi();
  api.store.activeCall = null;
  api.enableAudioInjection();
  api.enableAudioCapture();
  const lifecycle = api.load('mediaSession');
  lifecycle.setMediaSessionProvisionalId('TOKEN');
  api.store.activeCall = { id: 'TOKEN' };
  await api.navigator.mediaDevices.getUserMedia({ audio: true });
  lifecycle.updateMediaSession('REAL');
  api.store.activeCall = { id: 'REAL' };
  api.frame();
  expect(api.events.length).toBeGreaterThan(0);
  expect(api.events.every((e) => e[1].id === 'REAL')).toBe(true);
  lifecycle.updateMediaSession('REAL', true);
  expect(api.isAudioInjectionEnabled()).toBe(false);
});

test('clearing an observed active call invalidates pending audio', async () => {
  const api = mediaApi();
  let deliver: any;
  api.setDecode(
    () =>
      new Promise((resolve) => {
        deliver = resolve;
      })
  );
  const playing = api.playAudio(new ArrayBuffer(2));
  await Promise.resolve();
  await Promise.resolve();
  api.store.activeCall = null;
  deliver({ duration: 1 });
  await playing;
  expect(api.nodes.some((n) => n.started)).toBe(false);
  expect(api.isAudioInjectionEnabled()).toBe(false);
});

test('stopping audio aborts its owned fetch and settles the public promise', async () => {
  const api = mediaApi();
  let signal: AbortSignal | undefined;
  api.setFetch(
    (_url: string, options: any) =>
      new Promise((_resolve, reject) => {
        signal = options.signal;
        signal!.addEventListener('abort', () =>
          reject(new DOMException('Aborted', 'AbortError'))
        );
      })
  );
  const playing = api.playAudio('https://example.test/pending.wav');
  api.stopAudio();
  await playing;
  expect(signal!.aborted).toBe(true);
  api.enableAudioInjection(false);
});

test('a late capture-only microphone result is passed through without reopening a tap', async () => {
  const api = mediaApi();
  let deliver: any;
  api.setRequest(
    () =>
      new Promise((resolve) => {
        deliver = resolve;
      })
  );
  api.enableAudioCapture();
  const request = api.navigator.mediaDevices.getUserMedia({ audio: true });
  api.enableAudioCapture(false);
  const track = new api.Track();
  deliver(new api.Stream([track]));
  expect((await request).getAudioTracks()[0]).toBe(track);
  expect(track.readyState).toBe('live');
  expect(api.contexts).toHaveLength(0);
});

test('cleanup errors do not leave other owned resources active', async () => {
  const api = mediaApi();
  api.enableAudioInjection();
  api.enableAudioCapture();
  api.startRecording();
  const stream = await api.navigator.mediaDevices.getUserMedia({ audio: true });
  stream.getAudioTracks()[0].stop = () => {
    throw new Error('Already disposed');
  };
  const lifecycle = api.load('mediaSession');
  lifecycle.onMediaSessionEnd(lifecycle.currentMediaSession(), () => {
    throw new Error('Foreign cleanup');
  });
  lifecycle.updateMediaSession('A', true);
  expect(api.proto.getUserMedia).toBe(api.original.getUserMedia);
  expect(api.isRecording()).toBe(false);
  expect(api.contexts.every((c) => c.state === 'closed')).toBe(true);
});

test('a failed provisional link ends its reservation before another call starts', () => {
  const api = mediaApi();
  api.store.activeCall = null;
  api.enableAudioInjection();
  const lifecycle = api.load('mediaSession');
  lifecycle.setMediaSessionProvisionalId('TOKEN');
  lifecycle.updateMediaSession('TOKEN', true);
  api.store.activeCall = { id: 'B' };
  expect(api.isAudioInjectionEnabled()).toBe(false);
});

test('native incoming state consumes armed media before deferred ended events', () => {
  const api = mediaApi();
  api.store.activeCall = null;
  api.enableAudioInjection();
  api.enableAudioCapture();
  api.bridge(3, 'INCOMING');
  api.bridge(13, 'INCOMING');
  expect(api.isAudioInjectionEnabled()).toBe(false);
  expect(api.proto.getUserMedia).toBe(api.original.getUserMedia);
  api.store.activeCall = { id: 'B' };
  api.enableAudioInjection();
  api.drain();
  expect(api.isAudioInjectionEnabled()).toBe(true);
  api.enableAudioInjection(false);
});

for (const [name, args] of [
  ['offer', ['peer']],
  ['offerGroup', ['group@g.us']],
  ['joinCallLink', ['AbCdEfGhIjKlMnOpQrStUv']],
] as const) {
  test(`${name} native failure releases its armed media`, async () => {
    const api = mediaApi();
    api.store.activeCall = null;
    api.enableAudioInjection();
    api.enableAudioCapture();
    api.startRecording();
    const error = new Error('Native start failed');
    api.failCallStart(error);
    await expect(api.load(`../functions/${name}`)[name](...args)).rejects.toBe(
      error
    );
    expect(api.isAudioInjectionEnabled()).toBe(false);
    expect(api.isRecording()).toBe(false);
    expect(api.proto.getUserMedia).toBe(api.original.getUserMedia);
  });
}

for (const [name, args] of [
  ['offerGroup', ['group@g.us']],
  ['joinCallLink', ['AbCdEfGhIjKlMnOpQrStUv']],
] as const) {
  test(`${name} timeout consumes its media reservation`, async () => {
    const api = mediaApi();
    api.store.activeCall = null;
    api.enableAudioInjection();
    const result = api.load(`../functions/${name}`)[name](...args);
    for (let i = 0; i < 20; i++) {
      await Promise.resolve();
      await Promise.resolve();
      api.drain();
    }
    expect(await result).toBeUndefined();
    expect(api.isAudioInjectionEnabled()).toBe(false);
    api.store.activeCall = { id: 'B' };
    expect(api.proto.getUserMedia).toBe(api.original.getUserMedia);
  });
}

for (const [name, args] of [
  ['offer', ['peer']],
  ['offerGroup', ['group@g.us']],
  ['joinCallLink', ['AbCdEfGhIjKlMnOpQrStUv']],
] as const) {
  test(`${name} failure preserves media owned by an already active call`, async () => {
    const api = mediaApi();
    api.enableAudioInjection();
    api.enableAudioCapture();
    api.startRecording();
    const error = new Error('New call failed');
    api.failCallStart(error);
    await expect(api.load(`../functions/${name}`)[name](...args)).rejects.toBe(
      error
    );
    expect(api.isAudioInjectionEnabled()).toBe(true);
    expect(api.isRecording()).toBe(true);
    api.load('mediaSession').updateMediaSession('A', true);
    expect(api.isAudioInjectionEnabled()).toBe(false);
    expect(api.isRecording()).toBe(false);
  });
}
