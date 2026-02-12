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
 * @whatsapp WAWebNewsletterToggleAdminActivityMuteStateAction >= 2.3000.1032373751
 */
export declare const toggleNewsletterAdminActivityMuteStateAction:
  | ((
      newsletterId: Wid,
      muteExpirationValue: number,
      options: { eventSurface?: number }
    ) => Promise<void>)
  | undefined;

exportModule(
  exports,
  {
    toggleNewsletterAdminActivityMuteStateAction:
      'toggleNewsletterAdminActivityMuteStateAction',
  },
  (m) => m.toggleNewsletterAdminActivityMuteStateAction
);
