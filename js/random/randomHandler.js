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
    if (triggerData[1].toLowerCase() == 'equal') {
      var choice = Math.floor(Math.random() * (triggerData.length - 2) + 2);
      await controller.runTrigger(shlexSplit(triggerData[choice]));
    } else {
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
            await controller.runTrigger(shlexSplit(actionIndexes[i][1]));
            return;
          }
        }
      }
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
