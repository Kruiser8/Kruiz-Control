class MessageHandler extends Handler {
  /**
   * Create a new Message handler.
   */
  constructor() {
    super('Message', ['OnMessage']);
    this.success();
    this.messages = [];
    this.messagesTriggers = {};
  }

  /**
   * Register trigger from user input.
   * @param {string} trigger name to use for the handler
   * @param {array} triggerLine contents of trigger line
   * @param {number} id of the new trigger
   */
  addTriggerData(trigger, triggerLine, triggerId) {
    var { messages } = Parser.getInputs(triggerLine, ['messages'], true);
    // Handles aliases for OnMessage
    messages.forEach(message => {
      if (this.messages.indexOf(message) === -1) {
        this.messages.push(message);
        this.messagesTriggers[message] = [];
      }
      this.messagesTriggers[message].push(triggerId);
    });
  }

  /**
   * Handle the input data (take an action).
   * @param {array} triggerData contents of trigger line
   */
  async handleData(triggerData) {
    var action = Parser.getAction(triggerData, 'Message');
    if (action === 'send') {
      var { message, data } = Parser.getInputs(triggerData, ['action', 'message', 'data'], false, 1);
      data = data || '';
      if (this.messages.indexOf(message) !== -1) {
        this.messagesTriggers[message].forEach((triggerId) => {
          controller.handleData(triggerId, {
            message: message,
            data: data
          });
        })
      }
      if (this.messages.indexOf('*') !== -1) {
        this.messagesTriggers['*'].forEach((triggerId) => {
          controller.handleData(triggerId, {
            message: message,
            data: data
          });
        })
      }
    }
  }
}

/**
 * Create a handler
 */
function messageHandlerExport() {
  var message = new MessageHandler();
}
messageHandlerExport();
