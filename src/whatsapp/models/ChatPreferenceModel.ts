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

import { exportProxyModel } from '../exportModule';
import { Wid } from '../misc';
import {
  Model,
  ModelOptions,
  ModelPropertiesContructor,
  ModelProxy,
} from './Model';

/** @whatsapp 2.2126.14:33502
 */
interface Props {
  id: Wid;
  wallpaperColor?: any;
  saveToCameraRoll?: any;
  showDoodle?: any;
}

/** @whatsapp 2.2126.14:33502
 */
interface Session {
  stale?: any;
}

/** @whatsapp 2.2126.14:33502
 */
interface Derived {}

/** @whatsapp 2.2126.14:33502
 */
export declare interface ChatPreferenceModel
  extends ModelProxy<Props, Session, Derived> {}

/**
 * @whatsapp 2.2126.14:33502
 */
export declare class ChatPreferenceModel extends Model {
  idClass: typeof Wid;
  allowedIds?: any;
  constructor(
    proterties?: ModelPropertiesContructor<ChatPreferenceModel>,
    options?: ModelOptions
  );
  getCollection(): any;
}

exportProxyModel(exports, 'ChatPreferenceModel');
