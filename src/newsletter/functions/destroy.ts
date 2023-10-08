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

import { WPPError } from '../../util';
import { deleteNewsletter } from '../../whatsapp/functions';

/**
 * Delete a newsletter
 *
 * @example
 * ```javascript
 * const code = WPP.newsletter.destroy('[newsletter-id]@newsletter');
 * ```
 *
 * @category Newsletter
 */
export async function destroy(id: string): Promise<boolean> {
  if (!id || !id.includes('newsletter'))
    throw new WPPError(
      'send_correctly_newsletter_id',
      'Please, send the correct newsletter ID.'
    );
  try {
    return await deleteNewsletter(id);
  } catch (error) {
    return false;
  }
}
