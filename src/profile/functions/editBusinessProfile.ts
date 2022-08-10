/*!
 * Copyright 2021 WPPConnect Team
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

import {
  BusinessProfileModel,
  BusinessProfileStore,
  Conn,
  UserPrefs,
} from '../../whatsapp';
import { editBusinessProfile as editProfile } from '../../whatsapp/functions';

/**
 * Update your business profile
 *
 * @example
 * ```javascript
 * await WPP.profile.editBusinessProfile({description: 'New description for profile'});
 * ```
 *
 * ```javascript
 * await WPP.profile.editBusinessProfile({categories: {
    id: "133436743388217",
    localized_display_name: "Artes e entretenimento",
    not_a_biz: false,
  }});
 * ```
 *
 * ```javascript
 * await WPP.profile.editBusinessProfile({adress: 'Street 01, New York'});
 * ```
 *
 * ```javascript
 * await WPP.profile.editBusinessProfile({adress: 'Street 01, New York'});
 * ```
 * 
 * ```javascript
 * await WPP.profile.editBusinessProfile({email: 'test@test.com.br'});
 * ```
 * 
 * Change website of profile (max 2 sites)
 * ```javascript
 * await WPP.profile.editBusinessProfile({website: [
  "https://www.wppconnect.io",
  "https://www.teste2.com.br",
]});
 * ```
 * 
 * Change businessHours for Specific Hours
 * ```javascript
 * await WPP.profile.editBusinessProfile({ businessHours: { 
 * {
      tue: {
        mode: "specific_hours",
        hours: [
          [
            540,
            1080,
          ],
        ],
      },
      wed: {
        mode: "specific_hours",
        hours: [
          [
            540,
            1080,
          ],
        ],
      },
      thu: {
        mode: "specific_hours",
        hours: [
          [
            540,
            1080,
          ],
        ],
      },
      fri: {
        mode: "specific_hours",
        hours: [
          [
            540,
            1080,
          ],
        ],
      },
      sat: {
        mode: "specific_hours",
        hours: [
          [
            540,
            1080,
          ],
        ],
      },
      sun: {
        mode: "specific_hours",
        hours: [
          [
            540,
            1080,
          ],
        ],
      },
    }
  },
  timezone: "America/Sao_Paulo"
  });
 *
 * Change businessHours for Always Opened
 * ```javascript
 * await WPP.profile.editBusinessProfile({ businessHours: { 
    {
      mon: {
        mode: "open_24h",
      },
      tue: {
        mode: "open_24h",
      },
      wed: {
        mode: "open_24h",
      },
      thu: {
        mode: "open_24h",
      },
      fri: {
        mode: "open_24h",
      },
      sat: {
        mode: "open_24h",
      },
      sun: {
        mode: "open_24h",
      },
    }
    timezone: "America/Sao_Paulo"
  });
 *
 * Change businessHours for Appointment Only
 * ```javascript
 * await WPP.profile.editBusinessProfile({ businessHours: { {
    mon: {
      mode: "appointment_only",
    },
    tue: {
      mode: "appointment_only",
    },
    wed: {
      mode: "appointment_only",
    },
    thu: {
      mode: "appointment_only",
    },
    fri: {
      mode: "appointment_only",
    },
    sat: {
      mode: "appointment_only",
    },
    sun: {
      mode: "appointment_only",
    },
  }
    timezone: "America/Sao_Paulo"
  });
 *
 *
 * ```
 * @category Profile
 */

export async function editBusinessProfile(params: BusinessProfileModel) {
  if (!Conn.isSMB) {
    return;
  }
  await editProfile(params);
  const profile = await BusinessProfileStore.fetchBizProfile(
    UserPrefs.getMaybeMeUser()
  );
  return profile;
}
