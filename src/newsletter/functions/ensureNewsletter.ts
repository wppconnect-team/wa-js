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

import z from 'zod';

import { assertGetChat } from '../../assert';
import { WPPError } from '../../util';

const newsletterEnsureNewsletterSchema = z.object({
  newsletterId: z.string(),
});
export type NewsletterEnsureNewsletterInput = z.infer<
  typeof newsletterEnsureNewsletterSchema
>;

export async function ensureNewsletter(
  params: NewsletterEnsureNewsletterInput
) {
  const { newsletterId } = newsletterEnsureNewsletterSchema.parse(params);
  const newsletterChat = assertGetChat(newsletterId);

  if (!newsletterChat.isNewsletter) {
    throw new WPPError(
      'not_a_newsletter',
      `Chat ${newsletterChat.id._serialized} is not a newsletter`
    );
  }
  return newsletterChat;
}
