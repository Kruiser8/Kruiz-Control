class MQTTHandler extends Handler {
  /**
   * Create a new MQTT handler.
   */
  constructor() {
    super('MQTT', ['OnMQTT']);
  }

  /**
   * Initialize the connection to MQTT broker with the input settings.
   * @param {string} address broker websocket address
   * @param {string} address username to use for the connection, if any
   * @param {string} address password to use for the connection, if any
   */
  init = (address, username, password) => {
    this.mqtt = new MQTTWebSocket(address, username, password, () => this.success);
  }

  /**
   * Register trigger from user input.
   * @param {string} trigger name to use for the handler
   * @param {array} triggerLine contents of trigger line
   * @param {number} id of the new trigger
   */
  addTriggerData = (trigger, triggerLine, triggerId) => {
    trigger = trigger.toLowerCase();
    switch (trigger) {
      case 'onmqtt':
        var { topic } = Parser.getInputs(triggerLine, ['topic'], true);
        this.mqtt.subscribe(topic, function (message) {
          controller.handleData(triggerId, {
            topic: topic,
            message: message
          });
        });
        break;
      default:
      // Do nothing
    }
  }

  /**
   * Handle the input data (take an action).
   * @param {array} triggerData contents of trigger line
   */
  handleData = async (triggerData) => {
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
