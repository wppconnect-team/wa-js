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
 * Independently inspect native capabilities before enumerating lazy exports.
 * This function is serialized into the browser by the compatibility checks.
 */
export function inspectTextStatusCompatibility() {
  const loader = window.WPP.loader;
  const object = (m: any, field: string) =>
    m?.[field] !== undefined ? m : m?.default;
  const find = (id: string, field: string) => {
    try {
      const m = loader.loadModule<any>(id);
      if (object(m, field)) return object(m, field);
    } catch (_) {}
    return null;
  };
  const storeModule = loader.search<any>(
    (m) =>
      typeof object(m, 'TextStatusCollection')?.TextStatusCollection?.find ===
      'function'
  );
  const store = object(
    storeModule,
    'TextStatusCollection'
  )?.TextStatusCollection;
  const collection = loader.search<any>(
    (m) =>
      typeof object(m, 'TextStatusCollectionImpl')?.TextStatusCollectionImpl ===
        'function' ||
      typeof object(m, 'TextStatusCollection')?.TextStatusCollection ===
        'function'
  );
  const model = loader.search<any>(
    (m) =>
      Array.isArray(m?.default?.prototype?.__props) &&
      m.default.prototype.__props.includes('status')
  );
  const jobsModule = loader.search<any>((m, id) => {
    const jobs = object(m, 'getStatus');
    return (
      typeof jobs?.getStatus === 'function' &&
      typeof jobs?.setMyStatus === 'function' &&
      (id === 'WAWebContactStatusBridge' ||
        typeof jobs?.queryStatusAll === 'function')
    );
  });
  const bridge = find('WAWebContactTextStatusBridge', 'getTextStatus');
  const updater = find(
    'WAWebUpdateTextStatusForContact',
    'updateTextStatusForContact'
  );
  const utils = find('WAWebTextStatusUtils', 'TEXT_STATUS_DURATION_INFINITE');
  const clock = find('WATimeUtils', 'unixTime');
  const legacy = !!(store && collection && model && jobsModule);
  const modern =
    typeof bridge?.getTextStatus === 'function' &&
    typeof bridge?.setTextStatus === 'function' &&
    typeof updater?.updateTextStatusForContact === 'function' &&
    utils?.TEXT_STATUS_DURATION_INFINITE === -1 &&
    utils?.CLEAR_TEXT_STATUS_LAST_UPDATE_TIME_VAL === 0 &&
    utils?.TEXT_STATUS_NOT_AUTHORIZED === -3 &&
    utils?.CLEAR_TEXT_STATUS_STRING_VAL === null &&
    utils?.CLEAR_TEXT_STATUS_EMOJI_VAL === null &&
    utils?.CLEAR_TEXT_STATUS_EPHEMERAL_DURATION_VAL === null &&
    typeof clock?.unixTime === 'function';
  return {
    legacy,
    modern,
    optionalBindings:
      modern && !legacy
        ? [
            'StatusCollection',
            'StatusModel',
            'StatusStore',
            'functions.getStatus',
            'functions.setMyStatus',
          ]
        : legacy && !modern
          ? [
              'functions.getTextStatus',
              'functions.setTextStatus',
              'functions.updateTextStatusForContact',
            ]
          : [],
  };
}
