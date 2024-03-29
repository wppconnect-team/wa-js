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

import { exportModule } from '../exportModule';

/**
 * @whatsapp 757453
 */
export declare function getWhatsAppWebExternalBetaJoinedIdb(): Promise<any>;
export declare function setWhatsAppWebExternalBetaDirtyBitIdb(
  value: boolean
): Promise<any>;
export declare function setWhatsAppWebExternalBetaJoinedIdb(
  value: boolean
): Promise<any>;

exportModule(
  exports,
  {
    getWhatsAppWebExternalBetaJoinedIdb: [
      'getWhatsAppWebExternalBetaJoinedIdb', // @whatsapp >= 2.2307.10
      'getWhatsAppWebBetaJoined',
    ],
    setWhatsAppWebExternalBetaDirtyBitIdb: [
      'setWhatsAppWebExternalBetaDirtyBitIdb', // @whatsapp >= 2.2307.10
      'setWhatsAppWebBetaDirtyBit',
    ],
    setWhatsAppWebExternalBetaJoinedIdb: [
      'setWhatsAppWebExternalBetaJoinedIdb', // @whatsapp >= 2.2307.10
      'setWhatsAppWebBetaJoined',
    ],
  },
  (m) =>
    (m.getWhatsAppWebExternalBetaJoinedIdb &&
      m.setWhatsAppWebExternalBetaDirtyBitIdb &&
      m.setWhatsAppWebExternalBetaJoinedIdb) || // @whatsapp >= 2.2307.10
    (m.getWhatsAppWebBetaJoined &&
      m.setWhatsAppWebBetaDirtyBit &&
      m.setWhatsAppWebBetaJoined) // @whatsapp < 2.2307.10
);
