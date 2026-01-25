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
import { mexJoinNewsletter } from '../../whatsapp/functions';

/**
 * Follow/subscribe to a newsletter
 *
 * @example
 * ```javascript
 * // Follow a newsletter
 * const success = await WPP.newsletter.follow('120363xxxxx@newsletter');
 * ```
 *
 * @category Newsletter
 */
export async function follow(id: string): Promise<boolean> {
  if (!id || !id.includes('@newsletter')) {
    throw new WPPError(
      'invalid_newsletter_id',
      'Please provide a valid newsletter ID (must contain @newsletter)'
    );
  }

  try {
    await mexJoinNewsletter(id);
    return true;
  } catch (error: any) {
    // Map specific error codes to friendly messages
    if (error.status === 419) {
      throw new WPPError(
        'newsletter_follower_limit',
        'This newsletter has reached the follower limit. Please try again later.',
        { error }
      );
    }

    if (error.status === 405) {
      throw new WPPError(
        'newsletter_closed',
        'This newsletter is closed to new followers. Try again later.',
        { error }
      );
    }

    if (error.status === 451) {
      throw new WPPError(
        'newsletter_geosuspended',
        'This newsletter is not available in your country.',
        { error }
      );
    }

    throw new WPPError(
      'newsletter_follow_failed',
      `Failed to follow newsletter: ${error.message}`,
      { error }
    );
  }
}
