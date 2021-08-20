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

import type {
  BlocklistCollection,
  BusinessCategoriesResultCollection,
  BusinessProfileCollection,
  CallCollection,
  CartCollection,
  CatalogCollection,
  ChatCollection,
  ContactCollection,
  EmojiVariantCollection,
  LabelCollection,
  LiveLocationCollection,
  MsgCollection,
  MsgInfoCollection,
  MuteCollection,
  OrderCollection,
  PresenceCollection,
  ProductMessageListCollection,
  ProfilePicThumbCollection,
  QuickReplyCollection,
  RecentEmojiCollection,
  RecentStickerCollection,
  StarredMsgCollection,
  StarredStickerCollection,
  StatusCollection,
  StatusV3Collection,
  StickerCollection,
  StickerPackCollection,
  StickerSearchCollection,
} from './collections';
import { exportModule } from './exportModule';

export declare const BlocklistStore: BlocklistCollection;
export declare const BusinessCategoriesResultStore: BusinessCategoriesResultCollection;
export declare const BusinessProfileStore: BusinessProfileCollection;
export declare const CallStore: CallCollection;
export declare const CartStore: CartCollection;
export declare const CatalogStore: CatalogCollection;
export declare const ChatStore: ChatCollection;
export declare const ContactStore: ContactCollection;
export declare const EmojiVariantStore: EmojiVariantCollection;
export declare const LabelStore: LabelCollection;
export declare const LiveLocationStore: LiveLocationCollection;
export declare const MsgStore: MsgCollection;
export declare const MsgInfoStore: MsgInfoCollection;
export declare const MuteStore: MuteCollection;
export declare const OrderStore: OrderCollection;
export declare const PresenceStore: PresenceCollection;
export declare const ProductMessageListStore: ProductMessageListCollection;
export declare const ProfilePicThumbStore: ProfilePicThumbCollection;
export declare const QuickReplyStore: QuickReplyCollection;
export declare const RecentEmojiStore: RecentEmojiCollection;
export declare const RecentStickerStore: RecentStickerCollection;
export declare const StarredMsgStore: StarredMsgCollection;
export declare const StarredStickerStore: StarredStickerCollection;
export declare const StatusStore: StatusCollection;
export declare const StatusV3Store: StatusV3Collection;
export declare const StickerStore: StickerCollection;
export declare const StickerPackStore: StickerPackCollection;
export declare const StickerSearchStore: StickerSearchCollection;

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
    (m) => m.default instanceof m[collectionName]
  );
}
