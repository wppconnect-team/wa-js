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
 * Module IDs in WhatsApp's Meta loader that must be skipped when
 * enumerating modules. They throw or otherwise misbehave when required.
 *
 * Each entry should be annotated with the WA version where it was added.
 */
export const META_MODULE_ID_BLACKLIST: ReadonlySet<string> = new Set([
  // Throws "bx(...): Unknown file path "9550""
  'WAWebEmojiPanelContentEmojiSearchEmpty.react',
  // Locale shim that fails to resolve
  'WAWebMoment-es-do',
]);

/**
 * Property names handled by `exportModule()` whose absence is acceptable
 * (e.g., they only resolve after device is connected, or were renamed in a
 * specific WA version). When missing, no error is reported.
 */
export const IGNORE_FAIL_MODULES: ReadonlySet<string> = new Set([
  'revokeStatus',
  'toggleNewsletterAdminActivityMuteStateAction',
  // stopped working in WA version ~2.3000.1034162388
  'msgFindQuery',
  // The following were added in WA version 2.3000.1034162388 and are
  // unavailable on older versions. Remove once older versions are no
  // longer supported.
  'msgFindBefore',
  'msgFindAfter',
  'msgFindByDirection',
  'msgFindCallLog',
  'msgFindEvents',
  'msgFindMedia',
  'msgFindSearch',
  'msgFindStarred',
]);
