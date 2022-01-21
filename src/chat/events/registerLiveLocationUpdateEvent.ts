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

import { config } from '../../config';
import * as webpack from '../../webpack';
import {
  ChatStore,
  Clock,
  LiveLocationStore,
  MsgModel,
  MsgStore,
  Wid,
} from '../../whatsapp';
import { eventEmitter } from '../eventEmitter';

const debug = Debug('WA-JS:chat');

webpack.onInjected(() => registerLiveLocationUpdateEvent());

interface LocationUpdate {
  type: 'update';
  accuracy?: number;
  body: string;
  degrees?: number;
  elapsed: number;
  jid: Wid;
  lat: number;
  lng: number;
  speed?: number;
}

interface LocationDisable {
  type: 'disable';
  chat: Wid;
  jid: Wid;
  seq: number;
}

function processLocation(e: LocationUpdate | LocationDisable) {
  if (e.type === 'update') {
    eventEmitter.emit('live_location_update', {
      id: e.jid,
      lastUpdated: Clock.globalUnixTime() - e.elapsed,
      elapsed: e.elapsed,
      lat: e.lat,
      lng: e.lng,
      accuracy: e.accuracy,
      speed: e.speed,
      degrees: e.degrees,
      comment: e.body,
    });
    return;
  }

  if (e.type === 'disable') {
    eventEmitter.emit('live_location_end', {
      id: e.jid,
      chat: e.chat,
      seq: e.seq,
    });
    return;
  }
}

function registerLiveLocationUpdateEvent() {
  /**
   * For each new live detection, fecth initial data and start update handler
   */
  MsgStore.on('add', (msg: MsgModel) => {
    if (!msg.isNewMsg || !msg.isLive) {
      return;
    }

    eventEmitter.emit('live_location_start', {
      id: msg.sender!,
      msgId: msg.id,
      chat: msg.chat!.id,
      lat: msg.lat!,
      lng: msg.lng!,
      accuracy: msg.accuracy,
      speed: msg.speed,
      degrees: msg.degrees,
      shareDuration: msg.shareDuration!,
    });

    LiveLocationStore.update(msg.chat!.id)
      .then((liveLocation) => {
        liveLocation.startViewingMap();
      })
      .catch(() => null);
  });

  /**
   * Start for all active chats
   */
  ChatStore.once('collection_has_synced', () => {
    const chats = ChatStore.models.slice(0, config.liveLocationLimit);
    chats.forEach((chat) => {
      LiveLocationStore.update(chat.id)
        .then((liveLocation) => {
          liveLocation.startViewingMap();
        })
        .catch(() => null);
    });
  });

  /**
   * Wrap LiveLocationStore.handle to get all LiveLocation events
   * By default, only "loaded" messages process this events
   */
  const originalHandle = LiveLocationStore.handle;
  LiveLocationStore.handle = (updateList: any[]) => {
    for (const update of updateList) {
      processLocation(update);
    }
    return originalHandle.call(originalHandle, updateList);
  };

  debug('live_location_* events registered');
}
