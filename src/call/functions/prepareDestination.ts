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

export async function prepareDestionation(wids: Wid[]) {
  const fanList = await functions.getFanOutList({ wids });
  await websocket.ensureE2ESessions(fanList);

  let shouldHaveIdentity = false;
  const destination = await Promise.all(
    fanList.map(async (wid) => {
      const encKey = self.crypto.getRandomValues(new Uint8Array(32)).buffer;

      const { type, ciphertext } = await functions.encryptMsgProtobuf(wid, 0, {
        call: {
          callKey: new Uint8Array(encKey),
        },
      });

      shouldHaveIdentity = shouldHaveIdentity || type === 'pkmsg';

      return websocket.smax(
        'to',
        {
          jid: wid.toString({ legacy: true }),
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
    const identity = await multidevice.adv.getADVEncodedIdentity();
    content.push(websocket.smax('device-identity', undefined, identity));
  }

  return content;
}
