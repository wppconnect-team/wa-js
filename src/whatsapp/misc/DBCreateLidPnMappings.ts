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
import { Wid } from './Wid';

interface LidPnMapping {
  lid: Wid;
  pn: Wid;
}

interface CreateLidPnMappingsParams {
  mappings: LidPnMapping[];
  flushImmediately: boolean;
  learningSource: string;
}

/**
 * @whatsapp WAWebDBCreateLidPnMappings
 * Last verified >= 2.3000.1032022795
 */
export declare function createLidPnMappings(
  params: CreateLidPnMappingsParams
): Promise<void>;

exportModule(
  exports,
  {
    createLidPnMappings: 'createLidPnMappings',
  },
  (m) => m.createLidPnMappings
);
