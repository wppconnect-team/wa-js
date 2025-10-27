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
import { Wid } from '..';
export interface QueryGroupInviteResult {
    groupInfo: {
        announce: boolean;
        creation: number;
        /** description of the group; linebreaks are formatted using `"\n"` */
        desc: string;
        descId: string;
        descOwner?: Wid;
        descTime: number;
        id: Wid;
        noFrequentlyForwarded: boolean;
        owner?: Wid;
        parent: boolean;
        participants: {
            id: Wid;
            isAdmin: boolean;
            isSuperAdmin: boolean;
        }[];
        pvId?: string;
        restrict: boolean;
        /** how many members the group currently has */
        size: number;
        status: number;
        /** title of the group */
        subject: string;
        subjectOwner?: Wid;
        subjectTime: number;
        support: boolean;
        suspended: boolean;
        isParentGroup: boolean;
        isParentGroupClosed: boolean;
        defaultSubgroup: boolean;
        generalSubgroup: boolean;
        membershipApprovalMode: boolean;
        isLidAddressingMode: boolean;
        generalChatAutoAddDisabled: boolean;
    };
    status: number;
}
/** @whatsapp 10790
 * @whatsapp 810790 >= 2.2222.8
 */
export declare function sendQueryGroupInvite(inviteCode: string): Promise<QueryGroupInviteResult>;
