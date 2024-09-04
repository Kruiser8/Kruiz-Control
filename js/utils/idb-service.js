/**
 * IDBService is a proxy for interacting with IndexedDB through idbKeyval.
 */
 class IDBService {

  /**
   * Waits for the idbKeyval global module to be loaded.
   */
  static async awaitModuleLoad() {
    if (typeof idbKeyval !== 'undefined') {
      return;
    }

    return await new Promise((resolve) => {
      setTimeout(async () => { 
        await IDBService.awaitModuleLoad();
        resolve();
      }, 100);
    });
  }

  /**
   * Retrieve a value from IndexedDB by the key.
   * @param {string} key id of the value to retrieve
   */
  static async get(key) {
    await IDBService.awaitModuleLoad();
    return await idbKeyval.get(key);
  }

  /**
   * Retrieve all keys from IndexedDB.
   */
  static async keys() {
    await IDBService.awaitModuleLoad();
    return await idbKeyval.keys();
  }

  /**
   * Set a key-value pair in IndexedDB.
   * @param {string} key id of the entry to store
   * @param {object} value object to store in the entry
   */
  static async set(key, value) {
    await IDBService.awaitModuleLoad();
    await idbKeyval.set(key, value);
  }

  /**
   * Delete a key-value entry from IndexedDB by the key.
   * @param {string} key id of the value to delete
   */
  static async delete(key) {
    await IDBService.awaitModuleLoad();
    idbKeyval.del(key);
  }

  /**
   * Clear all entries from IndexedDB.
   */
  static async clear() {
    await IDBService.awaitModuleLoad();
    idbKeyval.clear();
  }
}
