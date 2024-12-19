// index.d.ts

import BrowserCookie from './BrowserCookie';
import BrowserStorage from './BrowserStorage';

// Declare the module exports
export { BrowserCookie, BrowserStorage };

// Extend the global window object to include mikosoft namespace
declare global {
  interface Window {
    mikosoft?: {
      BrowserCookie: typeof BrowserCookie;
      BrowserStorage: typeof BrowserStorage;
    };
  }
}
