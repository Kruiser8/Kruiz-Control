class TwitchAPI {
  constructor(clientId, clientSecret, code, accessToken, refreshToken, tokensUpdatedCallback) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.code = code;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.updateTokens = tokensUpdatedCallback;

    this.getAuthUrl.bind(this);
    this.callTwitchApi.bind(this);
    this.requestAuthToken.bind(this);
    this.refreshAuthToken.bind(this);
  }

  getAuthUrl() {
    var scopes = [
      'bits:read',
      'channel:edit:commercial',
      'channel:manage:broadcast',
      'channel:manage:moderators',
      'channel:manage:raids',
      'channel:manage:redemptions',
      'channel:manage:vips',
      'channel:read:goals',
      'channel:read:vips',
      'channel:read:subscriptions',
      'clips:edit',
      'moderator:manage:announcements',
      'moderator:manage:banned_users',
      'moderator:manage:blocked_terms',
      'moderator:manage:chat_messages',
      'moderator:manage:chat_settings',
      'moderator:manage:shield_mode',
      'moderator:manage:shoutouts',
      'moderation:read',
      'moderator:read:blocked_terms',
      'moderator:read:chatters',
      'moderator:read:followers',
      'moderator:read:shield_mode',
      'user:edit',
      'user:manage:chat_color',
      'user:manage:blocked_users',
      'user:read:follows'
    ].map(scope => encodeURIComponent(scope));
    return `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${this.clientId}&redirect_uri=http://localhost&scope=${scopes.join('+')}`;
  }

  async callTwitchApi({ method, endpoint, headers, params, data }) {
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
        success: function(data) {
          resolve(data);
        },
        error: async function(error) {
          console.error(`Error calling ${endpoint}!`);
          console.error(JSON.stringify(error));
          var response = 'Error with Twitch API';
          if (!this.triedRefresh && error.status === 401) {
            this.triedRefresh = true;
            response = await this.refreshAuthToken({ method, endpoint, headers, params, data });
          }
          resolve(response);
        }
      });
    });

    if (Debug.Twitch || Debug.All) {
      console.error(`Received response for (${endpointWithParams.href}): ${JSON.stringify(result)}`);
    }
    return result;
  }

  async callTwitchApiJson({ method, endpoint, headers, params, data }) {
    headers = {
      "Content-Type": "application/json",
      ...headers
    };
    data = JSON.stringify(data);
    return await this.callTwitchApi({ method, endpoint, headers, params, data })
  }

  async requestAuthToken() {
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

    await $.ajax({
      context: this,
      url: 'https://id.twitch.tv/oauth2/token',
      data: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      type: 'POST',
      success: function(data) {
        if (data.access_token && data.refresh_token) {
          console.error('Successfully refreshed your twitch token.')
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

  async refreshAuthToken({ method, endpoint, headers, params, data }) {
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

    return await new Promise((resolve) => {
      $.ajax({
        context: this,
        url: 'https://id.twitch.tv/oauth2/token',
        data: formBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        type: 'POST',
        success: async function(data) {
          console.error(JSON.stringify(data));
          if (data.access_token && data.refresh_token) {
            console.error('Successfully refreshed your twitch token.')
            this.updateTokens(this.clientId, this.clientSecret, this.code, data.access_token, data.refresh_token);
            this.accessToken = data.access_token;
            this.refreshToken = data.refresh_token;
            var result = await this.callTwitchApi({ method, endpoint, headers, params, data });
            resolve(result);
          }
          resolve();
        },
        error: function(error) {
          console.error('Error refreshing your twitch token.');
          console.error(JSON.stringify(error));
          resolve('Error with Twitch API');
        }
      });
    });
  }

  async startCommercial(broadcaster_id, length) {
    await this.callTwitchApiJson({
      method: 'POST',
      endpoint: 'https://api.twitch.tv/helix/channels/commercial',
      data
    });
  }

  async getBitsLeaderboard(params) {
    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/bits/leaderboard',
      params
    });
  }

  async getChannelInformation(broadcaster_id) {
    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/channels',
      params: {
        broadcaster_id
      }
    });
  }

  async modifyChannelInformation(broadcaster_id, data) {
    await this.callTwitchApiJson({
      method: 'PATCH',
      endpoint: 'https://api.twitch.tv/helix/channels',
      params: {
        broadcaster_id
      },
      data
    });
  }

  async getChannelFollowers(broadcaster_id, user_id) {
    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/channels/followers',
      params: {
        broadcaster_id,
        user_id
      }
    });
  }

  async createCustomRewards(broadcaster_id, data) {
    await this.callTwitchApiJson({
      method: 'POST',
      endpoint: 'https://api.twitch.tv/helix/channel_points/custom_rewards',
      params: {
        broadcaster_id
      },
      data
    });
  }

  async getCustomReward(broadcaster_id, only_manageable_rewards) {
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

  async updateCustomReward(broadcaster_id, reward_id, data) {
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

  async updateRedemptionStatus(broadcaster_id, reward_id, redemption_id, status) {
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

  async getChatters(broadcaster_id, moderator_id, first, after) {
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

  async getAllChatters(broadcaster_id, moderator_id) {
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

  async getChannelEmotes(broadcaster_id) {
    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/chat/emotes',
      params: {
        broadcaster_id
      }
    });
  }

  async getChatSettings(broadcaster_id) {
    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/chat/settings',
      params: {
        broadcaster_id
      }
    });
  }

  async updateChatSettings(broadcaster_id, moderator_id, data) {
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

  async sendChatAnnouncement(broadcaster_id, moderator_id, data) {
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

  async sendShoutout(from_broadcaster_id, to_broadcaster_id, moderator_id) {
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

  async getUserChatColor(user_id) {
    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/chat/color',
      params: {
        user_id
      }
    });
  }

  async updateUserChatColor(user_id, color) {
    await this.callTwitchApi({
      method: 'PUT',
      endpoint: 'https://api.twitch.tv/helix/chat/color',
      params: {
        user_id,
        color
      }
    });
  }

  async createClip(broadcaster_id, has_delay) {
    return await this.callTwitchApi({
      method: 'POST',
      endpoint: 'https://api.twitch.tv/helix/clips',
      params: {
        broadcaster_id,
        has_delay
      }
    });
  }

  async getClips(params) {
    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/clips',
      params
    });
  }

  async getClipsByBroadcasterId(broadcaster_id, first) {
    return await this.getClips({ broadcaster_id, first });
  }

  async getClipsById(id) {
    return await this.getClips({ id });
  }

  async getGameId(name) {
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

  async getCreatorGoals(broadcaster_id) {
    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/goals',
      params: {
        broadcaster_id
      }
    });
  }

  async banUser(broadcaster_id, moderator_id, data) {
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

  async unbanUser(broadcaster_id, moderator_id, user_id) {
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

  async getBlockedTerms(broadcaster_id, moderator_id, first, after) {
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

  async getBlockedTermId(broadcaster_id, moderator_id, term) {
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

  async addBlockedTerm(broadcaster_id, moderator_id, text) {
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

  async removeBlockedTerm(broadcaster_id, moderator_id, id) {
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

  async deleteChatMessages(broadcaster_id, moderator_id, message_id) {
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

  async getModerators(broadcaster_id, first, after) {
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

  async getAllModerators(broadcaster_id) {
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

  async addChannelModerator(broadcaster_id, user_id) {
    await this.callTwitchApi({
      method: 'POST',
      endpoint: 'https://api.twitch.tv/helix/moderation/moderators',
      params: {
        broadcaster_id,
        user_id
      }
    });
  }

  async removeChannelModerator(broadcaster_id, user_id) {
    await this.callTwitchApi({
      method: 'DELETE',
      endpoint: 'https://api.twitch.tv/helix/moderation/moderators',
      params: {
        broadcaster_id,
        user_id
      }
    });
  }

  async getVIPs(broadcaster_id, first, after) {
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

  async getAllVIPs(broadcaster_id) {
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

  async addChannelVIP(broadcaster_id, user_id) {
    await this.callTwitchApi({
      method: 'POST',
      endpoint: 'https://api.twitch.tv/helix/channels/vips',
      params: {
        broadcaster_id,
        user_id
      }
    });
  }

  async removeChannelVIP(broadcaster_id, user_id) {
    await this.callTwitchApi({
      method: 'DELETE',
      endpoint: 'https://api.twitch.tv/helix/channels/vips',
      params: {
        broadcaster_id,
        user_id
      }
    });
  }

  async updateShieldModeStatus(broadcaster_id, moderator_id, is_active) {
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

  async getShieldModeStatus(broadcaster_id, moderator_id) {
    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/moderation/shield_mode',
      params: {
        broadcaster_id,
        moderator_id
      }
    });
  }

  async startARaid(from_broadcaster_id, to_broadcaster_id) {
    await this.callTwitchApi({
      method: 'POST',
      endpoint: 'https://api.twitch.tv/helix/raids',
      params: {
        from_broadcaster_id,
        to_broadcaster_id
      }
    });
  }

  async cancelARaid(broadcaster_id) {
    await this.callTwitchApi({
      method: 'DELETE',
      endpoint: 'https://api.twitch.tv/helix/raids',
      params: {
        broadcaster_id
      }
    });
  }

  async getSoundtrackCurrentTrack(broadcaster_id) {
    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/soundtrack/current_track',
      params: {
        broadcaster_id
      }
    });
  }

  async getFollowedStreams(user_id, first, after) {
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

  async getAllFollowedStreams(user_id) {
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

  async createStreamMarker(user_id, description) {
    await this.callTwitchApiJson({
      method: 'POST',
      endpoint: 'https://api.twitch.tv/helix/streams/markers',
      data: {
        user_id,
        description
      }
    });
  }

  async getBroadcasterSubscriptions(broadcaster_id) {
    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/subscriptions',
      params: {
        broadcaster_id
      }
    });
  }

  async getChannelTeams(broadcaster_id) {
    return await this.callTwitchApi({
      method: 'GET',
      endpoint: 'https://api.twitch.tv/helix/teams/channel',
      params: {
        broadcaster_id
      }
    });
  }

  async updateUser(description) {
    await this.callTwitchApi({
      method: 'PUT',
      endpoint: 'https://api.twitch.tv/helix/users',
      params: {
        description
      }
    });
  }

  async blockUser(target_user_id) {
    await this.callTwitchApi({
      method: 'PUT',
      endpoint: 'https://api.twitch.tv/helix/users/blocks',
      params: {
        target_user_id
      }
    });
  }

  async unblockUser(target_user_id) {
    await this.callTwitchApi({
      method: 'DELETE',
      endpoint: 'https://api.twitch.tv/helix/users/blocks',
      params: {
        target_user_id
      }
    });
  }

  async getVideos(user_id, period, type) {
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
