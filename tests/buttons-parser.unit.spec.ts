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

import { encryptAndParserMsgButtons } from '../src/chat/functions/buttonsParser';

const interactive = {
  viewOnceMessage: {
    message: {
      interactiveMessage: {
        header: {},
        body: { text: 'oi' },
        nativeFlowMessage: {
          buttons: [
            {
              name: 'quick_reply',
              buttonParamsJson: JSON.stringify({ display_text: 'A', id: 'a' }),
            },
          ],
        },
      },
    },
  },
};

const wid = (device?: number) => ({ device }) as any;

const node = (first: any) => ({ stanza: { content: [first, { tag: 'biz' }] } });

test.describe('encryptAndParserMsgButtons', () => {
  test('group without sender key distribution keeps the encrypted enc node', async () => {
    const cipher = new Uint8Array([1, 2, 3, 4]);
    const calls: unknown[] = [];
    const func = async (_m: any, proto: any, devices: any[]) => {
      calls.push({ proto, devices });
      return node({ tag: 'enc', attrs: { type: 'skmsg' }, content: cipher });
    };

    const result: any = await encryptAndParserMsgButtons(
      { type: 'chat', data: {} as any },
      interactive,
      [],
      {},
      undefined,
      undefined,
      func
    );

    expect(result.stanza.content[0].tag).toBe('enc');
    expect(result.stanza.content[0].content).toBe(cipher);
    expect(calls.length).toBe(1);
  });

  test('replaces participants with the per-device-kind encryptions', async () => {
    const func = async (_m: any, proto: any, devices: any[]) =>
      node({
        tag: 'participants',
        attrs: {},
        content: devices.map((d: any) => ({
          tag: 'to',
          attrs: { kind: proto.viewOnceMessage ? 'mobile' : 'web' },
          content: [{ tag: 'enc', attrs: { d: d.device ?? 0 } }],
        })),
      });

    const result: any = await encryptAndParserMsgButtons(
      { type: 'chat', data: {} as any },
      interactive,
      [wid(), wid(3)],
      {},
      undefined,
      undefined,
      func
    );

    const kinds = result.stanza.content[0].content.map(
      (n: any) => n.attrs.kind
    );
    expect(kinds).toEqual(['mobile', 'web']);
    expect(result.stanza.content[1].tag).toBe('biz');
  });

  test('does not encrypt twice for non interactive messages', async () => {
    let count = 0;
    const func = async () => {
      count++;
      return node({ tag: 'participants', attrs: {}, content: [] });
    };

    await encryptAndParserMsgButtons(
      { type: 'chat', data: {} as any },
      { conversation: 'oi' },
      [wid()],
      {},
      undefined,
      undefined,
      func
    );

    expect(count).toBe(1);
  });

  test('accepts the legacy signature where groupData is the function', async () => {
    const func = async () =>
      node({ tag: 'participants', attrs: {}, content: [] });

    const result: any = await encryptAndParserMsgButtons(
      { type: 'chat', data: {} as any },
      { conversation: 'oi' },
      [wid()],
      {},
      undefined,
      func as any,
      undefined as any
    );

    expect(result.stanza.content[0].tag).toBe('participants');
  });
});
