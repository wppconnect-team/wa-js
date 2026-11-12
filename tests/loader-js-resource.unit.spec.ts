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

const ID = 'WAWebGroupGetCommunityParticipantsJob';
const RESOURCE = 'WAWebQueryAndUpdateCommunityParticipantsAction';

function deferred() {
  let resolve!: () => void;
  const promise = new Promise<void>((done) => (resolve = done));
  return { promise, resolve };
}

function resourceFixture({
  shape = 'direct',
  bootloaderAvailable = true,
  components = [] as string[],
} = {}) {
  const modules: Record<string, any> = {};
  const registrations: Record<string, () => void> = {};
  const calls: string[] = [];
  const steps: Array<() => unknown> = [];
  const timers = new Map<number, { run: () => void; delay: number }>();
  let nextTimer = 0;
  let queries = 0;
  const factory = (resource: string) => ({
    load() {
      calls.push(`resource:${resource}`);
      const step = steps.shift();
      if (!step) throw new Error('Unexpected resource load');
      return step();
    },
  });
  const resourceModule =
    shape === 'direct'
      ? factory
      : shape === 'default'
        ? { default: factory }
        : {};
  const bootloader = {
    loadModules(names: string[], done: () => void) {
      calls.push(`component:${names[0]}`);
      done();
    },
  };
  const exports: any = {};
  runInNewContext(
    transpileModule(
      readFileSync(path.join(__dirname, '../src/loader/index.ts'), 'utf8'),
      { compilerOptions: { module: ModuleKind.CommonJS } }
    ).outputText,
    {
      exports,
      self: { require: () => null },
      window: {},
      Date: { now: () => 0 },
      setTimeout(run: () => void, delay: number) {
        timers.set(++nextTimer, { run, delay });
        return nextTimer;
      },
      clearTimeout(id: number) {
        timers.delete(id);
      },
      require(id: string) {
        if (id === 'debug') return () => () => {};
        if (id === '../eventEmitter')
          return { internalEv: { waitFor: () => new Promise(() => {}) } };
        if (id === './blacklist')
          return { isMetaModuleBlacklisted: () => false };
        if (id === './lazyModules')
          return {
            LAZY_MODULES: { [ID]: { components, resources: [RESOURCE] } },
            MAX_DISCOVERED_COMPONENTS: 10,
          };
        throw new Error(`Unexpected dependency ${id}`);
      },
    }
  );
  exports.loaderType = 'meta';
  exports.moduleRequire = Object.assign(
    (id: string) => {
      if (id === 'Bootloader') return bootloaderAvailable ? bootloader : null;
      if (id === 'JSResourceForInteraction') return resourceModule;
      return modules[id] || null;
    },
    { m: registrations }
  );
  return {
    loader: exports,
    calls,
    timers,
    queue: (step: () => unknown) => steps.push(step),
    register() {
      registrations[ID] = () => {};
      modules[ID] = {
        getCommunityParticipants: () => {
          queries++;
          return [];
        },
      };
    },
    queries: () => queries,
    expire() {
      const entry = [...timers].find(([, timer]) => timer.delay === 30_000);
      if (!entry) throw new Error('No resource deadline scheduled');
      timers.delete(entry[0]);
      entry[1].run();
    },
  };
}

for (const shape of ['direct', 'default']) {
  test(`loads a ${shape} resource factory without invoking its business query`, async () => {
    const f = resourceFixture({ shape });
    f.queue(() => f.register());
    expect(await f.loader.ensureLazyModule(ID)).toBe(true);
    expect(f.calls).toEqual([`resource:${RESOURCE}`]);
    expect(f.queries()).toBe(0);
    expect(f.timers.size).toBe(0);
  });
}

test('coalesces concurrent callers and clears the successful resource deadline', async () => {
  const f = resourceFixture();
  const loaded = deferred();
  f.queue(() => loaded.promise.then(() => f.register()));
  const first = f.loader.ensureLazyModule(ID);
  const second = f.loader.ensureLazyModule(ID);
  expect(second).toBe(first);
  expect(f.calls).toHaveLength(1);
  loaded.resolve();
  expect(await first).toBe(true);
  expect(await second).toBe(true);
  expect(f.timers.size).toBe(0);
});

for (const kind of ['throw', 'reject']) {
  test(`a resource ${kind} leaves no timer or poisoned retry`, async () => {
    const f = resourceFixture();
    f.queue(() => {
      if (kind === 'throw') throw new Error('Resource fetch failed');
      return Promise.reject(new Error('Resource fetch failed'));
    });
    expect(await f.loader.ensureLazyModule(ID)).toBe(false);
    expect(f.timers.size).toBe(0);
    f.queue(() => f.register());
    expect(await f.loader.ensureLazyModule(ID)).toBe(true);
    expect(f.calls).toHaveLength(2);
    expect(f.timers.size).toBe(0);
  });
}

test('a timeout can retry and a late old completion does not clear the new request', async () => {
  const f = resourceFixture();
  const oldLoad = deferred();
  const newLoad = deferred();
  f.queue(() => oldLoad.promise);
  const first = f.loader.ensureLazyModule(ID);
  f.expire();
  expect(await first).toBe(false);
  expect(f.timers.size).toBe(0);

  f.queue(() => newLoad.promise.then(() => f.register()));
  const retry = f.loader.ensureLazyModule(ID);
  oldLoad.resolve();
  await Promise.resolve();
  await Promise.resolve();
  expect(f.loader.ensureLazyModule(ID)).toBe(retry);
  newLoad.resolve();
  expect(await retry).toBe(true);
  expect(f.timers.size).toBe(0);
});

test('a resource can load when the optional component Bootloader is unavailable', async () => {
  const f = resourceFixture({ bootloaderAvailable: false });
  f.queue(() => f.register());
  expect(await f.loader.ensureLazyModule(ID)).toBe(true);
  expect(f.calls).toEqual([`resource:${RESOURCE}`]);
  expect(f.timers.size).toBe(0);
});

test('tries the component before its interaction resource', async () => {
  const f = resourceFixture({ components: ['CommunityModal'] });
  f.queue(() => f.register());
  expect(await f.loader.ensureLazyModule(ID)).toBe(true);
  expect(f.calls).toEqual(['component:CommunityModal', `resource:${RESOURCE}`]);
  expect(f.timers.size).toBe(0);
});

test('a resolved resource without the requested module remains retryable', async () => {
  const f = resourceFixture();
  f.queue(() => undefined);
  expect(await f.loader.ensureLazyModule(ID)).toBe(false);
  f.queue(() => f.register());
  expect(await f.loader.ensureLazyModule(ID)).toBe(true);
  expect(f.calls).toHaveLength(2);
  expect(f.timers.size).toBe(0);
});

test('an absent resource factory fails quietly without scheduling a timer', async () => {
  const f = resourceFixture({ shape: 'absent' });
  expect(await f.loader.ensureLazyModule(ID)).toBe(false);
  expect(f.timers.size).toBe(0);
});

test('unknown and legacy-loader requests never fetch an interaction resource', async () => {
  const f = resourceFixture();
  expect(await f.loader.ensureLazyModule('UnknownModule')).toBe(false);
  f.loader.loaderType = 'webpack';
  expect(await f.loader.ensureLazyModule(ID)).toBe(false);
  expect(f.calls).toEqual([]);
  expect(f.timers.size).toBe(0);
});
