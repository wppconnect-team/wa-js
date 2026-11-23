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

const WITH_NINE = '5531999998888@c.us';
const ACCOUNT = '553199998888@c.us';
const LID = '100000000000001@lid';

function fixture() {
  const lids = new Map<string, any>();
  const contacts = new Map<string, any>();
  const answers = new Map<string, any>();
  const queries: string[] = [];
  const wid = (id: string) => ({
    server: id.split('@')[1],
    user: id.split('@')[0],
    toString: () => id,
    isLid: () => id.endsWith('@lid'),
  });
  const currentLid = (id: any) => lids.get(id.toString());
  const dependencies: Record<string, any> = {
    debug: { __esModule: true, default: () => () => undefined },
    '../../assert': {
      assertWid: (id: any) => (typeof id === 'string' ? wid(id) : id),
    },
    '../../whatsapp': {
      ApiContact: { getCurrentLid: currentLid },
      ContactStore: { get: (id: any) => contacts.get(id.toString()) },
      lidPnCache: {
        getCurrentLid: currentLid,
        getPhoneNumber: () => undefined,
      },
    },
    '../../whatsapp/functions/sendQueryExists': {
      queryWidExists: async (id: any) => {
        queries.push(id.toString());
        return answers.get(id.toString()) ?? null;
      },
    },
  };
  const file = path.join(
    __dirname,
    '..',
    'src/contact/functions/queryWidExists.ts'
  );
  const exports: any = {};
  runInNewContext(
    transpileModule(readFileSync(file, 'utf8'), {
      compilerOptions: { module: ModuleKind.CommonJS },
    }).outputText,
    {
      exports,
      setTimeout: () => 0,
      require(id: string) {
        if (!(id in dependencies))
          throw new Error(`Unexpected dependency: ${id}`);
        return dependencies[id];
      },
    }
  );
  return { ...exports, lids, contacts, answers, queries, wid };
}

test('the LID the server answers with is kept for a number with an extra 9', async () => {
  const api = fixture();
  api.answers.set(WITH_NINE, { wid: api.wid(LID), biz: false });
  const result = await api.queryWidExists(WITH_NINE);
  expect(result?.lid?.toString()).toBe(LID);
  expect(api.queries).toEqual([WITH_NINE]);
});

test('a stored phone number without a known LID still asks the server', async () => {
  const api = fixture();
  api.contacts.set(WITH_NINE, { isBusiness: false });
  api.answers.set(WITH_NINE, { wid: api.wid(LID), biz: false });
  const result = await api.queryWidExists(WITH_NINE);
  expect(result?.lid?.toString()).toBe(LID);
  expect(api.queries).toEqual([WITH_NINE]);
});

test('a stored phone number with a known LID is answered locally', async () => {
  const api = fixture();
  api.lids.set(ACCOUNT, api.wid(LID));
  api.contacts.set(ACCOUNT, { isBusiness: false });
  const result = await api.queryWidExists(ACCOUNT);
  expect(result?.wid.toString()).toBe(ACCOUNT);
  expect(result?.lid?.toString()).toBe(LID);
  expect(api.queries).toEqual([]);
});

test('the LID mapped to the phone number the server answers with is used', async () => {
  const api = fixture();
  api.lids.set(ACCOUNT, api.wid(LID));
  api.answers.set(WITH_NINE, { wid: api.wid(ACCOUNT), biz: false });
  const result = await api.queryWidExists(WITH_NINE);
  expect(result?.wid.toString()).toBe(ACCOUNT);
  expect(result?.lid?.toString()).toBe(LID);
});

test('a number the server does not know returns null', async () => {
  const api = fixture();
  expect(await api.queryWidExists(WITH_NINE)).toBeNull();
});
