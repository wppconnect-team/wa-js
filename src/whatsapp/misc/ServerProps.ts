/*!
 * Copyright 2021 WPPConnect Team
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
import { ServerPropsModel } from '../models';
import { ServerPropsConstants } from './ServerPropsConstants';

/** @whatsapp 8080
 * @whatsapp 608080 >= 2.2222.8
 */
export declare const ServerProps: ServerPropsModel;

exportModule(
  exports,
  {
    ServerProps: 'ServerProps',
  },
  (m) =>
    (m.getMaxFilesSizeServerProp && m.ServerProps) ||
    (m.getMaxFilesSize && m.ServerProps)
);

//This fallback is only in place to prevent errors on older versions of WhatsApp Web for now;
// it will be removed soon, as all their attributes have either been removed or moved to different functions.
injectFallbackModule('ServerProps', {
  getMaxFilesSizeServerProp: () => {
    return ServerPropsConstants.MAX_FILE_SIZE_BYTES;
  },
  ServerProps: {},
});
