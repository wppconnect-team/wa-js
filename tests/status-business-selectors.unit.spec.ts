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

function bindings(file: string) {
  const bindings: Array<{
    names: Record<string, unknown>;
    condition: (m: any, id: string) => boolean;
  }> = [];
  runInNewContext(
    transpileModule(
      readFileSync(
        path.join(__dirname, '../src/whatsapp/functions', file + '.ts'),
        'utf8'
      ),
      { compilerOptions: { module: ModuleKind.CommonJS } }
    ).outputText,
    {
      exports: {},
      require: (id: string) => {
        if (id === '../exportModule')
          return {
            exportModule: (_target: any, names: any, condition: any) =>
              bindings.push({ names, condition }),
          };
        return {};
      },
    }
  );
  return bindings;
}

test('About jobs do not depend on the unrelated story query on the identified native bridge', () => {
  const binding = bindings('status')[0];
  const jobs = { getStatus: () => {}, setMyStatus: () => {} };
  expect(binding.condition(jobs, 'WAWebContactStatusBridge')).toBe(true);
  expect(binding.condition({ default: jobs }, 'WAWebContactStatusBridge')).toBe(
    true
  );
  expect(binding.condition(jobs, 'UnrelatedUI')).toBe(false);
});

test('legacy numbered About jobs retain their native finder contract', () => {
  const binding = bindings('status')[0];
  expect(
    binding.condition(
      { getStatus: () => {}, setMyStatus: () => {}, queryStatusAll: () => {} },
      '48826'
    )
  ).toBe(true);
});

test('moved status contacts prefer the known native owners over unrelated similarly named UI exports', () => {
  const binding = bindings('getStatusList').find(
    (x) => 'getStatusContacts' in x.names
  )!;
  const contacts = { getStatusContacts: () => {} };
  expect(binding.condition(contacts, 'WAWebStatusContactUtils')).toBe(true);
  expect(
    binding.condition({ default: contacts }, 'WAWebStatusContactUtils')
  ).toBe(true);
  expect(binding.condition(contacts, 'UnrelatedUI')).toBe(false);
  expect(
    binding.condition({ ...contacts, getStatusList: () => {} }, '123')
  ).toBe(true);
});

for (const file of ['editBusinessProfile', 'updateCartEnabled']) {
  test(`${file} resolves the native job rather than a similarly named action`, () => {
    const binding = bindings(file)[0];
    const job = { editBusinessProfile: () => {}, updateCartEnabled: () => {} };
    expect(binding.condition(job, 'WAWebBusinessProfileJob')).toBe(true);
    expect(binding.condition({ default: job }, 'WAWebBusinessProfileJob')).toBe(
      true
    );
    expect(
      binding.condition(
        { editBusinessProfile: () => {} },
        'WAWebBusinessProfileEdit'
      )
    ).toBe(false);
    expect(
      binding.condition(
        { updateCartEnabled: () => {} },
        'WAWebBizUpdateCartEnabledAction'
      )
    ).toBe(false);
    expect(
      binding.condition(
        { editBusinessProfile: true, updateCartEnabled: true },
        'Invalid'
      )
    ).toBe(false);
  });
}

test('modern text-status bridge and updater default exports remain resolvable', () => {
  const all = bindings('textStatus');
  const bridge = all.find((x) => 'getTextStatus' in x.names)!;
  const updater = all.find((x) => 'updateTextStatusForContact' in x.names)!;
  expect(
    bridge.condition(
      { default: { getTextStatus: () => {}, setTextStatus: () => {} } },
      'WAWebContactTextStatusBridge'
    )
  ).toBe(true);
  expect(
    updater.condition(
      { default: { updateTextStatusForContact: () => {} } },
      'WAWebUpdateTextStatusForContact'
    )
  ).toBe(true);
  expect(bridge.names.getTextStatus).toEqual([
    'getTextStatus',
    'default.getTextStatus',
  ]);
  expect(bridge.names.setTextStatus).toEqual([
    'setTextStatus',
    'default.setTextStatus',
  ]);
  expect(updater.names.updateTextStatusForContact).toEqual([
    'updateTextStatusForContact',
    'default.updateTextStatusForContact',
  ]);
});
