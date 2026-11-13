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
import { runInNewContext } from 'vm';

function fixture(legacy = false) {
  const calls: Array<{ name: string; args: any[] }> = [];
  const modules: Record<string, any> = {};
  const cache = new Map<string, any>();
  const wid = { user: 'me', server: 'c.us' };
  const state: any = {
    text: 'About',
    result: 'SUCCESS',
    exists: true,
    clock: 1_700_000_000,
  };
  const model = { status: 'Legacy' };
  function method(name: string, action: (...args: any[]) => any) {
    return function (this: any, ...args: any[]) {
      if (name === 'get' || name === 'set') expect(this).toBe(bridge);
      if (name === 'cache') expect(this).toBe(updater);
      calls.push({ name, args });
      return action(...args);
    };
  }
  const bridge: any = {
    getTextStatus: method('get', () =>
      state.getReject
        ? Promise.reject(state.getReject)
        : Promise.resolve(state.response || { text: state.text })
    ),
    setTextStatus: method('set', () =>
      state.setReject
        ? Promise.reject(state.setReject)
        : Promise.resolve({ result: state.result })
    ),
  };
  const updater: any = {
    updateTextStatusForContact: method('cache', () => {
      if (state.cacheThrow) throw state.cacheThrow;
      return state.cacheReject
        ? Promise.reject(state.cacheReject)
        : Promise.resolve();
    }),
  };
  const utils = {
    TEXT_STATUS_DURATION_INFINITE: -1,
    CLEAR_TEXT_STATUS_LAST_UPDATE_TIME_VAL: 0,
    CLEAR_TEXT_STATUS_STRING_VAL: null,
    CLEAR_TEXT_STATUS_EMOJI_VAL: null,
    CLEAR_TEXT_STATUS_EPHEMERAL_DURATION_VAL: null,
    TEXT_STATUS_NOT_AUTHORIZED: -3,
  };
  const store = { find: method('find', () => Promise.resolve(model)) };
  const jobs = {
    getStatus: method('oldGet', () =>
      Promise.resolve({ id: wid, status: 'Legacy' })
    ),
    setMyStatus: method('oldSet', () => Promise.resolve({ status: 200 })),
    queryStatusAll: () => {},
  };
  function registerModern() {
    modules.WAWebContactTextStatusBridge = bridge;
    modules.WAWebUpdateTextStatusForContact = updater;
    modules.WAWebTextStatusUtils = utils;
    modules.WATimeUtils = { unixTime: () => state.clock };
  }
  if (legacy) {
    class StatusModel {}
    (StatusModel.prototype as any).__props = ['status'];
    modules.oldStore = {
      TextStatusCollection: store,
      TextStatusCollectionImpl: class {},
    };
    modules.oldModel = { default: StatusModel };
    modules.oldJobs = jobs;
  } else registerModern();
  const searchConditions = new Set<unknown>();
  const loader = {
    loadModule: (id: string) => modules[id] || null,
    search(predicate: (m: any, id: string) => boolean) {
      searchConditions.add(predicate);
      return (
        Object.entries(modules).find(([id, m]) => predicate(m, id))?.[1] || null
      );
    },
    async ensureLazyModule(id: string) {
      calls.push({ name: 'ensure', args: [id] });
      if (state.late) registerModern();
      return !!modules[id];
    },
  };
  function load(relative: string): any {
    if (cache.has(relative)) return cache.get(relative);
    const filename = path.resolve(__dirname, '../src', relative);
    const exports: any = {};
    cache.set(relative, exports);
    runInNewContext(
      transpileModule(readFileSync(filename, 'utf8'), {
        compilerOptions: { module: ModuleKind.CommonJS },
      }).outputText,
      {
        exports,
        Date: { now: () => 1_700_000_000_000 },
        require(id: string) {
          if (/loader$/.test(id)) return loader;
          if (/util$/.test(id)) return load('util/errors.ts');
          if (id === '../../assert') return { assertWid: () => wid };
          if (id === './queryExists')
            return { queryExists: async () => state.exists };
          if (/getMyUserWid$/.test(id)) return { getMyUserWid: () => wid };
          if (id === '../../whatsapp')
            return { StatusStore: legacy ? store : undefined };
          if (id === '../../whatsapp/functions')
            return { ...bridge, ...updater, ...jobs };
          const target = path.relative(
            path.resolve(__dirname, '../src'),
            path.resolve(path.dirname(filename), id)
          );
          return load(`${target}.ts`);
        },
      }
    );
    return exports;
  }
  return {
    calls,
    state,
    modules,
    bridge,
    updater,
    utils,
    model,
    wid,
    searchConditions,
    contact: async () =>
      await load('contact/functions/getStatus.ts').getStatus('me@c.us'),
    mine: async () =>
      await load('profile/functions/getMyStatus.ts').getMyStatus(),
    set: async (text: string) =>
      await load('profile/functions/setMyStatus.ts').setMyStatus(text),
  };
}

for (const own of [false, true]) {
  test(`reads the modern ${own ? 'own' : 'contact'} About`, async () => {
    const f = fixture();
    expect(await (own ? f.mine() : f.contact())).toBe('About');
  });
  test(`propagates unexpected modern ${own ? 'own' : 'contact'} fetch errors`, async () => {
    const f = fixture();
    const error = Object.assign(new Error('Server failed'), {
      statusCode: 500,
    });
    f.state.response = { text: '', error };
    await expect(own ? f.mine() : f.contact()).rejects.toBe(error);
    expect(f.calls.filter((c) => c.name === 'cache')).toEqual([]);
  });
  test(`keeps privacy401 distinct from modern ${own ? 'own' : 'contact'} failure`, async () => {
    const f = fixture();
    f.state.response = {
      text: '',
      error: Object.assign(new Error('Private'), { statusCode: 401 }),
    };
    expect(await (own ? f.mine() : f.contact())).toBe(own ? '' : null);
  });
}

test('nonexistent contacts do not fetch or update About', async () => {
  const f = fixture();
  f.state.exists = false;
  expect(await f.contact()).toBeNull();
  expect(f.calls).toEqual([]);
});

test('empty and emoji-only About retain the string-only API', async () => {
  const f = fixture();
  f.state.response = { text: null, emoji: 'x' };
  expect(await f.contact()).toBeNull();
  expect(await f.mine()).toBe('');
});

test('clearing About uses the native cleared cache state and timestamp zero', async () => {
  const f = fixture();
  expect(await f.set('')).toBe(true);
  expect(f.calls.find((c) => c.name === 'set')?.args).toEqual([
    null,
    null,
    null,
  ]);
  expect(f.calls.find((c) => c.name === 'cache')?.args).toEqual([
    {
      contactId: f.wid,
      textString: null,
      emoji: null,
      ephemeralDuration: null,
      newUpdateTime: 0,
      source: 'set-self',
    },
  ]);
});

test('nonempty About is permanent and updates cache only after remote success', async () => {
  const f = fixture();
  expect(await f.set('New')).toBe(true);
  expect(f.calls.find((c) => c.name === 'set')?.args).toEqual([
    'New',
    null,
    -1,
  ]);
  expect(
    f.calls.filter((c) => ['set', 'cache'].includes(c.name)).map((c) => c.name)
  ).toEqual(['set', 'cache']);
  expect(f.calls.find((c) => c.name === 'cache')?.args[0]).toMatchObject({
    textString: 'New',
    ephemeralDuration: -1,
    newUpdateTime: 1_700_000_000,
  });
});

for (const result of ['FAILURE', 'UNKNOWN', undefined]) {
  test(`an unsuccessful remote result ${result} never changes the local cache`, async () => {
    const f = fixture();
    f.state.result = result;
    expect(await f.set('New')).toBe(false);
    expect(f.calls.filter((c) => c.name === 'cache')).toEqual([]);
  });
}

for (const kind of ['cacheReject', 'cacheThrow']) {
  test(`a ${kind} after remote success is an explicit partial failure`, async () => {
    const f = fixture();
    f.state[kind] = new Error('DB unavailable');
    await expect(f.set('New')).rejects.toMatchObject({
      code: 'text_status_cache_update_failed',
      remoteUpdated: true,
      cause: f.state[kind],
    });
    expect(f.calls.filter((c) => c.name === 'set')).toHaveLength(1);
  });
}

test('an incomplete modern stack fails before sending a remote update', async () => {
  const f = fixture();
  delete f.updater.updateTextStatusForContact;
  await expect(f.set('New')).rejects.toMatchObject({
    code: 'text_status_unavailable',
  });
  expect(f.calls.filter((c) => c.name === 'set')).toEqual([]);
});

test('late modern registration recovers after a failed attempt', async () => {
  const f = fixture();
  delete f.modules.WAWebContactTextStatusBridge;
  await expect(f.mine()).rejects.toMatchObject({
    code: 'text_status_unavailable',
  });
  f.state.late = true;
  expect(await f.mine()).toBe('About');
});

test('legacy getters and setters preserve their store path without loading modern resources', async () => {
  const f = fixture(true);
  expect(await f.mine()).toBe('Legacy');
  expect(await f.contact()).toBe('Legacy');
  expect(await f.set('New')).toBe(true);
  expect(f.model.status).toBe('New');
  expect(f.calls.map((c) => c.name)).toEqual([
    'find',
    'find',
    'oldSet',
    'find',
  ]);
});

test('repeated modern reads keep native search predicates bounded', async () => {
  const f = fixture();
  await f.mine();
  const initial = f.searchConditions.size;
  for (let i = 0; i < 20; i++) await f.mine();
  expect(f.searchConditions.size).toBe(initial);
});

test('default-wrapped modern modules preserve the real native owners', async () => {
  const f = fixture();
  for (const [id, value] of Object.entries(f.modules))
    f.modules[id] = { default: value };
  expect(await f.mine()).toBe('About');
  expect(await f.set('New')).toBe(true);
});

test('fetch success updates the native cache with its server timestamp', async () => {
  const f = fixture();
  f.state.response = {
    text: 'Fetched',
    emoji: 'x',
    lastUpdateTime: 123,
    ephemeralDurationSeconds: 50,
  };
  expect(await f.mine()).toBe('Fetched');
  expect(f.calls.find((c) => c.name === 'cache')?.args[0]).toEqual({
    contactId: f.wid,
    textString: 'Fetched',
    emoji: 'x',
    ephemeralDuration: 50,
    newUpdateTime: 123,
    source: 'fetch',
  });
});

test('a private About clears stale text using the authorization sentinel', async () => {
  const f = fixture();
  f.state.response = {
    text: '',
    error: Object.assign(new Error('Private'), { statusCode: 401 }),
  };
  expect(await f.contact()).toBeNull();
  expect(f.calls.find((c) => c.name === 'cache')?.args[0]).toEqual({
    contactId: f.wid,
    textString: null,
    emoji: null,
    ephemeralDuration: null,
    newUpdateTime: -3,
    source: 'fetch',
  });
});

test('remote rejection never updates the cache and preserves the original error', async () => {
  const f = fixture();
  f.state.setReject = new Error('Disconnected');
  await expect(f.set('New')).rejects.toBe(f.state.setReject);
  expect(f.calls.filter((c) => c.name === 'cache')).toEqual([]);
});

test('uses the native corrected clock instead of the browser wall clock', async () => {
  const f = fixture();
  f.state.clock = 999;
  expect(await f.set('New')).toBe(true);
  expect(f.calls.find((c) => c.name === 'cache')?.args[0].newUpdateTime).toBe(
    999
  );
});

test('a partial legacy store cannot mask a complete modern setter', async () => {
  const f = fixture();
  f.modules.oldStore = {
    TextStatusCollection: { find: async () => ({ status: 'Stale' }) },
  };
  expect(await f.set('New')).toBe(true);
  expect(f.calls.filter((c) => c.name === 'set')).toHaveLength(1);
});
