class EventSubHandler {
  wsUrl = "wss://eventsub.wss.twitch.tv/ws";
  /**
   * Create an EventSub handler to control the websocket connection
   *
   * @param {TwitchAPI} api twitch api interface
   * @param {string} channelId twitch channel id
   * @param {function} onMessage method to call when events are received
   */
  constructor(api, channelId, onMessage) {
    this.api = api;
    this.channelId = channelId;
    this.onMessage = onMessage;
    this.wsId = "";

    this.addConnection.bind(this);
    this.addSubscriptions.bind(this);

    this.addConnection((id) => {
      this.wsId = id;
      this.deleteOldSubscriptions();
      this.addSubscriptions();
    }, this.wsUrl);
  }

  addConnection(onWelcome, url = this.wsUrl) {
    const ws = new WebSocket(url);
    ws.onmessage = (event) => {
      if (Debug.Twitch || Debug.All) {
        console.error(`Received EventSub Message: ${JSON.stringify(event)}`);
      }

      const {
        metadata: { message_type },
        payload,
      } = JSON.parse(event.data);
      if (message_type === "session_welcome") {
        const {
          session: { id, keepalive_timeout_seconds },
        } = payload;
        if (Debug.Twitch || Debug.All) {
          console.error(`Received welcome message for session "${id}"`);
        }
        ws.resetTimeout = () => {
          if (ws.keepaliveTimeout) {
            clearTimeout(ws.keepaliveTimeout);
          }
          ws.keepaliveTimeout = setTimeout(() => {
            console.error("Connection to Twitch EventSub lost");
          }, keepalive_timeout_seconds * 1000 + 100);
        };
        ws.resetTimeout();
        onWelcome(id);
      } else if (message_type === "session_keepalive") {
        ws.resetTimeout();
      } else if (message_type === "session_reconnect") {
        const {
          session: { id, reconnect_url },
        } = payload;
        if (Debug.Twitch || Debug.All) {
          console.error(`Received reconnect message for session "${id}"`);
        }
        this.addConnection((newId) => {
          clearTimeout(ws.keepaliveTimeout);
          ws.close();
          this.wsId = newId;
        }, reconnect_url);
      } else if (message_type === "notification") {
        ws.resetTimeout();
        const { subscription, event } = payload;
        if (Debug.Twitch || Debug.All) {
          console.error(`Received notification for type ${subscription.type}`);
        }
        this.onMessage(event, subscription);
      } else if (message_type === "revocation") {
        ws.resetTimeout();
        const { subscription } = payload;
        if (Debug.Twitch || Debug.All) {
          console.error(`Received revocation notification for subscription id ${subscription.id}`);
        }
        this.resubscribe(subscription.type, subscription.version, subscription.condition);
      } else {
        console.error(`Unhandled WebSocket message type "${message_type}"`);
      }
    };
    ws.onclose = (event) => {
        const { code, reason } = event;
        console.error(`Twitch EventSub WebSocket connection closed. ${code}:${reason}`);
    };
  }

  async resubscribe(type, version, condition) {
    if (Debug.Twitch || Debug.All) {
        console.error(`Resubscribing to ${type}`);
    }
    await this.api.createEventSubSubscription(type, version, condition, this.wsId);
    if (Debug.Twitch || Debug.All) {
      console.error(`Resubscribing to ${type}`);
    }
  }

  async addSubscriptions() {
    const subscriptions = [
      {
        type: 'channel.update',
        data: { broadcaster_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.follow',
        data: { broadcaster_user_id: this.channelId, moderator_user_id: this.channelId },
        version: "2"
      },
      {
        type: 'channel.ad_break.begin',
        data: { broadcaster_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.chat.clear',
        data: { broadcaster_user_id: this.channelId, user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.chat.clear_user_messages',
        data: { broadcaster_user_id: this.channelId, user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.chat.message',
        data: { broadcaster_user_id: this.channelId, user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.chat.notification',
        data: { broadcaster_user_id: this.channelId, user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.subscribe',
        data: { broadcaster_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.subscription.gift',
        data: { broadcaster_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.subscription.message',
        data: { broadcaster_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.cheer',
        data: { broadcaster_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.raid',
        data: { to_broadcaster_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.ban',
        data: { broadcaster_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.unban',
        data: { broadcaster_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.moderator.add',
        data: { broadcaster_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.moderator.remove',
        data: { broadcaster_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.channel_points_custom_reward_redemption.add',
        data: { broadcaster_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.channel_points_custom_reward_redemption.update',
        data: { broadcaster_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.poll.begin',
        data: { broadcaster_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.poll.progress',
        data: { broadcaster_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.poll.end',
        data: { broadcaster_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.prediction.begin',
        data: { broadcaster_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.prediction.progress',
        data: { broadcaster_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.prediction.lock',
        data: { broadcaster_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.prediction.end',
        data: { broadcaster_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.suspicious_user.message',
        data: { broadcaster_user_id: this.channelId, moderator_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.charity_campaign.donate',
        data: { broadcaster_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.charity_campaign.start',
        data: { broadcaster_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.charity_campaign.progress',
        data: { broadcaster_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.charity_campaign.stop',
        data: { broadcaster_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.goal.begin',
        data: { broadcaster_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.goal.progress',
        data: { broadcaster_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.goal.end',
        data: { broadcaster_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.hype_train.begin',
        data: { broadcaster_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.hype_train.progress',
        data: { broadcaster_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.hype_train.end',
        data: { broadcaster_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.shield_mode.begin',
        data: { broadcaster_user_id: this.channelId, moderator_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.shield_mode.end',
        data: { broadcaster_user_id: this.channelId, moderator_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.shoutout.create',
        data: { broadcaster_user_id: this.channelId, moderator_user_id: this.channelId },
        version: 1
      },
      {
        type: 'channel.shoutout.receive',
        data: { broadcaster_user_id: this.channelId, moderator_user_id: this.channelId },
        version: 1
      },
      {
        type: 'stream.online',
        data: { broadcaster_user_id: this.channelId },
        version: 1
      },
      {
        type: 'stream.offline',
        data: { broadcaster_user_id: this.channelId },
        version: 1
      }
    ];

    for (var i = 0; i < subscriptions.length; i++) {
      var {type, data, version} = subscriptions[i];
      await new Promise(async (resolve) => {
        await this.api.createEventSubSubscription(type, version, data, this.wsId);
        resolve();
      });
    }
  }

  async deleteOldSubscriptions() {
    var { total, data} = await this.api.getEventSubSubscriptions();
    if (total > 0) {
      for (var i = 0; i < data.length; i++) {
        await this.api.deleteEventSubSubscription(data[i].id);
      }
    }
  }
}
