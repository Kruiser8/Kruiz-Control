class ChannelPointHandler extends Handler {
  /**
   * Create a new Channel Point handler.
   */
   constructor() {
    super('ChannelPoint', ['OnChannelPoint']);
    this.rewards = [];
    this.rewardsTrigger = {};
  }

  /**
   * Initialize the connection to twitch pubsub with the input user.
   * @param {string} channelId twitch channel id
   */
  init(channelId) {
    connectChannelPointWebsocket(channelId, this.onChannelPointMessage.bind(this));
  }

  /**
   * Register trigger from user input.
   * @param {string} trigger name to use for the handler
   * @param {array} triggerLine contents of trigger line
   * @param {number} id of the new trigger
   */
  addTriggerData(trigger, triggerLine, triggerId) {
    if (trigger.toLowerCase() === 'onchannelpoint') {
      var reward = triggerLine.slice(1).join(' ');
      this.rewards.push(reward);
      this.rewardsTrigger[reward] = triggerId;
    }
    return;
  }

  /**
   * Handle event messages from twitch pubsub websocket.
   * @param {Object} message twitch pubsub message
   */
  onChannelPointMessage(message) {
    // Parse message data to extract event name
    var data = JSON.parse(message.data);
    if (data.type === 'MESSAGE') {
      var dataMessage = JSON.parse(data.data.message);
      if (dataMessage.type === 'reward-redeemed') {
        var reward = dataMessage.data.redemption.reward.title;
        if (this.rewards.indexOf(reward) !== -1) {
          controller.handleData(this.rewardsTrigger[reward]);
        }
      }
    }
  }
}

/**
 * Create a handler and read user settings
 */
function channelPointHandlerExport() {
  var channelPoint = new ChannelPointHandler();
  readFile('settings/channelpoints/user.txt', function(user) {
    getIdFromUser(user.trim(), function (id) {
      channelPoint.init(id.trim());
    })
  });
}
channelPointHandlerExport();
