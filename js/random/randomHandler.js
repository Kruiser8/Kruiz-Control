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
    var choice = Math.floor(Math.random() * (triggerData.length - 1) + 1);
    await controller.runTrigger(shlexSplit(triggerData[choice]));
  }
}

/**
 * Create a handler
 */
function randomHandlerExport() {
  var random = new RandomHandler();
}
randomHandlerExport();
