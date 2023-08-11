const puppeteer = require('puppeteer');
const os = require('os');

// get executable path for the browser
const osPlatform = os.platform(); // possible values are: 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
let executablePath;
if (/^win/i.test(osPlatform)) {
  executablePath = '';
} else if (/^linux/i.test(osPlatform)) {
  executablePath = '/usr/bin/google-chrome';
}



const main = async () => {
  const pptrOpts = {
    executablePath,
    headless: false,
    devtools: true,  // Open Chrome devtools at the beginning of the test
    dumpio: false,
    slowMo: 130,  // Wait 130 ms each step of execution, for example chars typing

    // list of all args https://peter.sh/experiments/chromium-command-line-switches/
    args: [
      '--disable-dev-shm-usage',
      `--ash-host-window-bounds=1320x1050`,
      `--window-size=1320,1050`,
      `--window-position=700,20`,

      // required for iframe
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process'
    ]
  };
  const browser = await puppeteer.launch(pptrOpts);
  const page = await browser.newPage();
  await page.setViewport({ width: 1800, height: 1000 });
  await page.goto('https://www.adsuu.com');

  // inject to Chromium browser via <script> tag
  await page.addScriptTag({ path: '../build/cookie-storage.min.js' });

  const { cookies, localStorage } = await page.evaluate(() => {
    // cookies
    const browserCookie = window.mikosoft.browserCookie;
    const cookieOpts = {
      domain: 'adsuu.com',
      path: '/',
      expires: 5, // number of hours or exact date
      secure: false,
      httpOnly: false,
      sameSite: 'strict' // 'strict' for GET and POST, 'lax' only for POST
    };
    browserCookie.setOptions(cookieOpts);
    const cookies = browserCookie.getAll();

    // local storage
    const browserStorage = window.mikosoft.browserStorage;
    console.log(window.mikosoft);
    const storageOpts = { storageType: 'local' };
    browserStorage.setOptions(storageOpts);
    const localStorage = browserStorage.getAll();

    return { cookies, localStorage };
  });

  console.log('cookies::', cookies);
  console.log('localStorage::', localStorage);
};


main().catch(console.error);

