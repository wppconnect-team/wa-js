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

import { expect, test } from '@playwright/test';

import { retryPageInspection } from '../src/tools/retryPageInspection';

test('navigation retries wait for the new ready context before inspecting again', async () => {
  const calls: string[] = [];
  let attempts = 0;
  const result = await retryPageInspection(
    async () => {
      calls.push('ready');
    },
    async () => {
      calls.push('inspect');
      if (++attempts < 3) throw new Error('Execution context was destroyed');
      return 'pinned';
    }
  );
  expect(result).toBe('pinned');
  expect(calls).toEqual([
    'ready',
    'inspect',
    'ready',
    'inspect',
    'ready',
    'inspect',
  ]);
});

test('an actual missing-backend failure is not retried or converted to success', async () => {
  let attempts = 0;
  const error = new Error('No complete backend');
  await expect(
    retryPageInspection(
      async () => {},
      async () => {
        attempts++;
        throw error;
      }
    )
  ).rejects.toBe(error);
  expect(attempts).toBe(1);
});

test('navigation retries have a hard three-attempt bound', async () => {
  let attempts = 0;
  await expect(
    retryPageInspection(
      async () => {},
      async () => {
        attempts++;
        throw new Error('Execution context was destroyed');
      }
    )
  ).rejects.toThrow('Execution context was destroyed');
  expect(attempts).toBe(3);
});
