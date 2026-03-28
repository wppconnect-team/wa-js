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

import { z } from 'zod';

import { WPPError } from '../../util';
import { getNewsletterSubscribers } from '../../whatsapp/functions';

const newsletterGetSubscribersSchema = z.object({
  newsletterId: z.string(),
});

export type NewsletterGetSubscribersInput = z.infer<
  typeof newsletterGetSubscribersSchema
>;
export type NewsletterGetSubscribersOutput = any;

/**
 * Get subscribers of a newsletters
 *
 * @example
 * ```javascript
 * const code = WPP.newsletter.getSubscribers({ newsletterId: '[newsletter-id]@newsletter' });
 * ```
 *
 * @category Newsletter
 */
export async function getSubscribers(
  params: NewsletterGetSubscribersInput
): Promise<NewsletterGetSubscribersOutput> {
  const { newsletterId } = newsletterGetSubscribersSchema.parse(params);

  if (!newsletterId.includes('newsletter'))
    throw new WPPError(
      'send_correctly_newsletter_id',
      'Please, send the correct newsletter ID.'
    );
  try {
    return (await getNewsletterSubscribers(newsletterId, 9, 'LIMITED'))
      .subscribers;
  } catch (_error) {
    return false;
  }
}
