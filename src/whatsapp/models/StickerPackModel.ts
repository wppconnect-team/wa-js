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
import {
  Model,
  ModelOptions,
  ModelPropertiesContructor,
  ModelProxy,
} from './Model';

interface Props {
  id?: any;
  index?: any;
  page?: any;
  url?: any;
  mimetype?: any;
  mediaObject?: any;
  directPath?: any;
  filehash?: any;
  mediaKey?: any;
  mediaKeyTimestamp?: any;
  size?: any;
  type?: any;
  encFilehash?: any;
}

interface Session {
  stale?: any;
  mediaData?: any;
}

interface Derived {
  deprecatedMms3Url?: any;
  stickers?: any;
  isPlaceholder: boolean;
  isFirstParty: boolean;
}

/** @whatsapp undefined:86668 */
export declare interface StickerPackModel
  extends ModelProxy<Props, Session, Derived> {}

/** @whatsapp undefined:86668 */
export declare class StickerPackModel extends Model {
  constructor(
    proterties?: ModelPropertiesContructor<StickerPackModel>,
    options?: ModelOptions
  );
  downloadMedia(): any;
  static createPlaceholder(): any;
  static isPlaceholderId(): boolean;
}

exportProxyModel(exports, 'StickerPackModel');
