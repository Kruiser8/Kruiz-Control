class StorageEmitter {
    constructor() {
        this.data = new Map();
        this.events = new Map();
    }

    onChange = (key, callback, fireOnInit) => {
        if (this.events.has(key)) {
            this.events.get(key).push(callback);
        } else {
            this.events.set(key, [callback]);
        }

        if (fireOnInit && this.data.has(key)) {
            if (Debug.All || Debug.Storage) {
                console.error(`Storage onChange fireOnInit for ${key} with value: ${this.data.get(key)}`);
            }
            callback(key, this.data.get(key));
        }
    }

    set = (key, value) => {
        if (Debug.All || Debug.Storage) {
            console.error(`Storage set ${key} to: ${value}`);
        }
        if (
            !this.data.has(key) || this.data.get(key) !== value
        ) {
            if (this.events.has(key)) {
                if (Debug.All || Debug.Storage) {
                    console.error(`Storage callback requests for ${key} initiated`);
                }
                this.events.get(key).forEach(callback => 
                    callback(key, value, this.data.has(key) ? this.data.get(key) : null));
            }
            this.data.set(key, value);
        }
    }
}

var Storage = new StorageEmitter();
