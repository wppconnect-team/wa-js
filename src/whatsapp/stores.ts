/*!
 * Copyright 2023 WPPConnect Team
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

import * as collections from './collections';
import { exportModule } from './exportModule';

/** @whatsapp 32826
 * @whatsapp 132826 >= 2.2222.8
 */
export declare const BlocklistStore: collections.BlocklistCollection;
/** @whatsapp 3754
 * @whatsapp 203754 >= 2.2222.8
 */
export declare const BusinessCategoriesResultStore: collections.BusinessCategoriesResultCollection;
/** @whatsapp 93581
 * @whatsapp 493581 >= 2.2222.8
 */
export declare const BusinessProfileStore: collections.BusinessProfileCollection;
/** @whatsapp 60868
 * @whatsapp 31218 >= 2.2204.13
 * @whatsapp 160868 >= 2.2222.8
 */
export declare const CallStore: collections.CallCollection;
/** @whatsapp 12392
 * @whatsapp 612392 >= 2.2222.8
 */
export declare const CartStore: collections.CartCollection;
/** @whatsapp 99989
 * @whatsapp 599989 >= 2.2222.8
 */
export declare const CatalogStore: collections.CatalogCollection;
/** @whatsapp 69951
 * @whatsapp 669951 >= 2.2222.8
 */
export declare const ChatStore: collections.ChatCollection;
/** @whatsapp 19380
 * @whatsapp 719380 >= 2.2222.8
 */
export declare const NewsletterStore: collections.ChatCollection;
/** @whatsapp 19380
 * @whatsapp 719380 >= 2.2222.8
 */
export declare const ContactStore: collections.ContactCollection;
/** @whatsapp 13185
 * @whatsapp 513185 >= 2.2222.8
 */
export declare const EmojiVariantStore: collections.EmojiVariantCollection;
/** @whatsapp 63928
 * @whatsapp 963928 >= 2.2222.8
 */
export declare const GroupMetadataStore: collections.GroupMetadataCollection;
/** @whatsapp 16770
 * @whatsapp 316770 >= 2.2222.8
 */
export declare const LabelStore: collections.LabelCollection;
/** @whatsapp 59871
 * @whatsapp 559871 >= 2.2222.8
 */
export declare const MsgStore: collections.MsgCollection;
/** @whatsapp 17972
 * @whatsapp 617972 >= 2.2222.8
 */
export declare const MsgInfoStore: collections.MsgInfoCollection;
/** @whatsapp 72472 */
export declare const MuteStore: collections.MuteCollection;
/** @whatsapp 84312
 * @whatsapp 584312 >= 2.2222.8
 */
export declare const OrderStore: collections.OrderCollection;
/** @whatsapp 68315
 * @whatsapp 868315 >= 2.2222.8
 */
export declare const PresenceStore: collections.PresenceCollection;
/** @whatsapp 18952 */
export declare const ProductMessageListStore: collections.ProductMessageListCollection;
/** @whatsapp 82039
 * @whatsapp 582039 >= 2.2222.8
 */
export declare const ProfilePicThumbStore: collections.ProfilePicThumbCollection;
/** @whatsapp 99662
 * @whatsapp 999662 >= 2.2222.8
 */
export declare const QuickReplyStore: collections.QuickReplyCollection;
/** @whatsapp 57162
 * @whatsapp 257162 >= 2.2222.8
 */
export declare const ReactionsStore: collections.ReactionsCollection;
/** @whatsapp 92671
 * @whatsapp 492671 >= 2.2222.8
 */
export declare const RecentEmojiStore: collections.RecentEmojiCollection;
/** @whatsapp 49264
 * @whatsapp 191692 >= 2.2222.8
 */
export declare const RecentStickerStore: collections.RecentStickerCollection;
/** @whatsapp 19011
 * @whatsapp 719011 >= 2.2222.8
 */
export declare const StarredMsgStore: collections.StarredMsgCollection;
/** @whatsapp 46133 */
export declare const StatusStore: collections.StatusCollection;
/** @whatsapp 59387
 * @whatsapp 459387 >= 2.2222.8
 */
export declare const StatusV3Store: collections.StatusV3Collection;
/** @whatsapp 67963
 * @whatsapp 767963 >= 2.2222.8
 */
export declare const StickerStore: collections.StickerCollection;
/** @whatsapp 44333
 * @whatsapp 344333 >= 2.2222.8
 */
export declare const StickerPackStore: collections.StickerPackCollection;
/** @whatsapp 45068
 * @whatsapp 545068 >= 2.2222.8
 */
export declare const StickerSearchStore: collections.StickerSearchCollection;
export declare const PinInChatStore: collections.PinInChatCollection;

const storeNames = [
  'BlocklistStore',
  'BusinessCategoriesResultStore',
  'BusinessProfileStore',
  'CallStore',
  'CartStore',
  'CatalogStore',
  'ChatStore',
  'NewsletterStore',
  'ContactStore',
  'EmojiVariantStore',
  'GroupMetadataStore',
  'LabelStore',
  'MsgStore',
  'MsgInfoStore',
  'MuteStore',
  'OrderStore',
  'PinInChatStore',
  'PresenceStore',
  'ProductMessageListStore',
  'ProfilePicThumbStore',
  'QuickReplyStore',
  'ReactionsStore',
  'RecentEmojiStore',
  'StatusStore',
  'StatusV3Store',
  'StickerStore',
  'StickerSearchStore',
];

for (const name of storeNames) {
  const collectionName = name.replace('Store', 'Collection');
  exportModule(
    exports,
    {
      [name]: ['default', collectionName],
    },
    (m) =>
      (m.default || m[collectionName]) instanceof
      (collections as any)[collectionName]
  );
}

exportModule(
  exports,
  {
    RecentStickerStore: [
      'default',
      'RecentStickerCollectionMd',
      'RecentStickerCollection', // @whatsapp >= 2.2222.8
    ],
  },
  (m) => m.RecentStickerCollection
);

exportModule(
  exports,
  {
    StarredMsgStore: ['default', 'AllStarredMsgsCollection'],
  },
  (m) => m.StarredMsgCollection
);

exportModule(
  exports,
  {
    StickerPackStore: [
      'default',
      'StickerPackCollectionMd',
      'StickerPackCollection',
    ],
  },
  (m) => m.StickerPackCollection
);

exportModule(
  exports,
  {
    NewsletterStore: 'default.NewsletterCollection',
  },
  (m) => m.default.NewsletterCollection
);

exportModule(
  exports,
  {
    StatusStore: ['StatusCollectionImpl', 'TextStatusCollection'],
  },
  (m) => m.StatusCollection || m.TextStatusCollection
);
