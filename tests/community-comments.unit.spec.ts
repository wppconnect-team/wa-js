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
import { ModuleKind, ScriptTarget, transpileModule } from 'typescript';
import { createContext, runInContext } from 'vm';

import { WPPError } from '../src/util/errors';

function load(file: string, dependencies: Record<string, unknown>) {
  const exports: any = {};
  runInContext(
    transpileModule(
      readFileSync(path.join(__dirname, '../src/', file), 'utf8'),
      {
        compilerOptions: {
          module: ModuleKind.CommonJS,
          target: ScriptTarget.ES2020,
        },
      }
    ).outputText,
    createContext({
      exports,
      require: (id: string) => {
        if (!(id in dependencies))
          throw new Error(`Unexpected dependency: ${id}`);
        return dependencies[id];
      },
    })
  );
  for (const [name, fn] of Object.entries(exports)) {
    if (typeof fn === 'function' && fn.constructor.name === 'AsyncFunction') {
      exports[name] = (...args: unknown[]) => Promise.resolve(fn(...args));
    }
  }
  return exports;
}

const key = (id: string) => ({
  toString: () => id,
  remote: { toString: () => '123@g.us' },
});
const parent = { id: key('parent') };
const record = (id: string, t: number, type = 'comment') => ({
  id: key(id),
  parentMsgKey: key('parent'),
  author: key('author'),
  body: 'text',
  t,
  type,
  ack: 1,
  read: false,
  messageSecret: 'secret',
});
function commentHelpers(group = true, contact: any = undefined) {
  return load('chat/comments.ts', {
    '../assert': {
      assertGetChat: () => ({ groupMetadata: { defaultSubgroup: group } }),
    },
    '../util': { WPPError },
    '../whatsapp': { ContactStore: { get: () => contact } },
    './functions/getMessageById': { getMessageById: async () => parent },
  });
}

test('reads chronological comments with safe fields and no read-state mutation', async () => {
  const helpers = commentHelpers();
  const rows = [
    record('b', 2),
    record('revoked', 1, 'revoked'),
    record('a', 2),
    record('cipher', 3, 'ciphertext'),
  ];
  const calls: unknown[] = [];
  const api = load('chat/functions/getComments.ts', {
    '../../util': { WPPError },
    '../../whatsapp/functions/getCommentsByParentMsgKey': {
      getCommentsByParentMsgKey: async (keys: unknown) => {
        calls.push(keys);
        return rows;
      },
    },
    '../comments': helpers,
    '../events/registerCommentEvent': { registerCommentEvents() {} },
  });
  const result = await api.getComments('parent');
  expect(result.map((r: any) => r.id)).toEqual(['revoked', 'a', 'b', 'cipher']);
  expect(result[1]).toMatchObject({
    parentMsgId: 'parent',
    chatId: '123@g.us',
    author: 'author',
    body: 'text',
  });
  expect(result[0].body).toBeUndefined();
  expect(result[3].body).toBeUndefined();
  expect(result.every((r: any) => !('messageSecret' in r))).toBe(true);
  expect(rows.every((r) => !r.read)).toBe(true);
  expect(calls).toEqual([[parent.id]]);
});

test('reports unavailable comment storage instead of an empty success', async () => {
  const api = load('chat/functions/getComments.ts', {
    '../../util': { WPPError },
    '../../whatsapp/functions/getCommentsByParentMsgKey': {},
    '../comments': commentHelpers(),
    '../events/registerCommentEvent': { registerCommentEvents() {} },
  });
  await expect(api.getComments('parent')).rejects.toMatchObject({
    code: 'comments_not_available',
  });
});

test('rejects ordinary groups and missing parent IDs', async () => {
  await expect(
    commentHelpers(false).getCommentParent('parent')
  ).rejects.toMatchObject({ code: 'not_community_announcement' });
  await expect(commentHelpers().getCommentParent(null)).rejects.toMatchObject({
    code: 'invalid_message_id',
  });
});

function sender(native: unknown) {
  const calls: unknown[] = [];
  const nativeModule: any = {};
  const api = load('chat/functions/sendCommentMessage.ts', {
    '../../loader': {
      ensureLazyModule: async (name: string) => {
        calls.push(name);
        nativeModule.sendCommentMessage = native;
      },
    },
    '../../util': { WPPError },
    '../../whatsapp/functions/sendCommentMessage': nativeModule,
    '../comments': commentHelpers(),
    '../events/registerCommentEvent': { registerCommentEvents() {} },
  });
  return { ...api, calls };
}

test('loads the sender before resolution and preserves the exact text and result', async () => {
  const calls: unknown[] = [];
  const result = { messageSendResult: 'OK', t: 42 };
  const api = sender(async (...args: unknown[]) => {
    calls.push(args);
    return result;
  });
  expect(await api.sendCommentMessage('parent', ' hello ')).toBe(result);
  expect(api.calls).toEqual(['WAWebSendCommentMessageAction']);
  expect(calls).toEqual([[parent, ' hello ']]);
});

test('never retries a native send exception or converts a failed verdict to success', async () => {
  let calls = 0;
  const error = new Error('lost response');
  const api = sender(async () => {
    calls++;
    throw error;
  });
  await expect(api.sendCommentMessage('parent', 'text')).rejects.toBe(error);
  expect(calls).toBe(1);
  const failed = { messageSendResult: 'ERROR_UNKNOWN' };
  expect(
    await sender(async () => failed).sendCommentMessage('parent', 'text')
  ).toBe(failed);
});

test('invalid text and missing capability never reach the native sender', async () => {
  const api = sender(undefined);
  for (const text of ['', '  ', null, 123]) {
    await expect(api.sendCommentMessage('parent', text)).rejects.toMatchObject({
      code: 'invalid_comment_text',
    });
  }
  expect(api.calls).toEqual([]);
  await expect(api.sendCommentMessage('parent', 'text')).rejects.toMatchObject({
    code: 'comments_not_available',
  });
});

test('comment events register once and retain changes, revocations and removals', async () => {
  const listeners = new Map<string, (m: any) => void>();
  const emitted: unknown[] = [];
  let ready: () => void = () => {};
  let available = false;
  const api = load('chat/events/registerCommentEvent.ts', {
    '../../eventEmitter': {
      internalEv: {
        emitAsync: async (...args: unknown[]) => {
          emitted.push(args);
        },
      },
    },
    '../../loader': {
      onFullReady: (cb: () => void) => {
        ready = cb;
      },
      search: () => available,
    },
    '../../whatsapp/stores': {
      CommentStore: {
        on: (name: string, cb: (m: any) => void) => {
          expect(listeners.has(name)).toBe(false);
          listeners.set(name, cb);
        },
      },
    },
    '../comments': commentHelpers(),
  });
  ready();
  expect(listeners.size).toBe(0);
  available = true;
  api.registerCommentEvents();
  ready();
  expect(listeners.size).toBe(3);
  listeners.get('add')!(record('new', 1));
  listeners.get('change')!(record('new', 2, 'revoked'));
  listeners.get('remove')!(record('new', 2, 'revoked'));
  listeners.get('add')!({});
  expect(emitted).toMatchObject([
    ['chat.comment', { action: 'add', comment: { id: 'new', body: 'text' } }],
    [
      'chat.comment',
      { action: 'update', comment: { type: 'revoked', body: undefined } },
    ],
    ['chat.comment', { action: 'remove', comment: { id: 'new' } }],
  ]);
});

test('comment authors retain profile names and own identity without exposing the contact', () => {
  const data = commentHelpers(true, {
    pushname: 'Profile name',
    isMe: true,
    privateField: 'secret',
  }).serializeComment(record('own', 1));
  expect(data.authorName).toBe('Profile name');
  expect(data.fromMe).toBe(true);
  expect(data.privateField).toBeUndefined();
  expect(
    commentHelpers(true, {
      name: 'Saved contact',
      pushname: 'Profile name',
    }).serializeComment(record('other', 1)).authorName
  ).toBe('Saved contact');
});
