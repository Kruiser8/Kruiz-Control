class VariableHandler extends Handler {
  /**
   * Create a new Variable handler.
   */
  constructor() {
    super('Variable', []);
    this.autoload = false;
    this.globals = {};
    this.variables = {};
    this.success();
  }

  /**
   * Initialize the variable handler with the input settings.
   * @param {string} autoload on/off to toggle variables autoloading
   */
  init = (autoload) => {
    this.autoload = autoload.toLowerCase() === "on" ? true : false;
    if (this.autoload) {
      this.loadGlobalVariables();
    }
  }

  /**
   * Handle the input data (take an action).
   * @param {array} triggerData contents of trigger line
   */
  handleData = async (triggerData) => {
    var action = Parser.getAction(triggerData, 'Variable');
    if (action === 'global') {
      action = Parser.getAction(triggerData, 'Variable', 1)
      // Loads a global variable
      if (action === 'load') {
        var { varName } = Parser.getInputs(triggerData, ['global', 'action', 'varName']);
        var variable = await IDBService.get(varName) || 'No variable found';
        this.globals[varName] = variable;
        return {[varName]: variable};
      }
      // Clears all global variables
      else if (action === 'clear') {
        this.globals = {};
        IDBService.clear();
      }
      // Remove a global variable
      else if (action === 'remove') {
        var { varName } = Parser.getInputs(triggerData, ['global', 'action', 'varName']);
        delete this.globals[varName];
        IDBService.delete(varName);
      }
      // Set a global variable
      else if (action === 'set') {
        var { varName, variable } = Parser.getInputs(triggerData, ['global', 'action', 'varName', 'variable']);
        this.globals[varName] = variable;
        IDBService.set(varName, variable);
        return {[varName]: variable};
      }
    } else {
      // Load a variable
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

  /**
   * Retrieve all variables (session and global).
   */
  getVariables = async () => {
    if (this.autoload) {
      return {
        ...this.globals,
        ...this.variables
      };
    }

    return {};
  }

  /**
   * Load all global variables from storage.
   */
  loadGlobalVariables = async () => {
    this.globals = await IDBService.entries();
  }
}

/**
 * Create a handler
 */
async function variableHandlerExport() {
  var variable = new VariableHandler();
  var autoload = await readFile('settings/variable/autoload.txt');
  variable.init(autoload.trim());
}
variableHandlerExport();
