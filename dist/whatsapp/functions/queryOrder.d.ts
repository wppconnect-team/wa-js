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
/** @whatsapp WAWebBizQueryOrderJob >= 2.30000.0 */
export declare function queryOrder(productId: string, imageWidth: number, imageHeight: number, token: string, e?: any): Promise<{
    currency: string;
    createdAt: number;
    products: {
        id: string;
        price: number;
        thumbnailId: string;
        thumbnailUrl: string;
        currency: string;
        name: string;
        quantity: number;
    }[];
    subtotal: number;
    total: number;
    tax: number | null;
}>;
