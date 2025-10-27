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
/**
 * Get group info from an inviteCode
 *
 * @example
 * ```javascript
 * await WPP.group.getGroupInfoFromInviteCode('<inviteCode>');
 * ```
 *
 * @category Group
 */
export declare function getGroupInfoFromInviteCode(inviteCode: string): Promise<{
    descOwner: string | undefined;
    id: string;
    owner: string | undefined;
    participants: {
        id: string;
        isAdmin: boolean;
        isSuperAdmin: boolean;
    }[];
    subjectOwner: string | undefined;
    announce: boolean;
    creation: number;
    desc: string;
    descId: string;
    descTime: number;
    noFrequentlyForwarded: boolean;
    parent: boolean;
    pvId?: string;
    restrict: boolean;
    size: number;
    status: number;
    subject: string;
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
}>;
