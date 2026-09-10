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
import { createContext, runInContext } from 'vm';

import { WPPError } from '../src/util/errors';

function descriptionApi(
  native: (...args: any[]) => Promise<void>,
  previousId: string | null = 'previous',
  allowed = true
) {
  const group = {
    id: {
      _serialized: '123@g.us',
      toString: () => '123@g.us',
      toJid: () => '123@g.us',
    },
    groupMetadata: {
      canSetDescription: () => allowed,
      desc: 'old description',
      descId: previousId ?? undefined,
    },
  };
  const exports: any = {};
  const context = createContext({
    exports,
    require(id: string) {
      if (id === '../../util') return { WPPError };
      if (id === '../../whatsapp/functions') {
        return {
          randomMessageId: async () => 'new-id',
          sendSetGroupDescription: native,
        };
      }
      if (id === './') return { ensureGroup: async () => group };
      throw new Error(`Unexpected dependency: ${id}`);
    },
  });
  runInContext(
    transpileModule(
      readFileSync(
        path.join(__dirname, '../src/group/functions/setDescription.ts'),
        'utf8'
      ),
      { compilerOptions: { module: ModuleKind.CommonJS } }
    ).outputText,
    context
  );
  return {
    setDescription: (groupId: string, description: string) =>
      Promise.resolve(exports.setDescription(groupId, description)),
    group,
  };
}

test('passes the group and description IDs in named options', async () => {
  const calls: any[] = [];
  const api = descriptionApi(async (options: any) => {
    // Current native implementation calls widToGroupJid(options.groupWid).
    expect(options.groupWid.toJid()).toBe('123@g.us');
    calls.push(options);
  });
  expect(await api.setDescription('123@g.us', 'new description')).toBe(true);
  expect(calls).toEqual([
    {
      groupWid: api.group.id,
      desc: 'new description',
      newDescId: 'new-id',
      prevDescId: 'previous',
    },
  ]);
  expect(api.group.groupMetadata).toMatchObject({
    desc: 'new description',
    descId: 'new-id',
  });
});

test('clears the native description and allows a missing previous ID', async () => {
  const calls: any[] = [];
  const api = descriptionApi(async (options: any) => {
    calls.push(options);
  }, null);
  await api.setDescription('123@g.us', '');
  expect(calls[0]).toEqual({
    groupWid: api.group.id,
    desc: null,
    newDescId: 'new-id',
    prevDescId: undefined,
  });
  expect(api.group.groupMetadata.desc).toBe('');
});

test('preserves the legacy positional call', async () => {
  const calls: any[] = [];
  const api = descriptionApi(async (group, desc, id, previous) => {
    calls.push([group, desc, id, previous]);
  });
  await api.setDescription('123@g.us', 'description');
  expect(calls).toEqual([[api.group.id, 'description', 'new-id', 'previous']]);
});

test('does not update metadata or retry after native failure', async () => {
  let calls = 0;
  const error = new Error('server rejected description');
  const api = descriptionApi(async (_options) => {
    calls += 1;
    throw error;
  });
  await expect(api.setDescription('123@g.us', 'new')).rejects.toBe(error);
  expect(calls).toBe(1);
  expect(api.group.groupMetadata).toMatchObject({
    desc: 'old description',
    descId: 'previous',
  });
});

test('preserves the permission error before calling the native function', async () => {
  let calls = 0;
  const api = descriptionApi(
    async (_options) => {
      calls += 1;
    },
    'previous',
    false
  );
  await expect(api.setDescription('123@g.us', 'new')).rejects.toMatchObject({
    code: 'you_are_not_allowed_set_group_description',
  });
  expect(calls).toBe(0);
});
