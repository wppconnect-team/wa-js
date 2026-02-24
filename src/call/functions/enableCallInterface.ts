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

import { wrapModuleFunction } from '../../whatsapp/exportModule';
import { getABPropConfigValue } from '../../whatsapp/functions';

/**
 * Enable call interface from desktop app
 */
export async function enableCallInterface() {
  wrapModuleFunction(getABPropConfigValue, (func, ...args) => {
    const [key] = args;
    switch (key) {
      case 'enable_web_calling':
      case 'enable_web_group_calling':
      case 'web_voip_call_tab_new_call':
        return true;
      case 'calling_lid_version':
        return 1;
      case 'heartbeat_interval_s':
        return 5;
      default:
        return func(...args);
    }
  });
}
