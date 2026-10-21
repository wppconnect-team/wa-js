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

function historyApi(legacy: boolean) {
  const alerts: any[] = [];
  const constructed: any[] = [];
  const raw = {
    id: 'album-child',
    type: 'image',
    parentMsgKey: 'album',
    viewMode: 'MEDIA_ALBUM',
    recvFresh: true,
    isNewMsg: true,
    t: 10,
  };
  // Msg.initialize handles hidden album children synchronously. Its parent
  // notification gate requires recvFresh, even when reading stored history.
  class MsgModel {
    attributes: any;
    id: any;
    t: number;
    constructor(attributes: any) {
      this.attributes = { ...attributes };
      this.id = attributes.id;
      this.t = attributes.t;
      constructed.push(this);
      if (
        attributes.recvFresh &&
        attributes.parentMsgKey &&
        attributes.viewMode === 'MEDIA_ALBUM'
      ) {
        alerts.push(attributes.parentMsgKey);
      }
    }
  }
  const stored = new Map<string, any>();
  const chat = {
    id: 'chat',
    lastReceivedKey: 'anchor',
    hasUnread: true,
    unreadCount: 2,
  };
  const calls = [{ id: 'call', recvFresh: true, isNewMsg: true, t: 11 }];
  const exports: any = {};
  runInContext(
    transpileModule(
      readFileSync(
        path.join(__dirname, '../src/chat/functions/getMessages.ts'),
        'utf8'
      ),
      { compilerOptions: { module: ModuleKind.CommonJS } }
    ).outputText,
    createContext({
      exports,
      console,
      require(id: string) {
        if (id === '../../assert') return { assertGetChat: () => chat };
        if (id === '../../conn') return { isMultiDevice: () => true };
        if (id === '../../whatsapp') {
          return {
            MsgModel,
            MsgKey: { fromString: (key: string) => ({ key }) },
            MsgStore: { get: (m: any) => stored.get(m.id || m) },
          };
        }
        if (id === '../../whatsapp/enums') {
          return { MSG_TYPE: { CALL_LOG: 'call_log' } };
        }
        if (id === '../../whatsapp/functions') {
          return {
            msgFindQuery: legacy
              ? async (kind: string) =>
                  kind === 'call_log'
                    ? calls
                    : kind === 'media'
                      ? { messages: [raw] }
                      : [raw]
              : undefined,
            msgFindByDirection: async () => [raw],
            msgFindMedia: async () => [raw],
            msgFindCallLog: async () => calls,
          };
        }
        throw new Error(`Unexpected dependency: ${id}`);
      },
    })
  );
  return {
    getMessages: exports.getMessages,
    raw,
    calls,
    chat,
    stored,
    alerts,
    constructed,
    MsgModel,
  };
}

for (const legacy of [false, true]) {
  const apiName = legacy ? 'legacy query' : 'direction query';
  for (const options of [{}, { onlyUnread: true }, { media: 'image' }]) {
    test(`${apiName}: repeated history reads do not notify the parent album (${JSON.stringify(options)})`, async () => {
      const api = historyApi(legacy);
      for (let i = 0; i < 2; i++) {
        const messages = await api.getMessages('chat', options);
        expect(messages).toHaveLength(1);
        expect(messages[0].attributes.parentMsgKey).toBe('album');
        expect(messages[0].attributes.isNewMsg).toBe(true);
      }
      expect(api.alerts).toEqual([]);
      expect(api.raw.recvFresh).toBe(true);
      expect(api.chat.unreadCount).toBe(2);
    });
  }

  test(`${apiName}: call history is constructed without live-delivery flags`, async () => {
    const api = historyApi(legacy);
    await api.getMessages('chat', { includeCallMessages: true });
    const call = api.constructed.find((m) => m.id === 'call');
    expect(call.attributes.recvFresh).toBe(false);
    expect(call.attributes.isNewMsg).toBe(true);
    expect(api.calls[0].recvFresh).toBe(true);
  });

  test(`${apiName}: keeps an existing live message and its unread flags`, async () => {
    const api = historyApi(legacy);
    const message = new api.MsgModel(api.raw);
    api.stored.set(api.raw.id, message);
    const before = api.alerts.length;
    const messages = await api.getMessages('chat', { onlyUnread: true });
    expect(messages[0]).toBe(message);
    expect(message.attributes.recvFresh).toBe(true);
    expect(api.constructed).toHaveLength(1);
    expect(api.alerts).toHaveLength(before);
  });
}
