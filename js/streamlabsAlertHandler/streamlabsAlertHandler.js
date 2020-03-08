class StreamlabsAlertHandler extends Handler {
  /**
   * Create a new Streamlabs Alert handler.
   */
  constructor() {
    super('StreamlabsAlert',['OnSLTwitchBits','OnSLDonation','OnSLTwitchFollow','OnSLTwitchHost','OnSLTwitchRaid','OnSLTwitchSub']);
    this.alerts = [];
    this.alertsTrigger = {};
  }

  /**
   * Initialize the connection to streamlabs with the input token.
   * @param {string} socketToken streamlabs socket api token
   */
  init(socketToken) {
    connectStreamlabsWebsocket(socketToken, this.onStreamlabsMessage.bind(this));
  }

  /**
   * Register trigger from user input.
   * @param {string} trigger name to use for the handler
   * @param {array} triggerLine contents of trigger line
   * @param {number} id of the new trigger
   */
  addTriggerData(trigger, triggerLine, triggerId) {
    trigger = trigger.toLowerCase();
    var alertMapping = {
      'onsltwitchbits': 'bits',
      'onsldonation': 'donation',
      'onsltwitchfollow': 'follow',
      'onsltwitchhost': 'host',
      'onsltwitchraid': 'raid',
      'onsltwitchsub': 'subscription'
    }
    this.alerts.push(alertMapping[trigger]);
    this.alertsTrigger[alertMapping[trigger]] = triggerId;
    return;
  }

  /**
   * Handle event messages from streamlabs websocket.
   * @param {Object} message streamlabs event message
   */
  onStreamlabsMessage(message) {
    if (message.type === 'alertPlaying') {
      var type = message.message.type;
      if (this.alerts.indexOf(type) != -1) {
        controller.handleData(this.alertsTrigger[type]);
      }
    }
  }
}

/**
 * Create a handler and read user settings
 */
function streamlabsAlertHandlerExport() {
  var streamlabsAlert = new StreamlabsAlertHandler();
  readFile('settings/streamlabs/socketAPIToken.txt', function(id) {
    streamlabsAlert.init(id.trim());
  });
}
streamlabsAlertHandlerExport();
