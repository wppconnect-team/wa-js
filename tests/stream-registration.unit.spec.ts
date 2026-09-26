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
import { EventEmitter2 } from 'eventemitter2';
import { readFileSync } from 'fs';
import * as path from 'path';
import { ModuleKind, transpileModule } from 'typescript';
import { runInNewContext } from 'vm';

function streamRegistration() {
  let now = 0;
  let nextTimer = 0;
  let stream: any;
  const callbacks: Array<() => void> = [];
  const timers = new Map<number, { at: number; callback: () => void }>();
  const errors: any[][] = [];
  const internalEv = new EventEmitter2();
  const whatsapp = {
    get Stream() {
      return stream;
    },
  };
  for (const file of ['registerMainReadyEvent', 'registerStreamEvent']) {
    runInNewContext(
      transpileModule(
        readFileSync(
          path.join(__dirname, `../src/conn/events/${file}.ts`),
          'utf8'
        ),
        { compilerOptions: { module: ModuleKind.CommonJS } }
      ).outputText,
      {
        exports: {},
        Date: { now: () => now },
        console: { error: (...args: any[]) => errors.push(args) },
        setTimeout: (callback: () => void, delay: number) => {
          const id = ++nextTimer;
          timers.set(id, { at: now + delay, callback });
          return id;
        },
        require(id: string) {
          if (id === 'debug') return () => () => undefined;
          if (id === '../../eventEmitter') return { internalEv };
          if (id === '../../whatsapp') return whatsapp;
          if (id === '../../whatsapp/enums') {
            return { StreamMode: { MAIN: 'MAIN', QR: 'QR' } };
          }
          if (id === '../../loader') {
            return {
              onInjected: (callback: () => void) => callbacks.push(callback),
            };
          }
          throw new Error(`Unexpected dependency: ${id}`);
        },
      }
    );
  }
  callbacks[0]();
  return {
    internalEv,
    errors,
    timers,
    register: callbacks[1],
    provideStream(mode = 'QR') {
      stream = Object.assign(new EventEmitter2(), { mode, info: 'NORMAL' });
      return stream;
    },
    advance(duration: number) {
      const target = now + duration;
      for (;;) {
        const due = [...timers].filter(([, timer]) => timer.at <= target);
        if (!due.length) break;
        const [id, timer] = due.sort((a, b) => a[1].at - b[1].at)[0];
        now = timer.at;
        timers.delete(id);
        timer.callback();
      }
      now = target;
    },
  };
}

test('registers an available Stream and emits its current state immediately', () => {
  const api = streamRegistration();
  const stream = api.provideStream();
  const ready: unknown[] = [];
  api.internalEv.on('conn.main_ready', () => ready.push(true));
  api.register();
  expect(ready).toEqual([true]);
  expect(stream.listenerCount('change:mode')).toBe(1);
  expect(stream.listenerCount('change:info')).toBe(1);
  expect(api.timers.size).toBe(0);
});

test('recovers a late Stream and the main-ready event without another injection', () => {
  const api = streamRegistration();
  const ready: unknown[] = [];
  const info: unknown[] = [];
  api.internalEv.on('conn.main_ready', () => ready.push(true));
  api.internalEv.on('conn.stream_info_changed', (value) => info.push(value));
  api.register();
  api.advance(3000);
  const stream = api.provideStream('MAIN');
  api.advance(1000);
  stream.emit('change:info', stream, 'OFFLINE');
  expect(ready).toEqual([true]);
  expect(info).toEqual(['NORMAL', 'OFFLINE']);
  expect(stream.listenerCount('change:mode')).toBe(1);
  expect(api.timers.size).toBe(0);
  expect(api.errors).toEqual([]);
});

test('keeps one pending retry and does not duplicate installed listeners', () => {
  const api = streamRegistration();
  api.register();
  api.register();
  expect(api.timers.size).toBe(1);
  const stream = api.provideStream();
  api.advance(1000);
  api.register();
  expect(stream.listenerCount('change:mode')).toBe(1);
  expect(stream.listenerCount('change:info')).toBe(1);
  expect(api.timers.size).toBe(0);
});

test('stops after sixty seconds and reports a single terminal error', () => {
  const api = streamRegistration();
  api.register();
  api.advance(60000);
  expect(api.timers.size).toBe(0);
  expect(api.errors).toHaveLength(1);
  expect(String(api.errors[0][0])).toContain('Stream');
  api.register();
  api.advance(60000);
  expect(api.errors).toHaveLength(1);
  expect(api.timers.size).toBe(0);
});

test('does not retry registration when a current-state listener throws', () => {
  const api = streamRegistration();
  const stream = api.provideStream();
  api.internalEv.on('conn.stream_mode_changed', () => {
    throw new Error('listener failure');
  });
  expect(() => api.register()).toThrow('listener failure');
  api.register();
  expect(stream.listenerCount('change:mode')).toBe(1);
  expect(stream.listenerCount('change:info')).toBe(1);
  expect(api.timers.size).toBe(0);
});
