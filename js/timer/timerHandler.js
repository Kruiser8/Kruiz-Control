class TimerHandler extends Handler {
  /**
   * Create a new Timer handler.
   */
  constructor() {
    super('Timer', ['OnTimer']);
    this.timers = [];
  }

  /**
   * Register trigger from user input.
   * @param {string} trigger name to use for the handler
   * @param {array} triggerLine contents of trigger line
   * @param {number} id of the new trigger
   */
  addTriggerData(trigger, triggerLine, triggerId) {
    var interval = triggerLine[1];
    var offset = triggerLine[2] || 0;
    this.timers.push([triggerId, interval, offset]);
  }

  /**
   * Called after parsing all user input.
   */
  postParse() {
    this.timers.forEach((timer) => {
      var triggerId = timer[0];
      var interval = timer[1];
      var offset = timer[2];
      setTimeout(function () {
        controller.handleData(triggerId)
        setInterval(function() {
          controller.handleData(triggerId);
        }, interval * 1000);
      }, (offset + 1) * 1000);
    });
  }
}

/**
 * Create a handler
 */
function timerHandlerExport() {
  var timer = new TimerHandler();
}
timerHandlerExport();
