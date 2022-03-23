/**
 * IDBService is a proxy for interacting with IndexedDB through idbKeyval.
 */
 class IDBService {
  /**
   * Retrieve a value from IndexedDB by the key.
   * @param {string} key id of the value to retrieve
   */
  static async get(key) {
    return await idbKeyval.get(key);
  }

  /**
   * Retrieve all entries from IndexedDB.
   */
  static async keys() {
    return await idbKeyval.keys();
  }

  /**
   * Set a key-value pair in IndexedDB.
   * @param {string} key id of the entry to store
   * @param {object} value object to store in the entry
   */
  static async set(key, value) {
    await idbKeyval.set(key, value);
  }

  /**
   * Delete a key-value entry from IndexedDB by the key.
   * @param {string} key id of the value to delete
   */
  static async delete(key) {
    idbKeyval.del(key);
  }

  /**
   * Clear all entries from IndexedDB.
   */
  static async clear() {
    idbKeyval.clear();
  }
}
