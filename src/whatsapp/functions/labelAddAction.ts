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

/** @whatsapp 165820
 */
export declare function labelAddAction(
  name: string,
  colorIndex: number
): Promise<any>;
export declare function labelDeleteAction(
  id: string,
  name: string,
  colorIndex: number
): Promise<number>;
export declare function labelEditAction(
  id: string,
  name: string,
  predefinedId: number,
  colorIndex: number
): Promise<any>;

exportModule(
  exports,
  {
    labelAddAction: 'labelAddAction',
    labelDeleteAction: 'labelDeleteAction',
    labelEditAction: 'labelEditAction',
  },
  (m) => m.labelAddAction && m.labelDeleteAction && m.labelEditAction
);
