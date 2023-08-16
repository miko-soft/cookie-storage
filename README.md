# cookie-storage
> Library which helps with cookie, local and session storage management in the browser environment.


## Installation
```bash
$ npm install --save cookie-storage
```

## Development
Before you make any changes run ```npm run dev``` to build the library by the webpack.




## Access by "window" global object
The library can be utilized by accessing its functions and features through the window global object in a web browser environment.
- *window.mikosoft.browserCookie*
- *window.mikosoft.browserstorage*

```
HTML
<script src="node_modules/cookie-storage/build/cookie-storage.js">
or
<script src="node_modules/cookie-storage/build/cookie-storage.min.js">

JS
const {BrowserCookie, BrowserStorage} = window.mikosoft;
const browserCookie = new BrowserCookie(cookieOpts);
const cookies = browserCookie.getAll();
```

#### Example
A puppeteer example.

```js
/*** NodeJS script ***/
// inject to Chromium browser via <script> tag
await page.addScriptTag({ path: 'node_modules/cookie-storage/build/cookie-storage.min.js' }); // path to cookie-storage build file

const {cookies, localStorage} = await page.evaluate(() => {
  // cookies
  const BrowserCookie = window.mikosoft.BrowserCookie;
  const cookieOpts = {
    domain: 'adsuu.com',
    path: '/',
    expires: 5, // number of hours or exact date
    secure: false,
    httpOnly: false,
    sameSite: 'strict' // 'strict' for GET and POST, 'lax' only for POST
  };
  const browserCookie = new BrowserCookie(cookieOpts);
  const cookies = browserCookie.getAll();

  // local storage
  const BrowserStorage = window.mikosoft.BrowserStorage;
  const storageOpts = { storageType: 'local'};
  const browserStorage = new BrowserStorage(storageOpts);
  const localStorage = browserStorage.getAll();

  return {cookies, localStorage}
});

console.log('cookies::', cookies); // _ga=GA1.2.686576916.1660229610; _gid=GA1.2.2130293818.1660229610; _gat=1
console.log('localStorage::', localStorage);
```


## Access by ESM (ECMAScript Modules)
```js
import { BrowserCookie, BrowserStorage } from '@mikosoft/cookie-storage';

// cookie
const browserCookie = new BrowserCookie(cookieOpts);

// storage
const browserStorage = new BrowserStorage(storageOpts);
```



## BrowserCookie API

#### constructor(cookieOpts) :void
```js
interface CookieOpts {
  domain?: string;
  path?: string;
  expires?: number | Date; // number of hours or exact date
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: string; // 'strict' for GET and POST, 'lax' only for POST
}
```


#### put(name:string, value:string) :void
Set the cookie. Cookie value must be a string.

#### putObject(name:string, valueObj:object) :void
Set the cookie. Cookie value is object.


#### get(name:string) :string
Get a cookie by specific name. Returned value is string.

#### getObject(name:string) :object
Get a cookie by specific name. Returned value is object of parsed value.

#### getAll() :string
Get all cookies in array format: [{key1: val1}, {key2: val2},...] . The values (val1, val2, ...) are strings.

#### getObjectAll(convertType:boolean = true) :string
Get all cookies in object format: **{key1: val1, key2: val2, ...}**. If convertType is true then convert the value types (val1, val2), for example '5' to number 5.


#### remove(name:string) :void
Remove cookie by specific name.

#### removeAll() :void
Remove all cookies.


#### exists(name:string) :boolean
Check if cookie exists.



## BrowserStorage API

#### constructor(storageOpts) :void
```js
interface StorageOpts {
  storageType: 'local'|'session'  // default is local what means localStorage
}
```


#### put(name:string, value:string) :void
Set local or session storage. The input value can be of any type and it's saved as string.

#### putObject(name:string, valueObj:object) :void
Set local or session storage. The input value is object and it's saved as string.


#### get(name:string) :string
Get a storage value (string) by specific name. Returned value is string.

#### getObject(name:string) :object
Get a storage value by specific name. Returned value is object.

#### getAll() :string
Get all storage values in array format: [{key1: val1}, {key2: val2},...] . The values (val1, val2, ...) are strings.

#### getObjectAll(convertType:boolean = true) :string
Get all storage values in object format: {key1: val1, key2: val2, ...}


#### remove(name:string) :void
Remove storage by specific name.

#### removeAll() :void
Remove all storage values.


#### exists(name:string) :boolean
Check if storage exists.




### License
The software licensed under [MIT](LICENSE).
