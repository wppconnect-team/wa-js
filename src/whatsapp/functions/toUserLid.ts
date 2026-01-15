/*!
 * Copyright 2024 WPPConnect Team
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
 * @deprecated Use toUserLidOrThrow instead. This function will be removed in future versions.
 * This function was removed from WhatsApp Web since (2.3000.1031992593~) but is still available here for backward compatibility.
 * @whatsapp WAWebLidMigrationUtils >= 2.3000.x
 */
export declare function toUserLid(wid: Wid): Wid;

/**
 * @whatsapp WAWebLidMigrationUtils >= 2.3000.1032013519
 */
export declare function toUserLidOrThrow(wid: Wid): Wid;

exportModule(
  exports,
  {
    toUserLid: ['toUserLid', 'toUserLidOrThrow'],
    toUserLidOrThrow: 'toUserLidOrThrow',
  },
  (m) => m.toUserLid || m.toUserLidOrThrow
);
