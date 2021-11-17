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

/** @whatsapp 2.2144.11:25142 */
export declare namespace ClockSkew {
  const is24h: boolean;
  const skew: number;
  const skewMS: number;
  const timeZoneHardCode: string;
  function getIs24Hour(): boolean;
  function setIs24Hour(is24h: boolean): void;
  function setSkew(skew: number): void;
  function getSkew(): number;
  function localUnixTime(timestamp?: number): number;
  function globalUnixTime(timestamp?: number): number;
  function relativeStr(timestamp: number): string;
  function relativeDateStr(timestamp: number): string;
  function relativeDateAndTimeStr(timestamp: number): string;
  function timeStr(timestamp: number): string;
  function timestampStr(timestamp: number): string;
  function timestampStrFormat(): string;
  function timestampHour(timestamp: number): number;
  function createdStr(timestamp: number): string;
  function untilStr(timestamp: number): string;
  function lastSeenStr(timestamp: number): string;
  function daysDelta(a: number, b: number): number;
  function durationStr(seconds: number | string): string;
  function paymentTimestampStr(timestamp: number): string;
  function liveLocationLastUpdatedStr(timestamp: number): string;
  function shouldUseIntlDateTimeFormat(): boolean;
}

exportModule(
  exports,
  { ClockSkew: 'default' },
  (m) => m.default.globalUnixTime
);
