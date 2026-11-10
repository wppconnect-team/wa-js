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
import { readdirSync, readFileSync } from 'fs';
import * as path from 'path';
import { Browser, chromium, Page } from 'playwright-chromium';
import { ModuleKind, ScriptTarget, transpileModule } from 'typescript';

/**
 * Runs the real `src/call/media` code in Chromium, with fake media devices
 * and no WhatsApp: the playback node WhatsApp creates for the remote audio is
 * stood in by a worklet registered under the same processor name.
 */

const ORIGIN = 'https://wa-js.test';
const MEDIA_DIR = path.join(__dirname, '../src/call/media');
const VIRTUAL_MIC = 'wa-js-virtual-microphone';

function mediaBundle(): string {
  const modules = readdirSync(MEDIA_DIR)
    .filter((file) => file.endsWith('.ts'))
    .map((file) => {
      const js = transpileModule(
        readFileSync(path.join(MEDIA_DIR, file), 'utf8'),
        {
          compilerOptions: {
            module: ModuleKind.CommonJS,
            target: ScriptTarget.ES2017,
            esModuleInterop: true,
          },
        }
      ).outputText;
      return `${JSON.stringify(file.replace(/\.ts$/, ''))}: function (exports, require, module) {\n${js}\n}`;
    });

  return `(() => {
    const defs = {${modules.join(',\n')}};
    const stubs = {
      debug: () => () => undefined,
      '../../eventEmitter': {
        internalEv: {
          emit(name, data) {
            let sum = 0;
            for (const s of data.samples) sum += s * s;
            window.__frames.push({ source: data.source, rms: Math.sqrt(sum / data.samples.length) });
          },
        },
      },
      '../../whatsapp': { CallStore: { activeCall: { id: 'CALL-TEST' } } },
      '../../util': {
        WPPError: class WPPError extends Error {
          constructor(code, message) { super(message); this.code = code; }
        },
      },
    };
    const cache = {};
    const req = (id) => {
      if (id in stubs) return stubs[id];
      const name = id.replace(/^\\.\\//, '');
      if (!cache[name]) {
        const module = { exports: {} };
        cache[name] = module;
        defs[name](module.exports, req, module);
      }
      return cache[name].exports;
    };
    window.media = req('./index');
  })();`;
}

/**
 * Records the browser state the media code must leave untouched or release
 */
function instrumentation() {
  const w = window as any;
  w.__frames = [];
  w.__originals = {
    getUserMedia: MediaDevices.prototype.getUserMedia,
    enumerateDevices: MediaDevices.prototype.enumerateDevices,
    query: navigator.permissions.query,
    AudioWorkletNode: w.AudioWorkletNode,
    RTCPeerConnection: w.RTCPeerConnection,
  };

  w.__contexts = [];
  const BaseAudioContext = w.AudioContext;
  w.AudioContext = class extends BaseAudioContext {
    constructor(...args: any[]) {
      super(...args);
      w.__contexts.push(this);
    }
  };

  w.__clones = [];
  const clone = MediaStreamTrack.prototype.clone;
  MediaStreamTrack.prototype.clone = function (this: MediaStreamTrack) {
    const track = clone.call(this);
    w.__clones.push(track);
    return track;
  };

  w.__sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  w.__state = () => {
    const o = w.__originals;
    return {
      hooks: [
        MediaDevices.prototype.getUserMedia !== o.getUserMedia &&
          'getUserMedia',
        MediaDevices.prototype.enumerateDevices !== o.enumerateDevices &&
          'enumerateDevices',
        navigator.permissions.query !== o.query && 'permissions.query',
        w.AudioWorkletNode !== o.AudioWorkletNode && 'AudioWorkletNode',
      ].filter(Boolean),
      openContexts: w.__contexts.filter(
        (c: any) => !c.__test && c.state !== 'closed'
      ).length,
      liveClones: w.__clones.filter((t: any) => t.readyState === 'live').length,
      frames: {
        local: w.__frames.filter((f: any) => f.source === 'local').length,
        remote: w.__frames.filter((f: any) => f.source === 'remote').length,
      },
    };
  };
}

const WORKLET = `
class Tone extends AudioWorkletProcessor {
  constructor() { super(); this.t = 0; }
  process(inputs, outputs) {
    const out = outputs[0];
    for (const channel of out) {
      for (let i = 0; i < channel.length; i++) {
        channel[i] = 0.3 * Math.sin((2 * Math.PI * 440 * (this.t + i)) / sampleRate);
      }
    }
    this.t += out[0] ? out[0].length : 128;
    return true;
  }
}
registerProcessor('voip-playback-worklet-processor', Tone);
registerProcessor('other-processor', Tone);
`;

async function openPage(
  microphone: 'allow' | 'deny'
): Promise<{ browser: Browser; page: Page }> {
  const browser = await chromium.launch({
    args: [
      '--use-fake-device-for-media-stream',
      microphone === 'allow'
        ? '--use-fake-ui-for-media-stream'
        : '--use-fake-ui-for-media-stream=deny',
      '--autoplay-policy=no-user-gesture-required',
    ],
  });
  const page = await browser.newPage();
  await page.route(`${ORIGIN}/**`, (route) =>
    route.fulfill({ contentType: 'text/html', body: '<html></html>' })
  );
  await page.addInitScript(instrumentation);
  // Worklet module requests bypass page.route, so serve it from a Blob
  await page.addInitScript((source) => {
    (window as any).__workletUrl = URL.createObjectURL(
      new Blob([source], { type: 'text/javascript' })
    );
  }, WORKLET);
  await page.addInitScript({ content: mediaBundle() });
  await page.goto(`${ORIGIN}/`);
  return { browser, page };
}

async function state(page: Page) {
  return page.evaluate(() => (window as any).__state());
}

/**
 * Closing an AudioContext is asynchronous
 */
async function expectReleased(page: Page) {
  await expect
    .poll(() => state(page))
    .toMatchObject({ hooks: [], openContexts: 0, liveClones: 0 });
}

test.describe('call media lifecycle', () => {
  test('restores every browser API once injection, capture and recording stop', async () => {
    const { browser, page } = await openPage('allow');
    try {
      expect((await state(page)).hooks).toEqual([]);

      const steps = await page.evaluate(async () => {
        const w = window as any;
        const hooks = () => w.__state().hooks;
        const result: Record<string, string[]> = {};

        w.media.enableAudioInjection();
        result.injection = hooks();
        w.media.enableAudioCapture();
        result.capture = hooks();
        w.media.enableAudioInjection(false);
        result.captureOnly = hooks();
        w.media.startRecording();
        w.media.enableAudioCapture(false);
        result.recordingOnly = hooks();
        w.media.stopRecording();
        result.none = hooks();
        return result;
      });

      expect(steps.injection).toEqual([
        'getUserMedia',
        'enumerateDevices',
        'permissions.query',
      ]);
      expect(steps.capture).toEqual([
        'getUserMedia',
        'enumerateDevices',
        'permissions.query',
        'AudioWorkletNode',
      ]);
      expect(steps.captureOnly).toEqual(steps.capture);
      expect(steps.recordingOnly).toEqual(steps.capture);
      expect(steps.none).toEqual([]);
      await expectReleased(page);
    } finally {
      await browser.close();
    }
  });

  test('releases tracks and audio contexts across repeated call cycles', async () => {
    const { browser, page } = await openPage('allow');
    try {
      for (let cycle = 1; cycle <= 3; cycle++) {
        const result = await page.evaluate(async () => {
          const w = window as any;

          w.media.enableAudioInjection();
          w.media.enableAudioCapture();

          // What WhatsApp does when a call starts
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          const track = stream.getAudioTracks()[0];
          const tone = new Float32Array(16_000).map(
            (_, i) => 0.3 * Math.sin(i / 5)
          );
          w.media.pushAudio(tone);

          const ctx = new AudioContext();
          (ctx as any).__test = true;
          await ctx.audioWorklet.addModule(w.__workletUrl);
          const playback = new AudioWorkletNode(
            ctx,
            'voip-playback-worklet-processor'
          );
          playback.connect(ctx.destination);

          await w.__sleep(1_500);
          const during = w.__state();
          const remoteRms = Math.max(
            ...w.__frames
              .filter((f: any) => f.source === 'remote')
              .map((f: any) => f.rms)
          );

          // The call ends and the application tears the audio down
          await ctx.close();
          w.media.enableAudioCapture(false);
          w.media.enableAudioInjection(false);

          const stopped = w.__state().frames;
          await w.__sleep(500);

          return {
            deviceId: track.getSettings().deviceId,
            during,
            remoteRms,
            trackState: track.readyState,
            framesAfterStop: w.__state().frames,
            stopped,
          };
        });

        expect(result.deviceId, `cycle ${cycle}`).toBe(VIRTUAL_MIC);
        expect(result.during.frames.local, `cycle ${cycle}`).toBeGreaterThan(0);
        expect(result.during.frames.remote, `cycle ${cycle}`).toBeGreaterThan(
          0
        );
        expect(result.remoteRms, `cycle ${cycle}`).toBeGreaterThan(0.1);
        expect(result.trackState, `cycle ${cycle}`).toBe('ended');
        expect(result.framesAfterStop, `cycle ${cycle}`).toEqual(
          result.stopped
        );
        await expectReleased(page);
      }
    } finally {
      await browser.close();
    }
  });

  test('keeps an unrelated microphone, video and worklets untouched', async () => {
    const { browser, page } = await openPage('allow');
    try {
      const result = await page.evaluate(async () => {
        const w = window as any;
        w.media.enableAudioCapture({ source: 'both' });

        const mic = await navigator.mediaDevices.getUserMedia({ audio: true });
        const micTrack = mic.getAudioTracks()[0];
        const devices = await navigator.mediaDevices.enumerateDevices();
        const camera = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        const ctx = new AudioContext();
        (ctx as any).__test = true;
        await ctx.audioWorklet.addModule(w.__workletUrl);
        const other = new AudioWorkletNode(ctx, 'other-processor');
        other.connect(ctx.destination);

        await w.__sleep(1_200);
        const during = w.__state();

        w.media.enableAudioCapture(false);
        const afterRelease = {
          micState: micTrack.readyState,
          cameraState: camera.getVideoTracks()[0].readyState,
          nativeWorklet:
            new AudioWorkletNode(ctx, 'other-processor') instanceof
            w.__originals.AudioWorkletNode,
        };
        await ctx.close();

        return {
          micLabel: micTrack.label,
          micDeviceId: micTrack.getSettings().deviceId,
          virtualListed: devices.some(
            (d) => d.deviceId === 'wa-js-virtual-microphone'
          ),
          cameraAudioTracks: camera.getAudioTracks().length,
          otherIsWorklet: other instanceof AudioWorkletNode,
          peerConnection:
            w.RTCPeerConnection === w.__originals.RTCPeerConnection,
          during,
          afterRelease,
        };
      });

      // The real microphone is handed out as is, and only tapped for capture
      expect(result.micLabel).toBe('Fake Default Audio Input');
      expect(result.micDeviceId).not.toBe(VIRTUAL_MIC);
      expect(result.virtualListed).toBe(false);
      expect(result.during.frames.local).toBeGreaterThan(0);

      // Video only requests and unrelated worklets are not touched
      expect(result.cameraAudioTracks).toBe(0);
      expect(result.otherIsWorklet).toBe(true);
      expect(result.during.frames.remote).toBe(0);
      expect(result.peerConnection).toBe(true);

      // Tracks the page got from the browser are never stopped by WA-JS
      expect(result.afterRelease).toEqual({
        micState: 'live',
        cameraState: 'live',
        nativeWorklet: true,
      });
      await expect
        .poll(() => state(page))
        .toMatchObject({
          hooks: [],
          openContexts: 0,
        });
    } finally {
      await browser.close();
    }
  });

  test('propagates a denied microphone and still releases the hooks', async () => {
    const { browser, page } = await openPage('deny');
    try {
      const result = await page.evaluate(async () => {
        const w = window as any;
        w.media.enableAudioCapture();
        const error = await navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then(
            () => null,
            (e) => e.name
          );
        await w.__sleep(300);
        const frames = w.__state().frames;
        w.media.enableAudioCapture(false);
        return { error, frames };
      });

      expect(result.error).toBe('NotAllowedError');
      expect(result.frames).toEqual({ local: 0, remote: 0 });
      await expectReleased(page);
    } finally {
      await browser.close();
    }
  });

  test('injection replaces a denied microphone until it is disabled', async () => {
    const { browser, page } = await openPage('deny');
    try {
      const result = await page.evaluate(async () => {
        const w = window as any;
        const permission = async () =>
          (await navigator.permissions.query({ name: 'microphone' as any }))
            .state;
        const realPermission = await permission();

        w.media.enableAudioInjection();
        const enabledPermission = await permission();
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const track = stream.getAudioTracks()[0];
        const listed = (await navigator.mediaDevices.enumerateDevices()).some(
          (d) => d.deviceId === 'wa-js-virtual-microphone'
        );

        w.media.enableAudioInjection(false);
        const afterError = await navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then(
            () => null,
            (e) => e.name
          );

        return {
          realPermission,
          enabledPermission,
          deviceId: track.getSettings().deviceId,
          listed,
          trackState: track.readyState,
          afterPermission: await permission(),
          afterError,
        };
      });

      expect(result.enabledPermission).toBe('granted');
      expect(result.deviceId).toBe(VIRTUAL_MIC);
      expect(result.listed).toBe(true);
      expect(result.trackState).toBe('ended');
      expect(result.afterPermission).toBe(result.realPermission);
      expect(result.afterError).toBe('NotAllowedError');
      await expectReleased(page);
    } finally {
      await browser.close();
    }
  });

  test('a denied camera does not leak the virtual microphone', async () => {
    const { browser, page } = await openPage('deny');
    try {
      const error = await page.evaluate(async () => {
        const w = window as any;
        w.media.enableAudioInjection();
        const name = await navigator.mediaDevices
          .getUserMedia({ audio: true, video: true })
          .then(
            () => null,
            (e) => e.name
          );
        w.media.enableAudioInjection(false);
        return name;
      });

      expect(error).toBe('NotAllowedError');
      await expectReleased(page);
    } finally {
      await browser.close();
    }
  });
});
