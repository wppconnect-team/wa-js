/*!
 * Copyright 2021 WPPConnect Team
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

function authCodeFixture(options: {
  nativeCamera?: boolean;
  knob770?: boolean;
}) {
  const exports: any = {};
  runInNewContext(transpile('conn/functions/getAuthCode.ts'), {
    exports,
    require(id: string) {
      if (id === '../../whatsapp') {
        return {
          Base64: { encodeB64: (key: string) => `b64(${key})` },
          CompanionRegClientUtils: { DEVICE_PLATFORM: '1' },
          Conn: { ref: '2@ref', connected: false },
        };
      }
      if (id === '../../loader') {
        const justknobx = {
          _: (knob: string) => knob === '770' && !!options.knob770,
        };
        return {
          loadModule: (moduleId: string) =>
            moduleId === 'justknobx' ? { default: justknobx } : null,
        };
      }
      if (id === '../../whatsapp/functions') {
        return {
          isNativeCameraQRLinkedDeviceTest: () => !!options.nativeCamera,
        };
      }
      if (id === '../../whatsapp/multidevice') {
        return {
          adv: { getADVSecretKey: () => 'adv' },
          waNoiseInfo: {
            get: async () => ({ staticKeyPair: { pubKey: 'static' } }),
          },
          waSignalStore: {
            getRegistrationInfo: async () => ({
              identityKeyPair: { pubKey: 'identity' },
            }),
          },
        };
      }
      if (id === '.') {
        return {
          isAuthenticated: () => false,
          isMultiDevice: () => true,
          isRegistered: () => false,
        };
      }
      throw new Error(`Unexpected dependency: ${id}`);
    },
  });
  return exports.getAuthCode as () => Promise<any>;
}

const base = '2@ref,b64(static),b64(identity),adv,1';

test('fullCode is the string WhatsApp encodes in its QR code', async () => {
  const code = await authCodeFixture({})();
  expect(code.platform).toBe('1');
  expect(code.fullCode).toBe(base);
});

test('fullCode is a wa.me link under the native camera experiment', async () => {
  const code = await authCodeFixture({ nativeCamera: true, knob770: true })();
  expect(code.fullCode).toBe(`https://wa.me/settings/linked_devices#${base}`);
});

test('fullCode ends with the help link under knob 770', async () => {
  const code = await authCodeFixture({ knob770: true })();
  expect(code.fullCode).toBe(`${base},https://faq.whatsapp.com/r/ld`);
});

test('auth_code_change also fires when the ADV secret changes', async () => {
  const internalEv = new EventEmitter2();
  const conn = new EventEmitter2();
  const advSecret = new EventEmitter2();
  const callbacks: Array<() => void> = [];
  let secret = 'adv1';
  const emitted: string[] = [];
  internalEv.on('conn.auth_code_change', (code) => emitted.push(code.fullCode));
  runInNewContext(transpile('conn/events/registerAuthCodeChangeEvent.ts'), {
    exports: {},
    require(id: string) {
      if (id === '../../eventEmitter') return { internalEv };
      if (id === '../../loader') {
        return {
          onInjected: (callback: () => void) => callbacks.push(callback),
        };
      }
      if (id === '../../whatsapp') {
        return { advSecretEventEmitter: advSecret, Conn: conn };
      }
      if (id === '..') {
        return { getAuthCode: async () => ({ fullCode: `ref,${secret}` }) };
      }
      throw new Error(`Unexpected dependency: ${id}`);
    },
  });
  callbacks[0]();
  await new Promise((resolve) => setTimeout(resolve));

  secret = 'adv2';
  advSecret.emit('change');
  await new Promise((resolve) => setTimeout(resolve));

  expect(emitted).toEqual(['ref,adv1', 'ref,adv2']);
});
