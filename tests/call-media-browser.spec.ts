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

import { chromium, expect, test } from '@playwright/test';
import { readFileSync } from 'fs';
import * as path from 'path';
import { ModuleKind, transpileModule } from 'typescript';

// Exercise the production media modules against real browser Web Audio and
// getUserMedia. Only the WhatsApp store/event boundaries are supplied locally.
const modules = Object.fromEntries(
  [
    'audioCapture',
    'audioInjector',
    'enableAudioCapture',
    'recorder',
    'mediaSession',
    'pcm',
  ].map((name) => [
    name,
    transpileModule(
      readFileSync(
        path.join(__dirname, `../src/call/media/${name}.ts`),
        'utf8'
      ),
      { compilerOptions: { module: ModuleKind.CommonJS } }
    ).outputText,
  ])
);

async function browserFixture(microphone: 'allow' | 'deny' = 'allow') {
  const origin = 'https://wa-js-media.test';
  const browser = await chromium.launch({
    executablePath: process.env.WPP_TEST_CHROME || undefined,
    args: [
      '--autoplay-policy=no-user-gesture-required',
      '--use-fake-device-for-media-stream',
      microphone === 'allow'
        ? '--use-fake-ui-for-media-stream'
        : '--use-fake-ui-for-media-stream=deny',
    ],
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.route(`${origin}/**`, (route) =>
    route.fulfill({
      contentType: 'text/html',
      body: '<!doctype html><title>Call audio fixture</title>',
    })
  );
  await page.goto(origin);
  await page.evaluate((sources) => {
    const state: any = { activeCall: { id: 'A' } };
    const frames: any[] = [];
    const cache: any = {};
    const load = (name: string): any => {
      if (cache[name]) return cache[name];
      const exports = (cache[name] = {});
      new Function('exports', 'require', sources[name])(
        exports,
        (id: string) => {
          if (id === 'debug') return () => () => undefined;
          if (id === '../../whatsapp') return { CallStore: state };
          if (id === '../../eventEmitter')
            return {
              internalEv: {
                emit: (_event: string, data: any) => frames.push(data),
              },
            };
          if (id === '../../util') return { WPPError: class extends Error {} };
          if (id.startsWith('./')) return load(id.slice(2));
          throw new Error(`Unexpected module ${id}`);
        }
      );
      return exports;
    };
    (window as any).fixture = {
      state,
      frames,
      ...load('audioInjector'),
      ...load('enableAudioCapture'),
      ...load('recorder'),
      ...load('mediaSession'),
    };
  }, modules);
  return {
    page,
    context,
    origin,
    close: async () => {
      await browser.close();
    },
  };
}

test('real Web Audio injects PCM, captures frames, and cleans up across consecutive calls', async () => {
  const fixture = await browserFixture();
  try {
    const result = await fixture.page.evaluate(async () => {
      const api = (window as any).fixture;
      const original = navigator.mediaDevices.getUserMedia;
      const originalWorklet = window.AudioWorkletNode;
      api.enableAudioInjection();
      api.enableAudioCapture();
      api.startRecording();
      const injected = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      api.pushAudio(new Float32Array(16000).fill(0.25));
      const deadline = performance.now() + 5000;
      while (
        !api.frames.some((frame: any) =>
          frame.samples.some((value: number) => Math.abs(value) > 0.1)
        ) &&
        performance.now() < deadline
      ) {
        await new Promise((resolve) => setTimeout(resolve, 40));
      }
      const signal = api.frames.some((frame: any) =>
        frame.samples.some((value: number) => Math.abs(value) > 0.1)
      );
      api.updateMediaSession('A', true);
      const wav = api.stopRecording();
      const ended = injected
        .getAudioTracks()
        .every((track) => track.readyState === 'ended');
      const restored =
        navigator.mediaDevices.getUserMedia === original &&
        window.AudioWorkletNode === originalWorklet;
      api.state.activeCall = { id: 'B' };
      const microphone = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const realMic =
        microphone.getAudioTracks()[0].getSettings().deviceId !==
        'wa-js-virtual-microphone';
      api.enableAudioCapture();
      api.startRecording();
      // Reacquiring the mic lets the active capture tap this new call.
      const second = await navigator.mediaDevices.getUserMedia({ audio: true });
      api.enableAudioCapture(false);
      api.stopRecording();
      const preserved = second.getAudioTracks()[0].readyState === 'live';
      microphone.getTracks().forEach((track) => track.stop());
      second.getTracks().forEach((track) => track.stop());
      return {
        signal,
        ended,
        restored,
        realMic,
        preserved,
        wavSize: wav.size,
        wrongId: api.frames.some((frame: any) => frame.id !== 'A'),
      };
    });
    expect(result).toMatchObject({
      signal: true,
      ended: true,
      restored: true,
      realMic: true,
      preserved: true,
      wrongId: false,
    });
    expect(result.wavSize).toBeGreaterThan(44);
  } finally {
    await fixture.close();
  }
});

test('real microphone permission denial releases hooks and the recording', async () => {
  const fixture = await browserFixture('deny');
  try {
    const result = await fixture.page.evaluate(async () => {
      const api = (window as any).fixture;
      const original = navigator.mediaDevices.getUserMedia;
      api.enableAudioCapture();
      api.startRecording();
      let error = '';
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (failure: any) {
        error = failure.name;
      }
      return {
        error,
        restored: navigator.mediaDevices.getUserMedia === original,
        recording: api.isRecording(),
        wavSize: api.stopRecording().size,
      };
    });
    expect(result).toEqual({
      error: 'NotAllowedError',
      restored: true,
      recording: false,
      wavSize: 44,
    });
  } finally {
    await fixture.close();
  }
});

test('real remote worklet capture restores its hooks without closing the native context', async () => {
  const fixture = await browserFixture();
  try {
    const result = await fixture.page.evaluate(async () => {
      const api = (window as any).fixture;
      const context = new AudioContext();
      const script = URL.createObjectURL(
        new Blob(
          [
            `class Playback extends AudioWorkletProcessor { process(_inputs, outputs) { outputs[0][0].fill(0.25); return true; } } registerProcessor('voip-playback-worklet-processor', Playback);`,
          ],
          { type: 'text/javascript' }
        )
      );
      await context.audioWorklet.addModule(script);
      URL.revokeObjectURL(script);
      const original = window.AudioWorkletNode;
      api.enableAudioCapture({ source: 'remote' });
      const node = new AudioWorkletNode(
        context,
        'voip-playback-worklet-processor'
      );
      node.connect(context.destination);
      const deadline = performance.now() + 5000;
      while (!api.frames.length && performance.now() < deadline)
        await new Promise((resolve) => setTimeout(resolve, 40));
      const signal = api.frames.some(
        (frame: any) =>
          frame.source === 'remote' &&
          frame.samples.some((value: number) => value > 0.1)
      );
      node.disconnect();
      node.connect(context.destination);
      api.updateMediaSession('A', true);
      const restored = window.AudioWorkletNode === original;
      const nativeContextPreserved = context.state !== 'closed';
      node.disconnect();
      await context.close();
      return { signal, restored, nativeContextPreserved };
    });
    expect(result).toEqual({
      signal: true,
      restored: true,
      nativeContextPreserved: true,
    });
  } finally {
    await fixture.close();
  }
});

test('cached microphone permission status keeps native event handlers and reverts after disable', async () => {
  const fixture = await browserFixture('deny');
  try {
    const result = await fixture.page.evaluate(async () => {
      const api = (window as any).fixture;
      const nativeState = (
        await navigator.permissions.query({ name: 'microphone' as any })
      ).state;
      api.enableAudioInjection();
      const status = await navigator.permissions.query({
        name: 'microphone' as any,
      });
      const listener = () => undefined;
      status.onchange = listener;
      status.addEventListener('change', listener);
      status.removeEventListener('change', listener);
      const before = status.state;
      api.enableAudioInjection(false);
      return {
        before,
        after: status.state,
        nativeState,
        handler: status.onchange === listener,
      };
    });
    expect(result).toMatchObject({ before: 'granted', handler: true });
    expect(result.after).toBe(result.nativeState);
    expect(result.nativeState).not.toBe('granted');
  } finally {
    await fixture.close();
  }
});
