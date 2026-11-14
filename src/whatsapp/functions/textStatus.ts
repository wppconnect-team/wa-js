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

import { exportModule } from '../exportModule';
import { Wid } from '../misc';

/**
 * Fetch the About of a contact. Resolves with `error` set instead of
 * rejecting when the query fails.
 * @whatsapp WAWebContactTextStatusBridge
 */
export declare function getTextStatus(
  contactId: Wid,
  lastUpdateTime?: number
): Promise<{
  id: Wid;
  text?: string | null;
  emoji?: string | null;
  lastUpdateTime?: number;
  ephemeralDurationSeconds?: number | null;
  error?: Error;
}>;

/**
 * @whatsapp WAWebContactTextStatusBridge
 */
export declare function setTextStatus(
  text: string | null,
  emoji: string | null,
  ephemeralDuration: number | null
): Promise<{ result?: 'SUCCESS' | 'FAILURE' | string }>;

exportModule(
  exports,
  {
    getTextStatus: ['getTextStatus', 'default.getTextStatus'],
    setTextStatus: ['setTextStatus', 'default.setTextStatus'],
  },
  (m, id) => {
    const bridge = m.getTextStatus ? m : m.default;
    return (
      id === 'WAWebContactTextStatusBridge' &&
      typeof bridge?.getTextStatus === 'function' &&
      typeof bridge?.setTextStatus === 'function'
    );
  }
);

/**
 * @whatsapp WAWebUpdateTextStatusForContact
 */
export declare function updateTextStatusForContact(params: {
  contactId: Wid;
  textString: string | null;
  emoji: string | null;
  ephemeralDuration: number | null;
  newUpdateTime: number;
  source: string;
}): Promise<void>;

exportModule(
  exports,
  {
    updateTextStatusForContact: [
      'updateTextStatusForContact',
      'default.updateTextStatusForContact',
    ],
  },
  (m, id) =>
    id === 'WAWebUpdateTextStatusForContact' &&
    (typeof m.updateTextStatusForContact === 'function' ||
      typeof m.default?.updateTextStatusForContact === 'function')
);
