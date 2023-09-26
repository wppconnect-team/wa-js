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

import { config } from '..';
import * as webpack from '../webpack';
import { UserPrefs } from '../whatsapp';
import { wrapModuleFunction } from '../whatsapp/exportModule';
import { handleSingleMsg } from '../whatsapp/functions';

webpack.onFullReady(applyPatch);

function applyPatch() {
  wrapModuleFunction(handleSingleMsg, async (func, ...args) => {
    const [wid, msg] = args;

    if (!config.syncAllStatus && wid.isStatusV3()) {
      const me = UserPrefs.getMaybeMeUser();

      if (msg.author && !me.equals(msg.author)) {
        return;
      }
    }

    return func(...args);
  });
}
