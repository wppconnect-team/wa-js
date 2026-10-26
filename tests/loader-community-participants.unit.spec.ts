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

import {
  LAZY_MODULES,
  MAX_DISCOVERED_COMPONENTS,
} from '../src/loader/lazyModules';

const JOB = 'WAWebGroupGetCommunityParticipantsJob';
const ACTION = 'WAWebQueryAndUpdateCommunityParticipantsAction';
const MODAL = 'WAWebViewCommunityMembersModal.react';

function fixture(modern: boolean) {
  const modules: Record<string, any> = {};
  const registrations: Record<string, any> = {};
  const calls: string[] = [];
  let participantQueries = 0;
  const native = () => {
    participantQueries++;
  };
  const bootloader = {
    __debug: {
      componentMap: new Map(
        (modern ? [ACTION, MODAL] : [MODAL]).map((name) => [name, {}])
      ),
    },
    loadModules(components: string[], callback: () => void) {
      calls.push(components[0]);
      // In the current graph the modal no longer contains the job.
      if (components[0] === (modern ? ACTION : MODAL)) {
        registrations[JOB] = () => {};
        modules[JOB] = { getCommunityParticipants: native };
      }
      callback();
    },
  };
  const loader: any = {};
  runInNewContext(
    transpileModule(
      readFileSync(path.join(__dirname, '../src/loader/index.ts'), 'utf8'),
      { compilerOptions: { module: ModuleKind.CommonJS } }
    ).outputText,
    {
      exports: loader,
      self: { require: () => null },
      window: {},
      setTimeout: () => 0,
      clearTimeout: () => {},
      require(id: string) {
        if (id === 'debug') return () => () => {};
        if (id === '../eventEmitter')
          return { internalEv: { waitFor: () => new Promise(() => {}) } };
        if (id === './blacklist')
          return { isMetaModuleBlacklisted: () => false };
        if (id === './lazyModules')
          return { LAZY_MODULES, MAX_DISCOVERED_COMPONENTS };
        throw new Error(`Unexpected dependency ${id}`);
      },
    }
  );
  loader.loaderType = 'meta';
  loader.moduleRequire = Object.assign(
    (id: string) => (id === 'Bootloader' ? bootloader : modules[id] || null),
    { m: registrations }
  );
  return {
    loader,
    calls,
    modules,
    registrations,
    native,
    participantQueries: () => participantQueries,
  };
}

test('loads the participant job from the current action bundle without querying', async () => {
  const f = fixture(true);
  expect(await f.loader.ensureLazyModule(JOB)).toBe(true);
  expect(f.calls).toEqual([ACTION]);
  expect(f.loader.loadModule(JOB).getCommunityParticipants).toBe(f.native);
  expect(f.participantQueries()).toBe(0);
});

test('keeps the member-modal fallback for older component maps', async () => {
  const f = fixture(false);
  expect(await f.loader.ensureLazyModule(JOB)).toBe(true);
  expect(f.calls).toEqual([MODAL]);
  expect(f.participantQueries()).toBe(0);
});

test('does not bootload a bundle when the participant job is already available', async () => {
  const f = fixture(true);
  f.registrations[JOB] = () => {};
  f.modules[JOB] = { getCommunityParticipants: f.native };
  expect(await f.loader.ensureLazyModule(JOB)).toBe(true);
  expect(f.calls).toEqual([]);
  expect(f.participantQueries()).toBe(0);
});
