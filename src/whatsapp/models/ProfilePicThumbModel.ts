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

import { ProfilePicThumbCollection } from '../collections';
import { Wid } from '../misc';
import {
  Model,
  ModelOptions,
  ModelPropertiesContructor,
  ModelProxy,
} from './Model';

/** @moduleID 16971
 * @whatsapp 2.2126.14
 */
interface Props {
  id: Wid;
  token?: any;
  tag?: any;
  raw?: any;
  eurl?: any;
  previewEurl?: any;
}

/** @moduleID 16971
 * @whatsapp 2.2126.14
 */
interface Session {
  stale?: any;
  eurlStale?: any;
  pendingPic?: any;
}

/** @moduleID 16971
 * @whatsapp 2.2126.14
 */
interface Derived {
  img?: any;
  imgFull?: any;
  fallbackType?: any;
}

/** @moduleID 16971
 * @whatsapp 2.2126.14
 */
export declare interface ProfilePicThumbModel
  extends ModelProxy<Props, Session, Derived> {}

/**
 * @moduleID 16971
 * @whatsapp 2.2126.14
 */
export declare class ProfilePicThumbModel extends Model<ProfilePicThumbCollection> {
  idClass: typeof Wid;
  constructor(
    proterties?: ModelPropertiesContructor<ProfilePicThumbModel>,
    options?: ModelOptions
  );
  markStale(e?: any): any;
  validate(): any;
  generateUrl(e?: any): any;
  canSet(): boolean;
  canDelete(): boolean;
  getCollection(): ProfilePicThumbCollection;
}
