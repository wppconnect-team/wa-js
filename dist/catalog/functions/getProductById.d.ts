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
 * Retrieves product by id
 *
 * @example
 * ```javascript
 * // Retrieve data of product
 * await WPP.catalog.getProductById('5521985565656@c.us', '68685985868923');
 * ```
 *
 * @category Catalog
 */
export declare function getProductById(chatId: string, productId: number): Promise<{
    id: string;
    retailer_id: string;
    name: string;
    description: string;
    url: string;
    currency: string;
    price: string;
    is_hidden: boolean;
    max_available: number;
    availability: string;
    checkmark: boolean;
    image_hashes_for_whatsapp: string[];
    image_cdn_urls: {
        key: 'requested' | 'full';
        value: string;
    }[];
    additional_image_cdn_urls: any[];
    whatsapp_product_can_appeal: boolean;
    capability_to_review_status: {
        key: 'WHATSAPP';
        value: 'APPROVED';
    }[];
}>;
