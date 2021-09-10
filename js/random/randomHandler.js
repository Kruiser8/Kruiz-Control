class RandomHandler extends Handler {
  /**
   * Create a new Chat handler.
   */
  constructor() {
    super('Random', []);
    this.success();
  }

  /**
   * Handle the input data (take an action).
   * @param {array} triggerData contents of trigger line
   */
  async handleData(triggerData) {
    var action = Parser.getAction(triggerData, 'Random');
    if (action == 'number') {
      var { tmpmin, tmpmax } = Parser.getInputs(triggerData, ['action', 'tmpmin', 'tmpmax'], false, 2);
      var min = 0;
      var max = 100;
      if (tmpmin) {
        tmpmin = parseFloat(tmpmin);
        if (!isNaN(tmpmin)) {
          min = tmpmin;
        }
        if (tmpmax) {
          tmpmax = parseFloat(tmpmax);
          if (!isNaN(tmpmax)) {
            max = tmpmax;
          }
        }
      }
      var value = Math.floor((Math.random() * (max + 1 - min)) + min);
      return { number: value };
    } else if (action == 'probability') {
      var actions = {};
      var total = 0;
      for (var i = 2; i + 1 < triggerData.length; i = i + 2) {
        var action = triggerData[i];
        var prob = parseFloat(triggerData[i+1]);
        if (isNaN(prob)) {
          return;
        }
        actions[action] = prob;
        total += prob;
      }
      if (total > 0) {
        var multiplier = 100 / total;
        var index = 0;
        var prev = 0;
        var actionIndexes = [];
        for (var action in actions) {
          var value = (actions[action] * multiplier) + prev;
          prev = value;
          actionIndexes.push([value, action]);
        }
        var probability = Math.random() * 100;
        for (var i = 0; i < actionIndexes.length; i++) {
          if (probability < actionIndexes[i][0]) {
            return { actions: [actionIndexes[i][1]] };
          }
        }
      }
    } else {
      var exclude = 2;
      if (triggerData[1].toLowerCase() !== 'equal') {
        exclude = 1;
      }
      var choice = Math.floor(Math.random() * (triggerData.length - exclude)) + exclude;
      return { actions: [triggerData[choice]] };
    }
  }
}

/**
 * Create a handler
 */
function randomHandlerExport() {
  var random = new RandomHandler();
}
randomHandlerExport();
