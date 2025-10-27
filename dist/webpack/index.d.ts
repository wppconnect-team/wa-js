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
 * Is setted true when the loader is injected
 */
export declare let loaderType: 'meta' | 'unknown' | 'webpack';
/**
 * Is setted true when the loader is injected
 */
export declare let isInjected: boolean;
/**
 * Is setted true when the main webpack modules are fully loaded
 */
export declare let isReady: boolean;
/**
 * Is setted true when the all webpack modules are fully loaded
 */
export declare let isFullReady: boolean;
export declare function onInjected(listener: () => void, delay?: number): void;
export declare function onReady(listener: () => void, delay?: number): void;
export declare function onFullReady(listener: () => void, delay?: number): void;
export type SearchModuleCondition = (module: any, moduleId: string) => boolean;
export declare const __debug: () => {
    modulesMap: {
        [key: string]: any;
    };
};
export declare let webpackRequire: (<T = any>(moduleId: string) => T) & {
    /**
     * module list
     */
    m: {
        [key: string]: any;
    };
    /**
     * the filename of the script part of the chunk
     */
    u: (id: string) => string;
    /**
     * the chunk ensure function
     */
    e: (id: string) => Promise<void>;
};
/**
 * Fallback modules for forward compatibility
 */
export declare const fallbackModules: {
    [key: string]: any;
};
export declare function injectLoader(): void;
export declare function moduleSource(moduleId: string): any;
export declare function isReactComponent(moduleId: string): boolean | undefined;
/**
 * Return the webpack module id from a search function
 * @param condition Function for compare the modules
 * @param reverse Search in reverse order
 */
export declare function searchId(condition: SearchModuleCondition, reverse?: boolean): string | null;
/**
 * Return the webpack module from a search function
 * @param condition Function for compare the modules
 * @param reverse Search in reverse order
 */
export declare function search<T = any>(condition: SearchModuleCondition, reverse?: boolean): T | null;
/**
 * Return the webpack module from a search function
 * @param condition Function for compare the modules
 * @param reverse Search in reverse order
 */
export declare function modules(condition?: SearchModuleCondition, reverse?: boolean): {
    [key: string]: any;
};
export declare function loadModule<T = any>(moduleId: string): T;
/**
 * Inject a new module content
 * @param moduleId Module ID
 * @param content The module content
 * @returns
 */
export declare function injectFallbackModule(moduleId: number | string, content: any): void;
