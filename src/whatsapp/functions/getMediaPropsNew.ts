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

import { MediaPrep, ModelPropertiesContructor, MsgModel } from '..';
import { exportModule } from '../exportModule';

interface GetMediaPropsOptions {
  caption?: string;
  type?: string;
}

/** @whatsapp WAWebMediaPrep
 * @whatsapp WAWebMediaPrepMediaProps >= 2.3000.1050509545
 */
export declare function getMediaPropsNew(
  prep: MediaPrep,
  options: GetMediaPropsOptions
): Promise<ModelPropertiesContructor<MsgModel>>;

// Became the default export of its own module in 2.3000.1050509545
// TODO: remove the old name when versions before 2.3000.1050509545 are no longer available in wa-version/html
exportModule(
  exports,
  { getMediaPropsNew: ['getMediaPropsNew', 'default'] },
  (m, id) =>
    id === 'WAWebMediaPrepMediaProps' || (m.MediaPrep && m.getMediaPropsNew)
);
