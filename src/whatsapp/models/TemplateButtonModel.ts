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
  displayText?: any;
  subtype?: any;
  url?: any;
  phoneNumber?: any;
  selectionId?: any;
}

interface Session {
  stale?: any;
  selected?: any;
}

interface Derived {}

/**
 * @whatsapp 2.2126.14:61522
 */
export declare interface TemplateButtonModel
  extends ModelProxy<Props, Session, Derived> {}

/**
 * @whatsapp 2.2126.14:61522
 */
export declare class TemplateButtonModel extends Model {
  constructor(
    proterties?: ModelPropertiesContructor<TemplateButtonModel>,
    options?: ModelOptions
  );
}

exportProxyModel(exports, 'TemplateButtonModel');
