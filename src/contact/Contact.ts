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
import Emittery from 'emittery';

import { assertWid } from '../assert';
import * as webpack from '../webpack';
import { Wid } from '../whatsapp';
import { sendQueryExists } from '../whatsapp/functions';
import { ContactEventTypes } from './types';

const debug = Debug('WA-JS:contact');

export class Contact extends Emittery<ContactEventTypes> {
  constructor() {
    super();
    webpack.onInjected(() => this.initialize());
  }

  async initialize() {
    debug('initialized');
  }

  async queryExists(contactId: string | Wid) {
    const wid = assertWid(contactId);

    return await sendQueryExists(wid).catch(() => null);
  }
}
