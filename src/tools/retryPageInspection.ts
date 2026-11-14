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

/** Retry read-only compatibility inspection only when navigation destroys its context. */
export async function retryPageInspection<T>(
  ready: () => Promise<unknown>,
  inspect: () => Promise<T>
): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      await ready();
      return await inspect();
    } catch (error) {
      if (
        attempt >= 2 ||
        !String(error).includes('Execution context was destroyed')
      )
        throw error;
      console.warn(
        'The compatibility page navigated; retrying the read-only inspection'
      );
    }
  }
}
