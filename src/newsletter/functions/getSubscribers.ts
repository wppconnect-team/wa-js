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

import { WPPError } from '../../util';
import {
  getNewsletterSubscribers,
  NewsletterFollower,
} from '../../whatsapp/functions';
import { NewsletterGatingUtils } from '../../whatsapp/misc';
import { NewsletterStore } from '../../whatsapp/stores';

/**
 * Get subscribers of a newsletter
 *
 * Only an admin or the owner of the newsletter can list its subscribers —
 * WhatsApp answers `401 Not Authorized` for anyone else.
 *
 * @example
 * ```javascript
 * // Up to the maximum WhatsApp allows
 * const subscribers = await WPP.newsletter.getSubscribers('[newsletter-id]@newsletter');
 *
 * // Only the first 10
 * const subscribers = await WPP.newsletter.getSubscribers('[newsletter-id]@newsletter', 10);
 * ```
 *
 * @param id The newsletter ID
 * @param count How many subscribers to fetch. Defaults to the maximum
 *   WhatsApp allows, which is also the ceiling for any higher value.
 * @returns The subscriber list, or `false` when the request fails
 *
 * @category Newsletter
 */
export async function getSubscribers(
  id: string,
  count?: number
): Promise<NewsletterFollower[] | false> {
  if (!id || !id.includes('newsletter'))
    throw new WPPError(
      'send_correctly_newsletter_id',
      'Please, send the correct newsletter ID.'
    );

  /**
   * WhatsApp only allows an admin or the owner to list a newsletter's
   * subscribers — `WAWebNewsletterSubscriberListAction` bails out on
   * `iAmAdminOrOwner()` and the MEX query answers 401 "Not Authorized"
   * otherwise. Fail with something actionable when we can tell up front.
   */
  const metadata = NewsletterStore.get(id)?.newsletterMetadata;

  if (metadata?.iAmAdminOrOwner?.() === false) {
    throw new WPPError(
      'newsletter_subscribers_require_admin',
      'Only an admin or the owner of a newsletter can list its subscribers.',
      { id }
    );
  }

  try {
    const max = NewsletterGatingUtils?.getMaxSubscriberNumber?.();
    const result = await getNewsletterSubscribers(
      id,
      count ?? (typeof max === 'number' ? max : 100),
      'LIMITED'
    );
    return result?.followers || [];
  } catch (error) {
    // Returning `false` is the historical contract, but swallowing the error
    // silently is what hid this function being broken. Keep the contract and
    // make the cause visible.
    console.error('[WPP.newsletter.getSubscribers] failed', error);
    return false;
  }
}
