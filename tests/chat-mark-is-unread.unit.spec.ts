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
import { compare } from 'compare-versions';
import { readFileSync } from 'fs';
import * as path from 'path';
import { ModuleKind, transpileModule } from 'typescript';
import { createContext, runInContext } from 'vm';

interface UnreadOptions {
  unread?: boolean;
  allowAction?: boolean;
  showToast?: boolean;
}

function unreadApi(
  version: string,
  native: (chat: unknown, unread: boolean | UnreadOptions) => Promise<void>,
  chatError?: Error
) {
  const chat = { id: { _serialized: '123@c.us' }, markedUnread: false };
  const exports: {
    markIsUnread?: (chatId: string) => Promise<{ wid: typeof chat.id }>;
  } = {};
  const context = createContext({
    exports,
    require(id: string) {
      if (id === 'compare-versions') return { compare };
      if (id === '../../assert') {
        return {
          assertGetChat(chatId: string) {
            expect(chatId).toBe('123@c.us');
            if (chatError) throw chatError;
            return chat;
          },
        };
      }
      if (id === '../../whatsapp/contants') {
        return { SANITIZED_VERSION_STR: version };
      }
      if (id === '../../whatsapp/functions') return { markUnread: native };
      throw new Error(`Unexpected dependency: ${id}`);
    },
  });
  runInContext(
    transpileModule(
      readFileSync(
        path.join(__dirname, '../src/chat/functions/markIsUnread.ts'),
        'utf8'
      ),
      { compilerOptions: { module: ModuleKind.CommonJS } }
    ).outputText,
    context
  );
  return {
    chat,
    markIsUnread: () => Promise.resolve(exports.markIsUnread!('123@c.us')),
  };
}

for (const version of [
  '2.3000.1038792969',
  '2.3000.1051310411',
  '2.3000.1051327738',
]) {
  test(`marks the chat unread with the positional API on ${version}`, async () => {
    const calls: unknown[][] = [];
    const api = unreadApi(version, async (chat, unread) => {
      calls.push([chat, unread]);
      // Older native implementations use the second argument directly.
      api.chat.markedUnread = Boolean(unread);
    });

    const result = await api.markIsUnread();

    expect(calls).toEqual([[api.chat, true]]);
    expect(api.chat.markedUnread).toBe(true);
    expect(result.wid).toBe(api.chat.id);
  });
}

for (const version of ['2.3000.1051327739', '2.3000.1051428616', '2.3001.1']) {
  test(`marks the chat unread without a toast on ${version}`, async () => {
    const calls: unknown[][] = [];
    const api = unreadApi(version, async (chat, options) => {
      calls.push([chat, options]);
      // New native implementations read options.unread. Passing true here
      // silently marks the chat as read, which is the original regression.
      api.chat.markedUnread = Boolean(
        typeof options === 'object' && options.unread
      );
    });

    const result = await api.markIsUnread();

    expect(calls).toEqual([[api.chat, { unread: true, showToast: false }]]);
    expect(api.chat.markedUnread).toBe(true);
    expect(result.wid).toBe(api.chat.id);
  });
}

for (const version of ['2.3000.1051310411', '2.3000.1051327739']) {
  test(`propagates native failure without retrying on ${version}`, async () => {
    let calls = 0;
    const error = new Error('server rejected unread action');
    const api = unreadApi(version, async () => {
      calls++;
      throw error;
    });

    await expect(api.markIsUnread()).rejects.toBe(error);
    expect(calls).toBe(1);
    expect(api.chat.markedUnread).toBe(false);
  });

  test(`rejects an invalid chat before calling native code on ${version}`, async () => {
    let calls = 0;
    const error = new Error('chat not found');
    const api = unreadApi(
      version,
      async () => {
        calls++;
      },
      error
    );

    await expect(api.markIsUnread()).rejects.toBe(error);
    expect(calls).toBe(0);
  });

  test(`waits for the native action before returning success on ${version}`, async () => {
    let complete!: () => void;
    const action = new Promise<void>((resolve) => {
      complete = resolve;
    });
    const api = unreadApi(version, () => action);
    let returned = false;
    const result = api.markIsUnread().then((value) => {
      returned = true;
      return value;
    });

    await Promise.resolve();
    expect(returned).toBe(false);
    complete();
    expect((await result).wid).toBe(api.chat.id);
  });
}
