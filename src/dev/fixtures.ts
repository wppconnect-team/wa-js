/*!
 * Copyright 2026 WPPConnect Team
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
 * The smallest valid file of each type, small enough to live in the source.
 *
 * The binary ones are base64 because there is no readable way to write them.
 * They are also real files, not padding: WhatsApp reads the container to get
 * dimensions, duration and page count, and the PTT waveform decodes the audio
 * with `AudioContext`, so truncated bytes are rejected instead of sent. A fake
 * payload fails in a way that looks like a wa-js bug.
 *
 * Regenerate with:
 *
 * ```bash
 * # 16x16 black h264, 0.1s, without the x264 SEI version string
 * ffmpeg -fflags +bitexact -f lavfi -i "color=c=black:s=16x16:d=0.1:r=10" \
 *   -c:v libx264 -pix_fmt yuv420p -profile:v baseline -x264-params info=0 \
 *   -flags +bitexact -movflags +faststart -an video.mp4
 *
 * # 22050Hz mono sine, 0.15s, without ID3 and Xing headers
 * ffmpeg -f lavfi -i "sine=frequency=440:duration=0.15" -ac 1 -ar 22050 \
 *   -b:a 16k -write_xing 0 -id3v2_version 0 audio.mp3
 * ```
 *
 * The image is a 1x1 PNG (69 bytes) and the document a 3 object PDF with a
 * valid xref (327 bytes). The text is plain, see {@link TXT}.
 */

/** 1x1 PNG, 69 bytes */
export const PNG =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR42mP4//8/AAX+Av4zEpUUAAAAAElFTkSuQmCC';

/** h264 16x16, 0.1s, 1473 bytes */
export const MP4 =
  'AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAMObW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAAAGQAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAjl0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAABAAAAAAAAAGQAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAABAAAAAQAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAABkAAAAAAABAAAAAAGxbWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAAoAAAABABVxAAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAABXG1pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAARxzdGJsAAAAuHN0c2QAAAAAAAAAAQAAAKhhdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAABAAEABIAAAASAAAAAAAAAABDExhdmMgbGlieDI2NAAAAAAAAAAAAAAAAAAAAAAAAAAAGP//AAAALmF2Y0MBQsAK/+EAFmdCwArZHsBEAAADAAQAAAMAUDxImSABAAVoy4PLIAAAABBwYXNwAAAAAQAAAAEAAAAUYnRydAAAAAAAAMjwAAAAAAAAABhzdHRzAAAAAAAAAAEAAAABAAAEAAAAABxzdHNjAAAAAAAAAAEAAAABAAAAAQAAAAEAAAAUc3RzegAAAAAAAAKDAAAAAQAAABRzdGNvAAAAAAAAAAEAAAM+AAAAYXVkdGEAAABZbWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAbWRpcmFwcGwAAAAAAAAAAAAAAAAsaWxzdAAAACSpdG9vAAAAHGRhdGEAAAABAAAAAExhdmY2Mi4zLjEwMAAAAAhmcmVlAAACi21kYXQAAAJxBgX//23cRem95tlIt5Ys2CDZI+7veDI2NCAtIGNvcmUgMTY1IHIzMjIyIGIzNTYwNWEgLSBILjI2NC9NUEVHLTQgQVZDIGNvZGVjIC0gQ29weWxlZnQgMjAwMy0yMDI1IC0gaHR0cDovL3d3dy52aWRlb2xhbi5vcmcveDI2NC5odG1sIC0gb3B0aW9uczogY2FiYWM9MCByZWY9MyBkZWJsb2NrPTE6MDowIGFuYWx5c2U9MHgxOjB4MTExIG1lPWhleCBzdWJtZT03IHBzeT0xIHBzeV9yZD0xLjAwOjAuMDAgbWl4ZWRfcmVmPTEgbWVfcmFuZ2U9MTYgY2hyb21hX21lPTEgdHJlbGxpcz0xIDh4OGRjdD0wIGNxbT0wIGRlYWR6b25lPTIxLDExIGZhc3RfcHNraXA9MSBjaHJvbWFfcXBfb2Zmc2V0PS0yIHRocmVhZHM9MSBsb29rYWhlYWRfdGhyZWFkcz0xIHNsaWNlZF90aHJlYWRzPTAgbnI9MCBkZWNpbWF0ZT0xIGludGVybGFjZWQ9MCBibHVyYXlfY29tcGF0PTAgY29uc3RyYWluZWRfaW50cmE9MCBiZnJhbWVzPTAgd2VpZ2h0cD0wIGtleWludD0yNTAga2V5aW50X21pbj0xMCBzY2VuZWN1dD00MCBpbnRyYV9yZWZyZXNoPTAgcmNfbG9va2FoZWFkPTQwIHJjPWNyZiBtYnRyZWU9MSBjcmY9MjMuMCBxY29tcD0wLjYwIHFwbWluPTAgcXBtYXg9NjkgcXBzdGVwPTQgaXBfcmF0aW89MS40MCBhcT0xOjEuMDAAgAAAAApliIQN8mKAALb+';

/** mp3 22050Hz mono, 0.15s, 418 bytes */
export const MP3 =
  '//MgxAAH8D7FGUMAAqEpLhwHd3f4ju4GBuHyigQdB8HwfP5QMZcH//BN+XBBcJiXvj8yYf/zIsQHCqB6lAGaOADDBbHKDKBGOGC/BHJIYjDQgHIqUIQcgt/HhsNuCoS8GhKd+WUjjgYD//MgxAQHeEKMedsAAv//VZnzpOsnsAgY5cnAwS+WVMBT3r+r///UgeCM7A1RRAYCwibow//zIMQNCmhGMPQ/siRMuAQBJ7uIwC7qzoTPXgvqs/9n3fdrkf+y3/9vVf3+6z0mR+8mkw3/8yDECgjoTiAA5/RAQAmANgCxrnJDCD4w0JZtCaOxg3/0/8Z/6UKAADbAb/1/K6drP0Fw//MixA0JGEZ9GVsAAgBQcOH/HQOH2kO5Dl17//R9Or///v39VfjlK/atrqPKYGcyczqMGij/8yDEEAwQkpgBmlgAwh0SmQ+RcL5mA7NPx0KnwOj6VfvfoqHs/EQm+BVu/WMVbjmQ6dhZ//MgxAYIEG5EAc8IAFdC3BqkabxOkKu9mTxpOLErmaN/Z8Agaf8FVUxBTUUzLjEwMFVVVQ==';

/** 3 object PDF with a valid xref, 327 bytes */
export const PDF =
  'JVBERi0xLjQKMSAwIG9iago8PCAvVHlwZSAvQ2F0YWxvZyAvUGFnZXMgMiAwIFIgPj4KZW5kb2JqCjIgMCBvYmoKPDwgL1R5cGUgL1BhZ2VzIC9LaWRzIFszIDAgUl0gL0NvdW50IDEgPj4KZW5kb2JqCjMgMCBvYmoKPDwgL1R5cGUgL1BhZ2UgL1BhcmVudCAyIDAgUiAvTWVkaWFCb3ggWzAgMCA3MiA3Ml0gPj4KZW5kb2JqCnhyZWYKMCA0CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMDU4IDAwMDAwIG4gCjAwMDAwMDAxMTUgMDAwMDAgbiAKdHJhaWxlcgo8PCAvU2l6ZSA0IC9Sb290IDEgMCBSID4+CnN0YXJ0eHJlZgoxODQKJSVFT0YK';

/**
 * Text needs no encoding, `convertToFile` parses a plain data URL, so keep it
 * readable in the source instead of base64.
 */
export const TXT = 'wa-js send file test';
