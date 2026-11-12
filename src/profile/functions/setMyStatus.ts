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

import { getMyUserWid } from '../../conn/functions/getMyUserWid';
import { StatusStore } from '../../whatsapp';
import * as wa_functions from '../../whatsapp/functions';

/** WAWebTextStatusUtils.TEXT_STATUS_DURATION_INFINITE ("Until I change it") */
const TEXT_STATUS_DURATION_INFINITE = -1;

/**
 * Update your current text status
 *
 * @example
 * ```javascript
 * await WPP.profile.setMyStatus('Example text');
 * ```
 *
 * @category Profile
 */

export async function setMyStatus(statusText: string) {
  // WA >= ~2.3000.1054241206 dropped the legacy About job and collection
  // TODO: remove the legacy path when 2.3000.1053597858 is no longer available in wa-version/html
  if (!StatusStore) {
    const result = await wa_functions.setTextStatus(
      statusText,
      null,
      TEXT_STATUS_DURATION_INFINITE
    );

    if (result?.result !== 'SUCCESS') {
      return false;
    }

    // Same local update WhatsApp does after saving the About
    await wa_functions
      .updateTextStatusForContact({
        contactId: getMyUserWid(),
        textString: statusText,
        emoji: null,
        ephemeralDuration: TEXT_STATUS_DURATION_INFINITE,
        newUpdateTime: Math.floor(Date.now() / 1000),
        source: 'set-self',
      })
      .catch(() => null);

    return true;
  }

  await wa_functions.setMyStatus(statusText);
  const myStatus = await StatusStore.find(getMyUserWid());

  if (myStatus) {
    myStatus.status = statusText;
  }

  return true;
}
