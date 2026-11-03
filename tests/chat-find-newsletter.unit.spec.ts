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
  const calls: string[] = [];
  const nativeCalls: any[] = [];
  const newsletters = new Map<string, any>();
  const chats = new Map<string, any>();
  let nativeChatId: string | undefined;
  const wid = (id: string) => ({
    server: id.split('@')[1],
    toString: () => id,
    isGroup: () => id.endsWith('@g.us'),
  });
  const dependencies: Record<string, any> = {};
  function load(file: string) {
    const exports: any = {};
    runInNewContext(
      transpileModule(readFileSync(path.join(__dirname, '..', file), 'utf8'), {
        compilerOptions: { module: ModuleKind.CommonJS },
      }).outputText,
      {
        exports,
        require(id: string) {
          if (!(id in dependencies))
            throw new Error(`Unexpected dependency: ${id}`);
          return dependencies[id];
        },
      }
    );
    return exports;
  }
  const whatsapp = {
    ChatStore: {
      get: (id: any) => {
        calls.push('chat:get');
        return chats.get(id.toString());
      },
    },
    NewsletterStore: {
      get: (id: any) => {
        calls.push('newsletter:get');
        return newsletters.get(id.toString());
      },
    },
    GroupMetadataStore: {
      find: async () => {
        calls.push('group:find');
      },
    },
  };
  const assertWid = (id: any) => (typeof id === 'string' ? wid(id) : id);
  dependencies['../'] = { chat: {} };
  dependencies['../util'] = {
    WPPError: class extends Error {
      constructor(
        public code: string,
        message: string
      ) {
        super(message);
      }
    },
  };
  dependencies['../whatsapp'] = whatsapp;
  const asserts = load('src/assert/assertChat.ts');
  dependencies['../../assert'] = { ...asserts, assertWid };
  dependencies['../../whatsapp'] = whatsapp;
  dependencies['../../whatsapp/functions'] = {
    findOrCreateLatestChat: async (id: any, origin: string) => {
      nativeCalls.push([id.toString(), origin]);
      calls.push('native:find');
      return { chat: { id: nativeChatId }, created: true };
    },
  };
  const api = load('src/chat/functions/find.ts');
  dependencies['../'].chat.find = api.find;
  return {
    ...api,
    calls,
    nativeCalls,
    newsletters,
    chats,
    wid,
    assertFindChat: asserts.assertFindChat,
    nativeId: (id: string) => {
      nativeChatId = id;
    },
  };
}

test('find and assertFindChat resolve the original newsletter model outside ChatStore', async () => {
  const api = fixture();
  const id = '123@newsletter';
  const model = {
    id: api.wid(id),
    isNewsletter: true,
    newsletterMetadata: { role: 'owner' },
  };
  api.newsletters.set(id, model);
  api.nativeId(id);
  expect(await api.find(id)).toBe(model);
  expect(await api.assertFindChat(api.wid(id))).toBe(model);
  expect(api.calls).toEqual(['newsletter:get', 'newsletter:get']);
  expect(api.chats.size).toBe(0);
});

test('missing newsletter is rejected without creating a regular chat', async () => {
  const api = fixture();
  const error = await api.find('123@newsletter').then(
    () => null,
    (e: any) => e
  );
  expect(error?.code).toBe('chat_not_found');
  expect(api.calls).toEqual(['newsletter:get']);
});

test('regular and LID contacts still use the native returned chat ID and origin', async () => {
  const api = fixture();
  const model = { id: api.wid('456@lid') };
  api.chats.set('456@lid', model);
  api.nativeId('456@lid');
  expect(await api.find('123@c.us', 'username_contactless_search')).toBe(model);
  expect(api.calls).toEqual(['native:find', 'chat:get']);
  expect(api.nativeCalls).toEqual([
    ['123@c.us', 'username_contactless_search'],
  ]);
});

test('groups still load their metadata after native chat resolution', async () => {
  const api = fixture();
  const model = { id: api.wid('456@g.us') };
  api.chats.set('456@g.us', model);
  api.nativeId('456@g.us');
  expect(await api.find(model.id)).toBe(model);
  expect(api.calls).toEqual(['native:find', 'chat:get', 'group:find']);
});

test('missing ordinary chat keeps its existing error', async () => {
  const api = fixture();
  api.nativeId('456@lid');
  const error = await api.find('123@c.us').then(
    () => null,
    (e: any) => e
  );
  expect(error?.message).toBe('Chat not found in ChatStore for 123@c.us');
});
