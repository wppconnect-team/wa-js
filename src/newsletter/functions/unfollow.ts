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

import { WPPError } from '../../util';
import { mexLeaveNewsletter } from '../../whatsapp/functions';

/**
 * Unfollow/unsubscribe from a newsletter
 *
 * @example
 * ```javascript
 * // Unfollow a newsletter
 * const success = await WPP.newsletter.unfollow('120363xxxxx@newsletter');
 * ```
 *
 * @category Newsletter
 */
export async function unfollow(id: string): Promise<boolean> {
  if (!id || !id.includes('@newsletter')) {
    throw new WPPError(
      'invalid_newsletter_id',
      'Please provide a valid newsletter ID (must contain @newsletter)'
    );
  }

  try {
    await mexLeaveNewsletter(id);
    return true;
  } catch (error: any) {
    // Error 400 means already unfollowed - treat as success (idempotent)
    if (error.status === 400) {
      return true;
    }

    throw new WPPError(
      'newsletter_unfollow_failed',
      `Failed to unfollow newsletter: ${error.message}`,
      { error }
    );
  }
}
