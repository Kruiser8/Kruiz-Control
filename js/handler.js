class Handler {
  /**
   * Create a new handler.
   * @param {string} parserName name to use for the handler
   * @param {array} triggers list of triggers this handler is responsible for
   */
  constructor(parserName, triggers) {
    this.parserName = parserName;
    triggers = triggers || [];

    // Configure handler with controller
    controller.addParser(parserName, this);
    triggers.forEach(trigger => {
      controller.addTrigger(trigger, parserName);
    });
  }

  /**
   * Register trigger as successfully initialized.
   */
  success() {
    controller.addSuccess(this.parserName);
  }

  /**
   * Register trigger from user input.
   * @param {string} trigger name to use for the handler
   * @param {array} triggerLine contents of trigger line
   * @param {number} id of the new trigger
   */
  addTriggerData(trigger, triggerLine, triggerId) {
    return;
  }

  /**
   * Handle the input data (take an action).
   * @param {array} triggerData contents of trigger line
   * @param {array} triggerParams current trigger parameters
   */
  async handleData(triggerData, triggerParams) {
    return;
  }

  /**
   * Called before parsing user input.
   */
  preParse() {
    return;
  }

  /**
   * Called after parsing all user input.
   */
  postParse() {
    return;
  }
}
