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

import { Wid } from '..';
import { exportModule } from '../exportModule';

/**
 * This function can be used to define a group picture or self profile
 * @whatsapp 78426
 * @whatsapp 5018 >= 2.2204.13
 */
export declare function sendSetPicture(
  chat: Wid,
  previewBase64: string,
  pictureBase64: string
): Promise<{
  eurl: string;
  status: number;
  tag: string;
  token: string;
  _duplicate: boolean;
}>;

/**
 * This function can be used to delete a group picture or self profile
 * @whatsapp 78426
 * @whatsapp 5018 >= 2.2204.13
 */
export declare function requestDeletePicture(chat: Wid): Promise<any>;

exportModule(
  exports,
  {
    sendSetPicture: 'sendSetPicture',
    requestDeletePicture: 'requestDeletePicture',
  },
  (m) => m.sendSetPicture && m.requestDeletePicture
);
