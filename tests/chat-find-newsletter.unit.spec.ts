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
  const lids = new Map<string, any>();
  const answers = new Map<string, any>();
  const queries: string[] = [];
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
    lidPnCache: {
      getCurrentLid: (id: any) => lids.get(id.toString()),
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
  dependencies['../../contact/functions/queryWidExists'] = {
    queryWidExists: async (id: any) => {
      queries.push(id.toString());
      return answers.get(id.toString()) ?? null;
    },
  };
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
    lids,
    answers,
    queries,
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
  expect(api.queries).toEqual([]);
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

test('a phone number without a cached LID opens the chat on the LID the server resolves', async () => {
  const api = fixture();
  const lid = api.wid('100000000000001@lid');
  const model = { id: lid };
  api.chats.set(lid.toString(), model);
  api.nativeId(lid.toString());
  api.answers.set('5531999998888@c.us', { wid: lid, lid });
  expect(await api.find('5531999998888@c.us')).toBe(model);
  expect(api.queries).toEqual(['5531999998888@c.us']);
  expect(api.nativeCalls).toEqual([[lid.toString(), 'createChat']]);
});

test('a phone number with a cached LID is left to WhatsApp without a server query', async () => {
  const api = fixture();
  const lid = api.wid('100000000000001@lid');
  api.lids.set('553199998888@c.us', lid);
  api.chats.set(lid.toString(), { id: lid });
  api.nativeId(lid.toString());
  await api.find('553199998888@c.us');
  expect(api.queries).toEqual([]);
  expect(api.nativeCalls).toEqual([['553199998888@c.us', 'createChat']]);
});

test('a number the server does not know keeps the phone number', async () => {
  const api = fixture();
  api.chats.set('123@c.us', { id: api.wid('123@c.us') });
  api.nativeId('123@c.us');
  await api.find('123@c.us');
  expect(api.queries).toEqual(['123@c.us']);
  expect(api.nativeCalls).toEqual([['123@c.us', 'createChat']]);
});

test('LID ids never query the server', async () => {
  const api = fixture();
  api.chats.set('456@lid', { id: api.wid('456@lid') });
  api.nativeId('456@lid');
  await api.find('456@lid');
  expect(api.queries).toEqual([]);
});
