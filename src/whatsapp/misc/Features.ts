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

import { exportModule } from '../exportModule';
import { EventEmitter } from './EventEmitter';

/**
 * @moduleID 77188
 * @whatsapp 2.2132.6
 */
declare class FeatureClass extends EventEmitter {
  FEATURE_CHANGE_EVENT: string;
  F: { [key: string]: string };
  VF: { [key: string]: string };
  silenceChangeEvents: boolean;
  triggerFeaturesChangedDebounced: any;
  features: { [key: string]: true };
  proto: [number, number];
  setVersion(version: [number, number]): void;
  setPlatform(platform: string): void;
  setFeatureFromFlags(e?: any, t?: any, r?: any): any;
  setFeature(e?: any, t?: any): any;
  setFeatures(e?: any): any;
  supportsFeature(feature: string): boolean;
  supportsFeatureFromFlags(flag: any): boolean;
  supportsAllFeatures(...features: string[]): boolean;
  supportsAnyFeature(...features: string[]): boolean;
  supportsAnyFeature(...features: string[]): boolean;
  resetFeatures(): void;
  lt(version: [number, number]): boolean;
  ltr(version: [number, number]): boolean;
  gt(version: [number, number]): boolean;
  gte(version: [number, number]): boolean;
  gte(version: [number, number]): boolean;
  triggerFeaturesChanged(): void;
  overwriteDebugGKs(): void;
  isThirdPartyStickersEnabled(): boolean;
  isRecentStickersEnabled(): boolean;
  isStarredStickersEnabled(): boolean;
  isCatalogManagerEnabled(): boolean;
  isEphemeralAllowGroupMembersEnabled(): boolean;
  isEphemeral24HDurationEnabled(): boolean;
  isDisappearingModeEnabled(): boolean;
  isDropLastNameEnabled(): boolean;
  isGroupCatchUpEnabled(): boolean;
  isInAppSupportEnabled(): boolean;
}

/**
 * @moduleID 77188
 * @whatsapp 2.2132.6
 */
export declare const Features: FeatureClass;

exportModule(
  exports,
  { Features: 'default' },
  (m) => m.default.supportsFeature
);
