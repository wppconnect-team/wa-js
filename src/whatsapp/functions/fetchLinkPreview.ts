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

export interface LinkPreviewResult {
  url: string;
  data: {
    title?: string;
    description?: string;
    canonicalUrl?: string;
    matchedText: string;
    richPreviewType: number;
    thumbnail?: string;
    doNotPlayInline: boolean;
  };
}

/** @whatsapp 19146
 * @whatsapp 75820 >= 2.2204.13
 */
export declare function fetchLinkPreview(
  url: string
): Promise<null | LinkPreviewResult>;

exportModule(
  exports,
  {
    fetchLinkPreview: 'default',
  },
  (m, id) => {
    const source: string = webpack.moduleSource(id);
    return (
      source.includes('.queryLinkPreview') &&
      source.includes('.getProductOrCatalogLinkPreview')
    );
  }
);
