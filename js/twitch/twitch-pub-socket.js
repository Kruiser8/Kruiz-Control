/**
* Connect to the Twitch PubSub websocket and setup the event handlers
* @param {string} channelId twitch channel id
* @param {function} onMessage method to call when events are received
*/
function connectPubSubWebsocket(channelId, onMessage) {
	// Create the websocket connection
	var socket = new WebSocket('wss://pubsub-edge.twitch.tv');

	var nonce = randomString(18);
	var wasOpened = false;

	// WS OnOpen event : authenticate
	socket.onopen = function() {
		console.error('Twitch Pubsub Websocket Opened');
		wasOpened = true;

		// Create authentication payload and request required events
		var auth = {
			"type": "LISTEN",
			"nonce": nonce,
			"data": {
				"topics": [
					"community-points-channel-v1." + channelId
				],
			}
		};

		// Send authentication payload to Twitch PubSub
		socket.send(JSON.stringify(auth));
	};

	setInterval(function() {
		setTimeout(function() {
			socket.send(JSON.stringify({
				"type": "PING"
			}));
		}, Math.random() * 10000 + 1000);
	}, 240000);

	// Ws OnClose : try reconnect
	socket.onclose = function() {
		console.error('Twitch Pubsub Websocket Closed');
		socket = null;
		if (wasOpened) {
			connectPubSubWebsocket(channelId, onMessage);
		}
	};

	// WS OnMessage event : handle events
	socket.onmessage = function(message) {
		if (message.type === "RECONNECT" || message.type === "AUTH_REVOKED") {
			console.error(`Twitch Pubsub Received ${message.type} Message`);
			socket.close();
		} else if (message.type === "PONG") {
			console.error('Twitch Pubsub Received Pong Message');
		} else {
			onMessage(message);
		}
	};
};
