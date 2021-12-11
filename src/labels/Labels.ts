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

import Debug from 'debug';

import { assertColor, assertGetChat, assertIsBusiness } from '../assert';
import { WPPError } from '../util';
import * as webpack from '../webpack';
import { LabelStore, Wid } from '../whatsapp';
import {
  addOrRemoveLabelsOptions,
  DeleteLabelReturn,
  label,
  newLabelOptions,
} from './types';

const debug = Debug('WA-JS:labels');

export class Labels {
  constructor() {
    webpack.onInjected(() => this.initialize());
  }

  async initialize() {
    debug('initialized');
  }

  async getAllLabels(): Promise<label[]> {
    const labels = (await LabelStore._findQuery()) || [];
    return labels.map((e: label) => {
      return { ...e, color: assertColor(Number(e.color)) };
    });
  }

  /**
   * Add a new label
   * Use await WPP.labels.getLabelColorPalette() to get the list of available colors
   * @example
   * ```javascript
   * await WPP.labels.addNewLabel(`Name of label`);
   * //or
   * await WPP.labels.addNewLabel(`Name of label`, { labelColor: '#dfaef0' });
   * //or
   * await WPP.labels.addNewLabel(`Name of label`, { labelColor: 4292849392 });
   * ```
   */
  async addNewLabel(labelName: string, options: newLabelOptions = {}) {
    assertIsBusiness();

    let labelColor: number | false;

    if (['number', 'string'].includes(typeof options.labelColor)) {
      labelColor = assertColor(options.labelColor);
    } else {
      labelColor = await this.getNewLabelColor();
    }

    if (!(await this.colorIsInLabelPalette(labelColor))) {
      throw new WPPError('color_not_in_pallet', `Color not in pallet`);
    }
    return await LabelStore.addNewLabel(labelName, labelColor.toString());
  }

  async deleteLabel(id: string): Promise<DeleteLabelReturn>;
  async deleteLabel(ids: string[]): Promise<DeleteLabelReturn[]>;
  async deleteLabel(
    ids: string | string[]
  ): Promise<DeleteLabelReturn | DeleteLabelReturn[]> {
    assertIsBusiness();

    let isSingle = false;

    if (!Array.isArray(ids)) {
      isSingle = true;
      ids = [ids];
    }

    const results: DeleteLabelReturn[] = [];
    for (const id of ids) {
      results.push({
        id: id,
        deleteLabelResult: await LabelStore.deleteLabel(id),
      });
    }

    if (isSingle) {
      return results[0];
    }
    return results;
  }

  async deleteAllLabels(): Promise<DeleteLabelReturn[]> {
    assertIsBusiness();

    const labels = await this.getAllLabels();
    return this.deleteLabel(labels.map((e) => e.id));
  }

  /**
   * Add or remove label from chats
   * @example
   * ```javascript
   * await WPP.labels.addOrRemoveLabels(
   *   ['5541999999999','5541988888888'],
   *   [{labelId:'76', type:'add'},{labelId:'75', type:'remove'}]
   * )
   * ```
   */
  async addOrRemoveLabels(
    chatIds: string | Wid | (string | Wid)[],
    options: addOrRemoveLabelsOptions | addOrRemoveLabelsOptions[]
  ): Promise<any> {
    assertIsBusiness();

    if (!Array.isArray(chatIds)) {
      chatIds = [chatIds];
    }
    if (!Array.isArray(options)) {
      options = [options];
    }

    const chats = chatIds.map((e) => assertGetChat(e));
    const labels = options.map((e) => {
      return {
        id: e.labelId,
        type: e.type,
      };
    });

    return await LabelStore.addOrRemoveLabels(labels, chats);
  }

  /**
   * Return the color of the next label in positive decimal
   */
  async getNewLabelColor(): Promise<number> {
    assertIsBusiness();

    const newLabelColor = await LabelStore.getNewLabelColor();

    if (!newLabelColor) {
      throw new WPPError('cannot_get_color', `Can't get new label color`);
    }

    return assertColor(Number(newLabelColor));
  }

  /**
   * Returns an array of color palette in positive decimal
   */
  async getLabelColorPalette(): Promise<number[]> {
    assertIsBusiness();

    const colorPalette = await LabelStore.getLabelColorPalette();

    if (!colorPalette) {
      throw new WPPError('canot_get_color_palette', `Can't get color palette`);
    }

    return colorPalette.map((e: string) => assertColor(Number(e)));
  }

  /**
   * Check if color is in label palette
   * @param color If it's decimal, send it as a number. If it's hexadecimal, send it as a string
   * @example
   * ```javascript
   * await WPP.labels.colorIsInLabelPalette('#ffd429');
   * //or
   * await WPP.labels.colorIsInLabelPalette(4284794111);
   * ```
   */
  async colorIsInLabelPalette(color: string | number): Promise<boolean> {
    assertIsBusiness();

    const colorPalette = await this.getLabelColorPalette();
    return colorPalette && colorPalette.includes(assertColor(color));
  }
}
