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

import { assertGetChat, assertWid } from '../../assert';
import { WPPError } from '../../util';
import { Wid } from '../../whatsapp';
import { unixTime } from '../../whatsapp/functions';

/**
 * Mute a chat, you can use duration or expiration
 * For expiration, use unix timestamp (seconds only)
 * For duration, use seconds
 *
 * @example
 * ```javascript
 * // Mute for 60 seconds
 * WPP.chat.mute('[number]@c.us', {duration: 60});
 *
 * // Mute util 2021-01-01
 * WPP.chat.mute('[number]@c.us', {expiration: 1641006000});
 *
 * // or using date
 * const expiration = new Date('2022-01-01 00:00:00');
 * WPP.chat.mute('[number]@c.us', {expiration: expiration});
 * ```
 *
 * @category Chat
 */
export async function mute(
  chatId: string | Wid,
  time: { expiration: number | Date } | { duration: number }
) {
  const wid = assertWid(chatId);

  const chat = assertGetChat(wid);

  let expiration = 0;

  if ('expiration' in time) {
    if (typeof time.expiration === 'number') {
      expiration = time.expiration;
    } else {
      expiration = time.expiration.getTime() / 1000;
    }
  } else if ('duration' in time) {
    expiration = unixTime() + time.duration;
  } else {
    throw new WPPError('invalid_time_mute', 'Invalid time for mute', { time });
  }

  if (expiration < unixTime()) {
    throw new WPPError('negative_time_mute', 'Negative duration for mute', {
      time,
    });
  }

  await chat.mute.mute({
    expiration,
    isAutoMuted: false,
    sendDevice: true,
  });
  return {
    wid,
    expiration: chat.mute.expiration,
    isMuted: chat.mute.expiration !== 0,
  };
}
