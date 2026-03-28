/*!
 * Copyright 2023 WPPConnect Team
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

import Debug from 'debug';
import { z } from 'zod';

import { sendMessageOptionsSchema } from '..';

const debug = Debug('WA-JS:chat:sendFileMessage');

const audioMessageOptionsSchema = sendMessageOptionsSchema.extend({
  type: z.literal('audio'),
  caption: z.string().optional(),
  footer: z.string().optional(),
  filename: z.string().optional(),
  mimetype: z.string().optional(),
  isPtt: z.boolean().optional(),
  isViewOnce: z.boolean().optional(),
  waveform: z.boolean().optional(),
});

const chatPrepareAudioWaveformSchema = z.object({
  options: audioMessageOptionsSchema,
  file: z.custom<File>(),
});
export type ChatPrepareAudioWaveformInput = z.infer<
  typeof chatPrepareAudioWaveformSchema
>;
export type ChatPrepareAudioWaveformOutput =
  | undefined
  | { duration: number; waveform: Uint8Array };

/**
 * Prepare waveform form message audio file
 *
 * @category Message
 * @internal
 */
export async function prepareAudioWaveform(
  params: ChatPrepareAudioWaveformInput
): Promise<ChatPrepareAudioWaveformOutput> {
  const { options, file } = chatPrepareAudioWaveformSchema.parse(params);

  if (!options.isPtt || !options.waveform) {
    return;
  }

  /**
   * @see https://css-tricks.com/making-an-audio-waveform-visualizer-with-vanilla-javascript/
   */
  try {
    const audioData = await file.arrayBuffer();
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(audioData);

    const rawData = audioBuffer.getChannelData(0); // We only need to work with one channel of data
    const samples = 64; // Number of samples we want to have in our final data set
    const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
    const filteredData = [];
    for (let i = 0; i < samples; i++) {
      const blockStart = blockSize * i; // the location of the first sample in the block
      let sum = 0;
      for (let j = 0; j < blockSize; j++) {
        sum = sum + Math.abs(rawData[blockStart + j]); // find the sum of all the samples in the block
      }
      filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
    }

    // This guarantees that the largest data point will be set to 1, and the rest of the data will scale proportionally.
    const multiplier = Math.pow(Math.max(...filteredData), -1);
    const normalizedData = filteredData.map((n) => n * multiplier);

    // Generate waveform like WhatsApp
    const waveform = new Uint8Array(
      normalizedData.map((n) => Math.floor(100 * n))
    );

    return {
      duration: Math.floor(audioBuffer.duration),
      waveform,
    };
  } catch (error) {
    debug('Failed to generate waveform', error);
  }
}
