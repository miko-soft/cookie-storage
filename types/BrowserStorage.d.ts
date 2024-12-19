/**
 * Options for configuring storage type.
 */
interface StorageOpts {
  storageType: 'local' | 'session'; // Default is 'local', which means localStorage.
}

/**
 * A utility class for managing browser localStorage or sessionStorage.
 */
declare class BrowserStorage {
  private storageOpts: StorageOpts;
  private storage: Storage;

  /**
   * Constructor to initialize BrowserStorage with options.
   * @param storageOpts - Options specifying the storage type ('local' or 'session').
   * @throws Error if storage options are not provided or window is unavailable.
   */
  constructor(storageOpts: StorageOpts);

  /**
   * Set a value in local or session storage.
   * @param name - The name of the storage key.
   * @param value - The value to store (any type, stored as a string).
   * @throws Error if the value is undefined, null, or NaN.
   */
  put(name: string, value: unknown): void;

  /**
   * Set an object in local or session storage.
   * @param name - The name of the storage key.
   * @param valueObj - The object to store (serialized as JSON).
   * @throws Error if the value is not an object.
   */
  putObject(name: string, valueObj: Record<string, unknown>): void;

  /**
   * Get a value from local or session storage.
   * @param name - The name of the storage key.
   * @returns The value as a string, or undefined if not found.
   */
  get(name: string): string | undefined;

  /**
   * Get an object from local or session storage.
   * @param name - The name of the storage key.
   * @returns The value as an object, or undefined if not found or invalid JSON.
   */
  getObject<T = Record<string, unknown>>(name: string): T | undefined;

  /**
   * Get all storage items as an array of key-value pairs.
   * @returns An array of objects, each representing a key-value pair.
   */
  getAll(): Record<string, string | undefined>[];

  /**
   * Get all storage items as a single object.
   * @param convertType - Whether to convert value types (default is true).
   * @returns An object representing all key-value pairs in storage.
   */
  getObjectAll<T = Record<string, unknown>>(convertType?: boolean): T;

  /**
   * Remove a specific item from storage.
   * @param name - The name of the storage key.
   */
  remove(name: string): void;

  /**
   * Remove all items from storage.
   */
  removeAll(): void;

  /**
   * Check if a specific item exists in storage.
   * @param name - The name of the storage key.
   * @returns True if the key exists, false otherwise.
   */
  exists(name: string): boolean;

  /**
   * Convert a string to the appropriate data type (e.g., number, boolean, object).
   * @param val - The string value to convert.
   * @returns The converted value.
   */
  private _stringTypeConvert(val: string): string | number | boolean | object;
}

export default BrowserStorage;
