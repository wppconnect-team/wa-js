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

/**
 * @moduleID 56656
 * @whatsapp 2.2126.14
 */
export declare const ClockSkew: {
  is24h: boolean;
  skew: number;
  skewMS: number;
  timeZoneHardCode: string;
  getIs24Hour(): boolean;
  setIs24Hour(is24h: boolean): void;
  setSkew(skew: number): void;
  getSkew(): number;
  localUnixTime(timestamp?: number): number;
  globalUnixTime(timestamp?: number): number;
  relativeStr(timestamp: number): string;
  relativeDateStr(timestamp: number): string;
  relativeDateAndTimeStr(timestamp: number): string;
  timeStr(timestamp: number): string;
  timestampStr(timestamp: number): string;
  timestampStrFormat(): string;
  timestampHour(timestamp: number): number;
  createdStr(timestamp: number): string;
  untilStr(timestamp: number): string;
  lastSeenStr(timestamp: number): string;
  daysDelta(a: number, b: number): number;
  durationStr(seconds: number | string): string;
  paymentTimestampStr(timestamp: number): string;
  liveLocationLastUpdatedStr(timestamp: number): string;
  shouldUseIntlDateTimeFormat(): boolean;
};

exportModule(
  exports,
  { ClockSkew: 'default' },
  (m) => m.default.globalUnixTime
);
