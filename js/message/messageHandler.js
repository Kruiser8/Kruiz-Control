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
    // Handles aliases for OnMessage
    for (var i = 1; i < triggerLine.length; ++i) {
      var message = triggerLine[i];
      if (this.messages.indexOf(message) === -1) {
        this.messages.push(message);
        this.messagesTriggers[message] = [];
      }
      this.messagesTriggers[message].push(triggerId);
    }
  }

  /**
   * Handle the input data (take an action).
   * @param {array} triggerData contents of trigger line
   */
  async handleData(triggerData) {
    var trigger = triggerData[1];
    if (trigger.toLowerCase() === 'send') {
      var message = triggerData[2];
      var data = triggerData.slice(3).join(' ');
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
