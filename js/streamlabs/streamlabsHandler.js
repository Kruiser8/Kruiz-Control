class StreamlabsHandler extends Handler {
  /**
   * Create a new Streamlabs handler.
   */
  constructor() {
    super('Streamlabs', ['OnSLTwitchBits','OnSLDonation','OnSLTiltifyDonation','OnSLPatreonPledge','OnSLTwitchFollow','OnSLTwitchGiftSub','OnSLTwitchCommunityGiftSub','OnSLTwitchHost','OnSLTwitchRaid','OnSLTwitchSub','OnSLTwitchBitsNoSync','OnSLDonationNoSync','OnSLTiltifyDonationNoSync','OnSLPatreonPledgeNoSync','OnSLTwitchFollowNoSync','OnSLTwitchGiftSubNoSync','OnSLTwitchCommunityGiftSubNoSync','OnSLTwitchHostNoSync','OnSLTwitchRaidNoSync','OnSLTwitchSubNoSync']);
    this.alerts = [];
    this.alertsTrigger = {
      'bits': [],
      'donation': [],
      'follow': [],
      'gift_sub': [],
      'cgift_sub': [],
      'host': [],
      'pledge': [],
      'raid': [],
      'subscription': [],
      'tiltifydonation': []
    };
    this.alertsNoSync = [];
    this.alertsNoSyncTrigger = {
      'bits': [],
      'donation': [],
      'follow': [],
      'gift_sub': [],
      'cgift_sub': [],
      'host': [],
      'pledge': [],
      'raid': [],
      'subscription': [],
      'tiltifydonation': []
    };
    this.alertMapping = {
      'onsltwitchbits': 'bits',
      'onsldonation': 'donation',
      'onsltiltifydonation': 'tiltifydonation',
      'onslpatreonpledge': 'pledge',
      'onsltwitchfollow': 'follow',
      'onsltwitchgiftsub': 'gift_sub',
      'onsltwitchcommunitygiftsub': 'cgift_sub',
      'onsltwitchhost': 'host',
      'onsltwitchraid': 'raid',
      'onsltwitchsub': 'subscription',
      'onsltwitchbitsnosync': 'bits',
      'onsldonationnosync': 'donation',
      'onsltiltifydonationnosync': 'tiltifydonation',
      'onslpatreonpledgenosync': 'pledge',
      'onsltwitchfollownosync': 'follow',
      'onsltwitchgiftsubnosync': 'gift_sub',
      'onsltwitchcommunitygiftsubnosync': 'cgift_sub',
      'onsltwitchhostnosync': 'host',
      'onsltwitchraidnosync': 'raid',
      'onsltwitchsubnosync': 'subscription'
    };
    this.eventHandlers = {
      'bits': this.getBitParameters,
      'donation': this.getDonationParameters,
      'follow': this.getFollowParameters,
      'gift_sub': this.getGiftSubParameters,
      'cgift_sub': this.getCommunityGiftSubParameters,
      'host': this.getHostParameters,
      'pledge': this.getPatreonPledgeParameters,
      'raid': this.getRaidParameters,
      'subscription': this.getSubParameters,
      'tiltifydonation': this.getTiltifyDonationParameters
    };
    this.alertIds = [];
    this.alertIdsNoSync = [];
    this.onSLMessageQueue = async.queue(this.parseStreamlabsMessage.bind(this), 1);

    this.init.bind(this);
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
    if (Debug.All || Debug.Streamlabs) {
      console.error('Streamlabs Message: ' + JSON.stringify(message));
    }
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
        if (type === 'subscription' && message.message.gifter_display_name) {
          type = 'gift_sub';
        } else if (type === 'subMysteryGift') {
          type = 'cgift_sub';
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
          var type = message.type;
          if (type === 'subscription' && alertMessage.gifter_display_name) {
            type = 'gift_sub';
          } else if (type === 'subMysteryGift') {
            type = 'cgift_sub';
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
      'message': message.message || "",
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
     'amount': (message.payload && message.payload.amount) ? message.payload.amount : message.amount,
     'formatted': (message.payload && message.payload.formatted_amount) ? message.payload.formatted_amount : message.formatted_amount,
     'message': message.message || "",
     'user': message.from
   }
  }

  /**
   * Retrieve the parameters for the tiltify donation event.
   * @param {Object} message streamlabs event message
   */
  getTiltifyDonationParameters(message) {
    return {
      'data': message,
      'amount': (message.payload && message.payload.amount) ? message.payload.amount : message.amount,
      'formatted': (message.payload && message.payload.formatted_amount) ? message.payload.formattedAmount : message.formattedAmount,
      'message': message.message || "",
      'user': message.from
    }
  }

  /**
   * Retrieve the parameters for the patreon pledge event.
   * @param {Object} message streamlabs event message
   */
  getPatreonPledgeParameters(message) {
    return {
      'data': message,
      'amount': (message.payload && message.payload.amount) ? message.payload.amount : message.amount,
      'formatted': (message.payload && message.payload.formatted_amount) ? message.payload.formatted_amount : message.formatted_amount,
      'user': message.from
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
    var gifter = message.gifter_display_name;
    if (!gifter) {
      gifter = message.gifter;
    }

    var name = message.display_name;
    if (!name) {
      name = message.name;
    }

    var subPlan = message.sub_plan;
    if (!subPlan) {
      subPlan = message.subPlan;
    }

    return {
      'data': message,
      'user': name,
      'gifter': gifter,
      'months': message.months,
      'tier': subPlan === 'Prime' ? 'Prime' : 'Tier ' + (parseInt(subPlan) / 1000)
    }
  }

  /**
   * Retrieve the parameters for the gift sub event.
   * @param {Object} message streamlabs event message
   */
  getCommunityGiftSubParameters(message) {
    var gifter = message.gifter_display_name;
    if (!gifter) {
      gifter = message.gifter;
    }

    var subPlan = message.sub_plan;
    if (!subPlan) {
      subPlan = message.subPlan;
    }

    return {
      'data': message,
      'amount': message.amount,
      'gifter': gifter,
      'tier': subPlan === 'Prime' ? 'Prime' : 'Tier ' + (parseInt(subPlan) / 1000)
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
    var name = message.display_name;
    if (!name) {
      name = message.name;
    }

    var subPlan = message.sub_plan;
    if (!subPlan) {
      subPlan = message.subPlan;
    }

    return {
      'data': message,
      'user': name,
      'months': message.months,
      'message': message.message || "",
      'tier': subPlan === 'Prime' ? 'Prime' : 'Tier ' + (parseInt(subPlan) / 1000)
    }
  }
}

/**
 * Create a handler and read user settings
 */
async function streamlabsHandlerExport() {
  var streamlabs = new StreamlabsHandler();
  var socket = await readFile('settings/streamlabs/socketAPIToken.txt');
  streamlabs.init(socket.trim());
}
streamlabsHandlerExport();
