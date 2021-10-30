class ActionsHandler extends Handler {
  /**
   * Create a new Actions handler.
   */
  constructor() {
    super('Actions', ['OnAction']);
    this.actions = [];
    this.actionsTriggers = {};
    this.success();
  }

  /**
   * Register trigger from user input.
   * @param {string} trigger name to use for the handler
   * @param {array} triggerLine contents of trigger line
   * @param {number} id of the new trigger
   */
  addTriggerData(trigger, triggerLine, triggerId) {
    var { actions } = Parser.getInputs(triggerLine, ['actions'], true);
    // Allow action aliases
    actions.forEach(action => {
      action = action.toLowerCase();
      if (this.actions.indexOf(action) === -1) {
        this.actions.push(action);
        this.actionsTriggers[action] = [];
      }
      this.actionsTriggers[action].push(triggerId);
    });
  }

  /**
   * Handle the input data (take an action).
   * @param {array} triggerData contents of trigger line
   */
  async handleData(triggerData) {
    var action = triggerData[0].toLowerCase();
    var inputs = {};
    for (var i = 1; i < triggerData.length; i++) {
      inputs[`in${i}`] = triggerData[i];
    }
    if (this.actions.indexOf(action) != -1) {0
      return { "_trigId": this.actionsTriggers[action], ...inputs };
    } else {
      console.error('Unable to find parser for input: ' + action);
    }
  }
}

/**
 * Create a handler
 */
function actionsHandlerExport() {
  var actions = new ActionsHandler();
}
actionsHandlerExport();
