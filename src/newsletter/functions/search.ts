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
import { mexFetchNewsletterDirectorySearchResults } from '../../whatsapp/functions';

export interface NewsletterSearchOptions {
  categories?: string[];
  limit?: number;
  cursorToken?: string;
}

export interface NewsletterSearchResult {
  newsletters: Array<{
    idJid: string;
    name: string;
    description: string;
    picture: string;
    subscribersCount: number;
    verification: string;
    handle: string | null;
    inviteCode: string;
    creationTime: number;
    _raw?: any;
  }>;
  pageInfo?: {
    hasNextPage?: boolean;
    endCursor?: string;
  };
}

/**
 * Search for newsletters in the directory
 *
 * @example
 * ```javascript
 * // Basic search
 * const result = await WPP.newsletter.search('technology');
 *
 * // Search with options
 * const result = await WPP.newsletter.search('news', {
 *   limit: 10,
 *   categories: ['TECHNOLOGY', 'NEWS']
 * });
 *
 * // Pagination
 * const firstPage = await WPP.newsletter.search('tech');
 * if (firstPage.pageInfo?.hasNextPage) {
 *   const nextPage = await WPP.newsletter.search('tech', {
 *     cursorToken: firstPage.pageInfo.endCursor
 *   });
 * }
 * ```
 *
 * @category Newsletter
 */
export async function search(
  query: string,
  options?: NewsletterSearchOptions
): Promise<NewsletterSearchResult> {
  if (!query || query.trim().length === 0) {
    throw new WPPError('invalid_search_query', 'Search query cannot be empty');
  }

  try {
    const params = {
      searchText: query.trim(),
      categories: options?.categories || [],
      limit: options?.limit || 20,
      cursorToken: options?.cursorToken,
    };

    const response = await mexFetchNewsletterDirectorySearchResults(params);

    // Parse response defensively
    const searchResult = response?.xwa2_newsletters_directory_search;
    const newsletters = searchResult?.result || [];
    const pageInfo = searchResult?.page_info;

    return {
      newsletters: newsletters.map((item: any) => {
        const metadata = item.thread_metadata || {};

        // Parse subscribers count safely
        let subscribersCount = 0;
        if (metadata.subscribers_count) {
          const parsed = parseInt(metadata.subscribers_count, 10);
          subscribersCount = isNaN(parsed) ? 0 : parsed;
        }

        // Parse creation time safely
        let creationTime = 0;
        if (metadata.creation_time) {
          const parsed = parseInt(metadata.creation_time, 10);
          creationTime = isNaN(parsed) ? 0 : parsed;
        }

        return {
          idJid: item.idJid || item.id || '',
          name: metadata.name?.text || item.name || '',
          description: metadata.description?.text || item.description || '',
          picture: metadata.picture?.direct_path || metadata.picture || '',
          subscribersCount,
          verification: metadata.verification || '',
          handle: metadata.handle || null,
          inviteCode: metadata.invite || '',
          creationTime,
          // Keep original data for advanced usage
          _raw: item,
        };
      }),
      pageInfo: pageInfo
        ? {
            hasNextPage: pageInfo.has_next_page,
            endCursor: pageInfo.end_cursor,
          }
        : undefined,
    };
  } catch (error: any) {
    throw new WPPError(
      'newsletter_search_failed',
      `Failed to search newsletters: ${error.message}`,
      { error }
    );
  }
}
