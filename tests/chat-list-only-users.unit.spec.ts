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

function wid(id: string, isUser: boolean, isGroup = false) {
  return {
    _serialized: id,
    toString: () => id,
    isUser: () => isUser,
    isGroup: () => isGroup,
  };
}

function chatModel(id: string, isUserAttr: boolean, isUser: boolean) {
  return {
    isUser: isUserAttr,
    id: wid(id, isUser, false),
    hasUnread: false,
    archive: false,
  };
}

function groupModel(id: string) {
  return {
    isUser: false,
    id: wid(id, false, true),
    hasUnread: false,
    archive: false,
    groupMetadata: {},
  };
}

function listApi(models: any[]) {
  const exports: any = {};
  const context = createContext({
    exports,
    require(id: string) {
      if (id === '../../whatsapp') {
        return {
          ChatStore: { getModelsArray: () => models.slice() },
          GroupMetadataStore: { find: async () => ({}) },
          LabelStore: { findFirst: () => null },
          NewsletterStore: { getModelsArray: () => [] },
        };
      }
      if (id === './get') {
        return { get: () => null };
      }
      throw new Error(`Unexpected dependency: ${id}`);
    },
  });
  runInContext(
    transpileModule(
      readFileSync(
        path.join(__dirname, '../src/chat/functions/list.ts'),
        'utf8'
      ),
      { compilerOptions: { module: ModuleKind.CommonJS } }
    ).outputText,
    context
  );
  const ids = (chats: any[]) => chats.map((c) => c.id.toString());
  return {
    list: (options?: any) => Promise.resolve(exports.list(options)).then(ids),
  };
}

test('includes @lid one-to-one chats when onlyUsers is set', async () => {
  const api = listApi([
    chatModel('111@c.us', true, true),
    // After the LID migration the attribute stays false on @lid chats,
    // while Wid.isUser() still reports them as users.
    chatModel('222@lid', false, true),
    groupModel('333@g.us'),
  ]);

  const chats = await api.list({ onlyUsers: true });

  expect(chats).toEqual(['111@c.us', '222@lid']);
});

test('returns @lid chats instead of an empty list when the store holds only them', async () => {
  const api = listApi([
    chatModel('222@lid', false, true),
    chatModel('444@lid', false, true),
  ]);

  const chats = await api.list({ onlyUsers: true });

  expect(chats).toEqual(['222@lid', '444@lid']);
});

test('keeps groups out of onlyUsers and leaves the unfiltered list alone', async () => {
  const api = listApi([
    chatModel('111@c.us', true, true),
    chatModel('222@lid', false, true),
    groupModel('333@g.us'),
  ]);

  await expect(api.list({ onlyUsers: true })).resolves.toEqual([
    '111@c.us',
    '222@lid',
  ]);
  await expect(api.list()).resolves.toEqual([
    '111@c.us',
    '222@lid',
    '333@g.us',
  ]);
});
