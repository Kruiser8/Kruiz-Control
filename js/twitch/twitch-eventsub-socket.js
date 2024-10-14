/**
* Connect to the Twitch EventSub websocket and setup the event handlers
*
* @param {string} channelId twitch channel id
* @param {string} clientId twitch client id
* @param {string} accessToken twitch access token
* @param {function} getNewAccessToken retrieve a new access token
* @param {function} onMessage method to call when events are received
*/
async function connectEventSubWebsocket(
  channelId,
  clientId,
  accessToken,
  getNewAccessToken,
  onMessage
) {
  // Create the websocket connection
  const config = {
    identity: {
      id: clientId,
      accessToken: accessToken,
      onAuthenticationFailure: getNewAccessToken
    },
    listener: { type: 'websocket' },
  };
  const tes = new TES(config);

  const subscriptions = [
    {
      type: 'channel.update',
      data: { broadcaster_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.follow',
      data: { broadcaster_user_id: channelId, moderator_user_id: channelId },
      version: "2"
    },
    {
      type: 'channel.ad_break.begin',
      data: { broadcaster_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.subscribe',
      data: { broadcaster_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.subscription.gift',
      data: { broadcaster_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.subscription.message',
      data: { broadcaster_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.cheer',
      data: { broadcaster_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.raid',
      data: { to_broadcaster_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.ban',
      data: { broadcaster_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.unban',
      data: { broadcaster_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.moderator.add',
      data: { broadcaster_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.moderator.remove',
      data: { broadcaster_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.channel_points_custom_reward_redemption.add',
      data: { broadcaster_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.channel_points_custom_reward_redemption.update',
      data: { broadcaster_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.poll.begin',
      data: { broadcaster_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.poll.progress',
      data: { broadcaster_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.poll.end',
      data: { broadcaster_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.prediction.begin',
      data: { broadcaster_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.prediction.progress',
      data: { broadcaster_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.prediction.lock',
      data: { broadcaster_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.prediction.end',
      data: { broadcaster_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.charity_campaign.donate',
      data: { broadcaster_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.charity_campaign.start',
      data: { broadcaster_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.charity_campaign.progress',
      data: { broadcaster_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.charity_campaign.stop',
      data: { broadcaster_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.goal.begin',
      data: { broadcaster_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.goal.progress',
      data: { broadcaster_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.goal.end',
      data: { broadcaster_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.hype_train.begin',
      data: { broadcaster_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.hype_train.progress',
      data: { broadcaster_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.hype_train.end',
      data: { broadcaster_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.shield_mode.begin',
      data: { broadcaster_user_id: channelId, moderator_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.shield_mode.end',
      data: { broadcaster_user_id: channelId, moderator_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.shoutout.create',
      data: { broadcaster_user_id: channelId, moderator_user_id: channelId },
      version: 1
    },
    {
      type: 'channel.shoutout.receive',
      data: { broadcaster_user_id: channelId, moderator_user_id: channelId },
      version: 1
    },
    {
      type: 'stream.online',
      data: { broadcaster_user_id: channelId },
      version: 1
    },
    {
      type: 'stream.offline',
      data: { broadcaster_user_id: channelId },
      version: 1
    }
  ]

  // create a new subscription for the `channel.update` event for broadcaster "1337"
  for (var i = 0; i < subscriptions.length; i++) {
    var {type, data, version} = subscriptions[i];

    tes.on(type, onMessage);

    await new Promise((resolve) => {
      tes.subscribe(type, data, version)
      .then(() => {
          if (Debug.Twitch || Debug.All) {
              console.error(`${type} Subscription successful`);
          }
      }).catch(err => {
          console.error(`${type} Subscription failed: `, err);
      }).finally(() => {
          resolve();
      });
    });
  }
}
