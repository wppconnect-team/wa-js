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
import { runInNewContext } from 'vm';

import { WPPError } from '../src/util/errors';

type Wrapped = (func: any, ...args: any[]) => any;

function transpile(file: string) {
  return transpileModule(
    readFileSync(path.join(__dirname, '../src/chat/functions', file), 'utf8'),
    { compilerOptions: { module: ModuleKind.CommonJS } }
  ).outputText;
}

function load() {
  const fns = {
    createFanoutMsgStanza: () => undefined,
    createMsgProtobuf: () => undefined,
    deprecatedSendStanzaAndReturnAck: () => undefined,
    encodeMaybeMediaType: () => undefined,
    encryptAndSendSenderKeyMsg: () => undefined,
    getABPropConfigValue: () => undefined,
    mediaTypeFromProtobuf: () => undefined,
    typeAttributeFromProtobuf: () => undefined,
  };
  const wrapped = new Map<unknown, Wrapped>();

  const sandboxRequire = (id: string): any => {
    switch (id) {
      case 'debug':
        return () => () => undefined;
      case '../../loader':
        return { onFullReady: (cb: () => void) => cb() };
      case '../../util':
        return { WPPError };
      case '../../whatsapp':
        return {
          websocket: {
            smax: (tag: string, attrs: any = {}, content: any = undefined) => ({
              tag,
              attrs,
              content,
            }),
          },
        };
      case '../../whatsapp/contants':
        return { DROP_ATTR: undefined };
      case '../../whatsapp/exportModule':
        return {
          wrapModuleFunction: (func: unknown, cb: Wrapped) =>
            wrapped.set(func, cb),
        };
      case '../../whatsapp/functions':
        return fns;
      case '..':
        return {};
      case './buttonsParser':
        return {};
      case './createNativeFlowButtons':
        return runModule('createNativeFlowButtons.ts');
      case './nativeFlowBiz':
        return runModule('nativeFlowBiz.ts');
    }
    throw new Error(`Unexpected dependency: ${id}`);
  };

  function runModule(file: string) {
    const exports: Record<string, unknown> = {};
    runInNewContext(transpile(file), {
      exports,
      require: sandboxRequire,
      crypto: { getRandomValues: (a: Uint8Array) => a.fill(7) },
    });
    return exports;
  }

  runModule('prepareMessageButtons.ts');
  return { fns, wrapped };
}

const nativeFlowProto = {
  viewOnceMessage: {
    message: {
      interactiveMessage: {
        nativeFlowMessage: { buttons: [{ name: 'quick_reply' }] },
      },
    },
  },
};

const skmsgStanza = () => ({
  tag: 'message',
  attrs: {},
  content: [
    { tag: 'enc', attrs: { type: 'skmsg' }, content: new Uint8Array(2) },
  ],
});

const plain = (value: unknown) => JSON.parse(JSON.stringify(value));

test.describe('native flow in group sender-key sends', () => {
  test('adds <biz> v=9 mixed to the stanza right before it is sent', async () => {
    const { fns, wrapped } = load();
    const sent: any[] = [];

    const send = wrapped.get(fns.deprecatedSendStanzaAndReturnAck)!;
    const sendFn = async (stanza: any) => {
      sent.push(plain(stanza));
      return 'ack';
    };
    const encrypt = wrapped.get(fns.encryptAndSendSenderKeyMsg)!;

    // current signature: (msgRecord, proto, senderKeyList, groupData, ...)
    const result = await encrypt(
      async () => send(sendFn, skmsgStanza(), {}),
      { data: {} },
      nativeFlowProto,
      {},
      {}
    );

    expect(result).toBe('ack');
    const biz = sent[0].content.find((c: any) => c.tag === 'biz');
    expect(biz.content[0].attrs).toEqual({ type: 'native_flow', v: '1' });
    expect(biz.content[0].content[0].attrs).toEqual({ v: '9', name: 'mixed' });
    expect(sent[0].content[0].tag).toBe('enc');
  });

  test('supports the older signature with the protobuf as 3rd argument', async () => {
    const { fns, wrapped } = load();
    const sent: any[] = [];
    const send = wrapped.get(fns.deprecatedSendStanzaAndReturnAck)!;
    const encrypt = wrapped.get(fns.encryptAndSendSenderKeyMsg)!;

    await encrypt(
      async () =>
        send(async (stanza: any) => {
          sent.push(plain(stanza));
        }, skmsgStanza()),
      { data: {} },
      { id: 'x' },
      nativeFlowProto
    );

    expect(sent[0].content.some((c: any) => c.tag === 'biz')).toBe(true);
  });

  test('does not touch plain group messages or stanzas outside the send', async () => {
    const { fns, wrapped } = load();
    const sent: any[] = [];
    const send = wrapped.get(fns.deprecatedSendStanzaAndReturnAck)!;
    const encrypt = wrapped.get(fns.encryptAndSendSenderKeyMsg)!;
    const sender = async (stanza: any) => {
      sent.push(plain(stanza));
    };

    await encrypt(
      async () => send(sender, skmsgStanza()),
      { data: {} },
      { conversation: 'oi' },
      {}
    );
    await send(sender, skmsgStanza());

    expect(sent.length).toBe(2);
    expect(
      sent.every((s) => !s.content.some((c: any) => c.tag === 'biz'))
    ).toBe(true);
  });

  test('completes only one stanza and clears the context after an error', async () => {
    const { fns, wrapped } = load();
    const sent: any[] = [];
    const send = wrapped.get(fns.deprecatedSendStanzaAndReturnAck)!;
    const encrypt = wrapped.get(fns.encryptAndSendSenderKeyMsg)!;
    const sender = async (stanza: any) => {
      sent.push(plain(stanza));
    };

    let message = '';
    try {
      await encrypt(
        async () => {
          throw new Error('boom');
        },
        { data: {} },
        nativeFlowProto,
        {}
      );
    } catch (error: any) {
      message = String(error?.message);
    }
    expect(message).toBe('boom');

    await send(sender, skmsgStanza());
    expect(sent[0].content.some((c: any) => c.tag === 'biz')).toBe(false);

    await encrypt(
      async () => {
        await send(sender, skmsgStanza());
        await send(sender, skmsgStanza());
      },
      { data: {} },
      nativeFlowProto,
      {}
    );
    expect(sent[1].content.some((c: any) => c.tag === 'biz')).toBe(true);
    expect(sent[2].content.some((c: any) => c.tag === 'biz')).toBe(false);
  });

  test('keeps the biz attributes and the experiment overrides', async () => {
    const { fns, wrapped } = load();
    const sent: any[] = [];
    const send = wrapped.get(fns.deprecatedSendStanzaAndReturnAck)!;
    const encrypt = wrapped.get(fns.encryptAndSendSenderKeyMsg)!;

    await encrypt(
      async () =>
        send(async (stanza: any) => {
          sent.push(plain(stanza));
        }, skmsgStanza()),
      {
        data: {
          nativeFlowBizExperiment: {
            qualityControl: true,
            bizAttrs: { host_storage: '2' },
          },
        },
      },
      nativeFlowProto,
      {}
    );

    const biz = sent[0].content.find((c: any) => c.tag === 'biz');
    expect(biz.attrs).toEqual({ host_storage: '2' });
    expect(biz.content.map((c: any) => c.tag)).toEqual([
      'interactive',
      'quality_control',
    ]);
  });
});
