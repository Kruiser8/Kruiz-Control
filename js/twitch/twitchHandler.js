class TwitchHandler extends Handler {
  /**
   * Create a new Timer handler.
   */
  constructor() {
    super('Twitch', ['OnChannelPoint', 'OnCommunityGoalStart', 'OnCommunityGoalProgress', 'OnCommunityGoalComplete', 'OnHypeTrainStart', 'OnHypeTrainEnd', 'OnHypeTrainLevel', 'OnHypeTrainProgress', 'OnHypeTrainConductor', 'OnHypeTrainCooldownExpired']);
    this.rewards = [];
    this.rewardsTrigger = {};
    this.goals = [];
    this.goalsTrigger = {};
    this.complete = [];
    this.completeTrigger = {};
    this.start = [];
    this.startTrigger = {};
    this.hypeTrains = [];
    this.hypeTrainsTrigger = {
      'start': [],
      'end': [],
      'level': [],
      'progress': [],
      'conductor': [],
      'cooldown': []
    };
    this.hypeTrainsMap = {
      'onhypetrainstart': 'start',
      'onhypetrainend': 'end',
      'onhypetrainlevel': 'level',
      'onhypetrainprogress': 'progress',
      'onhypetrainconductor': 'conductor',
      'onhypetraincooldownexpired': 'cooldown'
    };
    this.currentConductor = {
      'SUBS': '',
      'BITS': ''
    }

    this.init.bind(this);
    this.onMessage.bind(this);
    this.onChannelPointMessage.bind(this);
    this.onCommunityGoalMessage.bind(this);
    this.onHypeTrainMessage.bind(this);
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
    switch (trigger) {
      case 'onchannelpoint':
        var { rewards } = Parser.getInputs(triggerLine, ['rewards'], true);
        rewards.forEach(reward => {
          if (this.rewards.indexOf(reward) !== -1) {
            this.rewardsTrigger[reward].push(triggerId);
          } else {
            this.rewardsTrigger[reward] = [];
            this.rewards.push(reward);
            this.rewardsTrigger[reward].push(triggerId);
          }
        });
        break;
      case 'oncommunitygoalprogress':
        var { goals } = Parser.getInputs(triggerLine, ['goals'], true);
        goals.forEach(goal => {
          if (this.goals.indexOf(goal) !== -1) {
            this.goalsTrigger[goal].push(triggerId);
          } else {
            this.goalsTrigger[goal] = [];
            this.goals.push(goal);
            this.goalsTrigger[goal].push(triggerId);
          }
        });
        break;
      case 'oncommunitygoalcomplete':
        var { goals } = Parser.getInputs(triggerLine, ['goals'], true);
        goals.forEach(goal => {
          if (this.complete.indexOf(goal) !== -1) {
            this.completeTrigger[goal].push(triggerId);
          } else {
            this.completeTrigger[goal] = [];
            this.complete.push(goal);
            this.completeTrigger[goal].push(triggerId);
          }
        });
        break;
      case 'oncommunitygoalstart':
        var { goals } = Parser.getInputs(triggerLine, ['goals'], true);
        goals.forEach(goal => {
          if (this.start.indexOf(goal) !== -1) {
            this.startTrigger[goal].push(triggerId);
          } else {
            this.startTrigger[goal] = [];
            this.start.push(goal);
            this.startTrigger[goal].push(triggerId);
          }
        });
        break;
      case 'onhypetrainstart':
      case 'onhypetrainend':
      case 'onhypetrainconductor':
      case 'onhypetrainlevel':
      case 'onhypetrainprogress':
      case 'onhypetraincooldownexpired':
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

  /**
   * Handle a message from the twitch pubsub.
   * @param {object} message twitch pubsub message
   */
  onMessage(message) {
    if (Debug.All || Debug.Twitch) {
      console.error('Twitch Message: ' + JSON.stringify(message));
    }
    if (message.data) {
      var data = JSON.parse(message.data);
      if (data.type === 'RESPONSE' && data.error === '') {
        this.success();
      } else if (data.type == 'MESSAGE' && data.data.topic.startsWith('community-points-channel-v1.')) {
        var dataMessage = JSON.parse(data.data.message);
        if (dataMessage.type === 'reward-redeemed') {
          this.onChannelPointMessage(dataMessage);
        } else if (dataMessage.type === 'community-goal-contribution' || dataMessage.type === 'community-goal-updated') {
          this.onCommunityGoalMessage(dataMessage);
        }
      } else if (data.type == 'MESSAGE' && data.data.topic.startsWith('hype-train-events-v1.')) {
        this.onHypeTrainMessage(JSON.parse(data.data.message));
      }
    }
  }

  /**
   * Handle event messages from twitch pubsub websocket for channel points.
   * @param {Object} message twitch channel point data
   */
  onChannelPointMessage(message) {
    // Check if tracking reward
    var reward = message.data.redemption.reward.title;
    var onChannelPointTriggers = [];
    if (this.rewards.indexOf(reward) !== -1) {

      // Grab data to return
      var user = message.data.redemption.user.display_name;
      var input = '';
      if ('undefined' !== typeof(message.data.redemption.user_input)) {
        input = message.data.redemption.user_input;
      }

      // Handle triggers
      onChannelPointTriggers.push(...this.rewardsTrigger[reward]);
    }
    if (this.rewards.indexOf('*') !== -1) {
      // Grab data to return
      var user = message.data.redemption.user.display_name;
      var input = '';
      if ('undefined' !== typeof(message.data.redemption.user_input)) {
        input = message.data.redemption.user_input;
      }

      // Handle triggers
      onChannelPointTriggers.push(...this.rewardsTrigger['*']);
    }
    if (onChannelPointTriggers.length > 0) {
      onChannelPointTriggers.sort((a,b) => a-b);
      onChannelPointTriggers.forEach(triggerId => {
        controller.handleData(triggerId, {
          reward: reward,
          user: user,
          message: input,
          data: message
        });
      });
    }
  }

  /**
   * Handle event messages from twitch pubsub websocket for community goals.
   * @param {Object} message twitch community goal data
   */
  onCommunityGoalMessage(message) {
    if (message.type === 'community-goal-contribution') {
      // Check if tracking goal
      var goal = message.data.contribution.goal.title;
      var goalTriggers = [];
      if (this.goals.indexOf(goal) !== -1) {
        // Handle triggers
        goalTriggers.push(...this.goalsTrigger[goal]);
      }
      if (this.goals.indexOf('*') !== -1) {
        goalTriggers.push(...this.goalsTrigger['*']);
      }
      if (this.complete.indexOf(goal) !== -1) {
        if (message.data.contribution.goal.status === 'ENDED' && message.data.contribution.goal.goal_amount === message.data.contribution.goal.points_contributed) {
          // Handle triggers
          goalTriggers.push(...this.completeTrigger[goal]);
        }
      }
      if (this.complete.indexOf('*') !== -1) {
        if (message.data.contribution.goal.status === 'ENDED' && message.data.contribution.goal.goal_amount === message.data.contribution.goal.points_contributed) {
          // Handle triggers
          goalTriggers.push(...this.completeTrigger['*']);
        }
      }
      if (goalTriggers.length > 0) {
        goalTriggers.sort((a,b) => a-b);
        goalTriggers.forEach(triggerId => {
          controller.handleData(triggerId, {
            goal: goal,
            user: message.data.contribution.user.display_name,
            amount: message.data.contribution.amount,
            user_total: message.data.contribution.total_contribution,
            progress: message.data.contribution.goal.points_contributed,
            total: message.data.contribution.goal.goal_amount,
            data: message
          });
        });
      }
    } else if (message.type === 'community-goal-updated') {
      var goal = message.data.community_goal.title;
      var goalTriggers = [];
      if (this.start.indexOf(goal) !== -1) {
        if (message.data.community_goal.status === 'STARTED' && message.data.community_goal.points_contributed === 0) {
          // Handle triggers
          goalTriggers.push(...this.startTrigger[goal]);
        }
      }
      if (this.start.indexOf('*') !== -1) {
        if (message.data.community_goal.status === 'STARTED' && message.data.community_goal.points_contributed === 0) {
          // Handle triggers
          goalTriggers.push(...this.startTrigger['*']);
        }
      }
      if (goalTriggers.length > 0) {
        goalTriggers.sort((a,b) => a-b);
        goalTriggers.forEach(triggerId => {
          controller.handleData(triggerId, {
            goal: goal,
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
        'BITS': ''
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
          cheer_conductor_id: this.currentConductor['BITS'],
          data: message.data
        });
      });
    } else if (message.type === 'hype-train-conductor-update') {
      // Handle triggers
      this.currentConductor[message.data.source] = message.data.user.id;
      this.hypeTrainsTrigger['conductor'].forEach(triggerId => {
        controller.handleData(triggerId, {
          sub_conductor_id: this.currentConductor['SUBS'],
          cheer_conductor_id: this.currentConductor['BITS'],
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
    } else if (message.type === 'hype-train-cooldown-expiration') {
      this.hypeTrainsTrigger['cooldown'].forEach(triggerId => {
        controller.handleData(triggerId);
      });
    }
  }
}

/**
 * Create a handler
 */
async function twitchHandlerExport() {
  var twitch = new TwitchHandler();
  var user = await readFile('settings/twitch/user.txt');
  var id = await getIdFromUser(user.trim());
  twitch.init(id.trim());
}
twitchHandlerExport();
