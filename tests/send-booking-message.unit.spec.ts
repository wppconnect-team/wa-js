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
import { existsSync, readFileSync } from 'fs';
import * as path from 'path';
import { ModuleKind, transpileModule } from 'typescript';
import { runInNewContext } from 'vm';

import { WPPError } from '../src/util/errors';

interface BookingOptions {
  body: string;
  bookingUrl?: string;
  description?: string;
  endTime?: Date | string;
  location?: string;
  managementUrl?: string;
  phoneNumber?: string;
  startTime: Date | string;
  title?: string;
}

type SendBookingMessage = (
  chatId: string,
  options: BookingOptions
) => Promise<{ id: string }>;

async function captureError(promise: Promise<unknown>): Promise<unknown> {
  try {
    await promise;
  } catch (error) {
    return error;
  }

  return undefined;
}

function loadSendBookingMessage() {
  const sourcePath = path.join(
    __dirname,
    '../src/chat/functions/sendBookingMessage.ts'
  );
  const moduleExports: { sendBookingMessage?: SendBookingMessage } = {};
  const captured: { message?: Record<string, unknown> } = {};

  if (!existsSync(sourcePath)) return { captured, moduleExports };

  runInNewContext(
    transpileModule(readFileSync(sourcePath, 'utf8'), {
      compilerOptions: { module: ModuleKind.CommonJS },
    }).outputText,
    {
      exports: moduleExports,
      require(id: string) {
        if (id === '../../util') return { WPPError };
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
              return { id: 'true_123@c.us_BOOKING' };
            },
          };
        }
        throw new Error(`Unexpected dependency: ${id}`);
      },
    }
  );

  return { captured, moduleExports };
}

test('sends a booking confirmation with normalized dates', async () => {
  const loaded = loadSendBookingMessage();

  expect(typeof loaded.moduleExports.sendBookingMessage).toBe('function');
  const sendBookingMessage = loaded.moduleExports.sendBookingMessage;
  if (!sendBookingMessage)
    throw new Error('sendBookingMessage was not exported');

  await sendBookingMessage('123@c.us', {
    body: 'Seu agendamento foi confirmado.',
    title: 'Consulta',
    startTime: new Date('2026-10-11T15:00:00.000Z'),
    endTime: '2026-10-11T16:00:00.000Z',
    location: 'Rua das Flores, 10',
    managementUrl: 'https://example.com/agendamento/123',
    description: 'Chegue dez minutos antes.',
  });

  expect(loaded.captured.message).toMatchObject({
    type: 'interactive',
    caption: 'Seu agendamento foi confirmado.',
    nativeFlowName: 'booking_confirmation',
    interactiveType: 'native_flow',
    nativeFlowInteractiveMsg: true,
    interactiveHeader: {
      title: 'Consulta',
      hasMediaAttachment: false,
    },
    interactivePayload: {
      messageVersion: 1,
      buttons: [
        {
          name: 'booking_confirmation',
          buttonParamsJson: JSON.stringify({
            start_datetime: '2026-10-11T15:00:00.000Z',
            end_datetime: '2026-10-11T16:00:00.000Z',
            location: 'Rua das Flores, 10',
            booking_management_url: 'https://example.com/agendamento/123',
            description: 'Chegue dez minutos antes.',
          }),
        },
      ],
    },
  });
});

test('rejects a booking without a location, URL, or phone number', async () => {
  const loaded = loadSendBookingMessage();
  const sendBookingMessage = loaded.moduleExports.sendBookingMessage;

  expect(typeof sendBookingMessage).toBe('function');
  if (!sendBookingMessage)
    throw new Error('sendBookingMessage was not exported');

  const error = await captureError(
    sendBookingMessage('123@c.us', {
      body: 'Seu agendamento foi confirmado.',
      startTime: '2026-10-11T15:00:00.000Z',
    })
  );

  expect(error).toMatchObject({ code: 'booking_destination_required' });
  expect(loaded.captured.message).toBeUndefined();
});
