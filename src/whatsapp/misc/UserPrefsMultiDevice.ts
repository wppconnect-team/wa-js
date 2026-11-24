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
import { EventEmitter } from './EventEmitter';

/**
 * Emits 'change' when the server refreshes the companion registration and the
 * QR code gets a new ADV secret with the same ref
 * @whatsapp WAWebUserPrefsMultiDevice
 */
export declare const advSecretEventEmitter: EventEmitter;

exportModule(
  exports,
  { advSecretEventEmitter: 'advSecretEventEmitter' },
  (m, id) =>
    id === 'WAWebUserPrefsMultiDevice' ||
    (m.advSecretEventEmitter && m.getADVSecretKey)
);
