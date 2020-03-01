class StreamElementsAlertHandler extends Handler {
  /**
   * Create a new StreamElements Alert handler.
   */
   constructor() {
    super('StreamElementsAlert',['OnSETwitchBits','OnSEDonation','OnSETwitchFollow','OnSETwitchHost','OnSETwitchRaid','OnSETwitchSub']);
    this.alerts = [];
    this.alertsTrigger = {};
  }

  /**
   * Initialize the connection to streamelements with the input token.
   * @param {string} jwtToken streamelements jwt token
   */
  init(jwtToken) {
    connectStreamElementsWebsocket(jwtToken, this.onStreamElementsMessage.bind(this));
  }

  /**
   * Register trigger from user input.
   * @param {string} trigger name to use for the handler
   * @param {array} triggerLine contents of trigger line
   * @param {number} id of the new trigger
   */
  addTriggerData(trigger, triggerLine, triggerId) {
    var alertMapping = {
      'OnSETwitchBits': 'cheer-latest',
      'OnSEDonation': 'tip-latest',
      'OnSETwitchFollow': 'follower-latest',
      'OnSETwitchHost': 'host-latest',
      'OnSETwitchRaid': 'raid-latest',
      'OnSETwitchSub': 'subscriber-latest'
    }
    this.alerts.push(alertMapping[trigger]);
    this.alertsTrigger[alertMapping[trigger]] = triggerId;
    return;
  }

  /**
   * Handle event messages from streamelements websocket.
   * @param {Object} message streamelements event message
   */
  onStreamElementsMessage(message) {
    if (this.alerts.indexOf(message.listener) != -1) {
      controller.handleData(this.alertsTrigger[message.listener]);
    }
  }
}

/**
 * Create a handler and read user settings
 */
function streamElementsAlertHandlerExport() {
  var streamElementsAlert = new StreamElementsAlertHandler();
  readFile('settings/streamelements/jwtToken.txt', function(id) {
    streamElementsAlert.init(id.trim());
  });
}
streamElementsAlertHandlerExport();
