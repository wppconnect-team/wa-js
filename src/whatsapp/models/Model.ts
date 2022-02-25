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

import { Stringable } from '../../types';
import { WritableProperties } from '../../util';
import { exportModule } from '../exportModule';
import { EventEmitter } from '../misc';

export type ModelProxy<P, S, D> = P &
  S &
  Readonly<D> & {
    get attributes(): P & S;

    get isState(): true;

    readonly mirrorMask: {
      [key in keyof (P & S & D) as `change:${string & key}`]: number;
    };

    toJSON(): P;

    serialize(): P;
  };

export type ModelPropertiesContructor<
  Model,
  K extends keyof Model = any
> = Partial<WritableProperties<Model>> &
  Required<WritableProperties<Pick<Model, K>>>;

export interface ModelOptions {
  _internalInitializationDoNotUse?: any;
  collection?: any;
  merge?: any;
  parent?: any;
  silent?: any;
}

/** @whatsapp 11290 */
export declare class Model<Collection = undefined> extends EventEmitter {
  static Proxy: string;

  static idClass?: any;

  static allowedIds?: any[];

  // stale: boolean;

  parent?: any;

  collection?: Collection;

  proxyName: string;

  constructor(proterties?: any, options?: any);

  initialize(): void;

  incObservers(e?: boolean): void;

  decObservers(): void;

  hasObservers(): boolean;

  addChild(id: Stringable, context: { [key: string]: any }): void;

  get<T extends keyof this>(attr: T): this[T];

  set(...args: any): any;

  hasUnfiredChanges(): boolean;

  unset(ids: Stringable | Stringable[], t?: any): void;

  clear(): void;

  delete(): void;

  reset(): void;

  getDefault<T extends keyof this>(attr: T): any;

  // getCollection?(): Collection;

  static isIdType(e: any): boolean;
}

exportModule(
  exports,
  {
    Model: (m) => m.BaseModel || m.default,
  },
  (m) => m.defineModel
);
