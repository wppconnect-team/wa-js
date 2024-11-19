/*!
 * Copyright 2024 WPPConnect Team
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
import { ChatModel, LabelModel } from '../models';

/** @whatsapp 165820
 */
export declare function createNewListAction(
  name: string,
  chats: ChatModel[],
  colorId: number,
  e?: any
): Promise<any>;
export declare function deleteListAction(
  a?: any,
  b?: any,
  c?: any
): Promise<any>;
export declare function editListAction(options: {
  entryPoint?: number;
  labelModel: LabelModel;
  newColor: number;
  newName?: string;
  updatedAssociatedChats?: ChatModel[];
}): Promise<any>;

export declare function isListsEnabled(): boolean;
export declare function shouldListsSettingsItemBeVisible(): boolean;

exportModule(
  exports,
  {
    createNewListAction: 'createNewListAction',
    deleteListAction: 'deleteListAction',
    editListAction: 'editListAction',
  },
  (m) => m.createNewListAction && m.deleteListAction && m.editListAction
);

exportModule(
  exports,
  {
    isListsEnabled: 'isListsEnabled',
    shouldListsSettingsItemBeVisible: 'shouldListsSettingsItemBeVisible',
  },
  (m) => m.isListsEnabled && m.shouldListsSettingsItemBeVisible
);
