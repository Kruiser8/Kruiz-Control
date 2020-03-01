/**
 * Connect to the Twitch PubSub websocket and setup the event handlers
 * @param {string} channelId twitch channel id
 * @param {function} onMessage method to call when events are received
 */
function connectChannelPointWebsocket(channelId, onMessage) {
	// Create the websocket connection
	var socket = new WebSocket('wss://pubsub-edge.twitch.tv');

  var nonce = randomString(18);
  var topic = "community-points-channel-v1." + channelId;

	// WS OnOpen event : authenticate
	socket.onopen = function() {
		// Create authentication payload and request required events
		var auth = {
      "type": "LISTEN",
      "nonce": nonce,
      "data": {
        "topics": [topic],
      }
    };
		// Send authentication payload to Streamlabs Chatbot
		socket.send(JSON.stringify(auth));
	};

  setInterval(function() {
    socket.send(JSON.stringify({
      "type": "PING"
    }));
  }, 240000);

	// Ws OnClose : try reconnect
	socket.onclose = function() {
		socket = null;
    console.error('Channel Point Websocket Closed');
	};

	// WS OnMessage event : handle events
	socket.onmessage = onMessage;
};
