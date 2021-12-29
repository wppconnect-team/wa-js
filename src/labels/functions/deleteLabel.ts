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

import { assertIsBusiness } from '../../assert';
import { LabelStore } from '../../whatsapp';

export interface DeleteLabelReturn {
  id: string;
  deleteLabelResult: any;
}

export async function deleteLabel(id: string): Promise<DeleteLabelReturn>;
export async function deleteLabel(ids: string[]): Promise<DeleteLabelReturn[]>;
export async function deleteLabel(
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
