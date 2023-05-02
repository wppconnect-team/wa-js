/*!
 * Copyright 2022 WPPConnect Team
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

import { injectFallbackModule } from '../../webpack';
import { exportModule } from '../exportModule';
import { startHandlingRequests, startWebComms, stopComms } from '../websocket';
import { frontendFireAndForget } from './frontendFireAndForget';
import {
  setWhatsAppWebExternalBetaDirtyBitIdb,
  setWhatsAppWebExternalBetaJoinedIdb,
} from './getWhatsAppWebExternalBetaJoinedIdb';
import { syncABPropsTask } from './syncABPropsTask';

/**
 * @whatsapp 795715
 */
export declare function changeOptInStatusForExternalWebBeta(
  value: boolean
): Promise<any>;

exportModule(
  exports,
  {
    changeOptInStatusForExternalWebBeta: 'changeOptInStatusForExternalWebBeta',
  },
  (m) => m.changeOptInStatusForExternalWebBeta
);

injectFallbackModule('changeOptInStatusForExternalWebBeta', {
  changeOptInStatusForExternalWebBeta: async (value: boolean) => {
    await Promise.all([
      setWhatsAppWebExternalBetaDirtyBitIdb(true),
      setWhatsAppWebExternalBetaJoinedIdb(value),
    ]);
    await stopComms();
    await startWebComms();
    await startHandlingRequests();
    await syncABPropsTask();
    await frontendFireAndForget('changeOptInStatusForExternalWebBeta', {});
    await setWhatsAppWebExternalBetaDirtyBitIdb(false);
  },
});
