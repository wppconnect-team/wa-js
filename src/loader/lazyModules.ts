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

/**
 * Where to find a module that is not part of the eagerly loaded bundles.
 */
export interface LazyModuleSource {
  /**
   * Bootloader components whose resource bundle defines the module, in the
   * order they should be tried. Names not present in the live component map
   * are skipped.
   */
  components: string[];
  /**
   * Used to rediscover candidates from the live component map when none of
   * `components` exists anymore (e.g. WhatsApp renamed them). Matching
   * component names are tried after the explicit ones.
   */
  pattern?: RegExp;
}

/**
 * Modules that live in a lazily bootloaded resource bundle.
 *
 * On WhatsApp Web >= 2.3000 the Meta module graph is split into resource
 * bundles the Bootloader fetches on demand. A module whose bundle the current
 * session never happened to need is simply absent from the module registry, so
 * `searchId()` cannot find it however many times it re-scans — the binding
 * stays `undefined` for the whole life of the page.
 *
 * The Bootloader can only be asked to fetch a bundle by *component* name (see
 * `Bootloader.__debug.componentMap`); the module ids a bundle defines are not
 * published anywhere on the page, so the mapping cannot be derived at runtime
 * and has to be recorded here.
 *
 * Measured on WA 2.3000.1045220589: a fresh session that never opens the
 * forward UI registers 13327 modules, none of them `WAWebChatForwardMessage`.
 * Bootloading `WAWebMediaForwardMediaMsg` registers 220 more (~25ms) and both
 * forward modules become resolvable.
 */
export const LAZY_MODULES: {
  readonly [moduleId: string]: LazyModuleSource;
} = {
  // Both forward modules ship in the same bundle, so either entry recovers
  // the other. `WAWebMediaForwardMediaMsg` is preferred because it is a plain
  // utility module: requiring it has no UI side effects, unlike the `.react`
  // flow components that also pull this bundle.
  WAWebChatForwardMessage: {
    components: [
      'WAWebMediaForwardMediaMsg',
      'WAWebForwardMessageFlow.react',
      'WAWebForwardMessageModal.react',
    ],
    pattern: /forward/i,
  },
  WAWebForwardMessagesToChat: {
    components: [
      'WAWebMediaForwardMediaMsg',
      'WAWebForwardMessageFlow.react',
      'WAWebForwardMessageModal.react',
    ],
    pattern: /forward/i,
  },
};

/**
 * Upper bound on how many components discovered through
 * {@link LazyModuleSource.pattern} are tried, so a loose pattern can never
 * make WA-JS download a large part of the application.
 */
export const MAX_DISCOVERED_COMPONENTS = 8;
