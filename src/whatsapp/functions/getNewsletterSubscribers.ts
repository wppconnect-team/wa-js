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
 * @whatsapp 276084
 */
export declare function getNewsletterSubscribers(
  jid: string,
  param2: number,
  view: 'LIMITED'
): Promise<{
  subscribers: {
    id: Wid;
    isContact?: boolean;
    isGroup?: boolean;
    isOnline?: boolean;
    isUser?: boolean;
    shortname?: string;
    state?: string;
    displayName?: string;
    phoneNumber?: string;
    subscribeTime?: number;
    t: number;
  }[];
}>;

exportModule(
  exports,
  {
    getNewsletterSubscribers: 'getNewsletterSubscribers',
  },
  (m) => m.getNewsletterSubscribers
);
