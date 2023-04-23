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
  async init(user, clientId, clientSecret, code, channelId) {
    connectPubSubWebsocket(channelId, this.onMessage.bind(this));
    this.user = user;
    this.channelId = channelId;
    var prevAccessToken = await IDBService.get('CUTWAT');
    var prevRefreshToken = await IDBService.get('CUTWRT');

    this.api = new TwitchAPI(clientId, clientSecret, code, prevAccessToken, prevRefreshToken, this.updateTokens);
    var initClientId = await IDBService.get('INTWC');
    var initClientSecret = await IDBService.get('INTWCS');
    var initCode = await IDBService.get('INTWCD');
    if (clientId != initClientId || clientSecret != initClientSecret || code != initCode) {
      var { accessToken, refreshToken } = await this.api.requestAuthToken();
      this.updateTokens(clientId, clientSecret, code, accessToken, refreshToken, true);
    }
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
      case 'viewers':
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
        var { delay = false } = Parser.getInputs(triggerData, ['action', 'delay' ], false, 1);
        await this.api.createClip(this.channelId, delay);
        break;
      case 'deletemessage':
        var { message_id } = Parser.getInputs(triggerData, ['action', 'message_id']);
        if (message_id !== '') {
          await this.api.deleteChatMessages(this.channelId, this.channelId, message_id);
        }
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
      case 'raid':
        var { user } = Parser.getInputs(triggerData, ['action', 'user']);

        var user_id = await getIdFromUser(user);

        await this.api.startARaid(this.channelId, user_id);
        break;
      case 'reject':
        var { reward_id, redemption_id } = Parser.getInputs(triggerData, ['action', 'reward_id', 'redemption_id']);
        await this.api.updateRedemptionStatus(this.channelId, reward_id, redemption_id, 'CANCELED');
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
      case 'soundtrack':
        var response = await this.api.getSoundtrackCurrentTrack(this.channelId);
        if (response?.data[0]?.track) {
          var artists = response.data[0].track.artists.map(artist => artist.name).join(', ');
          return {
            data: response,
            artist: artists,
            title: response.data[0].track.title
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
