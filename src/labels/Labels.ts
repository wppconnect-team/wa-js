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

import { assertColor } from '../assert';
import { WPPError } from '../util';
import * as webpack from '../webpack';
import { LabelStore } from '../whatsapp';
import { newLabelOptions } from './types';

const debug = Debug('WA-JS:labels');

export class Labels {
  constructor() {
    webpack.onInjected(() => this.initialize());
  }

  async initialize() {
    debug('initialized');
  }

  /**
   * Add a new label
   * Use await WPP.labels.getLabelColorPalette() to get the list of available colors
   * @example
   * ```javascript
   * await WPP.labels.addNewLabel(`Name of label`);
   * //or
   * await WPP.labels.addNewLabel(`Name of label`, { labelColor: 'dfaef0' });
   * //or
   * await WPP.labels.addNewLabel(`Name of label`, { labelColor: 4292849392 });
   * ```
   */
  async addNewLabel(labelName: string, options: newLabelOptions = {}) {
    let labelColor: number | false;

    if (['number', 'string'].includes(typeof options.labelColor)) {
      labelColor = assertColor(options.labelColor);
    } else {
      labelColor = await this.getNewLabelColor();
    }

    if (!(await this.colorIsInLabelPalette(labelColor))) {
      throw new WPPError('color_not_in_pallet', `Color not in pallet`);
    }
    await LabelStore.addNewLabel(labelName, labelColor.toString());
  }

  /**
   * Return the color of the next label in positive decimal
   */
  async getNewLabelColor(): Promise<number> {
    const newLabelColor = await LabelStore.getNewLabelColor();

    if (!newLabelColor) {
      throw new WPPError('canot_get_color', `Can't get new label color`);
    }

    return assertColor(Number(newLabelColor));
  }

  /**
   * Returns an array of color palette in positive decimal
   */
  async getLabelColorPalette(): Promise<Array<number>> {
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
   * await WPP.labels.colorIsInLabelPalette('ffd429');
   * //or
   * await WPP.labels.colorIsInLabelPalette(4284794111);
   * ```
   */
  async colorIsInLabelPalette(color: string | number): Promise<boolean> {
    const colorPalette = await this.getLabelColorPalette();
    return colorPalette && colorPalette.includes(assertColor(color));
  }
}
