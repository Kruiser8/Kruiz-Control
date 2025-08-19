class MQTTWebSocket {

  constructor(address, username, password, onConnect, onClose) {
    this.address = address;
    this.topics = [];

    const options = {
      // Clean session
      clean: true,
      connectTimeout: 4000,
    };

    if (username !== undefined && username !== '' && password !== undefined && password !== '') {
      options.username = username;
      options.password = password;
    }

    this.client = mqtt.connect(this.address, options);
    this.client.on('connect', () => {
	  if (Debug.All || Debug.MQTT) {
        console.error(`MQTT Client connected.`);
      }
      onConnect();
    });
    this.client.on('offline', onClose)
    this.client.on('message', (topic, message) => {
      if (Debug.All || Debug.MQTT) {
        console.error(`MQTT Client ${topic} message received: ${message.toString()}`);
      }
      // message is Buffer
      var s_message = message.toString();
      this._handleCallbacks(topic, s_message);
    });
  }

  publish = async (topic, message) => {
    if (!this.client || !this.client.connected) {
      return;
    }
    this.client.publish(topic, message);
  }

  subscribe = async (topic, callback) => {
    if (this.topics[topic] === undefined) {
      this.topics[topic] = [];
	}
    this.client.subscribe(topic);
    this.topics[topic].push(callback);
  }

  _handleCallbacks = (topic, message) => {
    if (this.topics[topic] !== undefined) {
      this.topics[topic].forEach(callback => {
        callback(message);
      });
    }
  }
}
