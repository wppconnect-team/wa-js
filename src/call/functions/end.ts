/*!
 * Copyright 2024 WPPConnect Team
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
import { getVoipStackInterface } from '../../whatsapp/functions';

/**
 * End a call using the WhatsApp Web native VoIP stack
 *
 * @example
 * ```javascript
 * // End any call
 * WPP.call.end();
 * ```
 *
 * @return  {Promise<boolean>}
 */
export async function end(): Promise<boolean> {
  const voipStack = await getVoipStackInterface();
  if (!voipStack) {
    throw new WPPError(
      'voip_stack_not_found',
      'VoIP stack interface is not available'
    );
  }

  // Executa o encerramento da chamada ativa na pilha VoIP nativa
  // 2 = Encerramento solicitado pelo usuário
  // true = Iniciado pelo usuário local
  await voipStack.endCall(2, true);

  return true;
}
