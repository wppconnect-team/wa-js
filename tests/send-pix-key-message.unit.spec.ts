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

import type { sendPixKeyMessage } from '../src/chat/functions/sendPixKeyMessage';
import { WPPError } from '../src/util/errors';

function load() {
  const exports: { sendPixKeyMessage?: typeof sendPixKeyMessage } = {};
  const sent: { chatId: string; message: any; options: any }[] = [];
  let sequence = 0;
  const source = readFileSync(
    path.join(__dirname, '../src/chat/functions/sendPixKeyMessage.ts'),
    'utf8'
  );
  runInNewContext(
    transpileModule(source, {
      compilerOptions: { module: ModuleKind.CommonJS },
    }).outputText,
    {
      exports,
      self: {
        crypto: { getRandomValues: (bytes: Uint8Array) => bytes.fill(7) },
      },
      require(id: string) {
        if (id === '../../util') {
          return {
            generateOrderUniqueId: () => `ORDER-${++sequence}`,
            WPPError,
          };
        }
        if (id === '..') {
          return {
            defaultSendMessageOptions: { waitForAck: true, markIsRead: true },
          };
        }
        if (id === '.') {
          return {
            sendRawMessage: async (
              chatId: string,
              message: any,
              options: any
            ) => {
              sent.push({ chatId, message, options });
              return { id: 'SENT' };
            },
          };
        }
        throw new Error(`Unexpected dependency: ${id}`);
      },
    }
  );
  return { send: exports.sendPixKeyMessage!, sent };
}

const params = {
  keyType: 'EMAIL' as const,
  name: 'Merchant',
  key: 'pix@example.com',
};

for (const keyType of ['CNPJ', 'CPF', 'PHONE', 'EMAIL', 'EVP'] as const) {
  test(`keeps the native payment format for ${keyType} Pix keys`, async () => {
    const { send, sent } = load();
    await send('123@c.us', {
      ...params,
      keyType,
      instructions: 'Pay with Pix',
    });
    const { message } = sent[0];
    expect(message.nativeFlowName).toBe('payment_info');
    expect(message.nativeFlowInteractiveMsg).toBeUndefined();
    expect(message.nativeFlowBizExperiment).toBeUndefined();
    const button = message.interactivePayload.buttons[0];
    expect(button.name).toBe('payment_info');
    const payload = JSON.parse(button.buttonParamsJson);
    expect(payload.payment_settings).toEqual([
      {
        type: 'pix_static_code',
        pix_static_code: {
          key_type: keyType,
          merchant_name: params.name,
          key: params.key,
        },
      },
      { type: 'cards', cards: { enabled: false } },
    ]);
    expect(payload.external_payment_configurations).toEqual([
      { payment_instruction: 'Pay with Pix', type: 'payment_instruction' },
    ]);
    expect(payload.order.order_type).toBe('ORDER_WITHOUT_AMOUNT');
    expect(payload.currency).toBe('BRL');
    expect(message.messageSecret.length).toBe(32);
  });
}

test('keeps send options separate from opt-in native flow experiments', async () => {
  const { send, sent } = load();
  const experiment = { mode: 'off' as const };
  const options = { waitForAck: false, experimentalNativeFlowBiz: experiment };
  await send('123@c.us', params, options);
  expect(sent[0].message.nativeFlowBizExperiment).toBe(experiment);
  expect(sent[0].options).toEqual({ waitForAck: false, markIsRead: true });
  expect(options).toEqual({
    waitForAck: false,
    experimentalNativeFlowBiz: experiment,
  });
});

test('defaults to no payment instructions and creates distinct order references', async () => {
  const { send, sent } = load();
  await send('123@c.us', params);
  await send('123@c.us', params);
  const payloads = sent.map(({ message }) =>
    JSON.parse(message.interactivePayload.buttons[0].buttonParamsJson)
  );
  expect(
    payloads[0].external_payment_configurations[0].payment_instruction
  ).toBe('');
  expect(payloads[0].reference_id).not.toBe(payloads[1].reference_id);
});

for (const field of ['keyType', 'name', 'key'] as const) {
  test(`rejects missing ${field} without sending a payment message`, async () => {
    const { send, sent } = load();
    const error = await send('123@c.us', {
      ...params,
      [field]: '',
    } as any).then(
      () => undefined,
      (error: WPPError) => error
    );
    expect(error?.code).toBe('parameter_not_fount');
    expect(sent).toHaveLength(0);
  });
}
