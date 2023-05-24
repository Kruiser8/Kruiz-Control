class TwitchHandler extends Handler {
  /**
   * Create a new Timer handler.
   */
  constructor() {
    super('Twitch', ['OnChannelPoint', 'OnCommunityGoalStart', 'OnCommunityGoalProgress', 'OnCommunityGoalComplete', 'OnHypeTrainStart', 'OnHypeTrainEnd', 'OnHypeTrainLevel', 'OnHypeTrainProgress', 'OnHypeTrainConductor', 'OnHypeTrainCooldownExpired', 'OnTWChannelUpdate', 'OnTWFollow', 'OnTWSub', 'OnTWSubEnd', 'OnTWSubGift', 'OnTWSubMessage', 'OnTWCheer', 'OnTWRaid', 'OnTWBan', 'OnTWTimeout', 'OnTWUnban', 'OnTWModAdd', 'OnTWModRemove', 'OnTWChannelPoint', 'OnTWChannelPointCompleted', 'OnTWChannelPointRejected', 'OnTWPoll', 'OnTWPollUpdate', 'OnTWPollEnd', 'OnTWPrediction', 'OnTWPredictionUpdate', 'OnTWPredictionLock', 'OnTWPredictionEnd', 'OnTWHypeTrainStart', 'OnTWHypeTrainProgress', 'OnTWHypeTrainEnd', 'OnTWCharityDonation', 'OnTWCharityStarted', 'OnTWCharityProgress', 'OnTWCharityStopped', 'OnTWShieldStarted', 'OnTWShieldStopped', 'OnTWShoutout', 'OnTWShoutoutReceived', 'OnTWGoalStarted', 'OnTWGoalProgress', 'OnTWGoalCompleted', 'OnTWGoalFailed', 'OnTWStreamStarted', 'OnTWStreamStopped']);
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

    this.eventSubs = [];
    this.eventSubTrigger = {};

    this.init.bind(this);
    this.onMessage.bind(this);
    this.onChannelPointMessage.bind(this);
    this.onCommunityGoalMessage.bind(this);
    this.onHypeTrainMessage.bind(this);
    this.onEventMessage.bind(this);
    this.initializePoll.bind(this);
    this.initializePrediction.bind(this);
  }

  /**
   * Initialize the oauth tokens
   */
  async init(user, clientId, clientSecret, code, channelId) {
    connectPubSubWebsocket(channelId, this.onMessage.bind(this));
    this.user = user;
    this.channelId = channelId;
    this.initializePoll();
    this.initializePrediction();
    var accessToken = await IDBService.get('CUTWAT');
    var refreshToken = await IDBService.get('CUTWRT');

    this.api = new TwitchAPI(clientId, clientSecret, code, accessToken, refreshToken, this.updateTokens);
    var initClientId = await IDBService.get('INTWC');
    var initClientSecret = await IDBService.get('INTWCS');
    var initCode = await IDBService.get('INTWCD');
    if (clientId != initClientId || clientSecret != initClientSecret || code != initCode) {
      var { accessToken: newAccessToken, refreshToken: newRrefreshToken } = await this.api.requestAuthToken();
      accessToken = newAccessToken;
      refreshToken = newRrefreshToken;
      this.updateTokens(clientId, clientSecret, code, accessToken, refreshToken, true);
    } else {
      await this.api.getChannelInformation(this.channelId);
      accessToken = await IDBService.get('CUTWAT');
      refreshToken = await IDBService.get('CUTWRT');
    }
    await connectEventSubWebsocket(this.channelId, clientId, clientSecret, accessToken, refreshToken, this.onEventMessage.bind(this));
    this.success();
  }

  updateTokens(clientId, clientSecret, code, accessToken, refreshToken, updateInitial) {
    if (updateInitial) {
      IDBService.set('INTWC', clientId);
      IDBService.set('INTWCS', clientSecret);
      IDBService.set('INTWCD', code);
    }
    IDBService.set('CUTWC', clientId);
    IDBService.set('CUTWCS', clientSecret);
    IDBService.set('CUTWCD', code);
    IDBService.set('CUTWAT', accessToken);
    IDBService.set('CUTWRT', refreshToken);
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
      default:
        if (this.eventSubs.indexOf(trigger) === -1) {
          this.eventSubs.push(trigger);
          this.eventSubTrigger[trigger] = [];
        }
        this.eventSubTrigger[trigger].push(triggerId);
    }
    return;
  }

  /**
   * Handle a message from the twitch pubsub.
   * @param {object} message twitch pubsub message
   */
  onMessage(message) {
    if (Debug.All || Debug.Twitch) {
      console.error('Twitch PubSub Message: ' + JSON.stringify(message));
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
    var reward_id = message.data.redemption.reward.id;
    var redemption_id = message.data.redemption.id;
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
          reward_id,
          redemption_id,
          reward,
          user,
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
  onHypeTrainMessage(message) {
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

  /**
   * Handle a message from the twitch eventsub.
   * @param {object} event twitch eventsub event
   * @param {object} subscription twitch eventsub subscription
   */
  onEventMessage(event, subscription) {
    if (Debug.All || Debug.Twitch) {
      console.error('Twitch EventSub Event: ' + JSON.stringify(event));
      console.error('Twitch EventSub Subscription: ' + JSON.stringify(subscription));
    }

    switch (subscription.type) {
      case 'channel.update':
        this.eventSubTrigger['ontwchannelupdate']?.forEach(triggerId => {
          controller.handleData(triggerId, {
            data: event,
            name: event.broadcaster_user_name,
            game: event.category_name,
            title: event.title,
          });
        });
        break;
      case 'channel.follow':
        this.eventSubTrigger['ontwfollow']?.forEach(triggerId => {
          controller.handleData(triggerId, {
            data: event,
            id: event.user_id,
            login: event.user_login,
            name: event.user_name
          });
        });
        break;
      case 'channel.subscribe':
        this.eventSubTrigger['ontwsub']?.forEach(triggerId => {
          controller.handleData(triggerId, {
            data: event,
            id: event.user_id,
            login: event.user_login,
            name: event.user_name,
            tier: event.tier === 'Prime' ? 'Prime' : (parseInt(event.tier) / 1000),
            is_gift: event.is_gift
          });
        });
        break;
      case 'channel.subscribe.gift':
        this.eventSubTrigger['ontwsubgift']?.forEach(triggerId => {
          controller.handleData(triggerId, {
            data: event,
            id: event.user_id,
            login: event.user_login,
            name: event.user_name,
            tier: (parseInt(event.tier) / 1000),
            amount: event.total,
            total_gifts: event.cumulative_total,
            is_anonymous: event.is_anonymous
          });
        });
        break;
      case 'channel.subscribe.message':
        this.eventSubTrigger['ontwsubmessage']?.forEach(triggerId => {
          controller.handleData(triggerId, {
            data: event,
            id: event.user_id,
            login: event.user_login,
            name: event.user_name,
            tier: event.tier === 'Prime' ? 'Prime' : (parseInt(event.tier) / 1000),
            message: event.message.text,
            months: event.cumulative_months,
            streak: event.streak_months
          });
        });
        break;
      case 'channel.cheer':
        this.eventSubTrigger['ontwcheer']?.forEach(triggerId => {
          controller.handleData(triggerId, {
            data: event,
            id: event.user_id,
            login: event.user_login,
            name: event.user_name,
            is_anonymous: event.is_anonymous,
            message: event.message,
            amount: events.bits
          });
        });
        break;
      case 'channel.raid':
        this.eventSubTrigger['ontwraid']?.forEach(triggerId => {
          controller.handleData(triggerId, {
            data: event,
            id: event.from_broadcaster_user_id,
            login: event.from_broadcaster_user_login,
            name: event.from_broadcaster_user_name,
            raiders: events.viewers
          });
        });
        break;
      case 'channel.ban':
        if (event.is_permanent) {
          this.eventSubTrigger['ontwban']?.forEach(triggerId => {
            controller.handleData(triggerId, {
              data: event,
              id: event.user_id,
              login: event.user_login,
              name: event.user_name,
              mod: event.moderator_user_name,
              reason: event.reason
            });
          });
        } else {
          this.eventSubTrigger['ontwtimeout']?.forEach(triggerId => {
            controller.handleData(triggerId, {
              data: event,
              id: event.user_id,
              login: event.user_login,
              name: event.user_name,
              mod: event.moderator_user_name,
              reason: event.reason,
            });
          });
        }
        break;
      case 'channel.unban':
        this.eventSubTrigger['ontwunban']?.forEach(triggerId => {
          controller.handleData(triggerId, {
            data: event,
            id: event.user_id,
            login: event.user_login,
            name: event.user_name,
            mod: event.moderator_user_name
          });
        });
        break;
      case 'channel.moderator.add':
        this.eventSubTrigger['ontwmodadd']?.forEach(triggerId => {
          controller.handleData(triggerId, {
            data: event,
            id: event.user_id,
            login: event.user_login,
            name: event.user_name
          });
        });
        break;
      case 'channel.moderator.remove':
        this.eventSubTrigger['ontwmodremove']?.forEach(triggerId => {
          controller.handleData(triggerId, {
            data: event,
            id: event.user_id,
            login: event.user_login,
            name: event.user_name
          });
        });
        break;
      case 'channel.channel_points_custom_reward_redemption.add':
        this.eventSubTrigger['ontwchannelpoint']?.forEach(triggerId => {
          controller.handleData(triggerId, {
            data: event,
            id: event.user_id,
            login: event.user_login,
            name: event.user_name,
            reward: event.reward.title,
            redemption_id: event.id,
            reward_id: event.reward.id
          });
        });
        break;
      case 'channel.channel_points_custom_reward_redemption.update':
        if (event.status === 'fulfilled') {
          this.eventSubTrigger['ontwchannelpointcompleted']?.forEach(triggerId => {
            controller.handleData(triggerId, {
              data: event,
              id: event.user_id,
              login: event.user_login,
              name: event.user_name,
              reward: event.reward.title,
              redemption_id: event.id,
              reward_id: event.reward.id
            });
          });
        } else if (event.status === 'canceled') {
          this.eventSubTrigger['ontwchannelpointrejected']?.forEach(triggerId => {
            controller.handleData(triggerId, {
              data: event,
              id: event.user_id,
              login: event.user_login,
              name: event.user_name,
              reward: event.reward.title,
              redemption_id: event.id,
              reward_id: event.reward.id
            });
          });
        }
        break;
      case 'channel.poll.begin':
        this.eventSubTrigger['ontwpoll']?.forEach(triggerId => {
          var choiceArgs = {};
          for (var i = 0; i < event.choices.length; i++) {
            choiceArgs[`choice_id${i+1}`] = event.choices[i].id;
            choiceArgs[`choice${i+1}`] = event.choices[i].title;
          }
          var duration = Math.abs(new Date(event.ends_at).getTime() - new Date(event.started_at).getTime()) / 1000;
          controller.handleData(triggerId, {
            data: event,
            title: event.title,
            duration: duration,
            choice_count: event.choices.length,
            bits_enabled: event.bits_voting.is_enabled,
            bits_amount: event.bits_voting.amount_per_vote,
            points_enabled: event.channel_points_voting.is_enabled,
            points_amount: event.channel_points_voting.amount_per_vote,
            ...choiceArgs
          });
        });
        break;
      case 'channel.poll.progress':
        this.eventSubTrigger['ontwpollupdate']?.forEach(triggerId => {
          var choiceArgs = {};
          for (var i = 0; i < event.choices.length; i++) {
            choiceArgs[`choice_id${i+1}`] = event.choices[i].id;
            choiceArgs[`choice${i+1}`] = event.choices[i].title;
            choiceArgs[`choice_votes${i+1}`] = event.choices[i].votes;
          }
          var duration = Math.abs(new Date(event.ends_at).getTime() - new Date(event.started_at).getTime()) / 1000;
          var time_left = parseInt(Math.ceil(new Date(event.ends_at).getTime() - new Date().getTime()) / 1000);
          controller.handleData(triggerId, {
            data: event,
            title: event.title,
            duration: duration,
            time_left: time_left,
            choice_count: event.choices.length,
            bits_enabled: event.bits_voting.is_enabled,
            bits_amount: event.bits_voting.amount_per_vote,
            points_enabled: event.channel_points_voting.is_enabled,
            points_amount: event.channel_points_voting.amount_per_vote,
            ...choiceArgs
          });
        });
        break;
      case 'channel.poll.end':
        if (event.status === 'completed') {
          this.eventSubTrigger['ontwpollend']?.forEach(triggerId => {
            var choiceArgs = { votes: -1 };
            for (var i = 0; i < event.choices.length; i++) {
              choiceArgs[`choice_id${i+1}`] = event.choices[i].id;
              choiceArgs[`choice${i+1}`] = event.choices[i].title;
              choiceArgs[`choice_votes${i+1}`] = event.choices[i].votes;
              if (event.choices[i].votes > choiceArgs.votes) {
                choiceArgs.winner = event.choices[i].title;
                choiceArgs.votes = event.choices[i].votes;
              }
            }
            var duration = Math.abs(new Date(event.ended_at).getTime() - new Date(event.started_at).getTime()) / 1000;
            controller.handleData(triggerId, {
              data: event,
              title: event.title,
              duration: duration,
              choice_count: event.choices.length,
              bits_enabled: event.bits_voting.is_enabled,
              bits_amount: event.bits_voting.amount_per_vote,
              points_enabled: event.channel_points_voting.is_enabled,
              points_amount: event.channel_points_voting.amount_per_vote,
              ...choiceArgs
            });
          });
        }
        break;
      case 'channel.prediction.begin':
        this.eventSubTrigger['ontwprediction']?.forEach(triggerId => {
          var outcomeArgs = {};
          for (var i = 0; i < event.outcomes.length; i++) {
            outcomeArgs[`outcome_id${i+1}`] = event.outcomes[i].id;
            outcomeArgs[`outcome_color${i+1}`] = event.outcomes[i].color;
            outcomeArgs[`outcome${i+1}`] = event.outcomes[i].title;
          }
          var duration = Math.abs(new Date(event.locks_at).getTime() - new Date(event.started_at).getTime()) / 1000;
          controller.handleData(triggerId, {
            data: event,
            title: event.title,
            duration: duration,
            outcome_count: event.outcomes.length,
            ...outcomeArgs
          });
        });
        break;
      case 'channel.prediction.progress':
        this.eventSubTrigger['ontwpredictionupdate']?.forEach(triggerId => {
          var outcomeArgs = {};
          for (var i = 0; i < event.outcomes.length; i++) {
            outcomeArgs[`outcome_id${i+1}`] = event.outcomes[i].id;
            outcomeArgs[`outcome_color${i+1}`] = event.outcomes[i].color;
            outcomeArgs[`outcome_points${i+1}`] = event.outcomes[i].channel_points;
            outcomeArgs[`outcome_users${i+1}`] = event.outcomes[i].users;
            outcomeArgs[`outcome${i+1}`] = event.outcomes[i].title;
          }
          var duration = Math.abs(new Date(event.locks_at).getTime() - new Date(event.started_at).getTime()) / 1000;
          var time_left = parseInt(Math.ceil(new Date(event.ends_at).getTime() - new Date().getTime()) / 1000);
          controller.handleData(triggerId, {
            data: event,
            title: event.title,
            duration: duration,
            time_left: time_left,
            outcome_count: event.outcomes.length,
            ...outcomeArgs
          });
        });
        break;
      case 'channel.prediction.lock':
        this.eventSubTrigger['ontwpredictionlock']?.forEach(triggerId => {
          var outcomeArgs = {};
          for (var i = 0; i < event.outcomes.length; i++) {
            outcomeArgs[`outcome_id${i+1}`] = event.outcomes[i].id;
            outcomeArgs[`outcome_color${i+1}`] = event.outcomes[i].color;
            outcomeArgs[`outcome_points${i+1}`] = event.outcomes[i].channel_points;
            outcomeArgs[`outcome_users${i+1}`] = event.outcomes[i].users;
            outcomeArgs[`outcome${i+1}`] = event.outcomes[i].title;
          }
          controller.handleData(triggerId, {
            data: event,
            title: event.title,
            outcome_count: event.outcomes.length,
            ...outcomeArgs
          });
        });
        break;
      case 'channel.prediction.end':
        if (event.status === 'resolved') {
          this.eventSubTrigger['ontwpredictionend']?.forEach(triggerId => {
            var outcomeArgs = {};
            for (var i = 0; i < event.outcomes.length; i++) {
              outcomeArgs[`outcome_id${i+1}`] = event.outcomes[i].id;
              outcomeArgs[`outcome_color${i+1}`] = event.outcomes[i].color;
              outcomeArgs[`outcome_points${i+1}`] = event.outcomes[i].channel_points;
              outcomeArgs[`outcome_users${i+1}`] = event.outcomes[i].users;
              outcomeArgs[`outcome${i+1}`] = event.outcomes[i].title;

              if (event.outcomes[i].id === event.winning_outcome_id) {
                outcomeArgs.result = event.outcomes[i].title;
              }
            }
            controller.handleData(triggerId, {
              data: event,
              title: event.title,
              outcome_count: event.outcomes.length,
              ...outcomeArgs
            });
          });
        }
        break;
      case 'channel.hype_train.begin':
        this.eventSubTrigger['ontwhypetrainstart']?.forEach(triggerId => {
          var conductorArgs = {};
          if (event.top_contributions) {
            event.top_contributions.forEach(contribution => {
              if (contribution.type === 'bits') {
                conductorArgs.bit_conductor = contribution.user_name;
              } else if (contribution.type === 'subscription') {
                conductorArgs.sub_conductor = contribution.user_name;
              }
            })
          }
          controller.handleData(triggerId, {
            data: event,
            level: event.level,
            progress: event.total,
            goal: event.goal,
            ...conductorArgs
          });
        });
        break;
      case 'channel.hype_train.progress':
        this.eventSubTrigger['ontwhypetrainprogress']?.forEach(triggerId => {
          var conductorArgs = {};
          if (event.top_contributions) {
            event.top_contributions.forEach(contribution => {
              if (contribution.type === 'bits') {
                conductorArgs.bit_conductor = contribution.user_name;
              } else if (contribution.type === 'subscription') {
                conductorArgs.sub_conductor = contribution.user_name;
              }
            })
          }
          controller.handleData(triggerId, {
            data: event,
            level: event.level,
            progress: event.total,
            goal: event.goal,
            ...conductorArgs
          });
        });
        break;
      case 'channel.hype_train.end':
        this.eventSubTrigger['ontwhypetrainend']?.forEach(triggerId => {
          var conductorArgs = {};
          if (event.top_contributions) {
            event.top_contributions.forEach(contribution => {
              if (contribution.type === 'bits') {
                conductorArgs.bit_conductor = contribution.user_name;
              } else if (contribution.type === 'subscription') {
                conductorArgs.sub_conductor = contribution.user_name;
              }
            })
          }
          controller.handleData(triggerId, {
            data: event,
            level: event.level,
            ...conductorArgs
          });
        });
        break;
      case 'channel.charity_campaign.donate':
        this.eventSubTrigger['ontwcharitydonation']?.forEach(triggerId => {
          var amount = event.amount.decimal_places > 0
              ? event.amount.value / Math.pow(10, event.amount.decimal_places)
              : event.amount.value;
          controller.handleData(triggerId, {
            data: event,
            id: event.user_id,
            login: event.user_login,
            name: event.user_name,
            charity: event.charity_name,
            description: event.charity_description,
            website: event.charity_website,
            amount: amount
          });
        });
        break;
      case 'channel.charity_campaign.start':
        this.eventSubTrigger['ontwcharitystarted']?.forEach(triggerId => {
          var current = event.current.decimal_places > 0
              ? event.current.value / Math.pow(10, event.current.decimal_places)
              : event.current.value;
          var target = event.target.decimal_places > 0
              ? event.target.value / Math.pow(10, event.target.decimal_places)
              : event.target.value;
          controller.handleData(triggerId, {
            data: event,
            charity: event.charity_name,
            description: event.charity_description,
            website: event.charity_website,
            current: current,
            target: target
          });
        });
        break;
      case 'channel.charity_campaign.progress':
        this.eventSubTrigger['ontwcharityprogress']?.forEach(triggerId => {
          var current = event.current.decimal_places > 0
              ? event.current.value / Math.pow(10, event.current.decimal_places)
              : event.current.value;
          var target = event.target.decimal_places > 0
              ? event.target.value / Math.pow(10, event.target.decimal_places)
              : event.target.value;
          controller.handleData(triggerId, {
            data: event,
            charity: event.charity_name,
            description: event.charity_description,
            website: event.charity_website,
            current: current,
            target: target
          });
        });
        break;
      case 'channel.charity_campaign.stop':
        this.eventSubTrigger['ontwcharitystopped']?.forEach(triggerId => {
          var current = event.current.decimal_places > 0
              ? event.current.value / Math.pow(10, event.current.decimal_places)
              : event.current.value;
          var target = event.target.decimal_places > 0
              ? event.target.value / Math.pow(10, event.target.decimal_places)
              : event.target.value;
          controller.handleData(triggerId, {
            data: event,
            charity: event.charity_name,
            description: event.charity_description,
            website: event.charity_website,
            current: current,
            target: target
          });
        });
        break;
      case 'channel.shield_mode.begin':
        this.eventSubTrigger['ontwshieldstarted']?.forEach(triggerId => {
          controller.handleData(triggerId, {
            data: event,
            mod: event.moderator_user_name,
            mod_id: event.moderator_user_id,
            mod_login: event.moderator_user_login,
          });
        });
        break;
      case 'channel.shield_mode.end':
        this.eventSubTrigger['ontwshieldstopped']?.forEach(triggerId => {
          controller.handleData(triggerId, {
            data: event,
            mod: event.moderator_user_name,
            mod_id: event.moderator_user_id,
            mod_login: event.moderator_user_login,
          });
        });
        break;
      case 'channel.shoutout.create':
        this.eventSubTrigger['ontwshoutout']?.forEach(triggerId => {
          controller.handleData(triggerId, {
            data: event,
            mod: event.moderator_user_name,
            id: event.to_broadcaster_user_id,
            login: event.to_broadcaster_user_login,
            name: event.to_broadcaster_user_name,
            viewers: event.viewer_count
          });
        });
        break;
      case 'channel.shoutout.receive':
        this.eventSubTrigger['ontwshoutoutreceived']?.forEach(triggerId => {
          controller.handleData(triggerId, {
            data: event,
            id: event.from_broadcaster_user_id,
            login: event.from_broadcaster_user_login,
            name: event.from_broadcaster_user_name,
            viewers: event.viewer_count
          });
        });
        break;
      case 'channel.goal.begin':
        this.eventSubTrigger['ontwgoalstarted']?.forEach(triggerId => {
          controller.handleData(triggerId, {
            data: event,
            type: event.type,
            description: event.description,
            current: event.current_amount,
            target: event.target_amount
          });
        });
        break;
      case 'channel.goal.progress':
        this.eventSubTrigger['ontwgoalprogress']?.forEach(triggerId => {
          controller.handleData(triggerId, {
            data: event,
            type: event.type,
            description: event.description,
            current: event.current_amount,
            target: event.target_amount
          });
        });
        break;
      case 'channel.goal.end':
        if (event.is_achieved) {
          this.eventSubTrigger['ontwgoalcompleted']?.forEach(triggerId => {
            controller.handleData(triggerId, {
              data: event,
              type: event.type,
              description: event.description,
              current: event.current_amount,
              target: event.target_amount,
            });
          });
        } else {
          this.eventSubTrigger['ontwgoalfailed']?.forEach(triggerId => {
            controller.handleData(triggerId, {
              data: event,
              type: event.type,
              description: event.description,
              current: event.current_amount,
              target: event.target_amount,
            });
          });
        }
        break;
      case 'stream.online':
        if (event.type === 'live') {
          this.eventSubTrigger['ontwstreamstarted']?.forEach(triggerId => {
            controller.handleData(triggerId, {
              data: event
            });
          });
        }
        break;
      case 'stream.offline':
        this.eventSubTrigger['ontwstreamstopped']?.forEach(triggerId => {
          controller.handleData(triggerId, {
            data: event
          });
        });
        break;
    }
  }

  /**
   * Handle the input data (take an action).
   * @param {array} triggerData contents of trigger line
   * @param {array} parameters current trigger parameters
   */
  async handleData(triggerData, parameters) {
    var action = Parser.getAction(triggerData, 'Twitch');
    switch (action) {
      case 'addblockedterm':
        var { terms } = Parser.getInputs(triggerData, ['action', 'terms'], true);
        for (var i = 0; i < terms.length; i++) {
          await this.api.addBlockedTerm(this.channelId, this.channelId, terms[i]);
        }
        break;
      case 'announcement':
        var { message, color = 'primary' } = Parser.getInputs(triggerData, ['action', 'message', 'color'], false, 1);
        color = color.toLowerCase();

        var colors = ['blue', 'green', 'orange', 'purple', 'primary'];
        if (colors.indexOf(color) === -1) {
          console.error(`Invalid color value for Twitch Announcement. Found "${color}", expected one of "${colors.join('", "')}".`)
          color = 'primary';
        }
        await this.api.sendChatAnnouncement(this.channelId, this.channelId, { message, color });
        break;
      case 'authenticate':
        return {
          auth_url: this.api.getAuthUrl()
        };
        break;
      case 'ban':
        var { user } = Parser.getInputs(triggerData, ['action', 'user', 'duration', 'reason'], false, 2);

        var user_id = await getIdFromUser(user);

        await this.api.banUser(this.channelId, this.channelId, { user_id });
        break;
      case 'bitsleaderboard':
        var { count = 10, period = 'all' } = Parser.getInputs(triggerData, ['action', 'count', 'period'], false, 2);
        period = period.toLowerCase();

        var periods = [
          'day',
          'week',
          'month',
          'year',
          'all'
        ];
        if (periods.indexOf(period) === -1) {
          console.error(`Invalid period value for Twitch BitsLeaderboard. Found "${period}", expected one of "${periods.join('", "')}".`)
          period = 'all';
        }

        var data = {
          count,
          period
        };

        if (period != 'all') {
          // RFC 3339 format
          var date = new Date();

          if (period === 'day') {
            date.setDate(d.getDate()-1);
          } else if (period === 'week') {
            date.setDate(d.getDate()-7);
          } else if (period === 'month') {
            date.setMonth(date.getMonth()-1);
          } else if (period === 'year') {
            date.setFullYear(date.getFullYear()-1);
          }

          data['started_at'] = date.toISOString();
        }

        var response = await this.api.getBitsLeaderboard(data);
        var userArgs = {};
        for (var i = 0; i < response.data.length; i++) {
          userArgs[`user${i+1}`] = response.data[i]['user_name'];
          userArgs[`bits${i+1}`] = response.data[i]['score'];
        }
        return {
          data: response,
          user_count: response.data.length,
          ...userArgs
        };
        break;
      case 'block':
        var { user } = Parser.getInputs(triggerData, ['action', 'user']);

        var user_id = await getIdFromUser(user);

        await this.api.blockUser(user_id);
        break;
      case 'channelinfo':
        var { user = this.user } = Parser.getInputs(triggerData, ['action', 'user' ], false, 1);

        var channelId = this.channelId;
        if (user !== this.user) {
          channelId = await getIdFromUser(user);
        }

        var response = await this.api.getChannelInformation(channelId);
        if (response?.data) {
          var tagArgs = {};
          for (var i = 0; i < response.data[0].tags.length; i++) {
            tagArgs[`tag${i+1}`] = response.data[0].tags[i];
          }
          return {
            data: response,
            name: response.data[0].broadcaster_name,
            game: response.data[0].game_name,
            language: response.data[0].broadcaster_language,
            title: response.data[0].title,
            tag_count: response.data[0].tags.length,
            ...tagArgs
          };
        }
        break;
      case 'chatters':
        var chatters = await this.api.getAllChatters(this.channelId, this.channelId);

        var userArgs = {};
        for (var i = 0; i < chatters.length; i++) {
          userArgs[`user${i+1}`] = chatters[i].user_name;
        }

        return {
          data: response,
          chatter_count: chatters.length,
          ...userArgs
        }
        break;
      case 'chatterspaginated':
        var { first, cursor = '' } = Parser.getInputs(triggerData, ['action', 'first', 'cursor'], false, 1);

        if (isNumeric(first)) {
          first = clamp(parseInt(first), 1, 1000);
        } else {
          first = 100;
        }

        var response = await this.api.getChatters(this.channelId, this.channelId, first, cursor);
        var userArgs = {};
        for (var i = 0; i < response.data.length; i++) {
          userArgs[`user${i+1}`] = response.data[i].user_name;
        }

        return {
          data: response,
          chatter_count: response.data.length,
          cursor: response.pagination.cursor || '',
          ...userArgs
        }
        break;
      case 'clearchat':
        await this.api.deleteChatMessages(this.channelId, this.channelId, '');
        break;
      case 'clipbyid':
        var { id } = Parser.getInputs(triggerData, ['action', 'id']);

        var response = await this.api.getClipsById(id);
        if (response?.data) {
          return {
            data: response,
            clip: response.data[0].url,
            name: response.data[0].title,
            duration: response.data[0].duration
          }
        }
        break;
      case 'clipsbyuser':
        var { user, limit = 20 } = Parser.getInputs(triggerData, ['action', 'user', 'limit' ], false, 2);

        var first = 20;
        if (isNumeric(limit)) {
          first = clamp(parseInt(limit), 1, 100);
        }

        var channelId = this.channelId;
        if (user !== this.user) {
          channelId = await getIdFromUser(user);
        }

        var response = await this.api.getClipsByBroadcasterId(channelId, first);
        if (response?.data) {
          var clipArgs = {};
          for (var i = 0; i < response.data.length; i++) {
            clipArgs[`clip${i+1}`] = response.data[i].url;
            clipArgs[`name${i+1}`] = response.data[i].title;
            clipArgs[`duration${i+1}`] = response.data[i].duration;
          }
          return {
            data: response,
            clip_count: response.data.length,
            ...clipArgs
          }
        }
        break;
      case 'color':
        var { color } = Parser.getInputs(triggerData, ['action', 'color']);

        color = color.toLowerCase();
        colors = ['blue', 'blue_violet', 'cadet_blue', 'chocolate', 'coral', 'dodger_blue', 'firebrick', 'golden_rod', 'green', 'hot_pink', 'orange_red', 'red', 'sea_green', 'spring_green', 'yellow_green'];
        if (!(/^#[0-9A-F]{6}$/i.test(color)) && colors.indexOf(color) === -1) {
          console.error(`Invalid color value for Twitch Color. Found "${color}", expected a hex code or one of "${colors.join('", "')}".`)
          return;
        }
        await this.api.updateUserChatColor(this.channelId, color);
        break;
      case 'commercial':
        var { duration = 60 } = Parser.getInputs(triggerData, ['action', 'duration'], false, 1);

        var data = { broadcaster_id: this.channelId, duration: 60 };
        if (isNumeric(duration)) {
          data['duration'] = clamp(parseInt(duration), 1, 180);
        }
        await this.api.startCommercial(data);
        break;
      case 'complete':
        var { reward_id, redemption_id } = Parser.getInputs(triggerData, ['action', 'reward_id', 'redemption_id']);
        await this.api.updateRedemptionStatus(this.channelId, reward_id, redemption_id, 'FULFILLED');
        break;
      case 'copy':
        var { reward } = Parser.getInputs(triggerData, ['action', 'reward']);
        var response = await this.api.getCustomReward(this.channelId);
        if (response?.data) {
          for (var i = 0; i < response.data.length; i++) {
            var customReward = response.data[i];
            if (customReward.title === reward) {
              var data = {
                "title": `kc_${customReward.title}`,
                "cost": customReward.cost,
                "prompt": customReward.prompt,
                "is_enabled": false,
                "background_color": customReward.background_color,
                "is_user_input_required": customReward.is_user_input_required,
                "is_max_per_stream_enabled": customReward.max_per_stream_setting.is_enabled,
                "max_per_stream": customReward.max_per_stream_setting.max_per_stream,
                "is_max_per_user_per_stream_enabled": customReward.max_per_user_per_stream_setting.is_enabled,
                "max_per_user_per_stream": customReward.max_per_user_per_stream_setting.max_per_user_per_stream,
                "is_global_cooldown_enabled": customReward.global_cooldown_setting.is_enabled,
                "global_cooldown_seconds": customReward.global_cooldown_setting.global_cooldown_seconds,
                "should_redemptions_skip_request_queue": customReward.should_redemptions_skip_request_queue,
              }
              await this.api.createCustomRewards(this.channelId, data);
              return;
            }
          }
        }
        break;
      case 'createclip':
        var { delay = "false" } = Parser.getInputs(triggerData, ['action', 'delay' ], false, 1);
        var should_delay = false;
        if (delay.toLowerCase() === 'true') {
          should_delay = true;
        }
        await this.api.createClip(this.channelId, should_delay);
        break;
      case 'deletemessage':
        var { message_id } = Parser.getInputs(triggerData, ['action', 'message_id']);
        if (message_id !== '') {
          await this.api.deleteChatMessages(this.channelId, this.channelId, message_id);
        }
        break;
      case 'description':
        var { description } = Parser.getInputs(triggerData, ['action', 'description']);

        await this.api.updateUser(description);
        break;
      case 'emoteonly':
        await this.api.updateChatSettings(this.channelId, this.channelId, {
          emote_mode: true
        });
        break;
      case 'emoteonlyoff':
        await this.api.updateChatSettings(this.channelId, this.channelId, {
          emote_mode: false
        });
        break;
      case 'emotes':
        var { user = this.user } = Parser.getInputs(triggerData, ['action', 'user'], false, 1);
        var channelId = this.channelId;
        if (user !== this.user) {
          channelId = await getIdFromUser(user);
        }

        var response = await this.api.getChannelEmotes(channelId);
        var emoteArgs = {};
        for (var i = 0; i < response.data.length; i++) {
          emoteArgs[`emote${i+1}`] = response.data[i].name;
        }

        return {
          data: response,
          emote_count: response.data.length,
          ...emoteArgs
        }
        break;
      case 'followcount':
        var { user = this.user } = Parser.getInputs(triggerData, ['action', 'user' ], false, 1);

        var channelId = this.channelId;
        if (user !== this.user) {
          userId = await getIdFromUser(user);
          if (userId) {
            channelId = userId;
          }
        }

        var response = await this.api.getChannelFollowers(channelId);
        if (isNumeric(response?.total)) {
          return {
            data: response,
            follow_count: response.total
          };
        }
        break;
      case 'followers':
        var { duration = 0 } = Parser.getInputs(triggerData, ['action', 'duration'], false, 1);

        var follower_mode_duration = 0;
        if (isNumeric(duration)) {
          follower_mode_duration = parseInt(duration);
        }
        follower_mode_duration = clamp(follower_mode_duration, 0, 129600);

        await this.api.updateChatSettings(this.channelId, this.channelId, {
          follower_mode: true,
          follower_mode_duration
        });
        break;
      case 'followersoff':
        await this.api.updateChatSettings(this.channelId, this.channelId, {
          follower_mode: false
        });
        break;
      case 'game':
        var { game } = Parser.getInputs(triggerData, ['action', 'game']);
        var game_id = await this.api.getGameId(game);
        await this.api.modifyChannelInformation(this.channelId, { game_id });
        break;
      case 'goals':
        var response = await this.api.getCreatorGoals(this.channelId);

        if (response?.data) {
          var goalArgs = {};
          for (var i = 0; i < response.data.length; i++) {
            goalArgs[`goal${i+1}`] = response.data[i].description;
            goalArgs[`type${i+1}`] = response.data[i].type;
            goalArgs[`current${i+1}`] = response.data[i].current_amount;
            goalArgs[`target${i+1}`] = response.data[i].target_amount;
            goalArgs[`perc${i+1}`] = Math.floor(response.data[i].current_amount * 100 / response.data[i].target_amount);
          }
          return {
            data: response,
            goal_count: response.data.length,
            ...goalArgs
          };
        }
        break;
      case 'isfollower':
        var { user } = Parser.getInputs(triggerData, ['action', 'user']);
        var userId = await getIdFromUser(user);

        if (!userId) {
          throw new Error(`Unable to get id for user: ${user}`);
        }

        var response = await this.api.getChannelFollowers(this.channelId, userId);

        return {
          data: response,
          is_follower: response?.data && response.data.length > 0
        }
        break;
      case 'isshieldmode':
        var response = await this.api.getShieldModeStatus(this.channelId, this.channelId);
        if (response?.data) {
          return {
            data: response,
            is_shield_mode: response.data[0].is_active
          }
        }
        break;
      case 'issubscriber':
        var { user } = Parser.getInputs(triggerData, ['action', 'user']);
        var userId = await getIdFromUser(user);

        if (!userId) {
          throw new Error(`Unable to get id for user: ${user}`);
        }

        var response = await this.api.getBroadcasterSubscriptions(this.channelId, userId);

        return {
          data: response,
          is_subscriber: response?.data && response.data.length > 0,
          is_gifted: response.data[0].is_gift,
          gifter: response.data[0].gifter_name,
          tier: response.data[0].tier === 'Prime' ? 'Prime' : (parseInt(response.data[0].tier) / 1000),
        }
        break;
      case 'marker':
        var { description = '' } = Parser.getInputs(triggerData, ['action', 'description'], false, 1);
        await this.api.createStreamMarker(this.channelId, description);
        break;
      case 'mod':
        var { user } = Parser.getInputs(triggerData, ['action', 'user']);

        var user_id = await getIdFromUser(user);

        await this.api.addChannelModerator(this.channelId, user_id);
        break;
      case 'mods':
        var moderators = await this.api.getAllModerators(this.channelId);
        var modArgs = {};
        for (var i = 0; i < moderators.length; i++) {
          modArgs[`id${i+1}`] = moderators[i].user_login;
          modArgs[`mod${i+1}`] = moderators[i].user_name;
        }
        return {
          mod_count: moderators.length,
          ...modArgs
        };
        break;
      case 'poll':
        return await this.handlePoll(triggerData);
        break;
      case 'prediction':
        return await this.handlePrediction(triggerData);
        break;
      case 'raid':
        var { user } = Parser.getInputs(triggerData, ['action', 'user']);

        var user_id = await getIdFromUser(user);

        await this.api.startARaid(this.channelId, user_id);
        break;
      case 'reject':
        var { reward_id, redemption_id } = Parser.getInputs(triggerData, ['action', 'reward_id', 'redemption_id']);
        await this.api.updateRedemptionStatus(this.channelId, reward_id, redemption_id, 'CANCELED');
        break;
      case 'removeblockedterm':
        var { terms } = Parser.getInputs(triggerData, ['action', 'terms'], true);

        for (var i = 0; i < terms.length; i++) {
          var term_id = await this.api.getBlockedTermId(this.channelId, this.channelId, terms[i]);
          if (term_id === undefined) {
            console.error(`Unable to find blocked term: ${terms[i]}`);
            continue;
          }

          await this.api.removeBlockedTerm(this.channelId, this.channelId, term_id);
        }
        break;
      case 'reward':
        var { reward, status } = Parser.getInputs(triggerData, ['action', 'reward', 'status']);

        status = status.toLowerCase();
        var statuses = ['off', 'on', 'pause', 'toggle', 'unpause'];
        if (statuses.indexOf(status) === -1) {
          console.error(`Invalid status value for Twitch Announcement. Found "${status}", expected one of "${statuses.join('", "')}".`)
          return;
        }

        var response = await this.api.getCustomReward(this.channelId);
        if (response?.data) {
          for (var i = 0; i < response.data.length; i++) {
            var customReward = response.data[i];
            if (customReward.title === reward) {
              switch (status) {
                case 'off':
                  await this.api.updateCustomReward(this.channelId, customReward.id, { is_enabled: false });
                  break;
                case 'on':
                  await this.api.updateCustomReward(this.channelId, customReward.id, { is_enabled: true });
                  break;
                case 'pause':
                  await this.api.updateCustomReward(this.channelId, customReward.id, { is_paused: true });
                  break;
                case 'toggle':
                  await this.api.updateCustomReward(this.channelId, customReward.id, { is_enabled: !customReward.is_enabled });
                  break;
                case 'unpause':
                  await this.api.updateCustomReward(this.channelId, customReward.id, { is_paused: false });
                  break;
              }
              return;
            }
          }
        }
        break;
      case 'shield':
        var { status } = Parser.getInputs(triggerData, ['action', 'status']);
        status = status.toLowerCase();

        var statuses = [
          'on',
          'off',
          'toggle'
        ];
        if (statuses.indexOf(status) === -1) {
          console.error(`Invalid status value for Twitch Shield. Found "${status}", expected one of "${statuses.join('", "')}".`)
          status = 'toggle';
        }

        if (status === 'toggle') {
          var response = await this.api.getShieldModeStatus(this.channelId, this.channelId);
          if (response?.data) {
            status = response.data[0].is_active ? false : true;
          }
        } else {
          status = status === 'on' ? true : false;
        }

        await this.api.updateShieldModeStatus(this.channelId, this.channelId, status);
        break;
      case 'shoutout':
        var { user } = Parser.getInputs(triggerData, ['action', 'user']);
        var user_id = await getIdFromUser(user);
        await this.api.sendShoutout(this.channelId, user_id, this.channelId);
        break;
      case 'slow':
        var { duration = 30 } = Parser.getInputs(triggerData, ['action', 'duration'], false, 1);

        var slow_mode_wait_time = 30;
        if (isNumeric(duration)) {
          slow_mode_wait_time = parseInt(duration);
        }
        slow_mode_wait_time = clamp(slow_mode_wait_time, 3, 120);

        await this.api.updateChatSettings(this.channelId, this.channelId, {
          slow_mode: true,
          slow_mode_wait_time
        });
        break;
      case 'slowoff':
        await this.api.updateChatSettings(this.channelId, this.channelId, {
          slow_mode: false
        });
        break;
      case 'streams':
        var streams = await this.api.getAllFollowedStreams(this.channelId);
        var streamArgs = {};
        for (var i = 0; i < streams.length; i++) {
          streamArgs[`id${i+1}`] = streams[i].user_login;
          streamArgs[`stream${i+1}`] = streams[i].user_name;
          streamArgs[`game${i+1}`] = streams[i].game_name;
        }
        return {
          stream_count: streams.length,
          ...streamArgs
        };
        break;
      case 'subcount':
        var response = await this.api.getBroadcasterSubscriptions(this.channelId);
        if (isNumeric(response?.total)) {
          return {
            data: response,
            sub_count: response.total,
            sub_points: response.points
          };
        }
        break;
      case 'subscribers':
        await this.api.updateChatSettings(this.channelId, this.channelId, {
          subscriber_mode: true
        });
        break;
      case 'subscribersoff':
        await this.api.updateChatSettings(this.channelId, this.channelId, {
          subscriber_mode: false
        });
        break;
      case 'tags':
        var { tags } = Parser.getInputs(triggerData, ['action', 'tags'], true);
        await this.api.modifyChannelInformation(this.channelId, { tags });
        break;
      case 'teams':
        var response = await this.api.getChannelTeams(this.channelId);

        if (response?.data) {
          var teamArgs = {};
          for (var i = 0; i < response.data.length; i++) {
            teamArgs[`team${i+1}`] = response.data[i].team_display_name;
          }
          return {
            team_count: response.data.length,
            ...teamArgs
          };
        }
        break;
      case 'timeout':
        var { user, duration = 1, reason = '' } = Parser.getInputs(triggerData, ['action', 'user', 'duration', 'reason'], false, 2);

        var user_id = await getIdFromUser(user);

        var data = { user_id, duration: 1 };
        if (isNumeric(duration)) {
          data['duration'] = clamp(parseInt(duration), 1, 1209600);
        }
        if (reason) {
          data['reason'] = reason;
        }
        await this.api.banUser(this.channelId, this.channelId, data);
        break;
      case 'title':
        var { title } = Parser.getInputs(triggerData, ['action', 'title']);
        await this.api.modifyChannelInformation(this.channelId, { title });
        break;
      case 'unban':
        var { user } = Parser.getInputs(triggerData, ['action', 'user']);
        var user_id = await getIdFromUser(user);
        await this.api.unbanUser(this.channelId, this.channelId, user_id);
        break;
      case 'unblock':
        var { user } = Parser.getInputs(triggerData, ['action', 'user']);

        var user_id = await getIdFromUser(user);

        await this.api.unblockUser(user_id);
        break;
      case 'uniquechat':
        await this.api.updateChatSettings(this.channelId, this.channelId, {
          unique_chat_mode: true
        });
        break;
      case 'uniquechatoff':
        await this.api.updateChatSettings(this.channelId, this.channelId, {
          unique_chat_mode: false
        });
        break;
      case 'unmod':
        var { user } = Parser.getInputs(triggerData, ['action', 'user']);

        var user_id = await getIdFromUser(user);

        await this.api.removeChannelModerator(this.channelId, user_id);
        break;
      case 'unraid':
        await this.api.cancelARaid(this.channelId);
        break;
      case 'unvip':
        var { user } = Parser.getInputs(triggerData, ['action', 'user']);

        var user_id = await getIdFromUser(user);

        await this.api.removeChannelVIP(this.channelId, user_id);
        break;
      case 'usercolor':
        var { user } = Parser.getInputs(triggerData, ['action', 'user']);

        var user_id = await getIdFromUser(user);

        var response = await this.api.getUserChatColor(user_id);
        if (response?.data) {
          return {
            data: response,
            color: response.data[0].color,
            name: response.data[0].user_name
          }
        }
        break;
      case 'videos':
        var { type = 'all', period = 'all', sort = 'time' } = Parser.getInputs(triggerData, ['action', 'type', 'period', 'sort'], false, 3);

        type = type.toLowerCase();
        var types = ['all', 'archive', 'highlight', 'upload'];
        if (types.indexOf(type) === -1) {
          console.error(`Invalid type value for Twitch Videos. Found "${type}", expected one of "${types.join('", "')}".`)
          type = 'all';
        }

        period = period.toLowerCase();
        var periods = ['all', 'day', 'month', 'week'];
        if (periods.indexOf(period) === -1) {
          console.error(`Invalid period value for Twitch Videos. Found "${period}", expected one of "${periods.join('", "')}".`)
          period = 'all';
        }

        sort = sort.toLowerCase();
        var sorts = ['time', 'trending', 'views'];
        if (sorts.indexOf(sort) === -1) {
          console.error(`Invalid sort value for Twitch Videos. Found "${sort}", expected one of "${sorts.join('", "')}".`)
          sort = 'time';
        }

        var response = await this.api.getVideos(this.channelId, type, period, sort);

        if (response?.data) {
          var videoArgs = {};
          for (var i = 0; i < response.data.length; i++) {
            videoArgs[`title${i+1}`] = response.data[i].title;
            videoArgs[`description${i+1}`] = response.data[i].description;
            videoArgs[`url${i+1}`] = response.data[i].url;
          }
          return {
            video_count: response.data.length,
            ...videoArgs
          };
        }
        break;
      case 'vip':
        var { user } = Parser.getInputs(triggerData, ['action', 'user']);

        var user_id = await getIdFromUser(user);

        await this.api.addChannelVIP(this.channelId, user_id);
        break;
      case 'vips':
        var vips = await this.api.getAllVIPs(this.channelId);
        var vipArgs = {};
        for (var i = 0; i < vips.length; i++) {
          vipArgs[`id${i+1}`] = vips[i].user_login;
          vipArgs[`vip${i+1}`] = vips[i].user_name;
        }
        return {
          vip_count: vips.length,
          ...vipArgs
        };
        break;
    }
  }

  isErrorResponse(response) {
    return response === 'Error with Twitch API';
  }

  /**
   * Handle the poll data.
   * @param {array} triggerData contents of trigger line
   */
  async handlePoll(triggerData) {
    var action = Parser.getAction(triggerData, 'Twitch Poll', 1);
    switch (action) {
      case 'cancel':
        var response = await this.api.getPolls(this.channelId);
        if (response?.data) {
          await this.api.endPoll({
            broadcaster_id: this.channelId,
            id: response.data[0].id,
            status: 'ARCHIVED'
          });
        }
        break;
      case 'choice':
        var { choices } = Parser.getInputs(triggerData, ['poll', 'action', 'choices'], true);

        this.poll.choices = [
          ...this.poll.choices,
          ...choices.map(choice => { return { title: choice }; })
        ];
        break;
      case 'clear':
        this.initializePoll();
        break;
      case 'create':
        var response = await this.api.createPoll(this.poll);
        this.initializePoll();
        return {
          data: response
        }
        break;
      case 'end':
        var response = await this.api.getPolls(this.channelId);
        if (response?.data) {
          await this.api.endPoll({
            broadcaster_id: this.channelId,
            id: response.data[0].id,
            status: 'TERMINATED'
          });
        }
        break;
      case 'pointspervote':
        var { points } = Parser.getInputs(triggerData, ['poll', 'action', 'points']);

        if (!isNumeric(points)) {
          console.error(`Invalid points provided to Twitch Poll PointsPerVote. Expected a number, found ${points}.`)
          return;
        }

        this.poll.channel_points_voting_enabled = true;
        this.poll.channel_points_per_vote = clamp(parseInt(points), 1, 1000000);
        break;
      case 'time':
        var { time } = Parser.getInputs(triggerData, ['poll', 'action', 'time']);
        if (!isNumeric(time)) {
          console.error(`Invalid time provided to Twitch Poll Time. Expected a number, found ${time}.`)
          return;
        }
        this.poll.duration = clamp(parseInt(time), 15, 1800);
        break;
      case 'title':
        var { title } = Parser.getInputs(triggerData, ['poll', 'action', 'title']);
        this.poll.title = title;
        break;
    }
  }

  /**
   * Set up the poll object.
   */
   initializePoll() {
     this.poll = {
       broadcaster_id: this.channelId,
       title: '',
       choices: [],
       duration: 120,
       channel_points_voting_enabled: false,
     }
   }

  /**
   * Handle the prediction data.
   * @param {array} triggerData contents of trigger line
   */
  async handlePrediction(triggerData) {
    var action = Parser.getAction(triggerData, 'Twitch Prediction', 1);
    switch (action) {
      case 'cancel':
        var response = await this.api.getPredictions(this.channelId);
        if (response?.data) {
          for (var i = 0; i < response.data.length; i++) {
            var status = response.data[i].status;
            if (status === 'ACTIVE' || status === 'LOCKED') {
              await this.api.endPrediction({
                broadcaster_id: this.channelId,
                id: response.data[i].id,
                status: 'CANCELED'
              });
            }
          }
        }
        break;
      case 'clear':
        this.initializePrediction();
        break;
      case 'complete':
        var { outcome } = Parser.getInputs(triggerData, ['prediction', 'action', 'outcome']);
        var response = await this.api.getPredictions(this.channelId);
        if (response?.data) {
          for (var i = 0; i < response.data.length; i++) {
            var status = response.data[i].status;
            if (status === 'ACTIVE' || status === 'LOCKED') {
              var outcomeId = '';
              response.data[i].outcomes.every(option => {
                if (option.title === outcome) {
                  outcomeId = option.id;
                  return false;
                }
                return true;
              });

              if (!outcomeId) {
                console.error(`Unable to get outcome id for input: ${outcome}`);
                return;
              }

              await this.api.endPrediction({
                broadcaster_id: this.channelId,
                id: response.data[i].id,
                status: 'RESOLVED',
                winning_outcome_id: outcomeId
              });
            }
          }
        }
        break;
      case 'create':
        var response = await this.api.createPrediction(this.prediction);
        this.initializePrediction();
        return {
          data: response
        }
        break;
      case 'lock':
        var response = await this.api.getPredictions(this.channelId);
        if (response?.data) {
          for (var i = 0; i < response.data.length; i++) {
            var status = response.data[i].status;
            if (status === 'ACTIVE') {
              await this.api.endPrediction({
                broadcaster_id: this.channelId,
                id: response.data[i].id,
                status: 'LOCKED'
              });
            }
          }
        }
        break;
      case 'outcome':
        var { outcomes } = Parser.getInputs(triggerData, ['prediction', 'action', 'outcomes'], true);

        this.prediction.outcomes = [
          ...this.prediction.outcomes,
          ...outcomes.map(outcome => { return { title: outcome }; })
        ];
        break;
      case 'time':
        var { time } = Parser.getInputs(triggerData, ['prediction', 'action', 'time']);
        if (!isNumeric(time)) {
          console.error(`Invalid time provided to Twitch Prediction Time. Expected a number, found ${time}.`)
          return;
        }
        this.prediction.prediction_window = clamp(parseInt(time), 30, 1800);
        break;
      case 'title':
        var { title } = Parser.getInputs(triggerData, ['prediction', 'action', 'title']);
        this.prediction.title = title;
        break;
    }
  }

  /**
   * Set up the prediction object.
   */
   initializePrediction() {
     this.prediction = {
       broadcaster_id: this.channelId,
       title: '',
       outcomes: [],
       prediction_window: 120
     }
   }
}

/**
 * Create a handler
 */
async function twitchHandlerExport() {
 var twitch = new TwitchHandler();
 var clientId = await readFile('settings/twitch/clientId.txt');
 var clientSecret = await readFile('settings/twitch/clientSecret.txt');
 var code = await readFile('settings/twitch/code.txt');
 var user = await readFile('settings/twitch/user.txt');
 var id = await getIdFromUser(user.trim());
 twitch.init(user.trim(), clientId.trim(), clientSecret.trim(), code.trim(), id.trim());
}
twitchHandlerExport();
