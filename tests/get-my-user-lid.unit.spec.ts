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

const code = transpileModule(
  readFileSync(
    path.join(__dirname, '../src/conn/functions/getMyUserLid.ts'),
    'utf8'
  ),
  { compilerOptions: { module: ModuleKind.CommonJS } }
).outputText;

type Lid = { _serialized: string };
type UserPrefsStub = {
  getMeLidUserOrThrow?: () => Lid;
  getMaybeMeLidUser?: () => Lid | null | undefined;
};

function loadGetter(UserPrefs?: UserPrefsStub) {
  const exports = {} as { getMyUserLid: () => Lid };
  runInNewContext(code, {
    exports,
    require(id: string) {
      if (id === '../../whatsapp') return { UserPrefs };
      throw new Error(`Unexpected dependency: ${id}`);
    },
  });
  return exports.getMyUserLid;
}

const lid = { _serialized: '123@lid' };

test('uses the nullable LID getter when the native throwing getter is absent', () => {
  const userPrefs = Object.freeze({
    getMaybeMeLidUser() {
      expect(this).toBe(userPrefs);
      return lid;
    },
  });

  expect(loadGetter(userPrefs)()).toBe(lid);
});

test('prefers the native throwing getter when both getters exist', () => {
  const userPrefs = {
    getMeLidUserOrThrow: () => lid,
    getMaybeMeLidUser: () => {
      throw new Error('Fallback should not be called');
    },
  };

  expect(loadGetter(userPrefs)()).toBe(lid);
});

test('throws an explicit error when the account LID is unavailable', () => {
  for (const userPrefs of [
    undefined,
    {},
    { getMaybeMeLidUser: () => null },
    { getMaybeMeLidUser: () => undefined },
  ]) {
    expect(loadGetter(userPrefs)).toThrow('The account LID is unavailable');
  }
});
