import BrowserCookie from './BrowserCookie.js';
import BrowserStorage from './BrowserStorage.js';

// ESM
export { BrowserCookie, BrowserStorage };


// window
if (typeof window !== 'undefined') {
  if (!window.mikosoft) { window.mikosoft = {}; }
  window.mikosoft.BrowserCookie = BrowserCookie;
  window.mikosoft.BrowserStorage = BrowserStorage;
}
