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

import { expect, Page, test } from '@playwright/test';
import { readFileSync } from 'fs';
import * as path from 'path';
import { ModuleKind, transpileModule } from 'typescript';

const source = transpileModule(
  readFileSync(
    path.join(__dirname, '../src/conn/events/registerQRCodeChangeEvent.ts'),
    'utf8'
  ),
  { compilerOptions: { module: ModuleKind.CommonJS } }
).outputText;

// Loads the module with stubbed deps plus helpers that mimic how WhatsApp
// renders the QR: React commits data-ref, then an effect redraws the canvas
async function setup(page: Page, loggedIn = false) {
  await page.setContent('<div id="app"></div>');
  await page.evaluate(
    ({ source, loggedIn }) => {
      const w = window as any;
      const emitted: any[] = [];
      const listeners: Record<string, () => void> = {};
      let injected = () => {};
      const exports: any = {};
      const deps: Record<string, any> = {
        '../../eventEmitter': {
          internalEv: {
            emit: (event: string, value: any) => emitted.push({ event, value }),
            on: (event: string, cb: () => void) => (listeners[event] = cb),
          },
        },
        '../../loader': { onInjected: (cb: () => void) => (injected = cb) },
        '../../whatsapp': { Cmd: { on: () => {} } },
        '../functions/isAuthenticated': { isAuthenticated: () => loggedIn },
      };
      new Function('exports', 'require', source)(
        exports,
        (id: string) => deps[id]
      );

      let holder: HTMLDivElement;
      let canvas: HTMLCanvasElement;
      const draw = (seed: number) => {
        const ctx = canvas.getContext('2d')!;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#122e31';
        for (let i = 0; i < 20; i++)
          ctx.fillRect((i * seed * 7) % 200, i * 10, 9, 9);
      };
      w.qr = {
        emitted,
        listeners,
        inject: () => injected(),
        painted: () => exports.getPaintedQRCode(),
        // new WAWeb-qrcode(): canvas created and drawn in the same effect
        show(code: string, seed?: number) {
          holder = document.createElement('div');
          holder.setAttribute('data-ref', code);
          canvas = document.createElement('canvas');
          canvas.width = canvas.height = 228;
          holder.appendChild(canvas);
          document.getElementById('app')!.appendChild(holder);
          if (seed) draw(seed);
        },
        commit: (code: string) => holder.setAttribute('data-ref', code),
        // makeCode(): title set, canvas drawn, then WhatsApp removes the title
        redraw(code: string, seed: number) {
          holder.title = code;
          draw(seed);
          holder.removeAttribute('title');
        },
        silentRedraw: (seed: number) => draw(seed),
      };
    },
    { source, loggedIn }
  );
}

const tick = (page: Page, ms = 20) => page.waitForTimeout(ms);
const codes = (page: Page) =>
  page.evaluate(() =>
    (window as any).qr.emitted.map((e: any) => `${e.event}:${e.value.fullCode}`)
  );

test('emits the QR code once WhatsApp has painted it', async ({ page }) => {
  await setup(page);
  await page.evaluate(() => (window as any).qr.inject());
  await page.evaluate(() => (window as any).qr.show('code-1', 1));
  await tick(page);

  expect(await codes(page)).toEqual(['conn.qrcode_change:code-1']);
  const painted = await page.evaluate(() => (window as any).qr.painted());
  expect(painted.fullCode).toBe('code-1');
  expect(painted.base64Image).toMatch(/^data:image\/png;base64,/);
});

test('waits for the canvas redraw after the ref changes', async ({ page }) => {
  await setup(page);
  await page.evaluate(() => (window as any).qr.inject());
  await page.evaluate(() => (window as any).qr.show('code-1', 1));
  await tick(page);

  // data-ref is new but the canvas still shows code-1
  await page.evaluate(() => (window as any).qr.commit('code-2'));
  await tick(page);
  expect(await codes(page)).toEqual(['conn.qrcode_change:code-1']);
  expect(await page.evaluate(() => (window as any).qr.painted())).toBeNull();

  await page.evaluate(() => (window as any).qr.redraw('code-2', 2));
  await tick(page);
  expect(await codes(page)).toEqual([
    'conn.qrcode_change:code-1',
    'conn.qrcode_change:code-2',
  ]);
});

test('ignores a blank canvas and still catches a draw without mutations', async ({
  page,
}) => {
  await setup(page);
  await page.evaluate(() => (window as any).qr.inject());
  await page.evaluate(() => (window as any).qr.show('code-1'));
  await tick(page);
  expect(await codes(page)).toEqual([]);

  await page.evaluate(() => (window as any).qr.silentRedraw(1));
  await tick(page, 400);
  expect(await codes(page)).toEqual(['conn.qrcode_change:code-1']);
});

test('does not watch a logged-in session', async ({ page }) => {
  await setup(page, true);
  await page.evaluate(() => (window as any).qr.inject());
  await page.evaluate(() => (window as any).qr.show('code-1', 1));
  await tick(page);
  expect(await codes(page)).toEqual([]);
});

test('stops watching after the QR code is scanned', async ({ page }) => {
  await setup(page);
  await page.evaluate(() => (window as any).qr.inject());
  await page.evaluate(() => (window as any).qr.show('code-1', 1));
  await tick(page);
  await page.evaluate(() =>
    (window as any).qr.listeners['conn.authenticated']()
  );

  await page.evaluate(() => {
    (window as any).qr.commit('code-2');
    (window as any).qr.redraw('code-2', 2);
  });
  await tick(page, 400);
  expect(await codes(page)).toEqual(['conn.qrcode_change:code-1']);
  expect(await page.evaluate(() => (window as any).qr.painted())).toBeNull();
});
