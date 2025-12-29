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

import { getMessageById } from '../../chat';
import { getMyUserId } from '../../conn';
import { WPPError } from '../../util';
import { MsgKey, StatusV3Store } from '../../whatsapp';
import { revokeStatus } from '../../whatsapp/functions';

export async function remove(msgId: string | MsgKey): Promise<boolean> {
  const msg = await getMessageById(msgId);
  try {
    const wid = getMyUserId();

    if (!wid)
      throw new WPPError(
        'no_self_user_wid_found_on_remove_status',
        `The logged account id is not found`
      );

    await revokeStatus(StatusV3Store.get(wid) as any, msg);
    return true;
  } catch (_error) {
    throw new WPPError(
      'error_on_remove_status',
      `Error on remove status with id ${msgId.toString()}`
    );
  }
}
