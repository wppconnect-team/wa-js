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
import chat, { RawMessage } from '../chat';
import * as webpack from '../webpack';
import {
  ChatStore,
  StatusV3Model,
  StatusV3Store,
  UserPrefs,
  Wid,
} from '../whatsapp';
import { SendStatusOptions, TextStatusOptions } from '.';
import { StatusEventTypes } from './types';

const debug = Debug('WPP:status');

export class Status extends Emittery<StatusEventTypes> {
  public defaultSendMessageOptions: SendStatusOptions = {
    waitForAck: true,
  };

  constructor() {
    super();
    webpack.onInjected(() => this.initialize());
  }

  async initialize() {
    StatusV3Store.on('sync', () => {
      debug('synced');
      this.emit('sync');
    });

    debug('initialized');
  }

  get(chatId: string | Wid): StatusV3Model | undefined {
    const wid = assertWid(chatId);
    return StatusV3Store.get(wid);
  }

  async getMyStatus(): Promise<StatusV3Model> {
    let myStatus = StatusV3Store.getMyStatus();

    if (!myStatus)
      myStatus = await StatusV3Store.find(UserPrefs.getMaybeMeUser());

    return myStatus;
  }

  async sendRawStatus(message: RawMessage, options: SendStatusOptions = {}) {
    options = {
      ...this.defaultSendMessageOptions,
      ...options,
    };
    const result = await chat.sendRawMessage('status@broadcast', message, {
      ...options,
      createChat: true,
    });

    result.sendMsgResult.then(() => {
      ChatStore.resyncMessages();
    });

    return result;
  }

  /**
   * Send a text message to status stories
   *
   * @example
   * ```javascript
   * WPP.status.sendTextStatus(`Bootstrap primary color: #0275d8`, { backgroundColor: '#0275d8', font: 2});
   * ```
   */
  async sendTextStatus(
    content: any,
    options: TextStatusOptions = {}
  ): Promise<any> {
    options = {
      ...this.defaultSendMessageOptions,
      ...options,
    };

    let backgroundColor: number | undefined;
    let textColor: number | undefined;

    if (typeof options.backgroundColor === 'string') {
      let hex = options.backgroundColor.trim().replace('#', '');
      if (hex.length <= 6) {
        hex = 'FF' + hex.padStart(6, '0');
      }
      backgroundColor = parseInt(hex, 16);
    } else if (typeof options.backgroundColor === 'number') {
      backgroundColor = options.backgroundColor;
    }

    if (typeof options.textColor === 'string') {
      let hex = options.textColor.trim().replace('#', '');
      if (hex.length <= 6) {
        hex = 'FF' + hex.padStart(6, '0');
      }
      textColor = parseInt(hex, 16);
    } else if (typeof options.textColor === 'number') {
      textColor = options.textColor;
    }

    const message: RawMessage = {
      body: content,
      type: 'chat',
      subtype: null,
      urlText: null,
      urlNumber: null,
      ctwaContext: {}, //Force to send font and color
      font: options.font,
      backgroundColor,
      textColor,
    };

    return await this.sendRawStatus(message, options);
  }
}
