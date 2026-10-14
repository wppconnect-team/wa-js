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
  read = false;

  constructor(
    public id: any,
    public t: number
  ) {}
}

interface ApiOptions {
  /**
   * The native markChatRead sends the read receipt "up to" the given message.
   * It may refresh the chat counter or leave it stale.
   */
  updatesCounter?: boolean;
  delay?: number;
  fail?: () => boolean;
}

function markApi(options: ApiOptions = {}) {
  const messages = new Map<string, FakeMsgModel>();
  const chat: any = {
    id: 'chat',
    unreadCount: 0,
    msgs: { getModelsArray: () => Array.from(messages.values()) },
  };
  const calls: string[] = [];
  const exports: any = {};

  const recount = () =>
    Array.from(messages.values()).filter((m) => !m.id.fromMe && !m.read).length;

  const context = createContext({
    exports,
    require(id: string) {
      if (id === '../../assert') return { assertGetChat: () => chat };
      if (id === '../../whatsapp') return { MsgModel: FakeMsgModel };
      if (id === '../../whatsapp/functions') {
        return {
          markChatRead: async (_chat: any, key: any) => {
            calls.push(key.toString());
            if (options.delay) {
              await new Promise((resolve) =>
                setTimeout(resolve, options.delay)
              );
            }
            if (options.fail?.()) throw new Error('native failure');
            const target = messages.get(key.toString())!;
            for (const msg of messages.values()) {
              if (!msg.id.fromMe && msg.t <= target.t) msg.read = true;
            }
            if (options.updatesCounter) chat.unreadCount = recount();
          },
        };
      }
      if (id === './getMessageById') {
        return { getMessageById: async (id: string) => messages.get(id) };
      }
      throw new Error(`Unexpected dependency: ${id}`);
    },
  });
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

  const addMessage = (idStr: string, t: number, fromMe = false) => {
    const msg = new FakeMsgModel(
      { fromMe, remote: 'chat', toString: () => idStr },
      t
    );
    messages.set(idStr, msg);
    chat.unreadCount = recount();
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

for (const updatesCounter of [true, false]) {
  const label = updatesCounter
    ? 'native refreshes the counter'
    : 'native leaves the counter stale';

  test.describe(label, () => {
    test('reads up to the selected message and keeps newer ones unread', async () => {
      const api = markApi({ updatesCounter });
      const a = api.addMessage('false_chat_A', 1);
      const b = api.addMessage('false_chat_B', 2);
      const c = api.addMessage('false_chat_C', 3);

      const result = await api.markMessageAsRead('false_chat_B');

      expect(api.calls).toEqual(['false_chat_B']);
      expect([a.read, b.read, c.read]).toEqual([true, true, false]);
      expect(result.unreadCount).toBe(1);
      expect(api.chat.unreadCount).toBe(1);
    });

    test('repeated calls send one receipt and do not reduce the counter again', async () => {
      const api = markApi({ updatesCounter });
      api.addMessage('false_chat_A', 1);
      api.addMessage('false_chat_B', 2);
      api.addMessage('false_chat_C', 3);

      await api.markMessageAsRead('false_chat_B');
      const second = await api.markMessageAsRead('false_chat_B');
      const third = await api.markMessageAsRead('false_chat_B');

      expect(api.calls).toEqual(['false_chat_B']);
      expect(second.unreadCount).toBe(1);
      expect(third.unreadCount).toBe(1);
      expect(api.chat.unreadCount).toBe(1);
    });

    test('an already read older message does not change the counter', async () => {
      const api = markApi({ updatesCounter });
      api.addMessage('false_chat_A', 1);
      const b = api.addMessage('false_chat_B', 2);
      const c = api.addMessage('false_chat_C', 3);

      await api.markMessageAsRead('false_chat_B');
      const result = await api.markMessageAsRead('false_chat_A');

      expect(result.unreadCount).toBe(1);
      expect(api.chat.unreadCount).toBe(1);
      expect([b.read, c.read]).toEqual([true, false]);
    });

    test('marking the newest message clears the counter', async () => {
      const api = markApi({ updatesCounter });
      api.addMessage('false_chat_A', 1);
      api.addMessage('false_chat_B', 2);

      const result = await api.markMessageAsRead('false_chat_B');

      expect(result.unreadCount).toBe(0);
      expect(api.chat.unreadCount).toBe(0);
    });

    test('concurrent calls for the same message send a single receipt', async () => {
      const api = markApi({ updatesCounter, delay: 20 });
      api.addMessage('false_chat_A', 1);
      api.addMessage('false_chat_B', 2);
      api.addMessage('false_chat_C', 3);

      const results = await Promise.all([
        api.markMessageAsRead('false_chat_B'),
        api.markMessageAsRead('false_chat_B'),
        api.markMessageAsRead('false_chat_B'),
      ]);

      expect(api.calls).toEqual(['false_chat_B']);
      expect(results.map((r) => r.unreadCount)).toEqual([1, 1, 1]);
      expect(api.chat.unreadCount).toBe(1);
    });
  });
}

test('does not mark as completed when the native receipt fails', async () => {
  let shouldFail = true;
  const api = markApi({ updatesCounter: true, fail: () => shouldFail });
  api.addMessage('false_chat_A', 1);
  api.addMessage('false_chat_B', 2);

  await expect(api.markMessageAsRead('false_chat_A')).rejects.toThrow(
    'native failure'
  );
  expect(api.chat.unreadCount).toBe(2);

  shouldFail = false;
  const result = await api.markMessageAsRead('false_chat_A');

  expect(api.calls).toEqual(['false_chat_A', 'false_chat_A']);
  expect(result.unreadCount).toBe(1);
});

test('ignores messages sent by me', async () => {
  const api = markApi({ updatesCounter: true });
  api.addMessage('false_chat_A', 1);
  api.addMessage('true_chat_B', 2, true);

  const result = await api.markMessageAsRead('true_chat_B');

  expect(api.calls).toHaveLength(0);
  expect(result.unreadCount).toBe(1);
});

test('keeps a bounded history of completed messages', async () => {
  const api = markApi({ updatesCounter: true });
  const total = 520;
  for (let i = 0; i < total; i++) {
    api.addMessage(`false_chat_${i}`, i + 1);
  }

  for (let i = 0; i < total; i++) {
    await api.markMessageAsRead(`false_chat_${i}`);
  }
  api.calls.length = 0;

  await api.markMessageAsRead('false_chat_0');
  expect(api.calls).toEqual(['false_chat_0']);

  await api.markMessageAsRead(`false_chat_${total - 1}`);
  expect(api.calls).toEqual(['false_chat_0']);
  expect(api.chat.unreadCount).toBe(0);
});
