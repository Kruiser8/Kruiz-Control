class ActionHandler extends Handler {
  /**
   * Create a new Actions handler.
   */
  constructor() {
    super('Action', ['OnAction']);
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
    var action = Parser.getAction(triggerData, 'Action', -1);

    if (action === "action") {
      if (triggerData.length > 2) {
        triggerData.shift();
        return { actions: [triggerData] };
      } else if (triggerData.length === 2) {
        return { actions: [triggerData[1]] };
      } else {
        console.error('No action provided to the Action handler: ' + JSON.stringify(triggerData));
      }
    } else if (this.actions.indexOf(action) != -1) {
      var inputs = {};
      for (var i = 1; i < triggerData.length; i++) {
        inputs[`in${i}`] = triggerData[i];
      }
      return { "_trigId": this.actionsTriggers[action], action: action, ...inputs };
    } else {
      console.error('Unable to find parser for input: ' + action);
    }
  }
}

/**
 * Create a handler
 */
function actionHandlerExport() {
  var actionHandler = new ActionHandler();
}
actionHandlerExport();
