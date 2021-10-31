class TimerHandler extends Handler {
  /**
   * Create a new Timer handler.
   */
  constructor() {
    super('Timer', ['OnTimer']);
    this.success();
    this.timerNames = [];
    this.timers = {};
    this.intervals = {};
  }

  /**
   * Register trigger from user input.
   * @param {string} trigger name to use for the handler
   * @param {array} triggerLine contents of trigger line
   * @param {number} id of the new trigger
   */
  addTriggerData(trigger, triggerLine, triggerId) {
    var { name, interval, temp } = Parser.getInputs(triggerLine, ['name', 'interval', 'temp'], false, 1);

    interval = parseFloat(interval);

    var offset = 0;
    if (temp !== undefined) {
      temp = parseFloat(temp);
      if (!isNaN(temp)) {
        offset = temp;
      }
    }
    if (this.timerNames.indexOf(name) === -1) {
      this.timerNames.push(name);
      this.timers[name] = [];
      this.intervals[name] = [];
    }
    this.timers[name].push([triggerId, name, interval, offset]);
  }

  /**
   * Handle the input data (take an action).
   * @param {array} triggerData contents of trigger line
   */
  async handleData(triggerData) {
    var action = Parser.getAction(triggerData, 'Timer');
    // Timer Reset Name
    if (action === 'reset' || action === 'start') {
      var { name } = Parser.getInputs(triggerData, ['action', 'name']);
      this.intervals[name].forEach((item, i) => {
        clearInterval(item);
        var info = this.timers[name][i];
        var triggerId = info[0];
        var interval = info[2];
        this.intervals[name][i] = setInterval(function() {
          controller.handleData(triggerId);
        }, interval * 1000);
      }, this);
    } else if (action === 'stop') {
      var { name } = Parser.getInputs(triggerData, ['action', 'name']);
      this.intervals[name].forEach((item, i) => {
        clearInterval(item);
      });
    }
  }

  /**
   * Called after parsing all user input.
   */
  postParse() {
    this.timerNames.forEach((name) => {
      this.timers[name].forEach((timer) => {
        var triggerId = timer[0];
        var name = timer[1];
        var interval = timer[2];
        var offset = timer[3];
        setTimeout(function() {
          this.intervals[name].push(setInterval(function() {
            controller.handleData(triggerId);
          }, interval * 1000));
        }.bind(this), (offset + 1) * 1000);
      });
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
