import BrowserCookie from './BrowserCookie.js';
import BrowserStorage from './BrowserStorage.js';

// ESM
export { BrowserCookie, BrowserStorage };


// window
console.log(typeof window);
if (typeof window !== 'undefined') {
  if (!window.mikosoft) { window.mikosoft = {}; }
  window.mikosoft.browserStorage = new BrowserStorage();
  window.mikosoft.browserCookie = new BrowserCookie();
  console.log('window.mikosoft', window.mikosoft);
}
