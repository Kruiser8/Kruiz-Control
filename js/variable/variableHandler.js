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
    var action = Parser.getAction(triggerData, 'Variable');
    if (action === 'global') {
      action = Parser.getAction(triggerData, 'Variable', 1)
      // Loads a global variable
      if (action === 'load') {
        var { varName } = Parser.getInputs(triggerData, ['global', 'action', 'varName']);
        var variable = await IDBService.get(varName) || 'No variable found';
        return {[varName]: variable};
      }
      // Clears all global variables
      else if (action === 'clear') {
        IDBService.clear();
      }
      // Remove a global variable
      else if (action === 'remove') {
        var { varName } = Parser.getInputs(triggerData, ['global', 'action', 'varName']);
        IDBService.delete(varName);
      }
      // Set a global variable
      else if (action === 'set') {
        var { varName, variable } = Parser.getInputs(triggerData, ['global', 'action', 'varName', 'variable']);
        IDBService.set(varName, variable);
        return {[varName]: variable};
      }
    } else {
      if (action === 'load') {
        var { varName } = Parser.getInputs(triggerData, ['action', 'varName']);
        var variable = this.variables[varName] || 'No variable found';
        return {[varName]: variable};
      }
      // Sets a variable
      else if (action === 'set') {
        var { varName, variable } = Parser.getInputs(triggerData, ['action', 'varName', 'variable']);
        this.variables[varName] = variable;
        return {[varName]: variable};
      }
      // Removes a variable
      else if (action === 'remove') {
        var { varName } = Parser.getInputs(triggerData, ['action', 'varName']);
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
