class StreamlabsAlertHandler extends Handler {
  /**
   * Create a new Streamlabs Alert handler.
   */
  constructor() {
    super('StreamlabsAlert',['OnSLTwitchBits','OnSLDonation','OnSLTwitchFollow','OnSLTwitchGiftSub','OnSLTwitchHost','OnSLTwitchRaid','OnSLTwitchSub','OnSLTwitchBitsNoSync','OnSLDonationNoSync','OnSLTwitchFollowNoSync','OnSLTwitchGiftSubNoSync','OnSLTwitchHostNoSync','OnSLTwitchRaidNoSync','OnSLTwitchSubNoSync']);
    this.alerts = [];
    this.alertsTrigger = {
      'bits': [],
      'donation': [],
      'follow': [],
      'gift_sub': [],
      'host': [],
      'raid': [],
      'subscription': []
    };
    this.alertsNoSync = [];
    this.alertsNoSyncTrigger = {
      'bits': [],
      'donation': [],
      'follow': [],
      'gift_sub': [],
      'host': [],
      'raid': [],
      'subscription': []
    };
    this.alertMapping = {
      'onsltwitchbits': 'bits',
      'onsldonation': 'donation',
      'onsltwitchfollow': 'follow',
      'onsltwitchgiftsub': 'gift_sub',
      'onsltwitchhost': 'host',
      'onsltwitchraid': 'raid',
      'onsltwitchsub': 'subscription',
      'onsltwitchbitsnosync': 'bits',
      'onsldonationnosync': 'donation',
      'onsltwitchfollownosync': 'follow',
      'onsltwitchgiftsubnosync': 'gift_sub',
      'onsltwitchhostnosync': 'host',
      'onsltwitchraidnosync': 'raid',
      'onsltwitchsubnosync': 'subscription'
    };
    this.eventHandlers = {
      'bits': this.getBitParameters,
      'donation': this.getDonationParameters,
      'follow': this.getFollowParameters,
      'gift_sub': this.getGiftSubParameters,
      'host': this.getHostParameters,
      'raid': this.getRaidParameters,
      'subscription': this.getSubParameters
    };
    this.alertIds = [];
    this.alertIdsNoSync = [];
    this.onSLMessageQueue = async.queue(this.parseStreamlabsMessage.bind(this), 1);
  }

  /**
   * Initialize the connection to streamlabs with the input token.
   * @param {string} socketToken streamlabs socket api token
   */
  init(socketToken) {
    connectStreamlabsWebsocket(this, socketToken, this.onStreamlabsMessage.bind(this));
  }

  /**
   * Register trigger from user input.
   * @param {string} trigger name to use for the handler
   * @param {array} triggerLine contents of trigger line
   * @param {number} id of the new trigger
   */
  addTriggerData(trigger, triggerLine, triggerId) {
    trigger = trigger.toLowerCase();
    if (trigger.endsWith('nosync')) {
      this.alertsNoSync.push(this.alertMapping[trigger]);
      this.alertsNoSyncTrigger[this.alertMapping[trigger]].push(triggerId);
    } else {
      this.alerts.push(this.alertMapping[trigger]);
      this.alertsTrigger[this.alertMapping[trigger]].push(triggerId);
    }
    return;
  }

  /**
   * Handle event messages from streamlabs websocket.
   * @param {Object} message streamlabs event message
   */
  onStreamlabsMessage(message) {
    this.onSLMessageQueue.push(message);
  }

  /**
   * Handle event messages from streamlabs websocket.
   * @param {Object} message streamlabs event message
   */
  async parseStreamlabsMessage(message, callback) {
    if (message.type === 'alertPlaying') {
      if (this.alertIds.indexOf(message.message['_id']) === -1) {
        this.alertIds.push(message.message['_id']);
        var type = message.message.type;
        if (type === 'subscription' && message.message.gifter) {
          type = 'gift_sub';
        }
        if (this.alerts.indexOf(type) != -1) {
          var params = this.eventHandlers[type](message.message);
          this.alertsTrigger[type].forEach(triggerId => {
            controller.handleData(triggerId, params);
          });
        }
      }
    } else if (this.alertsNoSync.indexOf(message.type) !== -1) {
      message.message.forEach(alertMessage => {
        if (this.alertIdsNoSync.indexOf(alertMessage['_id']) === -1) {
          this.alertIdsNoSync.push(alertMessage['_id']);
          var type = alertMessage.type;
          if (type === 'subscription' && alertMessage.gifter) {
            type = 'gift_sub';
          }
          var params = this.eventHandlers[type](alertMessage);
          this.alertsNoSyncTrigger[type].forEach(triggerId => {
            controller.handleData(triggerId, params);
          });
        }
      });
    }
  }

  /**
   * Retrieve the parameters for the bit event.
   * @param {Object} message streamlabs event message
   */
  getBitParameters(message) {
    return {
      'data': message,
      'amount': message.amount,
      'message': message.message,
      'user': message.name
    }
  }

  /**
   * Retrieve the parameters for the donation event.
   * @param {Object} message streamlabs event message
   */
  getDonationParameters(message) {
    return {
      'data': message,
      'amount': message.rawAmount,
      'formatted': message.payload.formatted_amount,
      'message': message.message,
      'user': message.name
    }
  }

  /**
   * Retrieve the parameters for the follow event.
   * @param {Object} message streamlabs event message
   */
  getFollowParameters(message) {
    return {
      'data': message,
      'user': message.name
    }
  }

  /**
   * Retrieve the parameters for the gift sub event.
   * @param {Object} message streamlabs event message
   */
  getGiftSubParameters(message) {
    return {
      'data': message,
      'user': message.name,
      'gifter': message.gifter_display_name,
      'months': message.months,
      'tier': message.subPlan === 'Prime' ? 'Prime' : 'Tier ' + (parseInt(message.subPlan) / 1000)
    }
  }

  /**
   * Retrieve the parameters for the host event.
   * @param {Object} message streamlabs event message
   */
  getHostParameters(message) {
    return {
      'data': message,
      'user': message.name,
      'viewers': message.viewers
    }
  }

  /**
   * Retrieve the parameters for the raid event.
   * @param {Object} message streamlabs event message
   */
  getRaidParameters(message) {
    return {
      'data': message,
      'user': message.name,
      'raiders': message.raiders
    }
  }

  /**
   * Retrieve the parameters for the sub event.
   * @param {Object} message streamlabs event message
   */
  getSubParameters(message) {
    return {
      'data': message,
      'user': message.name,
      'months': message.months,
      'message': message.message,
      'tier': message.subPlan === 'Prime' ? 'Prime' : 'Tier ' + (parseInt(message.subPlan) / 1000)
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
