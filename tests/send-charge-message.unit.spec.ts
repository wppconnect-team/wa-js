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

interface ChargeOptions {
  notes?: string;
  paymentSettings?: {
    boletoCode?: string;
    cards?: boolean;
    paymentLink?: string;
    pixCode?: string;
  };
}

type SendChargeMessage = (
  chatId: string,
  items: Array<{
    type: 'custom';
    name: string;
    price: number;
    qnt: number;
  }>,
  options?: ChargeOptions
) => Promise<{ id: string }>;

function loadSendChargeMessage() {
  const sourcePath = path.join(
    __dirname,
    '../src/chat/functions/sendChargeMessage.ts'
  );
  const moduleExports: { sendChargeMessage?: SendChargeMessage } = {};
  const captured: { message?: Record<string, unknown> } = {};

  runInNewContext(
    transpileModule(readFileSync(sourcePath, 'utf8'), {
      compilerOptions: { module: ModuleKind.CommonJS },
    }).outputText,
    {
      exports: moduleExports,
      require(id: string) {
        if (id === '../../conn/functions/getMyUserWid') {
          return { getMyUserWid: () => 'me@c.us' };
        }
        if (id === '../../util') {
          return {
            generateOrderUniqueId: () => 'ORDER-123',
            WPPError,
          };
        }
        if (id === '../../whatsapp') {
          return {
            CatalogStore: { get: () => undefined },
            UserPrefs: { getMaybeMePnUser: () => ({ user: '5548999999999' }) },
          };
        }
        if (id === '../../whatsapp/functions') {
          return {
            currencyForCountryShortcode: async () => 'BRL',
            getCountryShortcodeByPhone: async () => 'BR',
            queryProduct: async () => ({ data: undefined }),
          };
        }
        if (id === '..') {
          return { defaultSendMessageOptions: { waitForAck: true } };
        }
        if (id === '.') {
          return {
            sendRawMessage: async (
              _chatId: string,
              message: Record<string, unknown>
            ) => {
              captured.message = message;
              return { id: 'true_123@c.us_ORDER' };
            },
          };
        }
        throw new Error(`Unexpected dependency: ${id}`);
      },
    }
  );

  return { captured, moduleExports };
}

test('adds all supported commerce payment methods to an order', async () => {
  const loaded = loadSendChargeMessage();
  const sendChargeMessage = loaded.moduleExports.sendChargeMessage;

  expect(typeof sendChargeMessage).toBe('function');
  if (!sendChargeMessage) throw new Error('sendChargeMessage was not exported');

  await sendChargeMessage(
    '123@c.us',
    [{ type: 'custom', name: 'Seu produto', price: 20000, qnt: 2 }],
    {
      notes: 'Cobrança em vários métodos de pagamento',
      paymentSettings: {
        pixCode: '00020101021226850014br.gov.bcb.pix',
        paymentLink: 'https://example.com/pagar/ORDER-123',
        boletoCode: '00190500954014481606906809350314337370000000100',
        cards: true,
      },
    }
  );

  const payload = loaded.captured.message?.interactivePayload as {
    buttons: Array<{ buttonParamsJson: string }>;
  };
  const params = JSON.parse(payload.buttons[0].buttonParamsJson) as {
    payment_settings: unknown[];
  };

  expect(params.payment_settings).toEqual([
    {
      type: 'pix_dynamic_code',
      pix_dynamic_code: { code: '00020101021226850014br.gov.bcb.pix' },
    },
    {
      type: 'payment_link',
      payment_link: { uri: 'https://example.com/pagar/ORDER-123' },
    },
    {
      type: 'boleto',
      boleto: {
        digitable_line: '00190500954014481606906809350314337370000000100',
      },
    },
    { type: 'cards', cards: { enabled: true } },
  ]);
});
