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

function fallbackApi(hooks: {
  groupInfo?: any;
  chat?: any;
  isMember?: boolean;
}) {
  const order: string[] = [];
  const joins: any[][] = [];
  let captured: any = null;
  const context = createContext({
    exports,
    require(id: string) {
      if (id === '../../group') {
        return {
          getGroupInfoFromInviteCode: async () =>
            hooks.groupInfo || {
              id: { toString: () => '111@g.us' },
              membershipApprovalMode: false,
            },
          iAmMember: async () => hooks.isMember || false,
        };
      }
      if (id === '../../loader') {
        return {
          injectFallbackModule: (_name: string, content: any) => {
            captured = content;
          },
          ensureLazyModule: async (moduleId: string) => {
            order.push(`ensure:${moduleId}`);
            return true;
          },
        };
      }
      if (id === '..') {
        return { ChatStore: { get: () => hooks.chat || null }, Wid: {} };
      }
      if (id === '../exportModule') {
        return { exportModule: () => undefined };
      }
      if (id === './joinGroupViaInvite') {
        return {
          joinGroupViaInvite: async (...args: any[]) => {
            order.push('join');
            joins.push(args);
            return { gid: '111@g.us' };
          },
        };
      }
      throw new Error(`Unexpected dependency: ${id}`);
    },
  });
  runInContext(
    transpileModule(
      readFileSync(
        path.join(
          __dirname,
          '../src/whatsapp/functions/sendJoinGroupViaInvite.ts'
        ),
        'utf8'
      ),
      { compilerOptions: { module: ModuleKind.CommonJS } }
    ).outputText,
    context
  );
  return {
    sendJoinGroupViaInvite: (code: string) =>
      Promise.resolve(captured.sendJoinGroupViaInvite(code)),
    order,
    joins,
  };
}

test('ensures the invite job module before the low-level join call', async () => {
  const api = fallbackApi({});

  await api.sendJoinGroupViaInvite('CODE');

  // The IQ call lives in lazily bootloaded WAWebGroupInviteJob: calling it
  // without ensuring first leaves the binding undefined on recent builds.
  expect(api.order).toEqual(['ensure:WAWebGroupInviteJob', 'join']);
  expect(api.joins).toEqual([['CODE', false]]);
});

test('returns the gid with the queried approval mode', async () => {
  const api = fallbackApi({
    groupInfo: {
      id: { toString: () => '222@g.us' },
      membershipApprovalMode: true,
    },
  });

  const result = await api.sendJoinGroupViaInvite('CODE');

  expect(result).toEqual({ gid: '111@g.us', membershipApprovalMode: true });
  expect(api.joins).toEqual([['CODE', true]]);
});

test('skips the download when already a member of the group', async () => {
  const chat = { id: '111@g.us' };
  const api = fallbackApi({ chat, isMember: true });

  const result = await api.sendJoinGroupViaInvite('CODE');

  expect(result).toEqual({ gid: '111@g.us', membershipApprovalMode: false });
  expect(api.order).toEqual([]);
  expect(api.joins).toEqual([]);
});
