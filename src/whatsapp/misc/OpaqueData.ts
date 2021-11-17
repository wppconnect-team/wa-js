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

/** @whatsapp 2.2144.11:52937 */
export declare class OpaqueDataBase {
  released: boolean;
  retain(): void;
  autorelease(): void;
  autoreleaseWhenPromiseCompletes(e: Promise<any>): void;
  throwIfReleased(e: any): void;
}

/** @whatsapp 2.2144.11:52937 */
export declare class OpaqueData extends OpaqueDataBase {
  url(): string;
  getBase64(): string;
  filepath(): string;
  wavFilepath(): string;
  setWavFilepath(): string;
  validate(): Promise<boolean>;
  size(): number;
  formData(): string;
  type(): string;
  forceToBlob(): string;
  isBlobEqual(e: any): string;

  static createFromBase64Jpeg(base64: string): Promise<OpaqueData>;
  static createFromData(blob: BlobPart, type?: string): Promise<OpaqueData>;
}

exportModule(
  exports,
  {
    OpaqueDataBase: 'default',
  },
  (m) => m.default.prototype.throwIfReleased
);

exportModule(
  exports,
  {
    OpaqueData: 'default',
  },
  (m) => m.default.createFromData
);
