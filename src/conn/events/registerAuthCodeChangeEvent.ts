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

import Debug from 'debug';

import * as webpack from '../../webpack';
import { Conn } from '../../whatsapp';
import { getAuthCode } from '..';
import { eventEmitter } from '../eventEmitter';

const debug = Debug('WA-JS:conn');

webpack.onInjected(registerAuthCodeChangeEvent);

function registerAuthCodeChangeEvent() {
  const trigger = async () => {
    const authCode = await getAuthCode().catch(() => null);
    eventEmitter.emit('auth_code_change', authCode);
  };

  trigger();
  Conn.on('change:ref', trigger);

  debug('change event registered');
}
