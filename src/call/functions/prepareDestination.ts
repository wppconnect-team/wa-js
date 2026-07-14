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

import { functions, multidevice, websocket, Wid } from '../../whatsapp';

export async function prepareDestionation(
  wids: Wid[],
  encKey: ArrayBufferLike
) {
  console.log('[DEBUG] prepareDestionation: Iniciando. wids:', wids);
  console.log('[DEBUG] prepareDestionation: Chamando getFanOutList...');
  const fanList = await functions.getFanOutList({ wids });
  console.log(
    '[DEBUG] prepareDestionation: getFanOutList finalizado. fanList:',
    fanList
  );

  console.log('[DEBUG] prepareDestionation: Chamando ensureE2ESessions...');
  await websocket.ensureE2ESessions(fanList);
  console.log('[DEBUG] prepareDestionation: ensureE2ESessions finalizado.');

  let shouldHaveIdentity = false;
  console.log('[DEBUG] prepareDestionation: Mapeando fanList...');
  const destination = await Promise.all(
    fanList.map(async (wid) => {
      console.log(
        '[DEBUG] prepareDestionation: Criptografando para',
        wid.toString()
      );
      const { type, ciphertext } = await functions.encryptMsgProtobuf(wid, 0, {
        call: {
          callKey: new Uint8Array(encKey),
        },
      });
      console.log(
        '[DEBUG] prepareDestionation: Criptografia concluída para',
        wid.toString(),
        'tipo:',
        type
      );

      shouldHaveIdentity = shouldHaveIdentity || type === 'pkmsg';

      return websocket.smax(
        'to',
        {
          jid: wid.toString(),
        },
        [
          websocket.smax(
            'enc',
            {
              v: '2',
              type: type,
              count: '0',
            },
            ciphertext
          ),
        ]
      );
    })
  );

  const content: websocket.WapNode[] = [];

  content.push(websocket.smax('destination', {}, destination));

  if (shouldHaveIdentity) {
    console.log('[DEBUG] prepareDestionation: Obtendo identity...');
    const identity = await multidevice.adv.getADVEncodedIdentity();
    console.log('[DEBUG] prepareDestionation: Identity obtida.');
    content.push(websocket.smax('device-identity', undefined, identity));
  }

  return content;
}
