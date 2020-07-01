class TwitchHandler extends Handler {
  /**
   * Create a new Timer handler.
   */
  constructor() {
    super('Twitch', ['OnChannelPoint', 'OnHypeTrainStart', 'OnHypeTrainEnd', 'OnHypeTrainLevel', 'OnHypeTrainProgress', 'OnHypeTrainConductor']);
    this.success();
    this.rewards = [];
    this.rewardsTrigger = {};
    this.hypeTrains = [];
    this.hypeTrainsTrigger = {};
    this.hypeTrainsMap = {
      'onhypetrainstart': 'start',
      'onhypetrainend': 'end',
      'onhypetrainlevel': 'level',
      'onhypetrainprogress': 'progress',
      'onhypetrainconductor': 'conductor'
    };
    this.currentConductor = {
      'SUBS': '',
      'CHEER': ''
    }
  }

  /**
   * Initialize the oauth tokens
   */
  async init(channelId) {
    connectPubSubWebsocket(channelId, this.onMessage.bind(this));
  }

  /**
   * Register trigger from user input.
   * @param {string} trigger name to use for the handler
   * @param {array} triggerLine contents of trigger line
   * @param {number} id of the new trigger
   */
  addTriggerData(trigger, triggerLine, triggerId) {
    trigger = trigger.toLowerCase();
    switch (trigger.toLowerCase()) {
      case 'onchannelpoint':
        var reward = triggerLine.slice(1).join(' ');
        if (this.rewards.indexOf(reward) !== -1) {
          this.rewardsTrigger[reward].push(triggerId);
        } else {
          this.rewardsTrigger[reward] = [];
          this.rewards.push(reward);
          this.rewardsTrigger[reward].push(triggerId);
        }
        break;
      case 'onhypetrainstart':
      case 'onhypetrainend':
      case 'onhypetrainconductor':
      case 'onhypetrainlevel':
      case 'onhypetrainprogress':
        var key = this.hypeTrainsMap[trigger];
        if (this.hypeTrains.indexOf(key) !== -1) {
          this.hypeTrainsTrigger[key].push(triggerId);
        } else {
          this.hypeTrainsTrigger[key] = [];
          this.hypeTrains.push(key);
          this.hypeTrainsTrigger[key].push(triggerId);
        }
        break;
    }
    return;
  }

  onMessage(message) {
    if (message.data) {
      var data = JSON.parse(message.data);
      if (data.type === 'RESPONSE' && data.error === '') {
        this.success();
      } else if (data.type == 'MESSAGE' && data.data.topic.startsWith('community-points-channel-v1.')) {
        this.onChannelPointMessage(JSON.parse(data.data.message));
      } else if (data.type == 'MESSAGE' && data.data.topic.startsWith('hype-train-events-v1.')) {
        this.onHypeTrainMessage(JSON.parse(data.data.message));
      }
    }

  }

  /**
   * Handle event messages from twitch pubsub websocket.
   * @param {Object} message twitch channel point data
   */
  onChannelPointMessage(message) {
    if (message.type === 'reward-redeemed') {

        // Check if tracking reward
        var reward = message.data.redemption.reward.title;
        if (this.rewards.indexOf(reward) !== -1) {

          // Grab data to return
          var user = message.data.redemption.user.display_name;
          var input = '';
          if ('undefined' !== typeof(message.data.redemption.user_input)) {
            input = message.data.redemption.user_input;
          }

          // Handle triggers
          this.rewardsTrigger[reward].forEach(triggerId => {
            controller.handleData(triggerId, {
              user: user,
              message: input,
              data: message
            });
          })
        }
        if (this.rewards.indexOf('*') !== -1) {
          // Grab data to return
          var user = message.data.redemption.user.display_name;
          var input = '';
          if ('undefined' !== typeof(message.data.redemption.user_input)) {
            input = message.data.redemption.user_input;
          }

          // Handle triggers
          this.rewardsTrigger['*'].forEach(triggerId => {
            controller.handleData(triggerId, {
              user: user,
              message: input,
              data: message
            });
          })
        }
      }
  }

  /**
   * Handle hype train messages from twitch pubsub websocket.
   * @param {Object} message twitch hype train data
   */
  async onHypeTrainMessage(message) {
    if (message.type === 'hype-train-start') {
      this.currentConductor = {
        'SUBS': '',
        'CHEER': ''
      };
      // Handle triggers
      this.hypeTrainsTrigger['start'].forEach(triggerId => {
        controller.handleData(triggerId, {
          data: message.data
        });
      });
    } else if (message.type === 'hype-train-end') {
      // Handle triggers
      this.hypeTrainsTrigger['end'].forEach(triggerId => {
        controller.handleData(triggerId, {
          sub_conductor_id: this.currentConductor['SUBS'],
          cheer_conductor_id: this.currentConductor['CHEER'],
          data: message.data
        });
      });
    } else if (message.type === 'hype-train-conductor-update') {
      // Handle triggers
      this.currentConductor[message.data.source] = message.data.user.id;
      this.hypeTrainsTrigger['conductor'].forEach(triggerId => {
        controller.handleData(triggerId, {
          sub_conductor_id: this.currentConductor['SUBS'],
          cheer_conductor_id: this.currentConductor['CHEER'],
          type: message.data.source,
          data: message.data
        });
      });
    } else if (message.type === 'hype-train-progression') {
      // Handle triggers
      this.hypeTrainsTrigger['progress'].forEach(triggerId => {
        controller.handleData(triggerId, {
          user_id: message.data.user_id,
          level: message.data.progress.level.value,
          progress: message.data.progress.total,
          total: message.data.progress.level.goal,
          time: message.data.progress.remaining_seconds,
          data: message.data
        });
      });
    } else if (message.type === 'hype-train-level-up') {
      // Handle triggers
      this.hypeTrainsTrigger['level'].forEach(triggerId => {
        controller.handleData(triggerId, {
          level: message.data.progress.level.value,
          progress: message.data.progress.total,
          total: message.data.progress.level.goal,
          time: message.data.progress.remaining_seconds,
          data: message.data
        });
      });
    }
  }
}

/**
 * Create a handler
 */
function twitchHandlerExport() {
  var twitch = new TwitchHandler();
  readFile('settings/twitch/user.txt', function(user) {
    getIdFromUser(user.trim(), function (id) {
      twitch.init(id.trim());
    });
  });
}
twitchHandlerExport();
