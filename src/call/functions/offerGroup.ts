/*!
 * Copyright 2026 WPPConnect Team
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

import { assertFindChat, assertWid } from '../../assert';
import { queryExists } from '../../contact/functions/queryExists';
import { ensureLazyModule } from '../../loader';
import { WPPError } from '../../util';
import { CallModel, Wid } from '../../whatsapp';
import {
  startWAWebVoipGroupCallFromChat,
  startWAWebVoipGroupCallFromWids,
} from '../../whatsapp/functions';
import { CallOfferOptions } from './offer';
import { requireVoipStack, waitForActiveCall } from './requireVoipStack';

/**
 * Start a group call, with all members of a group or with a list of contacts
 *
 * @example
 * ```javascript
 * // Call all members of a group
 * const call = await WPP.call.offerGroup('[group-id]@g.us');
 *
 * // Call a list of contacts
 * const call = await WPP.call.offerGroup(
 *   ['[number1]@c.us', '[number2]@c.us'],
 *   { isVideo: true }
 * );
 * ```
 *
 * @category Call
 */
export async function offerGroup(
  to: string | Wid | (string | Wid)[],
  options: CallOfferOptions = {}
): Promise<CallModel | undefined> {
  const isVideo = !!options.isVideo;

  await requireVoipStack();
  await ensureLazyModule('WAWebVoipStartCall');

  if (!Array.isArray(to)) {
    const groupWid = assertWid(to);

    if (!groupWid.isGroup()) {
      throw new WPPError(
        'call_is_not_group',
        `The ${groupWid} is not a group to call`,
        { to }
      );
    }

    const chat = await assertFindChat(groupWid);

    // callFromUi = 8 (CONVERSATION), lobbyEntryPoint = 5 (NOT_OPENED)
    await startWAWebVoipGroupCallFromChat(chat, isVideo, 8, 5);

    return waitForActiveCall((c) => c.isGroup);
  }

  if (to.length < 2) {
    throw new WPPError(
      'call_not_enough_participants',
      'A group call needs at least two participants',
      { to }
    );
  }

  const wids: Wid[] = [];
  for (const id of to) {
    const wid = assertWid(id);
    const exists = await queryExists(wid);
    if (!exists) {
      throw new WPPError(
        'contact_not_found',
        `The contact ${wid} does not exist on WhatsApp`,
        { to: id }
      );
    }
    wids.push(exists.lid || exists.wid);
  }

  await startWAWebVoipGroupCallFromWids(wids, isVideo, 8, 5, {
    entryTrust: 'user_gesture',
  });

  return waitForActiveCall((c) => c.isGroup);
}
