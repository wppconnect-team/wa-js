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
import { CallModel, CallStore, Wid } from '../../whatsapp';
import {
  generateAndStoreNewCallId,
  startWAWebVoipGroupCallFromChat,
  startWAWebVoipGroupCallFromWids,
} from '../../whatsapp/functions';
import { currentMediaSession, finishMediaSession } from '../media/mediaSession';
import { CallOfferOptions } from './offer';
import {
  requireVoipStack,
  reserveCallStart,
  waitForActiveCall,
} from './requireVoipStack';

/**
 * Start a group call, with all members of a group or with a list of contacts
 *
 * When the group has a single other member, WhatsApp places a 1:1 call and
 * the returned call has `isGroup` false.
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
  const releaseStart = reserveCallStart();
  const media = currentMediaSession();
  const cleanupOnFailure = !media?.id;
  try {
    const isVideo = !!options.isVideo;

    await requireVoipStack();
    await ensureLazyModule('WAWebVoipStartCall');
    if (typeof generateAndStoreNewCallId !== 'function')
      throw new WPPError(
        'group_call_not_supported',
        'This WhatsApp version cannot reserve a group call id'
      );

    // WhatsApp places a 1:1 call when the group has a single other member, so
    // wait for any new active call instead of only a group one
    const previousId: string | undefined = (CallStore as any)?.activeCall?.id;
    const waitForReservedCall = async (id: string) => {
      const call = await waitForActiveCall(
        (c) => c.id === id && c.id !== previousId
      );
      if (!call && media && cleanupOnFailure) finishMediaSession(media);
      return call;
    };

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
      const id = generateAndStoreNewCallId();
      await startWAWebVoipGroupCallFromChat(chat, isVideo, 8, 5);

      return await waitForReservedCall(id);
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

    const id = generateAndStoreNewCallId();
    await startWAWebVoipGroupCallFromWids(wids, isVideo, 8, 5, {
      entryTrust: 'user_gesture',
    });

    return await waitForReservedCall(id);
  } catch (error) {
    if (media && cleanupOnFailure) finishMediaSession(media);
    throw error;
  } finally {
    releaseStart();
  }
}
