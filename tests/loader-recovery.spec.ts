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

// Regression tests for the WhatsApp Web >= 2.3000 "Meta loader" lazy-module
// breakage (issue #3481). On that build every module factory is registered up
// front but executes lazily, so a finder that runs before its module has
// executed misses and (before the fix) cached that miss permanently; dozens of
// event/patch registrars then threw on undefined bindings during boot. The
// observable end state was `WPP.isReady`/`isFullReady` stuck false, a cascade of
// "Module X was not found" errors, and — once retry logic was added — lifecycle
// events re-emitted in a tight loop that pinned the CPU.
//
// The plain smoke test only asserts `isReady`; these assert the parts that were
// specifically broken and specifically fixed: full readiness, a finder that had
// disappeared executing cleanly, and the absence of a runaway emission loop.
// They run unauthenticated (QR screen) — full readiness is reached pre-login.

import { expect, test } from './wpp-test';

test.describe('loader recovery (regression #3481)', () => {
  test('reaches full readiness, not just injected/ready', async ({ page }) => {
    const state = await page.evaluate(() => ({
      isInjected: (window as any).WPP?.isInjected === true,
      isReady: (window as any).WPP?.isReady === true,
      // isFullReady was the flag left permanently false by #3481: it is gated
      // on conn.main_ready, whose registrar was one of the ones that died on an
      // undefined binding during boot.
      isFullReady: (window as any).WPP?.isFullReady === true,
    }));

    expect(state.isInjected).toBe(true);
    expect(state.isReady).toBe(true);
    expect(state.isFullReady).toBe(true);
  });

  test('finders recovered: conn.isAuthenticated() executes without throwing', async ({
    page,
  }) => {
    // `isAuthenticated` was one of the finders reported missing in #3481
    // ("Module isAuthenticated was not found" / "wa_functions.isAuthenticated
    // is not a function"). If the finder recovered, calling it resolves the
    // underlying module and returns a boolean instead of throwing.
    const result = await page.evaluate(() => {
      try {
        const value = (window as any).WPP.conn.isAuthenticated();
        return { ok: true, type: typeof value };
      } catch (error) {
        return { ok: false, error: String(error) };
      }
    });

    expect(result.ok, `isAuthenticated threw: ${result.error ?? ''}`).toBe(
      true
    );
    expect(result.type).toBe('boolean');
  });

  test('core stores resolve (finder no longer permanently misses)', async ({
    page,
  }) => {
    // Force-resolve the internal modules whose finders were failing. Every one
    // exposes exactly the shape its finder predicate looks for once its module
    // has executed — proving the miss was a timing/cache artifact, not a
    // rename/removal.
    const resolved = await page.evaluate(() => {
      const require = (window as any).WPP.loader.moduleRequire;
      const has = (id: string, key: string) => {
        try {
          const mod = require(id);
          return !!mod && key in mod;
        } catch {
          return false;
        }
      };
      return {
        chatCollection: has('WAWebChatCollection', 'ChatCollection'),
        msgCollection: has('WAWebMsgCollection', 'MsgCollection'),
        conn: has('WAWebConnModel', 'Conn'),
        cmd: has('WAWebCmd', 'Cmd'),
        socket: has('WAWebSocketModel', 'Socket'),
      };
    });

    expect(resolved).toEqual({
      chatCollection: true,
      msgCollection: true,
      conn: true,
      cmd: true,
      socket: true,
    });
  });

  test('no runaway lifecycle-event emission loop', async ({ page }) => {
    // The first retry-based fix left registrars re-running every ~100ms, which
    // re-emitted lifecycle events in a tight loop (measured ~30 `conn.main_init`
    // emissions in 3s) and eventually froze the tab. By the time the page is
    // `isReady`, `conn.main_init` has already fired once and must be quiet; a
    // healthy loader emits it at most once more, never continuously.
    const emissions = await page.evaluate(
      () =>
        new Promise<number>((resolve) => {
          let count = 0;
          const wpp = (window as any).WPP;
          const handler = () => {
            count++;
          };
          wpp.on('conn.main_init', handler);
          setTimeout(() => {
            wpp.off('conn.main_init', handler);
            resolve(count);
          }, 3000);
        })
    );

    expect(emissions).toBeLessThan(5);
  });
});
