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

import { assertWid } from '../../assert';
import { Wid } from '../../whatsapp';
import { sendDeactivateCommunity as SendDeactivateCommunity } from '../../whatsapp/functions';

/**
 * Deactivated a community
 *
 * @example
 * ```javascript
 * await WPP.community.deactivate('123456@g.us');
 * ```
 *
 * @category Community
 */

export async function deactivate(communityId: string | Wid): Promise<any> {
  const wid = assertWid(communityId);
  return SendDeactivateCommunity({
    parentGroupId: wid,
  });
}
