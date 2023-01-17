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
import { WapNode } from './WapNode';

/**
 * @whatsapp 898165 >= 2.2301.6
 */
export declare function smax(
  tag: any,
  attrs?: { [key: string]: any },
  content?: any[] | string
): WapNode;

exportModule(
  exports,
  {
    smax: 'smax',
  },
  (m) => m.smax
);
