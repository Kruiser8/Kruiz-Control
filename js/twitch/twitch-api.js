class TwitchAPI {
  constructor(clientId, clientSecret, code, accessToken, refreshToken, tokensUpdatedCallback) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.code = code;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.updateTokens = tokensUpdatedCallback;
  }

  getAuthUrl = () => {
    var scopes = [
      'bits:read',
      'channel:edit:commercial',
      'channel:manage:broadcast',
      'channel:manage:moderators',
      'channel:manage:polls',
      'channel:manage:predictions',
      'channel:manage:raids',
      'channel:manage:redemptions',
      'channel:manage:vips',
      'channel:moderate',
      'channel:read:ads',
      'channel:read:charity',
      'channel:read:goals',
      'channel:read:hype_train',
      'channel:read:subscriptions',
      'chat:edit',
      'chat:read',
      'clips:edit',
      'moderation:read',
      'moderator:manage:announcements',
      'moderator:manage:banned_users',
      'moderator:manage:blocked_terms',
      'moderator:manage:chat_messages',
      'moderator:manage:chat_settings',
      'moderator:manage:shield_mode',
      'moderator:manage:shoutouts',
      'moderator:manage:warnings',
      'moderator:read:chatters',
      'moderator:read:followers',
      'moderator:read:suspicious_users',
      'user:edit',
      'user:manage:blocked_users',
      'user:manage:chat_color',
      'user:manage:whispers',
      'user:read:chat',
      'user:read:follows',
      'user:write:chat'
    ].map(scope => encodeURIComponent(scope));
    return `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${this.clientId}&redirect_uri=http://localhost&scope=${scopes.join('%20')}`;
  }

  callTwitchApi = async ({ method, endpoint, headers, params, data }) => {
    headers = headers || {};
    headers = {
      'Authorization': `Bearer ${this.accessToken}`,
      'Client-ID': this.clientId,
      ...headers
    }
    params = params || {};
    data = data || {};

    const endpointWithParams = new URL(endpoint);
    Object.keys(params).forEach(property => {
      endpointWithParams.searchParams.append(property, params[property]);
    });

    if (Debug.Twitch || Debug.All) {
      console.error("Making Twitch API call: " + JSON.stringify({
        url: endpointWithParams.href,
        data: data,
        headers: headers,
        type: method,
      }));
    }

    var result = await new Promise((resolve) => {
      $.ajax({
        context: this,
        url: endpointWithParams.href,
        data: data,
        headers: headers,
        type: method,
        success: function(data, _, xjr) {
          if (Debug.Twitch || Debug.All) {
            console.error(`Received successful [${xjr.status}] response for (${endpointWithParams.href}): ${JSON.stringify(data)}`);
          }
          resolve(data);
        },
        error: async function(error) {
          if (Debug.Twitch || Debug.All) {
            console.error(`Received error [${error.status}] response for (${endpointWithParams.href}): ${JSON.stringify(error)}`);
          }
          var response = 'Error with Twitch API';
          if (!this.triedRefresh && error.status === 401) {
            this.refreshingToken = true;
            this.triedRefresh = true;
            setTimeout(() => {
              this.triedRefresh = false;
            }, 600000);
            response = await this.refreshAuthToken({ method, endpoint, headers, params, data });
          } else if (this.refreshingToken && error.status === 401) {
            console.error("Looping until auth token is ready for Twitch API call: " + JSON.stringify({
              url: endpointWithParams.href,
              data: data,
              headers: headers,
              type: method,
            }));
            await new Promise((resolve) => {
              const loop = () => this.refreshingToken ? setTimeout(loop, 50) : resolve()
              loop();
            });
            console.error("Done looping twitch call")
            response = await this.callTwitchApi({ method, endpoint, headers, params, data })
          }
          resolve(response);
        }
      });
    });

    return result;
  }

  callTwitchApiJson = async ({ method, endpoint, headers, params, data }) => {
    headers = {
      "Content-Type": "application/json",
      ...headers
    };
    data = JSON.stringify(data);
    return await this.callTwitchApi({ method, endpoint, headers, params, data })
  }

  requestAuthToken = async () => {
    var response;

    var details = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code: this.code,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost'
    }
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    if (Debug.Twitch || Debug.All) {
      console.error("Making Twitch API call: " + JSON.stringify({
        url: 'https://id.twitch.tv/oauth2/token',
        data: formBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        type: 'POST',
      }));
    }

    await $.ajax({
      context: this,
      url: 'https://id.twitch.tv/oauth2/token',
      data: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      type: 'POST',
      success: function(data) {
        if (Debug.Twitch || Debug.All) {
          console.error(`Received response for (https://id.twitch.tv/oauth2/token): ${JSON.stringify(data)}`);
        }
        if (data.access_token && data.refresh_token) {
          console.error('Successfully requested your twitch token.')
          this.accessToken = data.access_token;
          this.refreshToken = data.refresh_token;
          response = {
            accessToken: this.accessToken,
            refreshToken: this.refreshToken
          };
        }
      },
      error: function(error) {
        console.error('Error requesting your twitch token.');
        console.error(JSON.stringify(error));
        response = 'Error with Twitch API';
      }
    });
    return response;
  }

  refreshAuthToken = async ({ method, endpoint, headers, params, data }) => {
    var details = {
      'client_id': this.clientId,
      'client_secret': this.clientSecret,
      'grant_type': 'refresh_token',
      'refresh_token': this.refreshToken
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    if (Debug.Twitch || Debug.All) {
      console.error("Making Twitch API call: " + JSON.stringify({
        url: 'https://id.twitch.tv/oauth2/token',
        data: formBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        type: 'POST',
      }));
    }

    return await new Promise((resolve) => {
      $.ajax({
        context: this,
        url: 'https://id.twitch.tv/oauth2/token',
        data: formBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        type: 'POST',
        success: async function(response) {
          if (Debug.Twitch || Debug.All) {
            console.error(`Received response for (https://id.twitch.tv/oauth2/token): ${JSON.stringify(response)}`);
          }
          if (response.access_token && response.refresh_token) {
            console.error('Successfully refreshed your twitch token.')

            this.updateTokens(this.clientId, this.clientSecret, this.code, response.access_token, response.refresh_token);
            this.accessToken = response.access_token;
            this.refreshToken = response.refresh_token;
            delete headers['Authorization'];

            var result = await this.callTwitchApi({ method, endpoint, headers, params, data });
            this.refreshingToken = false;
            resolve(result);
          }
          resolve();
        },
        error: function(error) {
          this.refreshingToken = false;
          console.error('Error refreshing your twitch token.');
          console.error(JSON.stringify(error));
          resolve('Error with Twitch API');
        }
      });
    });
  }

  startCommercial = async (data) => {
    await this.callTwitchApiJson({
      method: 'POST',
      endpoint: 'https://api.twitch.tv/helix/channels/commercial',
      data
    });
  }

  getAdSchedule = async (broadcaster_id) => {
    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/channels/ads',
      params: {
        broadcaster_id
      }
    });
  }

  getBitsLeaderboard = async (params) => {
    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/bits/leaderboard',
      params
    });
  }

  getChannelInformation = async (broadcaster_id) => {
    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/channels',
      params: {
        broadcaster_id
      }
    });
  }

  modifyChannelInformation = async (broadcaster_id, data) => {
    await this.callTwitchApiJson({
      method: 'PATCH',
      endpoint: 'https://api.twitch.tv/helix/channels',
      params: {
        broadcaster_id
      },
      data
    });
  }

  getChannelFollowers = async (broadcaster_id, user_id) => {
    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/channels/followers',
      params: {
        broadcaster_id,
        user_id
      }
    });
  }

  createCustomRewards = async (broadcaster_id, data) => {
    await this.callTwitchApiJson({
      method: 'POST',
      endpoint: 'https://api.twitch.tv/helix/channel_points/custom_rewards',
      params: {
        broadcaster_id
      },
      data
    });
  }

  getCustomReward = async (broadcaster_id, only_manageable_rewards) => {
    only_manageable_rewards = only_manageable_rewards || false;
    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/channel_points/custom_rewards',
      params: {
        broadcaster_id,
        only_manageable_rewards
      }
    });
  }

  updateCustomReward = async (broadcaster_id, reward_id, data) => {
    await this.callTwitchApiJson({
      method: 'PATCH',
      endpoint: 'https://api.twitch.tv/helix/channel_points/custom_rewards',
      params: {
        broadcaster_id,
        id: reward_id
      },
      data
    });
  }

  updateRedemptionStatus = async (broadcaster_id, reward_id, redemption_id, status) => {
    await this.callTwitchApiJson({
      method: 'PATCH',
      endpoint: 'https://api.twitch.tv/helix/channel_points/custom_rewards/redemptions',
      params: {
        id: redemption_id,
        broadcaster_id,
        reward_id
      },
      data: {
        status
      }
    });
  }

  getChatters = async (broadcaster_id, moderator_id, first, after) => {
    var params = {
      broadcaster_id,
      moderator_id,
      first
    }
    if (after !== '') {
      params['after'] = after;
    }

    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/chat/chatters',
      params
    });
  }

  getAllChatters = async (broadcaster_id, moderator_id) => {
    var first = 100;
    var cursor = '';
    var isComplete = false;

    var result = [];
    while (!isComplete) {
      var response = await this.getChatters(broadcaster_id, moderator_id, first, cursor);
      if (!response?.data) {
        return result;
      }

      result = result.concat(response.data);

      if (response.pagination.cursor) {
        cursor = response.pagination.cursor;
      } else {
        isComplete = true;
      }
    }
    return result;
  }

  getChannelEmotes = async (broadcaster_id) => {
    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/chat/emotes',
      params: {
        broadcaster_id
      }
    });
  }

  getChatSettings = async (broadcaster_id) => {
    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/chat/settings',
      params: {
        broadcaster_id
      }
    });
  }

  updateChatSettings = async (broadcaster_id, moderator_id, data) => {
    return await this.callTwitchApiJson({
      method: 'PATCH',
      endpoint: 'https://api.twitch.tv/helix/chat/settings',
      params: {
        broadcaster_id,
        moderator_id
      },
      data
    });
  }

  sendChatAnnouncement = async (broadcaster_id, moderator_id, data) => {
    return await this.callTwitchApiJson({
      method: 'POST',
      endpoint: 'https://api.twitch.tv/helix/chat/announcements',
      params: {
        broadcaster_id,
        moderator_id
      },
      data
    });
  }

  sendShoutout = async (from_broadcaster_id, to_broadcaster_id, moderator_id) => {
    return await this.callTwitchApi({
      method: 'POST',
      endpoint: 'https://api.twitch.tv/helix/chat/shoutouts',
      params: {
        from_broadcaster_id,
        to_broadcaster_id,
        moderator_id
      }
    });
  }

  getUserChatColor = async (user_id) => {
    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/chat/color',
      params: {
        user_id
      }
    });
  }

  updateUserChatColor = async (user_id, color) => {
    await this.callTwitchApi({
      method: 'PUT',
      endpoint: 'https://api.twitch.tv/helix/chat/color',
      params: {
        user_id,
        color
      }
    });
  }

  createClip = async (broadcaster_id, has_delay) => {
    return await this.callTwitchApi({
      method: 'POST',
      endpoint: 'https://api.twitch.tv/helix/clips',
      params: {
        broadcaster_id,
        has_delay
      }
    });
  }

  getClips = async (params) => {
    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/clips',
      params
    });
  }

  getClipsByBroadcasterId = async (broadcaster_id, first) => {
    return await this.getClips({ broadcaster_id, first });
  }

  getClipsById = async (id) => {
    return await this.getClips({ id });
  }

  createEventSubSubscription = async (type, version, condition, session) => {
    return await this.callTwitchApiJson({
      method: 'POST',
      endpoint: 'https://api.twitch.tv/helix/eventsub/subscriptions',
      data: {
        type,
        version,
        condition,
        transport: {
          method: "websocket",
          session_id: session
        },
      }
    });
  }

  deleteEventSubSubscription = async (id) => {
    return await this.callTwitchApi({
      method: 'DELETE',
      endpoint: 'https://api.twitch.tv/helix/eventsub/subscriptions',
      params: {
        id
      }
    });
  }

  getEventSubSubscriptions = async () => {
    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/eventsub/subscriptions'
    });
  }

  getGameId = async (name) => {
    var response = await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/games',
      params: {
        name
      }
    });

    if (response?.data && response.data.length > 0) {
      return response.data[0].id;
    }

    throw Error(`Unable to retrieve Twitch game id with name: ${name}`);
  }

  getCreatorGoals = async (broadcaster_id) => {
    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/goals',
      params: {
        broadcaster_id
      }
    });
  }

  banUser = async (broadcaster_id, moderator_id, data) => {
    await this.callTwitchApiJson({
      method: 'POST',
      endpoint: 'https://api.twitch.tv/helix/moderation/bans',
      params: {
        broadcaster_id,
        moderator_id
      },
      data: {
        data
      }
    });
  }

  unbanUser = async (broadcaster_id, moderator_id, user_id) => {
    await this.callTwitchApi({
      method: 'DELETE',
      endpoint: 'https://api.twitch.tv/helix/moderation/bans',
      params: {
        broadcaster_id,
        moderator_id,
        user_id
      }
    });
  }

  getBlockedTerms = async (broadcaster_id, moderator_id, first, after) => {
    var params = {
      broadcaster_id,
      moderator_id,
      first
    }
    if (after) {
      params["after"] = after;
    }

    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/moderation/blocked_terms',
      params: params
    });
  }

  getBlockedTermId = async (broadcaster_id, moderator_id, term) => {
    var first = 100;
    var after = '';
    var isComplete = false;

    while (!isComplete) {
      var response = await this.getBlockedTerms(broadcaster_id, moderator_id, first, after);
      if (!response?.data) {
        return;
      }

      var matches = response.data.filter(blocked => blocked.text === term);
      if (matches.length > 0) {
        return matches[0].id;
      }

      if (response.pagination.cursor) {
        after = response.pagination.cursor;
      } else {
        isComplete = true;
      }
    }
  }

  addBlockedTerm = async (broadcaster_id, moderator_id, text) => {
    await this.callTwitchApiJson({
      method: 'POST',
      endpoint: 'https://api.twitch.tv/helix/moderation/blocked_terms',
      params: {
        broadcaster_id,
        moderator_id
      },
      data: {
        text
      }
    });
  }

  removeBlockedTerm = async (broadcaster_id, moderator_id, id) => {
    await this.callTwitchApi({
      method: 'DELETE',
      endpoint: 'https://api.twitch.tv/helix/moderation/blocked_terms',
      params: {
        broadcaster_id,
        moderator_id,
        id
      }
    });
  }

  deleteChatMessages = async (broadcaster_id, moderator_id, message_id) => {
    await this.callTwitchApi({
      method: 'DELETE',
      endpoint: 'https://api.twitch.tv/helix/moderation/chat',
      params: {
        broadcaster_id,
        moderator_id,
        message_id
      }
    });
  }

  getModerators = async (broadcaster_id, first, after) => {
    var params = {
      broadcaster_id,
      first
    }
    if (after) {
      params["after"] = after;
    }

    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/moderation/moderators',
      params: params
    });
  }

  getAllModerators = async (broadcaster_id) => {
    var first = 100;
    var after = '';
    var isComplete = false;

    var moderators = [];

    while (!isComplete) {
      var response = await this.getModerators(broadcaster_id, first, after);
      if (!response?.data) {
        return moderators;
      }

      moderators = moderators.concat(response.data);

      if (response.pagination.cursor) {
        after = response.pagination.cursor;
      } else {
        isComplete = true;
      }
    }
    return moderators;
  }

  addChannelModerator = async (broadcaster_id, user_id) => {
    await this.callTwitchApi({
      method: 'POST',
      endpoint: 'https://api.twitch.tv/helix/moderation/moderators',
      params: {
        broadcaster_id,
        user_id
      }
    });
  }

  removeChannelModerator = async (broadcaster_id, user_id) => {
    await this.callTwitchApi({
      method: 'DELETE',
      endpoint: 'https://api.twitch.tv/helix/moderation/moderators',
      params: {
        broadcaster_id,
        user_id
      }
    });
  }

  getVIPs = async (broadcaster_id, first, after) => {
    var params = {
      broadcaster_id,
      first
    }
    if (after) {
      params["after"] = after;
    }

    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/channels/vips',
      params: params
    });
  }

  getAllVIPs = async (broadcaster_id) => {
    var first = 100;
    var after = '';
    var isComplete = false;

    var vips = [];

    while (!isComplete) {
      var response = await this.getVIPs(broadcaster_id, first, after);
      if (!response?.data) {
        return vips;
      }

      vips = vips.concat(response.data);

      if (response.pagination.cursor) {
        after = response.pagination.cursor;
      } else {
        isComplete = true;
      }
    }
    return vips;
  }

  addChannelVIP = async (broadcaster_id, user_id) => {
    await this.callTwitchApi({
      method: 'POST',
      endpoint: 'https://api.twitch.tv/helix/channels/vips',
      params: {
        broadcaster_id,
        user_id
      }
    });
  }

  removeChannelVIP = async (broadcaster_id, user_id) => {
    await this.callTwitchApi({
      method: 'DELETE',
      endpoint: 'https://api.twitch.tv/helix/channels/vips',
      params: {
        broadcaster_id,
        user_id
      }
    });
  }

  updateShieldModeStatus = async (broadcaster_id, moderator_id, is_active) => {
    await this.callTwitchApiJson({
      method: 'PUT',
      endpoint: 'https://api.twitch.tv/helix/moderation/shield_mode',
      params: {
        broadcaster_id,
        moderator_id
      },
      data: {
        is_active
      }
    });
  }

  getShieldModeStatus = async (broadcaster_id, moderator_id) => {
    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/moderation/shield_mode',
      params: {
        broadcaster_id,
        moderator_id
      }
    });
  }

  warnChatUser = async (broadcaster_id, moderator_id, data) => {
    await this.callTwitchApi({
      method: 'POST',
      endpoint: 'https://api.twitch.tv/helix/moderation/warnings',
      params: {
        broadcaster_id,
        moderator_id
      },
      data: {
        data
      }
    });
  }

  getPolls = async (broadcaster_id) => {
    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/polls',
      params: {
        broadcaster_id
      }
    });
  }

  createPol = async (data) => {
    return await this.callTwitchApiJson({
      method: 'POST',
      endpoint: 'https://api.twitch.tv/helix/polls',
      data
    });
  }

  endPoll = async (data) => {
    await this.callTwitchApiJson({
      method: 'PATCH',
      endpoint: 'https://api.twitch.tv/helix/polls',
      data
    });
  }

  getPredictions = async (broadcaster_id) => {
    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/predictions',
      params: {
        broadcaster_id
      }
    });
  }

  createPrediction = async (data) => {
    return await this.callTwitchApiJson({
      method: 'POST',
      endpoint: 'https://api.twitch.tv/helix/predictions',
      data
    });
  }

  endPrediction = async (data) => {
    await this.callTwitchApiJson({
      method: 'PATCH',
      endpoint: 'https://api.twitch.tv/helix/predictions',
      data
    });
  }

  startARaid = async (from_broadcaster_id, to_broadcaster_id) => {
    await this.callTwitchApi({
      method: 'POST',
      endpoint: 'https://api.twitch.tv/helix/raids',
      params: {
        from_broadcaster_id,
        to_broadcaster_id
      }
    });
  }

  cancelARaid = async (broadcaster_id) => {
    await this.callTwitchApi({
      method: 'DELETE',
      endpoint: 'https://api.twitch.tv/helix/raids',
      params: {
        broadcaster_id
      }
    });
  }

  getFollowedStreams = async (user_id, first, after) => {
    var params = {
      user_id,
      first
    }
    if (after) {
      params["after"] = after;
    }

    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/streams/followed',
      params: params
    });
  }

  getAllFollowedStreams = async (user_id) => {
    var first = 100;
    var after = '';
    var isComplete = false;

    var streams = [];

    while (!isComplete) {
      var response = await this.getFollowedStreams(user_id, first, after);
      if (!response?.data) {
        return streams;
      }

      streams = streams.concat(response.data);

      if (response.pagination.cursor) {
        after = response.pagination.cursor;
      } else {
        isComplete = true;
      }
    }
    return streams;
  }

  createStreamMarker = async (user_id, description) => {
    await this.callTwitchApiJson({
      method: 'POST',
      endpoint: 'https://api.twitch.tv/helix/streams/markers',
      data: {
        user_id,
        description
      }
    });
  }

  getBroadcasterSubscriptions = async (broadcaster_id) => {
    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/subscriptions',
      params: {
        broadcaster_id
      }
    });
  }

  getChannelTeams = async (broadcaster_id) => {
    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/teams/channel',
      params: {
        broadcaster_id
      }
    });
  }

  
  getUser = async (id) => {
    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/users',
      params: {
        id
      }
    });
  }

  updateUser = async (description) => {
    await this.callTwitchApi({
      method: 'PUT',
      endpoint: 'https://api.twitch.tv/helix/users',
      params: {
        description
      }
    });
  }

  blockUser = async (target_user_id) => {
    await this.callTwitchApi({
      method: 'PUT',
      endpoint: 'https://api.twitch.tv/helix/users/blocks',
      params: {
        target_user_id
      }
    });
  }

  unblockUser = async (target_user_id) => {
    await this.callTwitchApi({
      method: 'DELETE',
      endpoint: 'https://api.twitch.tv/helix/users/blocks',
      params: {
        target_user_id
      }
    });
  }

  getVideos = async (user_id, period, type) => {
    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/videos',
      params: {
        user_id,
        type,
        period
      }
    });
  }
}
