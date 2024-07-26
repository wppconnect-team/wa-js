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

import { webpack } from '../..';
import { wrapModuleFunction } from '../../whatsapp/exportModule';
import * as wa_functions from '../../whatsapp/functions';
import { getABPropConfigValue } from '../../whatsapp/functions';

/**
 * Update your username
 *
 * @example
 * ```javascript
 * await WPP.profile.setUsername('newusername');
 * ```
 *
 * @category Profile
 */

export async function setUsername(username: string): Promise<any> {
  return username;
}

webpack.onFullReady(() => {
  // Force to load username change btn in whatsapp web
  wrapModuleFunction(getABPropConfigValue, (func, ...args) => {
    const [key] = args;
    switch (key) {
      case 'username_creation':
        return 1;
      case 'username_security_code_verification':
        return 1;
      case 'username_security_code_generation':
        return 1;
      case 'mex_usync_username_query':
        return 1;
      case 'username_contact_display':
        return 1;
      case 'username_usync':
        return 1;
      case 'username_change':
        return 1;
    }
    return func(...args);
  });

  wrapModuleFunction(wa_functions.primaryFeatureEnabled, (func, ...args) => {
    const [key] = args;
    switch (key) {
      case 'username_supported':
        return 1 as any;
      case 'username_usync':
        return 1;
      case 'username_change':
        return 1;
    }
    return func(...args);
  });
});
