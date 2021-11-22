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

const debug = Debug('WA-JS:Labels');

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
   * await WPP.labels.addNewLabel(`Name of label`, { labelColor: '#ffd429' });
   * //or
   * await WPP.labels.addNewLabel(`Name of label`, { labelColor: 4284794111 });
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

  async getNewLabelColor(): Promise<number> {
    return new Promise((resolve) => {
      const labelColor = LabelStore.getNewLabelColor();
      const startTime = Date.now();
      const loop = () => {
        setTimeout(() => {
          if (labelColor._value) {
            resolve(labelColor._value);
          } else if (Date.now() - startTime > 2000) {
            throw new WPPError(
              'invalid_label_color',
              `Error when getNewLabelColor`
            );
          } else {
            loop();
          }
        }, 100);
      };
      loop();
    });
  }

  async getLabelColorPalette(): Promise<Array<number>> {
    return new Promise((resolve) => {
      const labelColorPalette = LabelStore.getLabelColorPalette();
      const startTime = Date.now();
      const loop = () => {
        setTimeout(() => {
          if (labelColorPalette._value) {
            resolve(
              labelColorPalette._value.map((e: string) => {
                return 0xffffffff + Number(e) + 1;
              })
            );
          } else if (Date.now() - startTime > 2000) {
            throw new WPPError(
              'invalid_label_palette',
              `Error when getLabelColorPalette`
            );
          } else {
            loop();
          }
        }, 100);
      };
      loop();
    });
  }

  async colorIsInLabelPalette(color: number): Promise<boolean> {
    const colorPalette = await this.getLabelColorPalette();
    return colorPalette && colorPalette.includes(color);
  }
}
