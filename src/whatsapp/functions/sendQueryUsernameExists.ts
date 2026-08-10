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

import { Wid } from '..';
import { exportModule } from '../exportModule';

export declare function queryUsernameExists(
  username: string,
  key?: string,
  requestOrigin?: string // Telemetry only, not used for the actual query
): Promise<
  | {
      wid: Wid;
      biz: boolean;
      bizInfo?: {
        verifiedName?: {
          isApi: boolean;
          level: string;
          name: string;
          privacyMode: any;
          serial: string;
        };
      };
      username?: string;
      wasUpdated: boolean;
      isUsernameSearch: true;
    }
  | {
      keyRequired: true;
      username?: string;
      isUsernameSearch: true;
    }
  | null
>;

/**
 * Query the username currently associated with a LID
 *
 * Returns `undefined` when the wid is not a LID or the server has no record
 * for it. As a side effect, WhatsApp stores the result, so a subsequent
 * `ContactStore` read reflects the refreshed username.
 */
export declare function queryWidUsernameExists(
  wid: Wid,
  requestOrigin?: string // Telemetry only, not used for the actual query
): Promise<
  | {
      username?: string;
      usernameChanged: boolean;
      wasPreviouslyKnown: boolean;
      isPhoneNumberKnown: boolean;
      oldUsername?: string;
    }
  | undefined
>;

exportModule(
  exports,
  {
    queryUsernameExists: ['queryUsernameExists'],
    queryWidUsernameExists: ['queryWidUsernameExists'],
  },
  // Match on queryUsernameExists alone: queryWidUsernameExists is newer, and
  // requiring both would break the username lookup on versions that predate it
  (m) => m.queryUsernameExists
);
