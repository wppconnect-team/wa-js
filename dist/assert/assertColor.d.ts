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
import { WPPError } from '../util';
export declare class InvalidColor extends WPPError {
    readonly color?: string | number | {
        _serialized: string;
    } | undefined;
    constructor(color?: string | number | {
        _serialized: string;
    } | undefined);
}
/**
 * Return the color  in positive decimal
 * @example
 * ```javascript
 * assertColor('#dfaef0');  //Result: 4292849392
 * assertColor('dfaef0');   //Result: 4292849392
 * assertColor(-2117904);   //Result: 4292849392
 * assertColor(4292849392); //Result: 4292849392
 * ```
 */
export declare function assertColor(color?: string | number): number;
