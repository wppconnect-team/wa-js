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

import { z } from 'zod';

export interface Stringable {
  toString(): string;
}

/** Zod schema for a WhatsApp group/community chat ID (ends with `@g.us`) */
export const groupIdSchema = z
  .string()
  .regex(/^.+@g\.us$/, 'Invalid group ID: must end with @g.us');
export type GroupId = z.infer<typeof groupIdSchema>;

/** Zod schema for a WhatsApp DM chat ID (ends with `@c.us` or `@lid`) */
export const dmChatIdSchema = z
  .string()
  .regex(/^.+@(c\.us|lid)$/, 'Invalid DM chat ID: must end with @c.us or @lid');
export type DMChatId = z.infer<typeof dmChatIdSchema>;

/** Zod schema for a WhatsApp Newsletter channel ID (ends with `@newsletter`) */
export const newsletterIdSchema = z
  .string()
  .regex(/^.+@newsletter$/, 'Invalid newsletter ID: must end with @newsletter');
export type NewsletterId = z.infer<typeof newsletterIdSchema>;

/** Zod schema for a WhatsApp Status broadcast ID (`status@broadcast`) */
export const statusIdSchema = z.literal('status@broadcast');
export type StatusId = z.infer<typeof statusIdSchema>;

/**
 * Zod schema for any valid WhatsApp chat ID.
 * Accepts DMs (`@c.us`, `@lid`), groups/communities (`@g.us`),
 * newsletters (`@newsletter`), and status (`status@broadcast`).
 */
export const chatIdSchema = z.union([
  dmChatIdSchema,
  groupIdSchema,
  newsletterIdSchema,
  statusIdSchema,
]);
export type ChatId = z.infer<typeof chatIdSchema>;
