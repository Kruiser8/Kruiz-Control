class OBSHandler extends Handler {
  /**
   * Create a new OBS handler.
   */
  constructor() {
    super('OBS', ['OnOBSSwitchScenes', 'OnOBSStreamStarted', 'OnOBSStreamStopped', 'OnOBSCustomMessage']);
    this.onSwitch = [];
    this.onSwitchTrigger = {};
    this.onStartTrigger = [];
    this.onStopTrigger = [];
    this.onCustom = [];
    this.onCustomTrigger = {};
  }

  /**
   * Initialize the connection to obs with the input settings.
   * @param {string} address obs websocket address
   * @param {string} password obs websocket password
   */
  init(address, password) {
    this.obs = connectOBSWebsocket(
      address, password, this.onSwitchScenes.bind(this), this.onStreamStart.bind(this),
      this.onStreamStop.bind(this), this.onCustomMessage.bind(this)
    );
  }

  /**
   * Register trigger from user input.
   * @param {string} trigger name to use for the handler
   * @param {array} triggerLine contents of trigger line
   * @param {number} id of the new trigger
   */
  addTriggerData(trigger, triggerLine, triggerId) {
    switch (trigger) {
      case 'OnOBSSwitchScenes':
        var scene = triggerLine.slice(1).join(' ');
        this.onSwitch.push(scene);
        this.onSwitchTrigger[scene] = triggerId;
        break;
      case 'OnOBSStreamStarted':
        this.onStartTrigger.push(triggerId);
        break;
      case 'OnOBSStreamStopped':
        this.onStopTrigger.push(triggerId);
        break;
      case 'OnOBSCustomMessage':
        var message = triggerLine.slice(1).join(' ');
        this.onCustom.push(message);
        this.onCustomTrigger[message] = triggerId;
      default:
        // do nothing
    }
    return;
  }

  /**
   * Handle switch scene messages from obs websocket.
   * @param {Object} data scene information
   */
  async onSwitchScenes(data) {
    var currentScene = await this.obs.getCurrentScene();
    if (this.onSwitch.indexOf(currentScene.name) !== -1) {
      controller.handleData(this.onSwitchTrigger[data.sceneName]);
    }
  }

  /**
   * Handle stream start messages from obs websocket.
   */
  onStreamStart() {
    if (this.onStartTrigger.length > 0) {
      this.onStartTrigger.forEach(trigger => {
        controller.handleData(trigger);
      })
    }
  }

  /**
   * Handle stream stop messages from obs websocket.
   */
  onStreamStop() {
    if (this.onStopTrigger.length > 0) {
      this.onStopTrigger.forEach(trigger => {
        controller.handleData(trigger);
      })
    }
  }

  /**
   * Handle custom messages from obs websocket.
   * @param {Object} broadcast obs custom message
   */
  onCustomMessage(broadcast) {
    if (broadcast.realm === 'kruiz-control' && this.onCustom.indexOf(broadcast.data.message) !== -1) {
      controller.handleData(this.onCustomTrigger[broadcast.data.message]);
    }
  }

  /**
   * Handle the input data (take an action).
   * @param {array} triggerData contents of trigger line
   */
  async handleData(triggerData) {
    var trigger = triggerData[1];
    switch (trigger) {
      case 'Scene':
        var scene = triggerData.slice(2).join(' ');
        await this.obs.setCurrentScene(scene);
        break;
      case 'Source':
        var source = triggerData[2];
        if (triggerData.length === 4) {
          var status = triggerData[3].toLowerCase() === 'on' ? true : false;
          await this.obs.setSourceVisibility(source, status);
        }
        else if (triggerData.length === 6) {
          var filter = triggerData[4];
          var status = triggerData[5].toLowerCase() === 'on' ? true : false;
          await this.obs.setFilterVisibility(source, filter, status);
        }
        break;
      case 'Send':
        var message = triggerData.slice(2).join(' ');
        await this.obs.broadcastCustomMessage(message)
    }
    return;
  }
}

/**
 * Create a handler and read user settings
 */
function obsHandlerExport() {
  var obsHandler = new OBSHandler();
  readFile('settings/obs/address.txt', function(address) {
    readFile('settings/obs/password.txt', function(password) {
      obsHandler.init(address.trim(), password.trim());
    });
  });
}
obsHandlerExport();
