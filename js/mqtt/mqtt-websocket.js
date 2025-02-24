class MQTTWebSocket {

  constructor(address, username, password, handler) {
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
    this.client.on('connect', function () {
      handler.success();
    }.bind(this));
    this.client.on('message', function (topic, message) {
      // message is Buffer
      var s_message = message.toString();
      this._handleCallbacks(topic, s_message);
    }.bind(this));
  }

  async publish(topic, message) {
    if (!this.client.connected) {
      return;
    }
    this.client.publish(topic, message);
  }

  async subscribe(topic, callback) {
    if (this.topics[topic] === undefined) {
      this.topics[topic] = [];
      this.client.subscribe(topic);
    }
    this.topics[topic].push(callback);
  }

  _handleCallbacks(topic, message) {
    if (this.topics[topic] !== undefined) {
      this.topics[topic].forEach(callback => {
        callback(message);
      });
    }
  }
}