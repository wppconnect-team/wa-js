import { exportModule } from '../exportModule';

/**
 * @whatsapp 95547
 * @whatsapp 695547 >= 2.2222.8
 * @whatsapp 925080 >= 2.2228.4
 */
export declare function numPinned(value: any): any;

exportModule(
  exports,
  {
    numPinned: 'getNumChatsPinned',
  },
  (m) => m.getNumChatsPinned
);
