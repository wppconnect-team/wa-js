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

import { Base64, websocket } from '../../whatsapp';

function extractIpPort(data: Uint8Array) {
  const e = new Uint8Array(data);
  if (6 !== e.length) {
    return null;
  }
  const t = new DataView(e.buffer);
  const host = {
    ip: [t.getUint8(0), t.getUint8(1), t.getUint8(2), t.getUint8(3)],
    port: t.getUint16(4),
  };

  return host;
}

export function parseRelayResponse(response: websocket.WapNode) {
  const rteNode = (response.content as websocket.WapNode[]).find(
    (c) => c.tag === 'rte'
  ) as websocket.WapNode;

  const rte = extractIpPort(rteNode.content as any);

  const relayNode = (response.content as websocket.WapNode[]).find(
    (c) => c.tag === 'relay'
  ) as websocket.WapNode;

  const keyNode = (relayNode.content as websocket.WapNode[]).find(
    (c) => c.tag === 'key'
  ) as websocket.WapNode;

  const textDecoder = new TextDecoder();
  const key = textDecoder.decode(new Uint8Array(keyNode.content as Uint8Array));

  const tokens: { [key: string]: string } = {};

  const tokensNodes = (relayNode.content as websocket.WapNode[]).filter(
    (c) => c.tag === 'token'
  );

  tokensNodes.forEach((c) => {
    const token = Base64.encodeB64(new Uint8Array(c.content as Uint8Array));
    tokens[c.attrs.id || '0'] = token;
  });

  const relays: {
    [key: string]: {
      ip: number[];
      port: number;
      relay_id: string;
      token: string;
    };
  } = {};

  const hostsNodes = (relayNode.content as websocket.WapNode[]).filter(
    (c) => c.tag === 'te2'
  );

  hostsNodes.forEach((c) => {
    const host = extractIpPort(c.content as Uint8Array);
    if (host) {
      const relay_id = c.attrs.relay_id || '0';
      const token_id = c.attrs.token_id || '0';
      const token = tokens[token_id];
      relays[relay_id] = { ...host, relay_id, token };
    }
  });

  return { rte, key, relays };
}
