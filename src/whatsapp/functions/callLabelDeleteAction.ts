/*!
 * Copyright 2026 WPPConnect Team
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

import { labelDeleteAction } from './labelAddAction';

/**
 * Call labelDeleteAction using the signature supported by the current
 * WhatsApp Web version.
 */
export function callLabelDeleteAction(
  id: string,
  name: string,
  colorIndex: number
): Promise<number | void> {
  if (labelDeleteAction.length === 1) {
    return labelDeleteAction({ labelId: id, name, color: colorIndex });
  }

  return labelDeleteAction(id, name, colorIndex);
}
