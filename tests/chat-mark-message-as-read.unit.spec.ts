/*!
 * Copyright 2025 WPPConnect Team
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

class FakeMsgModel {
  constructor(public id: any) {}
}

function markApi(unreadCount: number) {
  const chat = { id: 'chat', unreadCount };
  const calls: any[] = [];
  const exports: any = {};
  const context = createContext({
    exports,
    require(id: string) {
      if (id === '../../assert') return { assertGetChat: () => chat };
      if (id === '../../whatsapp') return { MsgModel: FakeMsgModel };
      if (id === '../../whatsapp/functions') {
        return {
          markChatRead: async (...args: any[]) => {
            calls.push(args);
          },
        };
      }
      if (id === './getMessageById') {
        return { getMessageById: async (id: string) => messages.get(id) };
      }
      throw new Error(`Unexpected dependency: ${id}`);
    },
  });
  const messages = new Map<string, FakeMsgModel>();
  runInContext(
    transpileModule(
      readFileSync(
        path.join(__dirname, '../src/chat/functions/markMessageAsRead.ts'),
        'utf8'
      ),
      { compilerOptions: { module: ModuleKind.CommonJS } }
    ).outputText,
    context
  );
  const addMessage = (idStr: string, fromMe = false) => {
    const msg = new FakeMsgModel({
      fromMe,
      remote: 'chat',
      toString: () => idStr,
    });
    messages.set(idStr, msg);
    return msg;
  };
  return {
    chat,
    calls,
    addMessage,
    markMessageAsRead: (id: string) =>
      Promise.resolve(exports.markMessageAsRead(id)),
  };
}

test('sends the native receipt only for the selected message', async () => {
  const api = markApi(3);
  const target = api.addMessage('false_chat_A');
  api.addMessage('false_chat_B');

  const result = await api.markMessageAsRead('false_chat_A');

  expect(api.calls).toEqual([[api.chat, target.id]]);
  expect(result.unreadCount).toBe(2);
  expect(api.chat.unreadCount).toBe(2);
});

test('does not decrement again when the same message is repeated', async () => {
  const api = markApi(3);
  api.addMessage('false_chat_A');

  await api.markMessageAsRead('false_chat_A');
  const second = await api.markMessageAsRead('false_chat_A');
  const third = await api.markMessageAsRead('false_chat_A');

  expect(api.calls).toHaveLength(1);
  expect(second.unreadCount).toBe(2);
  expect(third.unreadCount).toBe(2);
  expect(api.chat.unreadCount).toBe(2);
});

test('decrements once per distinct message', async () => {
  const api = markApi(3);
  api.addMessage('false_chat_A');
  api.addMessage('false_chat_B');

  await api.markMessageAsRead('false_chat_A');
  await api.markMessageAsRead('false_chat_B');

  expect(api.calls).toHaveLength(2);
  expect(api.chat.unreadCount).toBe(1);
});

test('ignores messages sent by me', async () => {
  const api = markApi(2);
  api.addMessage('true_chat_A', true);

  const result = await api.markMessageAsRead('true_chat_A');

  expect(api.calls).toHaveLength(0);
  expect(result.unreadCount).toBe(2);
});

test('never makes unreadCount negative for already read chats', async () => {
  const api = markApi(0);
  api.addMessage('false_chat_A');

  const result = await api.markMessageAsRead('false_chat_A');

  expect(result.unreadCount).toBe(0);
  expect(api.chat.unreadCount).toBe(0);
});
