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

import { WPPError } from '../../util';
import { CallModel, CallStore } from '../../whatsapp';
import {
  currentMediaSession,
  finishMediaSession,
  setMediaSessionProvisionalId,
} from '../media/mediaSession';
import {
  requireVoipStack,
  reserveCallStart,
  waitForActiveCall,
} from './requireVoipStack';

export interface JoinCallLinkOptions {
  /**
   * Join with the camera on. Defaults to the link type
   */
  isVideo?: boolean;
}

/**
 * Join a call through a call link or its token
 *
 * @example
 * ```javascript
 * const call = await WPP.call.joinCallLink(
 *   'https://call.whatsapp.com/voice/AbCdEfGhIjKlMnOpQrStUv'
 * );
 * ```
 *
 * @category Call
 */
export async function joinCallLink(
  link: string,
  options: JoinCallLinkOptions = {}
): Promise<CallModel | undefined> {
  const releaseStart = reserveCallStart();
  const media = currentMediaSession();
  const cleanupOnFailure = !media?.id;
  try {
    const match =
      /^(?:https:\/\/call\.whatsapp\.com\/(voice|video)\/)?([\w-]{22})\/?$/.exec(
        (link || '').trim()
      );

    if (!match) {
      throw new WPPError('invalid_call_link', `Invalid call link: ${link}`, {
        link,
      });
    }

    const [, type, token] = match;
    const isVideo = options.isVideo ?? type === 'video';

    const voipStack = await requireVoipStack();

    const previousId = (CallStore as any)?.activeCall?.id;
    setMediaSessionProvisionalId(token);
    const status = await voipStack.previewAndJoinCallLink(token, isVideo);
    if (status) {
      throw new WPPError(
        'call_link_join_failed',
        `Failed to join call link: ${status}`,
        { link, status }
      );
    }

    // The call is first registered under the link token, wait for the id the
    // events and the other call functions use
    const call = await waitForActiveCall(
      (c) =>
        c.id !== token &&
        c.id !== previousId &&
        c.isCallLink === true &&
        c.callLinkToken === token,
      10_000
    );
    if (!call && media && cleanupOnFailure) finishMediaSession(media);
    return call;
  } catch (error) {
    if (media && cleanupOnFailure) finishMediaSession(media);
    throw error;
  } finally {
    releaseStart();
  }
}
