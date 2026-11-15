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

import * as loader from '../loader';
import { WPPError } from '../util';
import type { Wid } from './misc';

interface LegacyStore {
  find(id: Wid): Promise<{ status: string }>;
}
interface ModernBridge {
  getTextStatus(id: Wid): Promise<{
    text?: string | null;
    emoji?: string | null;
    lastUpdateTime?: number;
    ephemeralDurationSeconds?: number | null;
    error?: Error & { statusCode?: number };
  }>;
  setTextStatus(
    text: string | null,
    emoji: null,
    duration: number | null
  ): Promise<{ result?: string }>;
}
interface CacheUpdater {
  updateTextStatusForContact(params: {
    contactId: Wid;
    textString: string | null;
    emoji: string | null;
    ephemeralDuration: number | null;
    newUpdateTime: number;
    source: 'fetch' | 'set-self';
  }): Promise<void>;
}
interface TextStatusConstants {
  TEXT_STATUS_DURATION_INFINITE: number;
  CLEAR_TEXT_STATUS_LAST_UPDATE_TIME_VAL: number;
  CLEAR_TEXT_STATUS_STRING_VAL: null;
  CLEAR_TEXT_STATUS_EMOJI_VAL: null;
  CLEAR_TEXT_STATUS_EPHEMERAL_DURATION_VAL: null;
  TEXT_STATUS_NOT_AUTHORIZED: number;
}

function namespace(module: any, field: string): any {
  return module?.[field] !== undefined ? module : module?.default;
}

const legacyStoreCondition: loader.SearchModuleCondition = (m, id) =>
  !id.startsWith('fallback_') &&
  typeof namespace(m, 'TextStatusCollection')?.TextStatusCollection?.find ===
    'function';
const legacyJobsCondition: loader.SearchModuleCondition = (m, id) => {
  const jobs = namespace(m, 'setMyStatus');
  return (
    !id.startsWith('fallback_') &&
    typeof jobs?.getStatus === 'function' &&
    typeof jobs?.setMyStatus === 'function' &&
    (id === 'WAWebContactStatusBridge' ||
      typeof jobs?.queryStatusAll === 'function')
  );
};
const modernBridgeCondition: loader.SearchModuleCondition = (m, id) => {
  const bridge = namespace(m, 'getTextStatus');
  return (
    id === 'WAWebContactTextStatusBridge' &&
    typeof bridge?.getTextStatus === 'function' &&
    typeof bridge?.setTextStatus === 'function'
  );
};
const updaterCondition: loader.SearchModuleCondition = (m, id) =>
  id === 'WAWebUpdateTextStatusForContact' &&
  typeof namespace(m, 'updateTextStatusForContact')
    ?.updateTextStatusForContact === 'function';
const constantsCondition: loader.SearchModuleCondition = (m, id) => {
  const constants = namespace(m, 'TEXT_STATUS_DURATION_INFINITE');
  return (
    id === 'WAWebTextStatusUtils' &&
    constants?.TEXT_STATUS_DURATION_INFINITE === -1 &&
    constants?.CLEAR_TEXT_STATUS_LAST_UPDATE_TIME_VAL === 0 &&
    constants?.CLEAR_TEXT_STATUS_STRING_VAL === null &&
    constants?.CLEAR_TEXT_STATUS_EMOJI_VAL === null &&
    constants?.CLEAR_TEXT_STATUS_EPHEMERAL_DURATION_VAL === null &&
    constants?.TEXT_STATUS_NOT_AUTHORIZED === -3
  );
};

const clockCondition: loader.SearchModuleCondition = (m, id) =>
  id === 'WATimeUtils' &&
  typeof namespace(m, 'unixTime')?.unixTime === 'function';

function native<T>(
  id: string,
  field: string,
  condition: loader.SearchModuleCondition
): T | null {
  // A newly loaded predeclared ID may retain the same registry size. Requiring
  // its exact ID avoids a still-cached search miss after ensureLazyModule.
  try {
    const module = loader.loadModule(id);
    if (condition(module, id)) return namespace(module, field);
  } catch (_) {}
  const module = loader.search(condition);
  return module ? namespace(module, field) : null;
}

export function findLegacyTextStatusStore(): LegacyStore | null {
  return (
    native<{ TextStatusCollection: LegacyStore }>(
      'WAWebTextStatusCollection',
      'TextStatusCollection',
      legacyStoreCondition
    )?.TextStatusCollection || null
  );
}

function modernBackend() {
  const bridge = native<ModernBridge>(
    'WAWebContactTextStatusBridge',
    'getTextStatus',
    modernBridgeCondition
  );
  const updater = native<CacheUpdater>(
    'WAWebUpdateTextStatusForContact',
    'updateTextStatusForContact',
    updaterCondition
  );
  const constants = native<TextStatusConstants>(
    'WAWebTextStatusUtils',
    'TEXT_STATUS_DURATION_INFINITE',
    constantsCondition
  );
  const clock = native<{ unixTime(): number }>(
    'WATimeUtils',
    'unixTime',
    clockCondition
  );
  return bridge && updater && constants && clock
    ? { bridge, updater, constants, clock }
    : null;
}

async function requireModernBackend() {
  let backend = modernBackend();
  if (!backend) {
    await loader.ensureLazyModule('WAWebContactTextStatusBridge');
    backend = modernBackend();
  }
  if (!backend)
    throw new WPPError(
      'text_status_unavailable',
      'A complete native text status backend is not available'
    );
  return backend;
}

/** Read text only. Native401 represents a private/unavailable About. */
export async function readTextStatus(id: Wid): Promise<string> {
  // TODO: remove when versions with the legacy About collection leave wa-version/html.
  const store = findLegacyTextStatusStore();
  if (store) return (await store.find(id)).status;

  const { bridge, updater, constants } = await requireModernBackend();
  const result = await bridge.getTextStatus(id);
  if (result.error) {
    if (result.error.statusCode !== 401) throw result.error;
    await updater.updateTextStatusForContact({
      contactId: id,
      textString: null,
      emoji: null,
      ephemeralDuration: null,
      newUpdateTime: constants.TEXT_STATUS_NOT_AUTHORIZED,
      source: 'fetch',
    });
    return '';
  }
  if (result.lastUpdateTime !== undefined) {
    await updater.updateTextStatusForContact({
      contactId: id,
      textString: result.text ?? null,
      emoji: result.emoji ?? null,
      ephemeralDuration: result.ephemeralDurationSeconds ?? null,
      newUpdateTime: result.lastUpdateTime,
      source: 'fetch',
    });
  }
  return result.text ?? '';
}

/** Save the About and await its native cache update before reporting success. */
export async function writeTextStatus(id: Wid, text: string): Promise<boolean> {
  // TODO: remove when versions with the legacy About collection leave wa-version/html.
  const store = findLegacyTextStatusStore();
  const jobs = store
    ? native<{ setMyStatus(text: string): Promise<unknown> }>(
        'WAWebContactStatusBridge',
        'setMyStatus',
        legacyJobsCondition
      )
    : null;
  if (store && jobs) {
    await jobs.setMyStatus(text);
    const model = await store.find(id);
    if (model) model.status = text;
    return true;
  }

  // Resolve every required binding before dispatching the remote mutation.
  const { bridge, updater, constants, clock } = await requireModernBackend();
  const clearing = text === '';
  const savedText = clearing ? constants.CLEAR_TEXT_STATUS_STRING_VAL : text;
  const duration = clearing
    ? constants.CLEAR_TEXT_STATUS_EPHEMERAL_DURATION_VAL
    : constants.TEXT_STATUS_DURATION_INFINITE;
  const emoji = constants.CLEAR_TEXT_STATUS_EMOJI_VAL;
  const result = await bridge.setTextStatus(savedText, emoji, duration);
  if (result?.result !== 'SUCCESS') return false;

  try {
    await updater.updateTextStatusForContact({
      contactId: id,
      textString: savedText,
      emoji,
      ephemeralDuration: duration,
      newUpdateTime: clearing
        ? constants.CLEAR_TEXT_STATUS_LAST_UPDATE_TIME_VAL
        : clock.unixTime(),
      source: 'set-self',
    });
  } catch (cause) {
    throw new WPPError(
      'text_status_cache_update_failed',
      'The About was saved remotely but its local cache update failed',
      { cause, remoteUpdated: true }
    );
  }
  return true;
}
