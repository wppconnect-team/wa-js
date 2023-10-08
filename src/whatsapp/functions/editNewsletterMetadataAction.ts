/*!
 * Copyright 2023 WPPConnect Team
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

import { exportModule } from '../exportModule';
import { ChatModel } from '../models';

/**
 * @whatsapp 172365
 */
export declare function editNewsletterMetadataAction(
  newsletter: ChatModel,
  editAtts: {
    editName?: boolean;
    editDescription?: boolean;
    editPicture?: boolean;
  },
  data: {
    name?: string;
    description?: string;
    picture?: string | null;
  }
): any;

exportModule(
  exports,
  {
    editNewsletterMetadataAction: 'editNewsletterMetadataAction',
  },
  (m) => m.editNewsletterMetadataAction
);
