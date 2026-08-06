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

import { injectFallbackModule } from '../../loader';
import { WPPError } from '../../util';
import { exportModule } from '../exportModule';
import { MexClient, NewsletterGatingUtils, Wid, WidFactory } from '../misc';

/**
 * Membership of a newsletter follower.
 *
 * Mirrors `WAWebCommonNewsletterEnums.NewsletterMembershipType`.
 */
export type NewsletterMembership =
  'admin' | 'guest' | 'owner' | 'subscriber' | undefined;

export interface NewsletterFollower {
  id: Wid;
  displayName?: string;
  role?: NewsletterMembership;
  phoneNumber?: Wid;
  followTime: number | null;
  username?: string;
  adminProfile: {
    id: string;
    name: string;
    pictureDirectPath?: string;
    pictureId?: string;
  } | null;
}

/**
 * @whatsapp WAWebNewsletterSubscriberListQueryJob
 *
 * @param jid The newsletter JID
 * @param count How many followers to fetch (WhatsApp clamps it to
 *   `NewsletterGatingUtils.getMaxSubscriberNumber()`)
 * @param view Only used by the `WAWebNewsletterSubscriberListJob` wrapper
 *   added in WA ~2.3000.1044479778; the underlying query job ignores it
 */
export declare function getNewsletterSubscribers(
  jid: string,
  count: number,
  view?: 'LIMITED'
): Promise<{ followers: NewsletterFollower[] } | null>;

exportModule(
  exports,
  {
    getNewsletterSubscribers: 'getNewsletterSubscribers',
  },
  (m) => m.getNewsletterSubscribers
);

/**
 * The persisted MEX document id of `WAWebMexFetchNewsletterFollowersJobQuery`.
 *
 * WhatsApp sends this operation as a persisted query (`params.text` is always
 * `null`), so only the id is needed. It has been stable since WA
 * 2.3000.1037554587.
 */
const FETCH_NEWSLETTER_FOLLOWERS_DOC_ID = '27472091235714801';

/**
 * `WAWebNewsletterSubscriberListQueryJob` (and the modules it delegates to)
 * moved into a lazily loaded chunk in WA ~2.3000.1044479778, so it is not
 * registered until WhatsApp happens to load the newsletter/media-viewer UI —
 * which never happens for a headless client.
 *
 * `WAWebMexClient` is loaded eagerly though, so run the same MEX query
 * ourselves. This mirrors `WAWebMexFetchNewsletterFollowersJob`, minus the
 * username database hydration it performs as a side effect.
 */
injectFallbackModule('getNewsletterSubscribers', {
  getNewsletterSubscribers: async (jid: string, count: number) => {
    if (typeof MexClient?.fetchQuery !== 'function') {
      throw new WPPError(
        'mex_client_not_available',
        'WAWebMexClient is not available, unable to fetch newsletter subscribers'
      );
    }

    const max = NewsletterGatingUtils?.getMaxSubscriberNumber?.();
    const data = await MexClient.fetchQuery(
      {
        kind: 'Request',
        params: {
          id: FETCH_NEWSLETTER_FOLLOWERS_DOC_ID,
          metadata: {},
          name: 'WAWebMexFetchNewsletterFollowersJobQuery',
          operationKind: 'query',
          text: null,
        },
      },
      {
        input: {
          newsletter_id: jid,
          count: typeof max === 'number' ? Math.min(max, count) : count,
        },
      }
    );

    const result = data?.xwa2_newsletter_followers;

    if (result == null) {
      return null;
    }

    const edges: any[] = result.followers?.edges;

    if (edges == null) {
      return { followers: [] };
    }

    // WhatsApp lists admins and owners first
    const staff = edges.filter((e) => e.role === 'ADMIN' || e.role === 'OWNER');
    const staffIds = new Set(staff.map((e) => e.node.id));
    const ordered = [
      ...staff,
      ...edges.filter((e) => !staffIds.has(e.node.id)),
    ];

    const followers: NewsletterFollower[] = [];

    for (const edge of ordered) {
      const node = edge.node;

      if (node?.id == null) {
        continue;
      }

      followers.push({
        id: WidFactory.createWid(node.id),
        displayName: node.display_name,
        role: edge.role?.toLowerCase(),
        phoneNumber:
          node.pn != null ? WidFactory.createWid(node.pn) : undefined,
        followTime:
          edge.follow_time != null
            ? Number.parseInt(edge.follow_time, 10)
            : null,
        username: node.username_info?.username,
        adminProfile:
          edge.admin_profile?.name != null
            ? {
                id: edge.admin_profile.id,
                name: edge.admin_profile.name,
                pictureDirectPath: edge.admin_profile.picture?.direct_path,
                pictureId: edge.admin_profile.picture?.id,
              }
            : null,
      });
    }

    return { followers };
  },
});
