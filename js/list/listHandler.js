class ListHandler extends Handler {
  GLOBAL_LIST_KEY = '__kc_list_global_lists';
  GLOBAL_LIST_KEY_PREFIX = '__kc_list_global_list_';

  /**
   * Create a new List handler.
   */
  constructor() {
    super('List', []);
    this.success();
    this.lists = {};

    this.initialize.bind(this);
    this.add.bind(this);
    this.set.bind(this);
    this.getIndexValue.bind(this);
    this.get.bind(this);
    this.getIndex.bind(this);
    this.remove.bind(this);
  }

  /**
   * Called after parsing all user input.
   */
  async postParse() {
    this.global_lists = await IDBService.get(this.GLOBAL_LIST_KEY) || [];
    for (const list_id of this.global_lists) {
      this.lists[list_id] = await IDBService.get(`${this.GLOBAL_LIST_KEY_PREFIX}${list_id}`) || [];
    };
  }

  /**
   * Handle the input data (take an action).
   * @param {array} triggerData contents of trigger line
   */
  async handleData(triggerData) {
    var action = Parser.getAction(triggerData, 'List');

    switch (action) {
      case 'add':
        var { name, value, index } = Parser.getInputs(triggerData, ['action', 'name', 'value', 'index'], false, 1);
        this.initialize(name);
        return this.add(name, value, parseInt(index));
        break;
      case 'contains':
        var { name, value } = Parser.getInputs(triggerData, ['action', 'name', 'value']);
        this.initialize(name);
        return { contains: this.lists[name].indexOf(value) !== -1 };
        break;
      case 'count':
        var { name } = Parser.getInputs(triggerData, ['action', 'name']);
        this.initialize(name);
        return { count: this.lists[name].length };
        break;
      case 'empty':
        var { name } = Parser.getInputs(triggerData, ['action', 'name']);
        this.initialize(name);
        this.lists[name] = [];
        if (this.global_lists.indexOf(name) !== -1) {
          IDBService.set(`${this.GLOBAL_LIST_KEY_PREFIX}${name}`, this.lists[name])
        }
        break;
      case 'export':
        var { name } = Parser.getInputs(triggerData, ['action', 'name']);
        this.initialize(name);
        return { [name]: JSON.stringify(this.lists[name]) };
        break;
      case 'get':
        var { name, index } = Parser.getInputs(triggerData, ['action', 'name', 'index'], false, 1);
        this.initialize(name);
        return this.get(name, index);
        break;
      case 'global':
        var { name, status } = Parser.getInputs(triggerData, ['action', 'name', 'status']);
        status = status.toLowerCase();
        this.initialize(name);

        var nameIndex = this.global_lists.indexOf(name);
        if (status === 'on' && nameIndex === -1) {
          this.global_lists.push(name);
          IDBService.set(this.GLOBAL_LIST_KEY, this.global_lists);
          IDBService.set(`${this.GLOBAL_LIST_KEY_PREFIX}${name}`, this.lists[name]);
        } else if (status === 'off' && nameIndex !== -1) {
          this.global_lists.splice(nameIndex, 1);
          IDBService.set(this.GLOBAL_LIST_KEY, this.global_lists);
          IDBService.delete(`${this.GLOBAL_LIST_KEY_PREFIX}${name}`);
        }
        break;
      case 'import':
        var { name, values } = Parser.getInputs(triggerData, ['action', 'name', 'values']);
        this.initialize(name);
        this.lists[name] = JSON.parse(values);
        if (this.global_lists.indexOf(name) !== -1) {
          IDBService.set(`${this.GLOBAL_LIST_KEY_PREFIX}${name}`, this.lists[name])
        }
        break;
      case 'index':
        var { name, value } = Parser.getInputs(triggerData, ['action', 'name', 'value']);
        this.initialize(name);
        var index = this.lists[name].indexOf(value);
        var position = index + 1;
        if (position === 0) {
          position = -1;
        }
        return { index: index, position: position };
        break;
      case 'join':
        var { name, delimiter } = Parser.getInputs(triggerData, ['action', 'name', 'delimiter']);
        this.initialize(name);
        return { joined: this.lists[name].join(delimiter) };
        break;
      case 'remove':
        var { name, index } = Parser.getInputs(triggerData, ['action', 'name', 'index'], false, 1);
        this.initialize(name);
        return this.remove(name, index);
        break;
      case 'set':
        var { name, index, value } = Parser.getInputs(triggerData, ['action', 'name', 'index', 'value']);
        this.initialize(name);
        return this.set(name, parseInt(index), value);
        break;
      default:
        // do nothing
        break;
    }
  }

  /**
   * Set up the list for the given name (if one doesn't exist).
   * @param {string} name of the list
   */
   initialize(name) {
     if (this.lists[name] === undefined) {
       this.lists[name] = [];
     }
   }

  /**
   * Add the value to the named list at the given index.
   * @param {string} name of the list
   * @param {string} value to add to the list
   * @param {string} index to add the value in the list
   */
  add(name, value, index) {
    if (!isNaN(index) && index < this.lists[name].length && index >= 0) {
      this.lists[name].splice(index, 0, value);
      if (this.global_lists.indexOf(name) !== -1) {
        IDBService.set(`${this.GLOBAL_LIST_KEY_PREFIX}${name}`, this.lists[name])
      }
      return { index: index, position: index + 1 }
    } else {
      this.lists[name].push(value);
      if (this.global_lists.indexOf(name) !== -1) {
        IDBService.set(`${this.GLOBAL_LIST_KEY_PREFIX}${name}`, this.lists[name])
      }
      return { index: this.lists[name].length - 1, position: this.lists[name].length }
    }
  }

  /**
   * Set the value at the given index in the named list.
   * @param {string} name of the list
   * @param {string} index to add the value in the list
   * @param {string} value to add to the list
   */
  set(name, index, value) {
    if (!isNaN(index) && index < this.lists[name].length && index >= 0) {
      this.lists[name][index] = value;
      if (this.global_lists.indexOf(name) !== -1) {
        IDBService.set(`${this.GLOBAL_LIST_KEY_PREFIX}${name}`, this.lists[name])
      }
      return { index: index, position: index + 1, value: value }
    }
  }

  /**
   * Get the integer index from the input index value.
   * @param {string} name of the list
   * @param {string} index to retrieve a numeric value
   */
  getIndexValue(name, index) {
    if (this.lists[name].length == 0) {
      return -1;
    }
    var intIndex = parseInt(index);
    if (isNaN(intIndex) && index !== undefined) {
      if (index.toLowerCase() === 'first') {
        return 0;
      } else if (index.toLowerCase() === 'last') {
        return this.lists[name].length - 1;
      }
    }
    if (isNaN(intIndex)) {
      return Math.floor(Math.random() * this.lists[name].length);
    }
    return intIndex;
  }

  /**
   * Get the value at the given index in the named list.
   * @param {string} name of the list
   * @param {string} index to add the value in the list
   */
  get(name, index) {
    var intIndex = this.getIndexValue(name, index);
    return this.getIndex(name, intIndex);
  }

  /**
   * Get the value at the given index in the named list.
   * @param {string} name of the list
   * @param {string} index to add the value in the list
   */
  getIndex(name, index) {
    if (index >= 0 && index < this.lists[name].length) {
      return { value: this.lists[name][index], index: index, position: index + 1 };
    } else {
      return { value: 'None found', index: -1, position: -1 };
    }
  }

  /**
   * Remove the value at the given index in the named list.
   * @param {string} name of the list
   * @param {string} index to add the value in the list
   */
  remove(name, index) {
    var intIndex = this.getIndexValue(name, index);
    var response = this.getIndex(name, intIndex);
    if (intIndex != -1) {
      this.lists[name].splice(intIndex, 1);
      if (this.global_lists.indexOf(name) !== -1) {
        IDBService.set(`${this.GLOBAL_LIST_KEY_PREFIX}${name}`, this.lists[name])
      }
    }
    return response;
  }

  /**
   * Create a named list from the provided items.
   * @param {string} name of the list
   * @param {array} items to add to the named list
   */
  createList(name, items) {
    this.initialize(name);
    items.forEach(item => {
      this.add(name, item);
    });
  }
}

/**
 * Create a handler
 */
function listHandlerExport() {
  var list = new ListHandler();
}
listHandlerExport();
