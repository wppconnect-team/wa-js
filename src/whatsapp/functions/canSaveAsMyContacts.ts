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
 * Check if a contact can be saved to contacts
 * @whatsapp WAWebContactUtils >= 2.3000.0
 * @note Function name changed from canSaveAsMyContacts (plural) to canSaveAsMyContact (singular) in newer versions (>= 2.3000.10286.x)
 */
export declare function canSaveAsMyContact(wid: Wid): boolean;

/**
 * @deprecated Use canSaveAsMyContact instead. This alias is kept for backward compatibility.
 */
export declare function canSaveAsMyContacts(wid: Wid): boolean;

exportModule(
  exports,
  {
    canSaveAsMyContact: ['canSaveAsMyContact', 'canSaveAsMyContacts'],
    canSaveAsMyContacts: ['canSaveAsMyContact', 'canSaveAsMyContacts'],
  },
  (m) => m.canSaveAsMyContact || m.canSaveAsMyContacts
);
