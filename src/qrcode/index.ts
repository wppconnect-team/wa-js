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

import Emittery from 'emittery';

import * as webpack from '../webpack';
import { Browser, Conn, Constants, State } from '../whatsapp';
import { getOrGenerate } from '../whatsapp/functions';

interface AuthCode {
  ref: string;
  keyPair: string;
  browserId: string;
  fullCode: string;
}
interface EventTypes {
  change: AuthCode;
  idle: undefined;
}

class QRCode extends Emittery<EventTypes> {
  constructor() {
    super();
    webpack.onInjected(() => this.initialize());
  }

  async initialize() {
    Conn.on('change:ref', async () => {
      const authCode = await this.getAuthCode().catch(() => null);
      if (authCode) {
        this.emit('change', authCode);
      }
    });

    State.on('change:state', async () => {
      const isIdle = await this.isIdle().catch(() => false);
      if (isIdle) {
        this.emit('idle');
      }
    });
  }

  async getAuthCode(): Promise<AuthCode | null> {
    if (!Conn.ref || Conn.connected) {
      return null;
    }

    const ref = Conn.ref;
    const keyPair = getOrGenerate();
    const browserId = Browser.id();

    const fullCode = ref + ',' + keyPair + ',' + browserId;

    return {
      ref,
      keyPair,
      browserId,
      fullCode,
    };
  }

  public async isIdle(): Promise<boolean> {
    return State.state === Constants.SOCKET_STATE.UNPAIRED_IDLE;
  }

  public async poke(): Promise<void> {
    return State.poke();
  }
}

export default new QRCode();
