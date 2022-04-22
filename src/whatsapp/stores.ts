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

import * as collections from './collections';
import { exportModule } from './exportModule';

/** @whatsapp 32826 */
export declare const BlocklistStore: collections.BlocklistCollection;
/** @whatsapp 3754 */
export declare const BusinessCategoriesResultStore: collections.BusinessCategoriesResultCollection;
/** @whatsapp 93581 */
export declare const BusinessProfileStore: collections.BusinessProfileCollection;
/** @whatsapp 60868
 * @whatsapp 31218 >= 2.2204.13
 */
export declare const CallStore: collections.CallCollection;
/** @whatsapp 12392 */
export declare const CartStore: collections.CartCollection;
/** @whatsapp 99989 */
export declare const CatalogStore: collections.CatalogCollection;
/** @whatsapp 69951 */
export declare const ChatStore: collections.ChatCollection;
/** @whatsapp 19380 */
export declare const ContactStore: collections.ContactCollection;
/** @whatsapp 13185 */
export declare const EmojiVariantStore: collections.EmojiVariantCollection;
/** @whatsapp 63928 */
export declare const GroupMetadataStore: collections.GroupMetadataCollection;
/** @whatsapp 16770 */
export declare const LabelStore: collections.LabelCollection;
/** @whatsapp 85865 */
export declare const LiveLocationStore: collections.LiveLocationCollection;
/** @whatsapp 59871 */
export declare const MsgStore: collections.MsgCollection;
/** @whatsapp 17972 */
export declare const MsgInfoStore: collections.MsgInfoCollection;
/** @whatsapp 72472 */
export declare const MuteStore: collections.MuteCollection;
/** @whatsapp 84312 */
export declare const OrderStore: collections.OrderCollection;
/** @whatsapp 68315 */
export declare const PresenceStore: collections.PresenceCollection;
/** @whatsapp 18952 */
export declare const ProductMessageListStore: collections.ProductMessageListCollection;
/** @whatsapp 82039 */
export declare const ProfilePicThumbStore: collections.ProfilePicThumbCollection;
/** @whatsapp 99662 */
export declare const QuickReplyStore: collections.QuickReplyCollection;
/** @whatsapp 92671 */
export declare const RecentEmojiStore: collections.RecentEmojiCollection;
/** @whatsapp 49264 */
export declare const RecentStickerStore: collections.RecentStickerCollection;
/** @whatsapp 19011 */
export declare const StarredMsgStore: collections.StarredMsgCollection;
/** @whatsapp 16774 */
export declare const StarredStickerStore: collections.StarredStickerCollection;
/** @whatsapp 46133 */
export declare const StatusStore: collections.StatusCollection;
/** @whatsapp 59387 */
export declare const StatusV3Store: collections.StatusV3Collection;
/** @whatsapp 67963 */
export declare const StickerStore: collections.StickerCollection;
/** @whatsapp 44333 */
export declare const StickerPackStore: collections.StickerPackCollection;
/** @whatsapp 45068 */
export declare const StickerSearchStore: collections.StickerSearchCollection;

const storeNames = [
  'BlocklistStore',
  'BusinessCategoriesResultStore',
  'BusinessProfileStore',
  'CallStore',
  'CartStore',
  'CatalogStore',
  'ChatStore',
  'ContactStore',
  'EmojiVariantStore',
  'GroupMetadataStore',
  'LabelStore',
  'LiveLocationStore',
  'MsgStore',
  'MsgInfoStore',
  'MuteStore',
  'OrderStore',
  'PresenceStore',
  'ProductMessageListStore',
  'ProfilePicThumbStore',
  'QuickReplyStore',
  'RecentEmojiStore',
  'StarredStickerStore',
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
    RecentStickerStore: ['default', 'RecentStickerCollectionMd'],
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
