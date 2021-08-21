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

export declare const BlocklistStore: collections.BlocklistCollection;
export declare const BusinessCategoriesResultStore: collections.BusinessCategoriesResultCollection;
export declare const BusinessProfileStore: collections.BusinessProfileCollection;
export declare const CallStore: collections.CallCollection;
export declare const CartStore: collections.CartCollection;
export declare const CatalogStore: collections.CatalogCollection;
export declare const ChatStore: collections.ChatCollection;
export declare const ContactStore: collections.ContactCollection;
export declare const EmojiVariantStore: collections.EmojiVariantCollection;
export declare const GroupMetadataStore: collections.GroupMetadataCollection;
export declare const LabelStore: collections.LabelCollection;
export declare const LiveLocationStore: collections.LiveLocationCollection;
export declare const MsgStore: collections.MsgCollection;
export declare const MsgInfoStore: collections.MsgInfoCollection;
export declare const MuteStore: collections.MuteCollection;
export declare const OrderStore: collections.OrderCollection;
export declare const PresenceStore: collections.PresenceCollection;
export declare const ProductMessageListStore: collections.ProductMessageListCollection;
export declare const ProfilePicThumbStore: collections.ProfilePicThumbCollection;
export declare const QuickReplyStore: collections.QuickReplyCollection;
export declare const RecentEmojiStore: collections.RecentEmojiCollection;
export declare const RecentStickerStore: collections.RecentStickerCollection;
export declare const StarredMsgStore: collections.StarredMsgCollection;
export declare const StarredStickerStore: collections.StarredStickerCollection;
export declare const StatusStore: collections.StatusCollection;
export declare const StatusV3Store: collections.StatusV3Collection;
export declare const StickerStore: collections.StickerCollection;
export declare const StickerPackStore: collections.StickerPackCollection;
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
  'RecentStickerStore',
  'StarredMsgStore',
  'StarredStickerStore',
  'StatusStore',
  'StatusV3Store',
  'StickerStore',
  'StickerPackStore',
  'StickerSearchStore',
];

for (const name of storeNames) {
  const collectionName = name.replace('Store', 'Collection');
  exportModule(
    exports,
    {
      [name]: 'default',
    },
    (m) => m.default instanceof (collections as any)[collectionName]
  );
}
