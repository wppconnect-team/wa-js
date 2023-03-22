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
import { WPPError } from '../../util';
import {
  CallModel,
  CallStore,
  functions,
  UserPrefs,
  websocket,
  Wid,
} from '../../whatsapp';
import { CALL_STATES } from '../../whatsapp/enums';
import { unixTime } from '../../whatsapp/functions';
import { parseRelayResponse } from './parseRelayResponse';
import { prepareDestionation } from './prepareDestination';

export interface CallOfferOptions {
  isVideo?: boolean;
}

/**
 * Send a call offer
 *
 * This method only will send a call offer, but there are no audio/video
 *
 * @example
 * ```javascript
 * // Send a call offer
 * WPP.call.sendCallOffer('[number]@c.us');
 * // Send a video call offer
 * WPP.call.sendCallOffer('[number]@c.us', {isVideo: true});
 * ```
 */
export async function sendCallOffer(
  to: string | Wid,
  options: CallOfferOptions = {}
): Promise<any> {
  options = Object.assign<CallOfferOptions, CallOfferOptions>(
    { isVideo: false },
    options
  );

  const toWid = assertWid(to);

  if (!toWid.isUser()) {
    throw new WPPError(
      'call_is_not_user',
      `The ${toWid} is not a user to call`,
      {
        to,
      }
    );
  }

  const callId = functions.randomHex(16).substr(0, 64);
  const me = UserPrefs.assertGetMe();

  const content = [
    websocket.smax('audio', { enc: 'opus', rate: '16000' }, null),
    websocket.smax('audio', { enc: 'opus', rate: '8000' }, null),
  ];

  if (options.isVideo) {
    content.push(
      websocket.smax(
        'video',
        {
          orientation: '0',
          screen_width: '1920',
          screen_height: '1080',
          device_orientation: '0',
          enc: 'vp8',
          dec: 'vp8',
        },
        null
      )
    );
  }

  content.push(
    ...[
      websocket.smax('net', { medium: '3' }, null),
      websocket.smax(
        'capability',
        { ver: '1' },
        new Uint8Array([1, 4, 255, 131, 207, 4])
      ),
      websocket.smax('encopt', { keygen: '2' }, null),
    ]
  );

  const encKey = self.crypto.getRandomValues(new Uint8Array(32)).buffer;

  content.push(...(await prepareDestionation([toWid], encKey)));

  const node = websocket.smax(
    'call',
    {
      to: toWid.toString({ legacy: true }),
      id: functions.randomHex(8),
    },
    [
      websocket.smax(
        'offer',
        {
          'call-id': callId,
          'call-creator': me.toString({ legacy: true }),
        },
        content
      ),
    ]
  );

  const model = new CallModel({
    id: callId,
    peerJid: toWid,
    isVideo: options.isVideo,
    isGroup: false,
    outgoing: true,
    offerTime: unixTime(),
    webClientShouldHandle: false,
    canHandleLocally: true,
  });

  CallStore.add(model);

  CallStore.setActiveCall(CallStore.assertGet(callId));

  model.setState(CALL_STATES.OUTGOING_CALLING);

  const response = await websocket.sendSmaxStanza(node);

  console.info(response);
  console.info(parseRelayResponse(response));

  return model;
}
