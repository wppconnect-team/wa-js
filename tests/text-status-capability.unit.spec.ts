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

function fixture() {
  const modules: Record<string, any> = {};
  const forbidden = () => {
    throw new Error('A capability check must not invoke an account operation');
  };
  const legacy: Record<string, any> = {
    oldStore: {
      TextStatusCollection: { find: forbidden },
      TextStatusCollectionImpl: class {},
    },
    oldModel: { default: class {} },
    oldJobs: {
      getStatus: forbidden,
      setMyStatus: forbidden,
      queryStatusAll: forbidden,
    },
  };
  legacy.oldModel.default.prototype.__props = ['status'];
  const modern: Record<string, any> = {
    WAWebContactTextStatusBridge: {
      getTextStatus: forbidden,
      setTextStatus: forbidden,
    },
    WAWebUpdateTextStatusForContact: { updateTextStatusForContact: forbidden },
    WATimeUtils: { unixTime: forbidden },
    WAWebTextStatusUtils: {
      TEXT_STATUS_DURATION_INFINITE: -1,
      CLEAR_TEXT_STATUS_LAST_UPDATE_TIME_VAL: 0,
      CLEAR_TEXT_STATUS_STRING_VAL: null,
      CLEAR_TEXT_STATUS_EMOJI_VAL: null,
      CLEAR_TEXT_STATUS_EPHEMERAL_DURATION_VAL: null,
      TEXT_STATUS_NOT_AUTHORIZED: -3,
    },
  };
  const exports: any = {};
  runInNewContext(
    transpileModule(
      readFileSync(
        path.join(__dirname, '../src/tools/textStatusCompatibility.ts'),
        'utf8'
      ),
      {
        compilerOptions: { module: ModuleKind.CommonJS },
      }
    ).outputText,
    {
      exports,
      window: {
        WPP: {
          loader: {
            loadModule: (id: string) => modules[id] || null,
            search: (predicate: (m: any, id: string) => boolean) =>
              Object.entries(modules).find(([id, value]) =>
                predicate(value, id)
              )?.[1] || null,
          },
        },
      },
    }
  );
  return {
    modules,
    legacy,
    modern,
    inspect: () => exports.inspectTextStatusCompatibility(),
  };
}

test('neither stack does not exempt any missing About export', () => {
  const f = fixture();
  expect(f.inspect()).toEqual({
    legacy: false,
    modern: false,
    optionalBindings: [],
  });
});
test('only complete legacy permits missing newly introduced bindings', () => {
  const f = fixture();
  Object.assign(f.modules, f.legacy);
  expect(f.inspect()).toEqual({
    legacy: true,
    modern: false,
    optionalBindings: [
      'functions.getTextStatus',
      'functions.setTextStatus',
      'functions.updateTextStatusForContact',
    ],
  });
});
test('only complete modern permits missing removed legacy bindings', () => {
  const f = fixture();
  Object.assign(f.modules, f.modern);
  expect(f.inspect()).toEqual({
    legacy: false,
    modern: true,
    optionalBindings: [
      'StatusCollection',
      'StatusModel',
      'StatusStore',
      'functions.getStatus',
      'functions.setMyStatus',
    ],
  });
});
test('coexisting complete stacks require all their bindings', () => {
  const f = fixture();
  Object.assign(f.modules, f.legacy, f.modern);
  expect(f.inspect()).toEqual({
    legacy: true,
    modern: true,
    optionalBindings: [],
  });
});
for (const name of ['oldStore', 'oldModel', 'oldJobs']) {
  test(`partial legacy without ${name} does not turn failures into optional exports`, () => {
    const f = fixture();
    Object.assign(f.modules, f.legacy);
    delete f.modules[name];
    expect(f.inspect()).toEqual({
      legacy: false,
      modern: false,
      optionalBindings: [],
    });
  });
}
for (const name of [
  'WAWebContactTextStatusBridge',
  'WAWebUpdateTextStatusForContact',
  'WAWebTextStatusUtils',
  'WATimeUtils',
]) {
  test(`partial modern without ${name} does not exempt legacy failures`, () => {
    const f = fixture();
    Object.assign(f.modules, f.modern);
    delete f.modules[name];
    expect(f.inspect()).toEqual({
      legacy: false,
      modern: false,
      optionalBindings: [],
    });
  });
}
test('a present but unusable modern function does not establish compatibility', () => {
  const f = fixture();
  Object.assign(f.modules, f.modern);
  f.modern.WAWebContactTextStatusBridge.setTextStatus = true;
  expect(f.inspect()).toEqual({
    legacy: false,
    modern: false,
    optionalBindings: [],
  });
});
test('incompatible duration and clear constants do not establish compatibility', () => {
  const f = fixture();
  Object.assign(f.modules, f.modern);
  f.modern.WAWebTextStatusUtils.CLEAR_TEXT_STATUS_LAST_UPDATE_TIME_VAL = -1;
  expect(f.inspect()).toEqual({
    legacy: false,
    modern: false,
    optionalBindings: [],
  });
});
test('namespace and default export shapes establish the same modern capability', () => {
  const f = fixture();
  for (const [id, value] of Object.entries(f.modern))
    f.modules[id] = { default: value };
  expect(f.inspect().modern).toBe(true);
});
