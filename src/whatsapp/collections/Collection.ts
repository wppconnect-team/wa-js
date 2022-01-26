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

interface Option {
  add: boolean;
  merge: boolean;
  remove: boolean;
}

/** @whatsapp 93458 */
export declare interface Collection<M>
  extends EventEmitter,
    Pick<
      Array<M>,
      | 'indexOf'
      | 'lastIndexOf'
      | 'every'
      | 'some'
      | 'forEach'
      | 'map'
      | 'filter'
      | 'reduce'
      | 'slice'
    > {}

/** @whatsapp 93458 */
export declare class Collection<M, A = M | M[]> extends EventEmitter {
  static model: any;
  static comparator: (a: any, b: any) => number;

  modelClass: M;

  constructor(e?: any, t?: { parent: any });

  add(value: A | WritableProperties<A>, options?: Option): A;

  set(value: A, options?: Option): A;

  remove(value: A, options?: { index?: boolean; silent?: boolean }): M[];

  reset(): void;

  sort(options?: { silent?: boolean }): this;

  replaceId(e: any, t: any): void;

  reorderMutate(e: any, t: any): void;

  get(e: Stringable): M | undefined;

  assertGet(e: Stringable): M;

  at(position: number): M | undefined;

  get length(): number;

  get isCollection(): boolean;

  get models(): M[];

  serialize(): any[];

  toJSON(): any[];

  isModel(model: any): model is M;

  includes(model: M, position?: number): boolean;

  findFirst: Array<M>['find'];

  where(ids: Stringable[]): M[];

  head(): M | undefined;

  last(): M | undefined;

  toArray(): M[];

  getModelsArray(): M[];

  reorder(e: number, t: number): M[];
}

exportModule(
  exports,
  {
    Collection: 'default',
  },
  (m) => m.default.toString().includes('Collection initialized without model')
);
