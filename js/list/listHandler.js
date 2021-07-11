class ListHandler extends Handler {
  /**
   * Create a new List handler.
   */
  constructor() {
    super('List', []);
    this.success();
    this.lists = {};
  }

  /**
   * Handle the input data (take an action).
   * @param {array} triggerData contents of trigger line
   */
  async handleData(triggerData) {
    var action = triggerData[1].toLowerCase();
    var name = triggerData[2];
    if (this.lists[name] === undefined) {
      this.lists[name] = [];
    }

    switch (action) {
      case 'add':
        var value = triggerData[3];
        return this.add(name, value, parseInt(triggerData[4]));
        break;
      case 'contains':
        var value = triggerData.slice(3).join(' ');
        return { contains: this.lists[name].indexOf(value) !== -1 };
        break;
      case 'count':
        return { count: this.lists[name].length };
        break;
      case 'empty':
        this.lists[name] = [];
        break;
      case 'export':
        return { [name]: JSON.stringify(this.lists[name]) };
        break;
      case 'get':
        return this.get(name, triggerData[3]);
        break;
      case 'import':
        var values = triggerData.slice(3);
        this.lists[name] = JSON.parse(values);
        break;
      case 'index':
        var value = triggerData.slice(3).join(' ');
        var index = this.lists[name].indexOf(value);
        var position = index + 1;
        if (position === 0) {
          position = -1;
        }
        return { index: index, position: position };
        break;
      case 'join':
        var delimiter = triggerData.slice(3).join(' ');
        return { joined: this.lists[name].join(delimiter) };
        break;
      case 'remove':
        return this.remove(name, triggerData[3]);
        break;
      case 'set':
        return this.set(name, parseInt(triggerData[3]), triggerData.slice(4).join(' '));
        break;
      default:
        // do nothing
        break;
    }
  }

  /**
   * Add the value to the named list at the given index.
   * @param {string} name of the list
   * @param {string} value to add to the list
   * @param {string} index to add the value in the list
   */
  add(name, value, index) {
    if (!isNaN(index) && index < this.lists[name].length && index > 0) {
      var index = parseInt(triggerData[4]);
      this.lists[name].splice(index, 0, value);
      return { index: index, position: index + 1 }
    } else {
      this.lists[name].push(value);
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
    if (!isNaN(index) && index < this.lists[name].length && index > 0) {
      this.lists[name][index] = value;
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
    }
    return response;
  }
}

/**
 * Create a handler
 */
function listHandlerExport() {
  var list = new ListHandler();
}
listHandlerExport();
