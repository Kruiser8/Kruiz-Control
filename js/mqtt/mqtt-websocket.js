class MQTTWebSocket {

  constructor(address) {
    this.address = address;
    const options = {
      // Clean session
      clean: true,
      connectTimeout: 4000,
    };
    this.client = mqtt.connect(this.address, options);
    this.initialized = false;
    this.client.on('connect', function () {
      this.initialized = true;
    }.bind(this));
  }

  async publish(topic, message) {
    if (!this.initialized) {
      return;
    }
    this.client.publish(topic, message);
  }
}