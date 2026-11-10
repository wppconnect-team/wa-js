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

function toolApi() {
  const handlers = new Map<string, Set<any>>();
  const ended: string[] = [];
  let active: any = { id: 'A' };
  let played = 0,
    stopped = 0;
  const emit = (event: string, data: any) =>
    [...(handlers.get(event) || [])].forEach((fn) => fn(data));
  const WPP = {
    on: (event: string, fn: any) => {
      if (!handlers.has(event)) handlers.set(event, new Set());
      handlers.get(event)!.add(fn);
    },
    off: (event: string, fn: any) => handlers.get(event)?.delete(fn),
    call: {
      getActiveCall: () => active,
      enableAudioInjection: () => undefined,
      enableAudioCapture: () => undefined,
      startRecording: () => undefined,
      isRecording: () => false,
      stopRecording: () => {
        stopped++;
        return 'WAV';
      },
      offer: async () => active,
      playAudio: async () => {
        played++;
      },
      end: async (id: string) => {
        ended.push(id);
        emit('call.ended', { id });
      },
    },
  };
  const exports: any = {};
  const source = transpileModule(
    readFileSync(
      path.join(__dirname, '../src/tools/callTestScenario.ts'),
      'utf8'
    ),
    { compilerOptions: { module: ModuleKind.CommonJS, target: 4 } }
  ).outputText;
  const timers = new Map<number, () => void>();
  let sequence = 0;
  new Function('exports', 'window', 'setTimeout', 'clearTimeout', source)(
    exports,
    { WPP, wppCallTestLog: () => undefined },
    (fn: () => void) => {
      timers.set(++sequence, fn);
      return sequence;
    },
    (id: number) => timers.delete(id)
  );
  return {
    ...exports,
    WPP,
    handlers,
    ended,
    emit,
    timers,
    replace: () => {
      active = { id: 'B' };
    },
    drain: () => {
      const pending = [...timers.values()];
      timers.clear();
      pending.forEach((fn) => fn());
    },
    counts: () => ({ played, stopped }),
  };
}

test('call test ignores another call and never ends a replacement', async () => {
  const api = toolApi();
  const result = api.runCallTestScenario({
    to: 'peer',
    audio: 'data:',
    maxMs: 10,
  });
  await Promise.resolve();
  await Promise.resolve();
  api.emit('call.accepted', { id: 'B' });
  expect(api.counts().played).toBe(0);
  api.replace();
  api.drain();
  expect(await result).toBe('WAV');
  expect(api.ended).toEqual([]);
  expect([...api.handlers.values()].every((set) => !set.size)).toBe(true);
});

test('call test pins end to its call and clears timers and handlers', async () => {
  const api = toolApi();
  const result = api.runCallTestScenario({
    to: 'peer',
    audio: 'data:',
    maxMs: 10,
  });
  await Promise.resolve();
  await Promise.resolve();
  api.drain();
  expect(await result).toBe('WAV');
  expect(api.ended).toEqual(['A']);
  expect(api.counts().stopped).toBe(1);
  expect(api.timers.size).toBe(0);
  expect([...api.handlers.values()].every((set) => !set.size)).toBe(true);
});
