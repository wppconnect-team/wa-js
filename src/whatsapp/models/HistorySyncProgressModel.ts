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

import * as webpack from '../../webpack';
import { exportModule } from '../exportModule';
import { getHistorySyncProgress } from '../functions';
import {
  Model,
  ModelOptions,
  ModelPropertiesContructor,
  ModelProxy,
} from './Model';

interface Props {}

interface Session {}

interface Derived {
  progress: number | null;
  paused: boolean;
  inProgress: boolean;
}

/**
 * @whatsapp 649959 >= 2.2244.5
 */
export declare interface HistorySyncProgressModel
  extends ModelProxy<Props, Session, Derived> {}

/**
 * @whatsapp 649959 >= 2.2244.5
 */
export declare class HistorySyncProgressModel extends Model {
  constructor(
    proterties?: ModelPropertiesContructor<HistorySyncProgressModel>,
    options?: ModelOptions
  );
  setInProgress(inProgress: boolean): void;
  setPaused(paused: boolean): void;
  setProgress(progress: number): void;
}

exportModule(
  exports,
  {
    HistorySyncProgressModel: 'HistorySyncProgressModel',
  },
  (m) => m.HistorySyncProgressModel
);

const fallback = {};

// Lazy load
Object.defineProperty(fallback, 'HistorySyncProgressModel', {
  configurable: true,
  enumerable: true,
  get() {
    const sync = getHistorySyncProgress();
    return sync.constructor;
  },
});

webpack.injectFallbackModule('HistorySyncProgressModel', fallback);
