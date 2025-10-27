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
import { InferArgs, InferReturn } from '../util';
import * as webpack from '../webpack';
declare class CustomWeakMap extends WeakMap<object, string> {
    protected stringMap: Map<string, string>;
    delete(key: object | string): boolean;
    get(key: object | string): string | undefined;
    has(key: object | string): boolean;
    set(key: object | string, value: string): this;
}
export declare const _moduleIdMap: CustomWeakMap;
/**
 * The object of this function is to override the exports to create getters.
 *
 * You can export a single module or specific functions
 *
 * Note: To create a documented type, you can use `export declare` to define types only
 *
 * @param exports The exports variable
 * @param properties A single name or a map of exported data
 * @param condition The seach condition to find the module
 */
export declare function exportModule(exports: any, properties: string | {
    [key: string]: null | undefined | string | string[];
}, condition: webpack.SearchModuleCondition): void;
export declare function exportProxyModel(exports: any, name: string): void;
/**
 * Wrap a exported function from a module
 *
 * @param func The original function
 * @param callback A callback to wrap the function
 *
 * @example
 * ```typescript
 *wrapModuleFunction(createMsgProtobuf, (func, ...args) => {
   const [message] = args; // Extract arguments
   const result = func(...args); // Call the original function
   // Logic to change the result
   return result; // The new return
 });
 * ```
 */
export declare function wrapModuleFunction<TFunc extends (...args: any[]) => any>(func: TFunc, callback: (func: TFunc, ...args: InferArgs<TFunc>) => InferReturn<TFunc>): void;
export {};
