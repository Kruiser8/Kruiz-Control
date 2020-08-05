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
    if (action === 'add') {
      var name = triggerData[2];
      if (this.lists[name] === undefined) {
        this.lists[name] = [];
      }
      var value = triggerData[3];
      if (triggerData.length > 4) {
        var index = parseInt(triggerData[4]);
        this.lists[name].splice(index, 0, value);
        return { index: index, position: index + 1 }
      } else {
        this.lists[name].push(value);
        return { index: this.lists[name].length - 1, position: this.lists[name].length }
      }
    } else if (action === 'get') {
      var name = triggerData[2];
      if (this.lists[name] !== undefined) {
        if (this.lists[name].length === 0) {
          return { value: 'None found', index: -1, position: -1 };
        }
        if (triggerData.length > 3) {
          var index = parseInt(triggerData[3]);
          if (!isNaN(index) && index >= 0 && index < this.lists[name].length) {
            return { value: this.lists[name][index], index: index, position: index + 1 };
          } else if (!isNaN(index) && (triggerData[3].toLowerCase() === 'first' || triggerData[3].toLowerCase() === 'last')) {
            if (triggerData[3].toLowerCase() === 'first') {
              return { value: this.lists[name][0], index: 0, position: 1 };
            } else {
              return { value: this.lists[name][this.lists[name].length - 1], index: this.lists[name].length - 1, position: this.lists[name].length };
            }
          }
        }
        var index = Math.floor(Math.random() * this.lists[name].length);
        return { value: this.lists[name][index], index: index, position: position };
      } else {
        return { value: 'None found', index: -1, positon: -1 };
      }
    } else if (action === 'remove') {
      var name = triggerData[2];
      if (this.lists[name] !== undefined) {
        if (triggerData.length > 3) {
          var index = parseInt(triggerData[3]);
          if (!isNaN(index) && index >= 0 && index < this.lists[name].length) {
            var value = this.lists[name][index];
            this.lists[name].splice(index, 1);
            return { value: value, index: index, position: index + 1 };
          } else if (!isNaN(index) && (triggerData[3].toLowerCase() === 'first' || triggerData[3].toLowerCase() === 'last')) {
            if (triggerData[3].toLowerCase() === 'first') {
              var value = this.lists[name][0];
              this.lists[name].splice(0, 1);
              return { value: value, index: 0, position: 1 };
            } else {
              var value = this.lists[name][this.lists[name].length - 1];
              this.lists[name].splice(this.lists[name].length - 1, 1);
              return { value: value, index: this.lists[name].length - 1, position: this.lists[name].length };
            }
          }
        }
        var index = Math.floor(Math.random() * this.lists[name].length);
        var value = this.lists[name][index];
        this.lists[name].splice(index, 1);
        return { value: value, index: index, position: index + 1 };
      }
      else {
        return { value: 'None found', index: -1, position: -1 };
      }
    } else if (action === 'export') {
      var name = triggerData[2];
      if (this.lists[name] !== undefined) {
        return { [name]: JSON.stringify(this.lists[name]) };
      }
    } else if (action === 'import') {
      var name = triggerData[2];
      var values = triggerData.slice(3);

      this.lists[name] = JSON.parse(values);
    } else if (action === 'contains') {
      var name = triggerData[2];
      var value = triggerData.slice(3).join(' ');
      if (this.lists[name] !== undefined) {
        return { contains: this.lists[name].indexOf(value) !== -1 }
      } else {
        return { contains: false };
      }
    } else if (action === 'index') {
      var name = triggerData[2];
      var value = triggerData.slice(3).join(' ');
      if (this.lists[name] !== undefined) {
        var index = this.lists[name].indexOf(value);
        var position = index + 1;
        if (position === 0) {
          position = -1;
        }
        return { index: index, position: position }
      } else {
        return { index: -1, position: -1 };
      }
    }
  }
}

/**
 * Create a handler
 */
function listHandlerExport() {
  var list = new ListHandler();
}
listHandlerExport();
