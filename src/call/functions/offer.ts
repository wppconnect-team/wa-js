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
import { CallStore, lidPnCache, Wid } from '../../whatsapp';
import { startWAWebVoipCall, toUserLidOrThrow } from '../../whatsapp/functions';

export interface CallOfferOptions {
  isVideo?: boolean;
}

/**
 * Send a call offer using the WhatsApp Web native VoIP stack
 *
 * @example
 * ```javascript
 * // Send a call offer
 * WPP.call.offer('[number]@c.us');
 * // Send a video call offer
 * WPP.call.offer('[number]@c.us', {isVideo: true});
 * ```
 */
export async function offer(
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

  // Tenta resolver para o JID LID se o contato/conta estiver migrado
  let targetWid = toWid;
  if (!toWid.isLid()) {
    try {
      const lid = lidPnCache.getCurrentLid(toWid);
      if (lid) {
        targetWid = lid;
      } else {
        const resolvedLid = toUserLidOrThrow(toWid);
        if (resolvedLid) {
          targetWid = resolvedLid;
        }
      }
    } catch {
      // Ignora erro caso a conversão de LID dê erro e continua usando o PN original
    }
  }

  // Dispara a chamada nativa de alto nível do WhatsApp Web
  // lobbyEntryPoint = 8 (CHAT_HEADER)
  // channel = 5 (interno)
  await startWAWebVoipCall(targetWid, !!options.isVideo, 8, 5);

  // Busca o modelo de chamada recém-criado na Store nativa do WhatsApp
  const call = CallStore.getModelsArray().find(
    (c) =>
      c.peerJid.toString({ legacy: true }) ===
        targetWid.toString({ legacy: true }) ||
      c.peerJid.toString({ legacy: true }) === toWid.toString({ legacy: true })
  );

  return call;
}
