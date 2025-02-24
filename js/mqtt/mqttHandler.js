class MQTTHandler extends Handler {
  /**
   * Create a new MQTT handler.
   */
  constructor() {
    super('MQTT', []);

    this.init.bind(this);
  }

  /**
   * Initialize the connection to obs with the input settings.
   * @param {string} address obs websocket address
   * @param {string} password obs websocket password
   */
  init(address, username, password) {
    this.mqtt = new MQTTWebSocket(address, username, password, this);
  }

  /**
   * Handle the input data (take an action).
   * @param {array} triggerData contents of trigger line
   */
  async handleData(triggerData) {
    var action = Parser.getAction(triggerData, 'MQTT');
    switch (action) {
      case 'publish':
        var { topic, message } = Parser.getInputs(triggerData, ['action', 'topic', 'message']);
        await this.mqtt.publish(topic, message);
        break;
      default:
        console.error(`Unable to determine the MQTT <action> to be taken. Found: "${action}" within ${JSON.stringify(triggerData)}.`);
        break;
    }
  }
}

/**
 * Create a handler and read user settings
 */
async function mqttHandlerExport() {
  var mqttHandler = new MQTTHandler();
  var address = await readFile('settings/mqtt/websocket.txt');
  var username = await readFile('settings/mqtt/username.txt');
  var password = await readFile('settings/mqtt/password.txt');
  mqttHandler.init(address.trim(), username.trim(), password.trim());
}
mqttHandlerExport();
