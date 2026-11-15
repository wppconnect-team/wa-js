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

function fixture(native?: Record<string, any>) {
  const modules: Record<string, any> = native
    ? { native: { Lid1X1MigrationUtils: native } }
    : {};
  const fallbacks: Record<string, any> = {};
  const callbacks: Array<() => void> = [];
  const errors: unknown[] = [];
  const searchConditions = new Set<unknown>();
  const cached = new Map<string, any>();
  const loader = {
    onFullReady: (callback: () => void) => callbacks.push(callback),
    searchId(predicate: (m: any, id: string) => boolean) {
      searchConditions.add(predicate);
      return Object.keys({ ...modules, ...fallbacks }).find((id) =>
        predicate(modules[id] || fallbacks[id], id)
      );
    },
    loadModule: (id: string) => modules[id] || fallbacks[id],
    injectFallbackModule: (id: string, value: any) => {
      fallbacks[`fallback_${id}`] = value;
    },
  };
  const dummy: Record<string, any> = {};
  function load(relative: string): any {
    const filename = path.resolve(__dirname, '../src', relative);
    if (cached.has(filename)) return cached.get(filename);
    const exports: any =
      relative === 'whatsapp/functions/index.ts' ? { ...dummy } : {};
    cached.set(filename, exports);
    runInNewContext(
      transpileModule(readFileSync(filename, 'utf8'), {
        compilerOptions: { module: ModuleKind.CommonJS },
      }).outputText,
      {
        exports,
        console: {
          error: (...args: any[]) => errors.push(args),
          warn: () => {},
        },
        require(id: string) {
          if (/loader$/.test(id)) return loader;
          if (id === '../loader/blacklist')
            return { IGNORE_FAIL_MODULES: new Set() };
          if (id === 'debug') {
            const debug: any = () => {};
            debug.extend = () => debug;
            return () => debug;
          }
          if (id === '../gtag')
            return { trackException: (...args: any[]) => errors.push(args) };
          if (/setChatList$/.test(id)) return {};
          if (/forceMediaUploadMainThread$/.test(id)) return {};
          if (/util$/.test(id))
            return {
              ...load('util/wrapFunction.ts'),
              ...load('util/errors.ts'),
            };
          if (
            relative === 'whatsapp/functions/index.ts' &&
            id !== './isLidMigrated'
          )
            return {};
          if (id === '../whatsapp') return { functions: dummy };
          if (
            id === '../whatsapp/functions' ||
            id === '../../whatsapp/functions'
          )
            return load('whatsapp/functions/index.ts');
          if (id === '../../whatsapp/misc')
            return {
              ...load('whatsapp/misc/Lid1X1MigrationUtils.ts'),
              UserPrefs: {
                getMaybeMeLidUser: () => 'me@lid',
                getMaybeMePnUser: () => 'me@c.us',
              },
            };
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
  const binding = load('whatsapp/exportModule.ts');
  modules.patches = {};
  for (const name of [
    'mediaTypeFromProtobuf',
    'typeAttributeFromProtobuf',
    'isUnreadTypeMsg',
    'createChatRecord',
    'getABPropConfigValue',
  ]) {
    modules.patches[name] = () => {};
    binding.exportModule(
      dummy,
      { [name]: name },
      (m: any) => typeof m[name] === 'function'
    );
  }
  const functions = load('whatsapp/functions/index.ts');
  load('chat/patch.ts');
  return {
    functions,
    binding,
    modules,
    errors,
    searchConditions,
    patch: () => callbacks[0](),
    state: () =>
      load('conn/functions/getMigrationState.ts').getMigrationState(),
  };
}

for (const value of [true, false]) {
  test(`preserves the deprecated native getter and state value ${value}`, () => {
    const native = {
      isLidMigrated() {
        expect(this).toBe(native);
        return value;
      },
      isSyncdSessionMigrated: () => true,
      shouldApplyNonMigratedMessagingRules: () => false,
    };
    const f = fixture(native);
    // Resolve publicly before patching: the replaced method must stay mapped.
    expect(typeof f.functions.isLidMigrated).toBe('function');
    f.patch();
    expect(f.functions.isLidMigrated()).toBe(value);
    expect(f.state()).toMatchObject({
      isLidMigrated: value,
      isSyncdSessionMigrated: true,
    });
    expect(f.binding._moduleIdMap.get(f.functions.isLidMigrated)).toBe(
      'native'
    );
    const wrapped = native.isLidMigrated;
    f.patch();
    expect(native.isLidMigrated).toBe(wrapped);
    expect(f.errors).toEqual([]);
  });
}

test('retains the old throwing-getter guard without requiring the new session flag', () => {
  const f = fixture({
    isLidMigrated: () => {
      throw new Error('Unsupported native access');
    },
  });
  f.patch();
  expect(f.functions.isLidMigrated()).toBe(false);
  expect(f.state().isLidMigrated).toBe(false);
  expect(f.errors).toEqual([]);
});

test('the legacy guard forwards arguments and preserves successful native results', () => {
  const sentinel = { source: 'legacy-caller' };
  const native = {
    isLidMigrated(arg: any) {
      expect(this).toBe(native);
      expect(arg).toBe(sentinel);
      return true;
    },
  };
  const f = fixture(native);
  f.patch();
  expect(f.functions.isLidMigrated(sentinel)).toBe(true);
  expect(f.errors).toEqual([]);
});

for (const native of [
  undefined,
  { isPureLidSyncDSession: () => true },
  { isLidMigrated: true, isPureLidSyncDSession: () => true },
]) {
  test(`an unavailable legacy getter stays explicit (${JSON.stringify(native)})`, () => {
    const f = fixture(native);
    expect(typeof f.functions.isLidMigrated).toBe('function');
    f.patch();
    expect(() => f.functions.isLidMigrated()).toThrow(/not available/i);
    try {
      f.functions.isLidMigrated();
    } catch (error) {
      expect(error).toMatchObject({ code: 'legacy_lid_migration_unavailable' });
    }
    expect(f.binding._moduleIdMap.get(f.functions.isLidMigrated)).toBe(
      'fallback_isLidMigrated'
    );
    expect(f.errors).toEqual([]);
    expect(f.state().isLidMigrated).toBe(false);
  });
}

test('a cached fallback recovers when the native capability registers later', () => {
  const f = fixture();
  const cached = f.functions.isLidMigrated;
  f.patch();
  expect(() => cached()).toThrow(/not available/i);
  f.modules.native = { Lid1X1MigrationUtils: { isLidMigrated: () => true } };
  expect(cached()).toBe(true);
  expect(f.state().isLidMigrated).toBe(true);
  expect(f.errors).toEqual([]);
});

test('repeated migration-state reads do not grow the loader predicate cache', () => {
  const f = fixture({
    isLidMigrated: () => true,
    isSyncdSessionMigrated: () => true,
    shouldApplyNonMigratedMessagingRules: () => false,
  });
  f.patch();
  f.state();
  const initial = f.searchConditions.size;
  for (let i = 0; i < 50; i++) {
    expect(f.state().isLidMigrated).toBe(true);
  }
  expect(f.searchConditions.size).toBe(initial);
});
