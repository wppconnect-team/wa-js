import { exportModule } from '../exportModule';

/**
 * @whatsapp 95547
 * @whatsapp 695547 >= 2.2222.8
 * @whatsapp 925080 >= 2.2228.4
 */
export declare function maxFilesSize(value: any): any;
export declare function numPinned(): any;
export declare const pin: any;


exportModule(
  exports,
  {
    maxFilesSize: 'getMaxFilesSizeServerProp',
  },
  (m) => m.getMaxFilesSizeServerProp && m.ServerProps
);

exportModule(
  exports,
  {
    numPinned: 'getNumChatsPinned',
  },
  (m) => m.getNumChatsPinned
);


exportModule(
  exports,
  {
    pin: 'default',
  },
  (m) => m.default.getLocalPins
);
