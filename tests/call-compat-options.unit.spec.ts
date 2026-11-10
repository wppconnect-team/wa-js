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

import { WPPError } from '../src/util/errors';

function load(file: string, modules: any) {
  const exports: any = {};
  const source = transpileModule(
    readFileSync(
      path.join(__dirname, `../src/call/functions/${file}.ts`),
      'utf8'
    ),
    { compilerOptions: { module: ModuleKind.CommonJS } }
  ).outputText;
  new Function('exports', 'require', source)(exports, (id: string) => {
    if (id in modules) return modules[id];
    if (id === '../../util') return { WPPError };
    if (id === '../../loader')
      return { ensureLazyModule: async () => undefined };
    if (id === '../media/mediaSession')
      return {
        currentMediaSession: () => undefined,
        finishMediaSession: () => undefined,
      };
    throw new Error(`Unexpected dependency ${id}`);
  });
  return exports;
}

test('native call link forwards approval and media options', async () => {
  const received: any[] = [];
  const api = load('createCallLink', {
    '../../whatsapp/functions': {
      createVoipCallLink: async (options: any) => {
        received.push(options);
        return 'LINK';
      },
    },
  });
  expect(
    await api.createCallLink({ isVideo: true, requireApproval: true })
  ).toBe('LINK');
  expect(received).toEqual([{ callType: 'video', requireApproval: true }]);
});

test('legacy call link rejects required approval without creating an unrestricted link', async () => {
  const received: any[] = [];
  const api = load('createCallLink', {
    '../../whatsapp/functions': {
      createEventCallLink: async (...args: any[]) => {
        received.push(args);
        return 'LINK';
      },
    },
  });
  await expect(
    api.createCallLink({ requireApproval: true })
  ).rejects.toMatchObject({ code: 'call_link_approval_not_supported' });
  expect(received).toHaveLength(0);
  expect(await api.createCallLink({ requireApproval: false })).toBe('LINK');
  expect(received[0][1]).toBe('voice');
});

for (const options of [{ audio: false }, { video: false }]) {
  test(`legacy accept rejects unsupported media override ${JSON.stringify(options)}`, async () => {
    const call = { id: 'A', isVideo: true };
    const api = load('accept', {
      '../../whatsapp': {
        CallStore: { activeCall: call },
        websocket: new Proxy(
          {},
          {
            get() {
              throw new Error('Legacy signaling must not run');
            },
          }
        ),
      },
      '../../whatsapp/functions': { getVoipStackInterface: async () => null },
      './getCall': {
        getCall: () => call,
        isActiveCall: () => true,
        isIncomingCall: () => true,
      },
    });
    await expect(api.accept('A', options)).rejects.toMatchObject({
      code: 'call_media_options_not_supported',
    });
  });
}

test('legacy accept retains its default signaling path', async () => {
  const sent: any[] = [];
  const call = {
    id: 'A',
    isVideo: false,
    peerJid: { isGroupCall: () => true, toString: () => 'peer' },
  };
  const api = load('accept', {
    '../../whatsapp': {
      CallStore: { activeCall: call },
      websocket: {
        generateId: () => 'ID',
        smax: (...args: any[]) => args,
        sendSmaxStanza: async (node: any) => {
          sent.push(node);
        },
      },
    },
    '../../whatsapp/functions': { getVoipStackInterface: async () => null },
    './getCall': {
      getCall: () => call,
      isActiveCall: () => true,
      isIncomingCall: () => true,
    },
  });
  expect(await api.accept('A')).toBe(true);
  expect(sent).toHaveLength(1);
});
