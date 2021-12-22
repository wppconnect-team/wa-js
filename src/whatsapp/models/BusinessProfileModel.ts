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

import { BusinessProfileCollection } from '../collections';
import { exportProxyModel } from '../exportModule';
import { Wid } from '../misc';
import {
  Model,
  ModelOptions,
  ModelPropertiesContructor,
  ModelProxy,
} from './Model';

interface Props {
  id: Wid;
  tag?: any;
  description?: any;
  categories?: any;
  profileOptions?: any;
  email?: any;
  website?: any;
  latitude?: any;
  longitude?: any;
  businessHours?: any;
  catalogStatus?: any;
  address?: any;
  structuredAddress?: any;
}

interface Session {
  stale?: any;
}

interface Derived {}

/** @whatsapp 2.2147.16:42097 */
export declare interface BusinessProfileModel
  extends ModelProxy<Props, Session, Derived> {}

/** @whatsapp 2.2147.16:42097 */
export declare class BusinessProfileModel extends Model<BusinessProfileCollection> {
  idClass: typeof Wid;
  constructor(
    proterties?: ModelPropertiesContructor<BusinessProfileModel>,
    options?: ModelOptions
  );
  markStale(): any;
  getCollection(): BusinessProfileCollection;
  isValid(): boolean;
}

exportProxyModel(exports, 'BusinessProfileModel');
