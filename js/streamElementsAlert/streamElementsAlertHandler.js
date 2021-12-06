class StreamElementsAlertHandler extends Handler {
  /**
   * Create a new StreamElements Alert handler.
   */
   constructor() {
    super('StreamElementsAlert',['OnSETwitchBits','OnSETwitchBulkGiftSub','OnSEDonation','OnSETwitchFollow','OnSETwitchGiftSub','OnSETwitchHost','OnSETwitchRaid','OnSETwitchSub']);
    this.alerts = [];
    this.alertsTrigger = {
      'cheer': [],
      'bulk_sub': [],
      'tip': [],
      'follow': [],
      'gift_sub': [],
      'host': [],
      'raid': [],
      'subscriber': []
    };
    this.alertMapping = {
      'onsetwitchbits': 'cheer',
      'onsetwitchbulkgiftsub': 'bulk_sub',
      'onsedonation': 'tip',
      'onsetwitchfollow': 'follow',
      'onsetwitchgiftsub': 'gift_sub',
      'onsetwitchhost': 'host',
      'onsetwitchraid': 'raid',
      'onsetwitchsub': 'subscriber'
    };
    this.eventHandlers = {
      'cheer': this.getBitParameters,
      'bulk_sub': this.getBulkGiftParameters,
      'tip': this.getDonationParameters,
      'follow': this.getFollowParameters,
      'gift_sub': this.getGiftSubParameters,
      'host': this.getHostParameters,
      'raid': this.getRaidParameters,
      'subscriber': this.getSubParameters
    };
    this.testEventMapper = {
      'cheer-latest':'cheer',
      'bulk_sub': 'bulk_sub',
      'tip-latest': 'tip',
      'follower-latest': 'follow',
      'gift_sub': 'gift_sub',
      'host-latest': 'host',
      'raid-latest': 'raid',
      'subscriber-latest': 'subscriber'
    };

    this.init.bind(this);
    this.onStreamElementsTestMessage.bind(this);
    this.onStreamElementsMessage.bind(this);
  }

  /**
   * Initialize the connection to streamelements with the input token.
   * @param {string} jwtToken streamelements jwt token
   */
  init(jwtToken) {
    connectStreamElementsWebsocket(this, jwtToken, this.onStreamElementsTestMessage.bind(this), this.onStreamElementsMessage.bind(this));
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
    this.alertsTrigger[this.alertMapping[trigger]].push(triggerId);
    return;
  }

  /**
   * Handle event messages from streamelements websocket.
   * @param {Object} message streamelements test event message
   */
  onStreamElementsTestMessage(message) {
    if (Debug.All || Debug.StreamElements) {
      console.error('StreamElements Message: ' + JSON.stringify(message));
    }
    var type = message.listener;
    if (type === 'subscriber-latest') {
      if (message.event.gifted) {
        type = 'gift_sub';
      } else if (message.event.bulkGifted) {
        type = 'bulk_sub';
      }
    }
    type = this.testEventMapper[type];
    if (this.alerts.indexOf(type) != -1) {
      var params = this.eventHandlers[type](message.event);
      this.alertsTrigger[type].forEach(triggerId => {
        controller.handleData(triggerId, params);
      });
    }
  }

  /**
   * Handle event messages from streamelements websocket.
   * @param {Object} message streamelements event message
   */
  onStreamElementsMessage(message) {
    if (Debug.All || Debug.StreamElements) {
      console.error('StreamElements Message: ' + JSON.stringify(message));
    }
    var type = message.type;
    if (type === 'subscriber') {
      if (message.data.gifted) {
        type = 'gift_sub';
      } else if (message.data.bulkGifted) {
        type = 'bulk_sub';
      }
    }
    if (this.alerts.indexOf(type) != -1) {
      var params = this.eventHandlers[type](message.data);
      this.alertsTrigger[type].forEach(triggerId => {
        controller.handleData(triggerId, params);
      });
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
      'message': htmlDecode(event.message),
      'user': (event.displayName) ? event.displayName : event.name
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
      'message': htmlDecode(event.message),
      'user': (event.username) ? event.username : event.name
    }
  }

  /**
   * Retrieve the parameters for the follow event.
   * @param {Object} event streamelements event
   */
  getFollowParameters(event) {
    return {
      'data': event,
      'user': (event.displayName) ? event.displayName : event.name
    }
  }

  /**
   * Retrieve the parameters for the gift sub event.
   * @param {Object} event streamelements event
   */
  getGiftSubParameters(event) {
    return {
      'data': event,
      'user': (event.displayName) ? event.displayName : event.name,
      'gifter': event.sender,
      'tier': event.tier === 'prime' ? 'Prime' : 'Tier ' + (parseInt(event.tier) / 1000)
    }
  }

  /**
   * Retrieve the parameters for the host event.
   * @param {Object} event streamelements event
   */
  getHostParameters(event) {
    return {
      'data': event,
      'user': (event.displayName) ? event.displayName : event.name,
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
      'user': (event.displayName) ? event.displayName : event.name,
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
      'user': (event.displayName) ? event.displayName : event.name,
      'months': event.amount,
      'message': htmlDecode(event.message),
      'tier': event.tier === 'prime' ? 'Prime' : 'Tier ' + (parseInt(event.tier) / 1000)
    }
  }
}

/**
 * Create a handler and read user settings
 */
async function streamElementsAlertHandlerExport() {
  var streamElementsAlert = new StreamElementsAlertHandler();
  var token = await readFile('settings/streamelements/jwtToken.txt');
  streamElementsAlert.init(token.trim());
}
streamElementsAlertHandlerExport();
