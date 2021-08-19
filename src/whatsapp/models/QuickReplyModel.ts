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

import { QuickReplyCollection } from '../collections';
import {
  Model,
  ModelOptions,
  ModelPropertiesContructor,
  ModelProxy,
} from './Model';

/** @moduleID 46445
 * @whatsapp 2.2126.14
 */
interface Props {
  id?: any;
  shortcut?: any;
  message?: any;
  count?: any;
  keywords?: any;
}

/** @moduleID 46445
 * @whatsapp 2.2126.14
 */
interface Session {
  stale?: any;
  pendingCount?: any;
}

/** @moduleID 46445
 * @whatsapp 2.2126.14
 */
interface Derived {
  totalCount?: any;
}

/** @moduleID 46445
 * @whatsapp 2.2126.14
 */
export declare interface QuickReplyModel
  extends ModelProxy<Props, Session, Derived> {}

/**
 * @moduleID 46445
 * @whatsapp 2.2126.14
 */
export declare class QuickReplyModel extends Model<QuickReplyCollection> {
  constructor(
    proterties?: ModelPropertiesContructor<QuickReplyModel>,
    options?: ModelOptions
  );
  useOnce(): any;
  getCollection(): QuickReplyCollection;
}
