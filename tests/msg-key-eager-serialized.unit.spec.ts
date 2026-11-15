/*!
 * Copyright 2021 WPPConnect Team
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
import { EventEmitter } from 'events';
import { readFileSync } from 'fs';
import * as path from 'path';
import { ModuleKind, ScriptTarget, transpileModule } from 'typescript';
import { runInNewContext } from 'vm';

function fixture(
  options: { available?: boolean; injected?: boolean; legacy?: boolean } = {}
) {
  const events = Object.assign(new EventEmitter(), {
    waitFor: () => new Promise(() => {}),
  });
  const timers: Array<() => void> = [];
  const errors: string[] = [];
  let available = options.available !== false;
  const native = runInNewContext(
    options.legacy
      ? `
    class MsgKey {
      constructor(value) {
        if (!value) throw Error('MsgKey error: obj is null/undefined');
        this._serialized = value;
      }
      toString() { return this._serialized; }
    }
    MsgKey;
  `
      : `
    class MsgKey {
      constructor(value) {
        if (!value) throw Error('MsgKey error: obj is null/undefined');
        this.$1 = value;
      }
      toString() { return this.$1; }
    }
    MsgKey;
  `
  );

  function load(file: string, dependencies: Record<string, any>) {
    const exports: any = {};
    runInNewContext(
      transpileModule(readFileSync(path.join(__dirname, '..', file), 'utf8'), {
        compilerOptions: {
          module: ModuleKind.CommonJS,
          target: ScriptTarget.ES2017,
        },
      }).outputText,
      {
        exports,
        self: {},
        window: {},
        Date: { now: () => 0 },
        console: { error: (error: string) => errors.push(error) },
        queueMicrotask,
        setTimeout: (callback: () => void) => timers.push(callback),
        clearTimeout: () => {},
        require(id: string) {
          if (id in dependencies) return dependencies[id];
          throw Error(`Unexpected dependency ${id} in ${file}`);
        },
      }
    );
    return exports;
  }

  const debug = () => Object.assign(() => {}, { extend: debug });
  const loader = load('src/loader/index.ts', {
    debug,
    '../eventEmitter': { internalEv: events },
    './blacklist': { isMetaModuleBlacklisted: () => false },
    './lazyModules': { LAZY_MODULES: {}, MAX_DISCOVERED_COMPONENTS: 10 },
  });
  loader.loaderType = 'meta';
  loader.isInjected = !!options.injected;
  loader.moduleRequire = Object.assign(
    (id: string) =>
      id === 'WAWebMsgKey' && available ? { default: native } : null,
    { m: { WAWebMsgKey: () => {} } }
  );
  const exporter = load('src/whatsapp/exportModule.ts', {
    debug,
    '../chat/functions/setChatList': {},
    '../gtag': { trackException: () => {} },
    '../loader': loader,
    '../loader/blacklist': { IGNORE_FAIL_MODULES: new Set() },
    '../util': {},
  });
  const binding = load('src/whatsapp/misc/MsgKey.ts', {
    '../../loader': loader,
    '../../eventEmitter': { internalEv: events },
    '../exportModule': exporter,
  });

  return {
    native,
    binding,
    events,
    loader,
    errors,
    load,
    flushTimers: () => {
      while (timers.length) timers.shift()!();
    },
    available: () => {
      available = true;
    },
  };
}

test('patches keys before an injected new-message listener delivers its first microtask', async () => {
  const f = fixture();
  const oldKey = new f.native('false_111@c.us_before');
  let receive: (msg: any) => void = () => {
    throw Error('listener not installed');
  };
  const MsgModel = class {};
  f.load('src/chat/events/registerNewMessageEvent.ts', {
    '../../eventEmitter': { internalEv: f.events },
    '../../loader': f.loader,
    '../../whatsapp': {
      MsgStore: {
        on: (_event: string, listener: typeof receive) => {
          receive = listener;
        },
      },
      MsgModel,
      ChatStore: { get: () => undefined },
    },
    '../../whatsapp/functions': {},
    '../functions/': {},
  });
  f.events.emit('loader.injected');
  f.flushTimers();
  // Ready's deferred callbacks have not executed when this message arrives.
  f.events.emit('loader.ready');
  const delivered: string[] = [];
  f.events.on('chat.new_message', (msg) => delivered.push(msg.id._serialized));
  receive({ id: oldKey, isNewMsg: true, type: 'chat' });
  await new Promise<void>((resolve) => setImmediate(resolve));
  expect(delivered).toEqual(['false_111@c.us_before']);
});

test('resolves synchronously at ready, before deferred readiness callbacks', () => {
  const f = fixture();
  const key = new f.native('false_111@c.us_ready');
  f.events.emit('loader.ready');
  expect(key._serialized).toBe('false_111@c.us_ready');
});

for (const phase of ['loader.ready', 'loader.full_ready']) {
  test(`retries unavailable exports at ${phase} within the negative-cache TTL`, () => {
    const f = fixture({ available: false });
    f.events.emit('loader.injected');
    f.events.emit('loader.ready');
    f.flushTimers();
    f.available();
    f.events.emit(phase);
    expect(new f.native('false_111@c.us_late')._serialized).toBe(
      'false_111@c.us_late'
    );
    expect(f.errors.length).toBeLessThanOrEqual(1);
    expect(f.binding.MsgKey).toBe(f.native);
  });
}

test('keeps an unavailable binding unresolved and reports its miss only once', () => {
  const f = fixture({ available: false });
  for (const phase of [
    'loader.injected',
    'loader.ready',
    'loader.full_ready',
  ]) {
    f.events.emit(phase);
  }
  f.flushTimers();
  expect(f.binding.MsgKey).toBeUndefined();
  expect(f.errors).toHaveLength(1);
});

test('resolves immediately when loaded into an already injected loader', () => {
  const f = fixture({ injected: true });
  expect(new f.native('false_111@c.us_injected')._serialized).toBe(
    'false_111@c.us_injected'
  );
});

test('keeps the patch idempotent and serializes old and new instances', () => {
  const f = fixture();
  const before = new f.native('false_111@c.us_before');
  f.events.emit('loader.injected');
  f.flushTimers();
  const patched = f.native.prototype.toString;
  f.events.emit('loader.ready');
  f.events.emit('loader.full_ready');
  f.flushTimers();
  expect(f.native.prototype.toString).toBe(patched);
  expect(JSON.parse(JSON.stringify(before))).toEqual({
    _serialized: 'false_111@c.us_before',
  });
  const after = new f.native('false_111@c.us_after');
  expect({ ...after }).toEqual({ _serialized: 'false_111@c.us_after' });
  expect(after.toString()).toBe(after._serialized);
});

test('leaves legacy serialized properties and native methods unchanged', () => {
  const f = fixture({ legacy: true });
  const original = f.native.prototype.toString;
  f.events.emit('loader.injected');
  f.events.emit('loader.ready');
  f.events.emit('loader.full_ready');
  f.flushTimers();
  expect(f.native.prototype.toString).toBe(original);
  expect(new f.native('false_111@c.us_legacy')._serialized).toBe(
    'false_111@c.us_legacy'
  );
});
