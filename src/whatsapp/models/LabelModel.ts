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

import {
  Model,
  ModelOptions,
  ModelPropertiesContructor,
  ModelProxy,
} from './Model';

/** @moduleID 13960
 * @whatsapp 2.2126.14
 */
interface Props {
  id?: any;
  colorIndex?: any;
  color?: any;
  count?: any;
}

/** @moduleID 13960
 * @whatsapp 2.2126.14
 */
interface Session {
  stale?: any;
}

/** @moduleID 13960
 * @whatsapp 2.2126.14
 */
interface Derived {
  hexColor?: any;
}

/** @moduleID 13960
 * @whatsapp 2.2126.14
 */
export declare interface LabelModel
  extends ModelProxy<Props, Session, Derived> {}

/**
 * @moduleID 13960
 * @whatsapp 2.2126.14
 */
export declare class LabelModel extends Model {
  constructor(
    proterties?: ModelPropertiesContructor<LabelModel>,
    options?: ModelOptions
  );
}
