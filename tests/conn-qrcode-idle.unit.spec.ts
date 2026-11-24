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
import { EventEmitter2 } from 'eventemitter2';
import { readFileSync } from 'fs';
import * as path from 'path';
import { ModuleKind, transpileModule } from 'typescript';
import { runInNewContext } from 'vm';

function transpile(file: string) {
  return transpileModule(
    readFileSync(path.join(__dirname, '../src', file), 'utf8'),
    { compilerOptions: { module: ModuleKind.CommonJS } }
  ).outputText;
}

test('conn.qrcode_idle fires once each time the QR codes run out', () => {
  const bus = Object.assign(new EventEmitter2(), { socketState: 'UNPAIRED' });
  const internalEv = new EventEmitter2();
  let idleEvents = 0;
  let inject = () => {};
  internalEv.on('conn.qrcode_idle', () => idleEvents++);
  runInNewContext(transpile('conn/events/registerQRCodeIdleEvent.ts'), {
    exports: {},
    require(id: string) {
      if (id === '../../eventEmitter') return { internalEv };
      if (id === '../../loader') {
        return { onInjected: (cb: () => void) => (inject = cb) };
      }
      if (id === '../../whatsapp') {
        return {
          BackendEvent: { SET_SOCKET_STATE: 'set_socket_state' },
          BackendEventBus: bus,
        };
      }
      if (id === '..') {
        return { isIdle: () => bus.socketState === 'UNPAIRED_IDLE' };
      }
      throw new Error(`Unexpected dependency: ${id}`);
    },
  });
  inject();

  const setState = (state: string) => {
    bus.socketState = state;
    bus.emit('set_socket_state', state);
  };
  setState('UNPAIRED');
  expect(idleEvents).toBe(0);
  setState('UNPAIRED_IDLE');
  setState('UNPAIRED_IDLE');
  expect(idleEvents).toBe(1);
  setState('UNPAIRED');
  setState('UNPAIRED_IDLE');
  expect(idleEvents).toBe(2);
});

test('refreshQR asks WhatsApp for a new QR code like its reload button', async () => {
  let refreshed = 0;
  const exports: any = {};
  runInNewContext(transpile('conn/functions/refreshQR.ts'), {
    exports,
    require(id: string) {
      if (id === '../../eventEmitter') {
        return { internalEv: { waitFor: async () => [{ fullCode: 'new' }] } };
      }
      if (id === '../../whatsapp') {
        return {
          BackendEventBus: { triggerRefreshQR: () => refreshed++ },
          Socket: {},
        };
      }
      if (id === '.') {
        return { isAuthenticated: () => false, isMultiDevice: () => true };
      }
      throw new Error(`Unexpected dependency: ${id}`);
    },
  });

  expect(await exports.refreshQR()).toEqual({ fullCode: 'new' });
  expect(refreshed).toBe(1);
});
