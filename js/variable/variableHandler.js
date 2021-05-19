class VariableHandler extends Handler {
  /**
   * Create a new Variable handler.
   */
  constructor() {
    super('Variable', []);
    this.success();
    this.variables = {};
  }

  /**
   * Handle the input data (take an action).
   * @param {array} triggerData contents of trigger line
   */
  async handleData(triggerData) {
    if (triggerData[1].toLowerCase() === 'global') {
      var action = triggerData[2].toLowerCase();
      // Loads a global variable
      if (action === 'load') {
        var varName = triggerData.slice(3).join(' ');
        var variable = await idbKeyval.get(varName) || 'No variable found';
        return {[varName]: variable};
      }
      // Clears all global variables
      else if (action === 'clear') {
        idbKeyval.clear();
      }
      // Remove a global variable
      else if (action === 'remove') {
        var varName = triggerData.slice(3).join(' ');
        idbKeyval.del(varName);
      }
      // Set a global variable
      else if (action === 'set') {
        var varName = triggerData[3];
        var variable = triggerData.slice(4).join(' ');
        idbKeyval.set(varName, variable);
        return {[varName]: variable};
      }
    } else {
      // Load a variable
      var action = triggerData[1].toLowerCase();
      if (action === 'load') {
        var varName = triggerData.slice(2).join(' ');
        var variable = this.variables[varName] || 'No variable found';
        return {[varName]: variable};
      }
      // Sets a variable
      else if (action === 'set') {
        var varName = triggerData[2];
        var variable = triggerData.slice(3).join(' ');
        this.variables[varName] = variable;
        return {[varName]: variable};
      }
      // Removes a variable
      else if (action === 'remove') {
        var varName = triggerData[2];
        if (this.variables.hasOwnProperty(varName)) {
          delete this.variables[varName];
        }
      }
    }
  }
}

/**
 * Create a handler
 */
function variableHandlerExport() {
  var variable = new VariableHandler();
}
variableHandlerExport();
