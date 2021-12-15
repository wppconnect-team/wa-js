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

export interface Label {
  id: string;
  name: string;
  color: number;
  count: number;
}
export interface NewLabelOptions {
  /**
   * If it's decimal, send it as a number. If it's hexadecimal, send it as a string.
   * If labelColor is omitted, the color will be generated automatically
   */
  labelColor?: string | number;
}

export interface AddOrRemoveLabelsOptions {
  labelId: string;
  type: 'add' | 'remove';
}

export interface DeleteLabelReturn {
  id: string;
  deleteLabelResult: any;
}
