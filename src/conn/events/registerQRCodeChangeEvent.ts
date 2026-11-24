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

import { internalEv } from '../../eventEmitter';
import * as loader from '../../loader';
import { Cmd } from '../../whatsapp';
import { isAuthenticated } from '../functions/isAuthenticated';
import { QRCode } from '../types';

let painted: QRCode | null = null;
let observer: MutationObserver | null = null;
let retry: ReturnType<typeof setTimeout> | null = null;
const blankImages = new Map<string, string>();

loader.onInjected(register);

/** The QR code on screen, once WhatsApp has painted it */
export function getPaintedQRCode(): QRCode | null {
  const code = document.querySelector('[data-ref]')?.getAttribute('data-ref');
  return painted && code === painted.fullCode ? painted : null;
}

function register() {
  let loggedIn = false;
  try {
    loggedIn = isAuthenticated();
  } catch (_error) {
    // Unknown state: watch anyway, it only costs an observer
  }

  // Only the QR screen has a QR code; in the chat UI it would just churn
  if (!loggedIn) start();
  internalEv.on('conn.authenticated', stop);
  Cmd.on('logout', start);
}

function start() {
  if (observer) return;
  observer = new MutationObserver(check);
  // WAWeb-qrcode sets title on the [data-ref] holder while it redraws
  observer.observe(document.body, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ['data-ref', 'title'],
  });
  check();
}

function stop() {
  observer?.disconnect();
  observer = null;
  if (retry) clearTimeout(retry);
  retry = null;
  painted = null;
}

function check() {
  const holder = document.querySelector('[data-ref]');
  const fullCode = holder?.getAttribute('data-ref');
  const canvas = holder?.querySelector('canvas');
  if (!fullCode || !canvas) return;

  const base64Image = canvas.toDataURL('image/png');
  // React sets data-ref before the effect that redraws the canvas runs
  if (
    base64Image === painted?.base64Image ||
    base64Image === blankImage(canvas)
  ) {
    if (fullCode !== painted?.fullCode) retryLater();
    return;
  }

  painted = { fullCode, base64Image };
  internalEv.emit('conn.qrcode_change', painted);
}

/** Fallback for a redraw that comes without any DOM mutation */
function retryLater() {
  if (retry || !observer) return;
  retry = setTimeout(() => {
    retry = null;
    if (observer) check();
  }, 250);
}

function blankImage(canvas: HTMLCanvasElement): string {
  const size = `${canvas.width}x${canvas.height}`;
  let image = blankImages.get(size);
  if (!image) {
    const blank = document.createElement('canvas');
    blank.width = canvas.width;
    blank.height = canvas.height;
    image = blank.toDataURL('image/png');
    blankImages.set(size, image);
  }
  return image;
}
