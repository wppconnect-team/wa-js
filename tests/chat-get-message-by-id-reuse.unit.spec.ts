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

function messageApi() {
  const stored = new Map<string, any>();
  const chatMessages = new Map<string, any>();
  const constructed: any[] = [];
  class MsgModel {
    id: string;
    attributes: any;
    constructor(value: any) {
      this.id = value.id;
      this.attributes = { ...value };
      constructed.push(this);
    }
  }
  class WPPError extends Error {
    constructor(
      public code: string,
      message: string
    ) {
      super(message);
    }
  }
  const exports: any = {};
  runInNewContext(
    transpileModule(
      readFileSync(
        path.join(__dirname, '../src/chat/functions/getMessageById.ts'),
        'utf8'
      ),
      {
        compilerOptions: { module: ModuleKind.CommonJS, esModuleInterop: true },
      }
    ).outputText,
    {
      exports,
      require(id: string) {
        if (id === 'debug') return () => () => undefined;
        if (id === '../../assert')
          return {
            assertGetChat: () => ({
              msgs: { get: (key: any) => chatMessages.get(String(key)) },
            }),
          };
        if (id === '../../util') return { WPPError };
        if (id === '../../whatsapp')
          return {
            MsgModel,
            MsgKey: {
              fromString: (value: string) => ({
                remote: { isStatusV3: () => false },
                toString: () => value,
              }),
            },
            MsgStore: { get: (key: any) => stored.get(String(key)) },
          };
        if (id === '../../whatsapp/functions/callGetSearchContext')
          return {
            callGetSearchContext: () => ({
              collection: {
                loadAroundPromise: Promise.resolve(),
                get: () => undefined,
              },
            }),
          };
        throw new Error(`Unexpected dependency ${id}`);
      },
    }
  );
  return {
    getMessageById: exports.getMessageById,
    stored,
    chatMessages,
    constructed,
    MsgModel,
  };
}

test('reuses a canonical stored model when a chat lookup returns raw attributes', async () => {
  const api = messageApi();
  const model = new api.MsgModel({ id: 'canonical-id', isNewMsg: false });
  api.stored.set(model.id, model);
  api.chatMessages.set('requested-id', { id: model.id, isNewMsg: true });
  for (let i = 0; i < 20; i++) {
    expect(await api.getMessageById('requested-id')).toBe(model);
  }
  expect(api.constructed).toHaveLength(1);
  expect(model.attributes.isNewMsg).toBe(false);
});

test('keeps an existing model returned directly by the store', async () => {
  const api = messageApi();
  const model = new api.MsgModel({ id: 'message' });
  api.stored.set(model.id, model);
  expect(await api.getMessageById('message')).toBe(model);
  expect(api.constructed).toHaveLength(1);
});

test('preserves array order and constructs only an actual store miss', async () => {
  const api = messageApi();
  const model = new api.MsgModel({ id: 'stored' });
  api.stored.set(model.id, model);
  api.chatMessages.set('missing', { id: 'missing' });
  const result = await api.getMessageById(['missing', 'stored']);
  expect(result[0]).toBeInstanceOf(api.MsgModel);
  expect(result[0].id).toBe('missing');
  expect(result[1]).toBe(model);
  expect(api.constructed).toHaveLength(2);
});

test('retains the not-found error instead of constructing an empty model', async () => {
  const api = messageApi();
  const result = await api
    .getMessageById('absent')
    .catch((error: any) => error);
  expect(result.code).toBe('msg_not_found');
  expect(api.constructed).toHaveLength(0);
});
