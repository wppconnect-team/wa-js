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

import { ReactionsSendersCollection } from '../collections';
import { exportProxyModel } from '../exportModule';
import {
  Model,
  ModelOptions,
  ModelPropertiesContructor,
  ModelProxy,
} from './Model';

interface Props {
  id?: any;
  aggregateEmoji?: any;
  hasReactionByMe: boolean;
}

interface Session {}

interface Derived {}

/**
 * @whatsapp 81130
 * @whatsapp 981130 >= 2.2222.8
 */
export declare interface AggReactionsModel
  extends ModelProxy<Props, Session, Derived> {}

/**
 * @whatsapp 81130
 * @whatsapp 981130 >= 2.2222.8
 */
export declare class AggReactionsModel extends Model {
  constructor(
    proterties?: ModelPropertiesContructor<AggReactionsModel>,
    options?: ModelOptions
  );
  senders: ReactionsSendersCollection;
}

exportProxyModel(exports, 'AggReactionsModel');
