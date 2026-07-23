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

/**
 * WhatsApp Web (>= 2.3000) replaces `window.setInterval`/`clearInterval`
 * (and the timeout pair) with its own JSScheduler-backed implementations at
 * some point during boot. Timer IDs are not portable across implementations:
 * an interval created with one implementation cannot be cancelled by the
 * other — `clearInterval` silently no-ops and the interval runs forever.
 *
 * wa-js is typically injected at `document_start`, long before that swap, so
 * any timer it creates early and tries to clear later (retry/poll loops in
 * the loader, `registerMainInit`'s check interval, debounces) leaks and
 * re-fires indefinitely. This was a key amplifier of #3481: listener-retry
 * intervals could never be cleared, so registrars re-ran every 100ms forever,
 * re-emitting lifecycle events and pinning the CPU.
 *
 * Capture one consistent set of timer functions at bundle-eval time and use
 * it for every internal timer. Consistency is the point (create and clear
 * always go through the same implementation) — if wa-js happens to be
 * injected after the swap, the captured scheduler pair is just as valid.
 */

const globalRef = (
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof self !== 'undefined'
      ? self
      : window
) as any;

export const consistentSetInterval: typeof setInterval =
  globalRef.setInterval.bind(globalRef);
export const consistentClearInterval: typeof clearInterval =
  globalRef.clearInterval.bind(globalRef);
export const consistentSetTimeout: typeof setTimeout =
  globalRef.setTimeout.bind(globalRef);
