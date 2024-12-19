/**
 * Options for configuring cookies.
 */
interface CookieOpts {
  domain?: string;
  path?: string;
  expires?: number | Date; // Number of hours or an exact date.
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: string; // 'strict' for GET and POST, 'lax' only for POST.
}

/**
 * A utility class for managing browser cookies.
 */
declare class BrowserCookie {
  private cookieOpts: CookieOpts;

  /**
   * Constructor to initialize BrowserCookie with options.
   * @param cookieOpts - Cookie options.
   * @throws Error if cookie options are not provided or document is unavailable.
   */
  constructor(cookieOpts: CookieOpts);

  /**
   * Set a cookie with a string value.
   * @param name - The name of the cookie.
   * @param value - The value of the cookie.
   * @throws Error if the value is not a non-empty string.
   */
  put(name: string, value: string): void;

  /**
   * Set a cookie with an object value.
   * @param name - The name of the cookie.
   * @param valueObj - The object to store as the cookie value.
   * @throws Error if the value is not a non-empty object.
   */
  putObject(name: string, valueObj: Record<string, unknown>): void;

  /**
   * Get the value of a cookie by its name.
   * @param name - The name of the cookie.
   * @returns The value of the cookie as a string, or undefined if not found.
   */
  get(name: string): string | undefined;

  /**
   * Get the value of a cookie by its name and parse it as an object.
   * @param name - The name of the cookie.
   * @returns The value of the cookie as an object, or undefined if not found or invalid JSON.
   */
  getObject<T = Record<string, unknown>>(name: string): T | undefined;

  /**
   * Get all cookies as an array of key-value pairs.
   * @returns An array of objects representing cookies.
   */
  getAll(): Record<string, string | undefined>[];

  /**
   * Get all cookies as a single object.
   * @param convertType - Whether to convert value types (default is true).
   * @returns An object representing all cookies.
   */
  getObjectAll<T = Record<string, unknown>>(convertType?: boolean): T;

  /**
   * Remove a cookie by its name.
   * @param name - The name of the cookie.
   */
  remove(name: string): void;

  /**
   * Remove all cookies.
   */
  removeAll(): void;

  /**
   * Check if a cookie exists by its name.
   * @param name - The name of the cookie.
   * @returns True if the cookie exists, false otherwise.
   */
  exists(name: string): boolean;
}

export default BrowserCookie;
