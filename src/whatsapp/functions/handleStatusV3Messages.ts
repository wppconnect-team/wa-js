/*!
 * Copyright 2023 WPPConnect Team
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

/** @whatsapp 84947
 * @whatsapp 284947 >= 2.2222.8
 * @whatsapp 359554 >= 2.2230.8
 */
export declare function handleStatusV3Messages(
  data: any,
  b: any,
  c: any,
  d: any
): Promise<any>;

exportModule(
  exports,
  {
    handleStatusV3Messages: ['handleStatusV3Messages'],
  },
  (m) => m.handleStatusV3Messages
);
