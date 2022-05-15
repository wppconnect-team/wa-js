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
 * Get the video file duration
 * @see https://gist.github.com/Elements-/cf063254730cd754599e#gistcomment-3241210
 * @see https://gist.github.com/OllieJones/5ffb011fa3a11964154975582360391c
 */
export function getVideoInfoFromBuffer(arrayBuffer: ArrayBuffer) {
  const buffer = Buffer.from(arrayBuffer);

  const header = Buffer.from('mvhd');

  const start = buffer.indexOf(header) + 17;
  const timeScale = buffer.readUInt32BE(start);
  const duration = buffer.readUInt32BE(start + 4);

  const moov = buffer.indexOf(Buffer.from('moov'));
  const trak = buffer.indexOf(Buffer.from('trak'), moov + 4);
  const stbl = buffer.indexOf(Buffer.from('stbl'), trak + 4);
  const avc1 = buffer.indexOf(Buffer.from('avc1'), stbl + 4);

  const width = buffer.readUInt16BE(avc1 + 4 + 24);
  const height = buffer.readUInt16BE(avc1 + 4 + 26);

  const audioLength = Math.floor((duration / timeScale) * 1000) / 1000;

  return {
    duration: Math.floor(audioLength),
    width,
    height,
  };
}
