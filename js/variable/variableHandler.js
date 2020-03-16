class VariableHandler extends Handler {
  /**
   * Create a new Variable handler.
   */
  constructor() {
    super('Variable', []);
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
        var variable = localStorage.getItem(varName) || 'No variable found';
        var response = {};
        response[varName] = variable;
        return response;
      }
      // Clears all global variables
      else if (action === 'clear') {
        localStorage.clear();
      }
      // Remove a global variable
      else if (action === 'remove') {
        var varName = triggerData.slice(3).join(' ');
        localStorage.removeItem(varName);
      }
      // Set a global variable
      else if (action === 'set') {
        var varName = triggerData[3];
        var variable = triggerData.slice(4).join(' ');
        localStorage.setItem(varName, variable);
        var response = {};
        response[varName] = variable;
        return response;
      }
    } else {
      // Load a variable
      var action = triggerData[1].toLowerCase();
      if (action === 'load') {
        var varName = triggerData.slice(2).join(' ');
        var variable = this.variables[varName] || 'No variable found';
        var response = {};
        response[varName] = variable;
        return response;
      }
      // Loads a global variable
      else if (action === 'set') {
        var varName = triggerData[2];
        var variable = triggerData.slice(3).join(' ');
        this.variables[varName] = variable;
        var response = {};
        response[varName] = variable;
        return response;
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
