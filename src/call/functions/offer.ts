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
import { queryExists } from '../../contact/functions/queryExists';
import { WPPError } from '../../util';
import { CallModel, CallStore, Wid } from '../../whatsapp';
import {
  getVoipStackInterface,
  startWAWebVoipCall,
} from '../../whatsapp/functions';
import { enableCallInterface } from './enableCallInterface';

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
  // Garante a ativação das propriedades de ligação (ABProps)
  await enableCallInterface();

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

  // Resolve o contato e garante que ele existe, populando o cache de LID/PN
  const existResult = await queryExists(toWid);
  if (!existResult) {
    throw new WPPError(
      'contact_not_found',
      `The contact ${toWid} does not exist on WhatsApp`,
      { to }
    );
  }

  const targetWid = existResult.lid || existResult.wid;

  // Garante o carregamento prévio do bundle lazy da stack de VoIP
  await getVoipStackInterface();

  // Dispara a chamada nativa de alto nível do WhatsApp Web
  // callFromUi = 8 (CALL_FROM_UI.CONVERSATION)
  // lobbyEntryPoint = 5 (LOBBY_ENTRY_POINT_TYPE.NOT_OPENED)
  // Sem entryTrust 'user_gesture' o WhatsApp trata a chamada como deep link
  // e aguarda um popup de confirmação antes de enviar a oferta
  await startWAWebVoipCall(targetWid, !!options.isVideo, 8, 5, null, {
    entryTrust: 'user_gesture',
  });

  // Busca o modelo de chamada recém-criado na Store nativa do WhatsApp.
  // Nas versões atuais a chamada não entra nos modelos da CallStore, fica em
  // activeCall, que é preenchido logo depois que a oferta é enviada
  const isTarget = (c: CallModel) =>
    c.peerJid.toString({ legacy: true }) ===
      targetWid.toString({ legacy: true }) ||
    c.peerJid.toString({ legacy: true }) === toWid.toString({ legacy: true });

  for (let i = 0; i < 30; i++) {
    const activeCall: CallModel | undefined = (CallStore as any).activeCall;
    const call = [activeCall, ...CallStore.getModelsArray()].find(
      (c) => c && isTarget(c)
    );
    if (call) {
      return call;
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return undefined;
}
