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

import { WPPError } from '../src/util/errors';

function removeApi(hooks: { revoke?: (chat: any, msg: any) => any } = {}) {
  const order: string[] = [];
  const revokes: any[][] = [];
  const chat = { id: 'status@broadcast' };
  const msg = { id: 'MSG-ID' };
  const exports: any = {};
  const context = createContext({
    exports,
    require(id: string) {
      if (id === '../../chat') {
        return {
          getMessageById: async (messageId: unknown) => {
            expect(messageId).toBe('MSG-ID');
            return msg;
          },
        };
      }
      if (id === '../../loader') {
        return {
          ensureLazyModule: async (moduleId: string) => {
            order.push(`ensure:${moduleId}`);
            return true;
          },
        };
      }
      if (id === '../../util') {
        return { WPPError };
      }
      if (id === '../../whatsapp') {
        return {
          StatusV3Store: {
            get: (pn: unknown) => {
              expect(pn).toBe('ME-PN');
              return chat;
            },
          },
          UserPrefs: { getMaybeMePnUser: () => 'ME-PN' },
        };
      }
      if (id === '../../whatsapp/functions') {
        return {
          revokeStatus: async (...args: any[]) => {
            order.push('revoke');
            revokes.push(args);
            if (hooks.revoke) {
              return hooks.revoke(args[0], args[1]);
            }
            return undefined;
          },
        };
      }
      throw new Error(`Unexpected dependency: ${id}`);
    },
  });
  runInContext(
    transpileModule(
      readFileSync(
        path.join(__dirname, '../src/status/functions/remove.ts'),
        'utf8'
      ),
      { compilerOptions: { module: ModuleKind.CommonJS } }
    ).outputText,
    context
  );
  return {
    remove: (messageId: any) => Promise.resolve(exports.remove(messageId)),
    order,
    revokes,
    chat,
    msg,
  };
}

test('ensures the revoke action module before revoking', async () => {
  const api = removeApi();

  const result = await api.remove('MSG-ID');

  // The action ships in a lazily bootloaded bundle: revoking without
  // ensuring first leaves the binding undefined on recent builds.
  expect(result).toBe(true);
  expect(api.order).toEqual(['ensure:WAWebRevokeStatusAction', 'revoke']);
  expect(api.revokes).toEqual([[api.chat, api.msg]]);
});

test('wraps a revoke failure in error_on_remove_status', async () => {
  const api = removeApi({
    revoke: () => {
      throw new Error('ServerStatusCodeError');
    },
  });

  const failure = await api.remove('MSG-ID').catch((e: any) => e);

  expect(failure).toBeInstanceOf(WPPError);
  expect(failure.code).toBe('error_on_remove_status');
  expect(failure.message).toContain('MSG-ID');
});
