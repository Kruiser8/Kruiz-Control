class StreamElementsAlertHandler extends Handler {
  /**
   * Create a new StreamElements Alert handler.
   */
   constructor() {
    super('StreamElementsAlert',['OnSETwitchBits','OnSETwitchBulkGiftSub','OnSEDonation','OnSETwitchFollow','OnSETwitchGiftSub','OnSETwitchHost','OnSETwitchRaid','OnSETwitchSub']);
    this.alerts = [];
    this.alertsTrigger = {};
    this.alertMapping = {
      'onsetwitchbits': 'cheer-latest',
      'onsetwitchbulkgiftsub': 'bulk_sub',
      'onsedonation': 'tip-latest',
      'onsetwitchfollow': 'follower-latest',
      'onsetwitchgiftsub': 'gift_sub',
      'onsetwitchhost': 'host-latest',
      'onsetwitchraid': 'raid-latest',
      'onsetwitchsub': 'subscriber-latest'
    };
    this.eventHandlers = {
      'cheer-latest': this.getBitParameters,
      'bulk_sub': this.getBulkGiftParameters,
      'tip-latest': this.getDonationParameters,
      'follower-latest': this.getFollowParameters,
      'gift_sub': this.getGiftSubParameters,
      'host-latest': this.getHostParameters,
      'raid-latest': this.getRaidParameters,
      'subscriber-latest': this.getSubParameters
    };
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
    trigger = trigger.toLowerCase()
    this.alerts.push(this.alertMapping[trigger]);
    this.alertsTrigger[this.alertMapping[trigger]] = triggerId;
    return;
  }

  /**
   * Handle event messages from streamelements websocket.
   * @param {Object} message streamelements event message
   */
  onStreamElementsMessage(message) {
    var type = message.listener;
    if (type === 'subscriber-latest') {
      if (message.event.gifted) {
        type = 'gift_sub';
      } else if (message.event.bulkGifted) {
        type = 'bulk_sub';
      }
    }
    if (this.alerts.indexOf(type) != -1) {
      var params = this.eventHandlers[type](message.event);
      controller.handleData(this.alertsTrigger[type], params);
    }
  }

  /**
   * Retrieve the parameters for the bit event.
   * @param {Object} event streamelements event
   */
  getBitParameters(event) {
    return {
      'data': event,
      'amount': event.amount,
      'message': event.message,
      'user': event.name
    }
  }

  /**
   * Retrieve the parameters for the bulk gift sub event.
   * @param {Object} event streamelements event
   */
  getBulkGiftParameters(event) {
    return {
      'data': event,
      'amount': event.amount,
      'user': event.sender
    }
  }

  /**
   * Retrieve the parameters for the donation event.
   * @param {Object} event streamelements event
   */
  getDonationParameters(event) {
    return {
      'data': event,
      'amount': event.amount,
      'message': event.message,
      'user': event.name
    }
  }

  /**
   * Retrieve the parameters for the follow event.
   * @param {Object} event streamelements event
   */
  getFollowParameters(event) {
    return {
      'data': event,
      'user': event.name
    }
  }

  /**
   * Retrieve the parameters for the gift sub event.
   * @param {Object} event streamelements event
   */
  getGiftSubParameters(event) {
    return {
      'data': event,
      'user': event.name,
      'gifter': event.sender,
      'tier': event.tier === 'prime' ? 'Prime' : 'Tier ' + (event.tier / 1000)
    }
  }

  /**
   * Retrieve the parameters for the host event.
   * @param {Object} event streamelements event
   */
  getHostParameters(event) {
    return {
      'data': event,
      'user': event.name,
      'viewers': event.amount
    }
  }

  /**
   * Retrieve the parameters for the raid event.
   * @param {Object} event streamelements event
   */
  getRaidParameters(event) {
    return {
      'data': event,
      'user': event.name,
      'raiders': event.amount
    }
  }

  /**
   * Retrieve the parameters for the sub event.
   * @param {Object} event streamelements event
   */
  getSubParameters(event) {
    return {
      'data': event,
      'user': event.name,
      'months': event.amount,
      'message': event.message,
      'tier': event.tier === 'prime' ? 'Prime' : 'Tier ' + (event.tier / 1000)
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
