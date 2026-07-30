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

/**
 * Helpers for testing wa-js by hand from the browser console.
 *
 * This module only exists in the development build (`npm run build:dev`):
 * `src/index.ts` requires it behind `if (__DEV__)`, which webpack folds away in
 * production, so nothing here ships to users.
 *
 * @example
 * ```javascript
 * await WPP.dev.sendTests();
 * ```
 */

export type { TestCase, TestGroup, TestResult } from './sendTests';
export { cases, sendTests } from './sendTests';
