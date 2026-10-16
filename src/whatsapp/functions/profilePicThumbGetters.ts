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

import { ProfilePicThumbModel } from '..';
import { exportModule } from '../exportModule';

/**
 * Derived picture URLs. The img/imgFull properties were removed from
 * WAWebProfilePicThumbModel around WA 2.3000.1048 (present up to
 * 2.3000.1045213319, gone from 2.3000.1048745628); WhatsApp computes them
 * in WAWebProfilePicThumbGetters since then. Both return null while the
 * model is stale.
 *
 * @whatsapp WAWebProfilePicThumbGetters
 */
export declare function getImg(
  model: ProfilePicThumbModel
): string | null | undefined;

/**
 * @whatsapp WAWebProfilePicThumbGetters
 */
export declare function getImgFull(
  model: ProfilePicThumbModel
): string | null | undefined;

exportModule(
  exports,
  {
    getImg: 'getImg',
    getImgFull: 'getImgFull',
  },
  (m) => m.getImg && m.getImgFull
);
