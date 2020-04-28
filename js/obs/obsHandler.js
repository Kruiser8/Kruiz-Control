class OBSHandler extends Handler {
  /**
   * Create a new OBS handler.
   */
  constructor() {
    super('OBS', ['OnOBSSwitchScenes', 'OnOBSTransitionTo', 'OnOBSStreamStarted', 'OnOBSStreamStopped', 'OnOBSCustomMessage']);
    this.onSwitch = [];
    this.onSwitchTrigger = {};
    this.onTransitionTo = [];
    this.onTransitionToTrigger = {};
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
      address, password, this, this.onSwitchScenes.bind(this), this.onTransitionBegin.bind(this), this.onStreamStart.bind(this),
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
    trigger = trigger.toLowerCase();
    switch (trigger) {
      case 'onobsswitchscenes':
        var scene = triggerLine.slice(1).join(' ');
        if (this.onSwitch.indexOf(scene) !== -1) {
          this.onSwitchTrigger[scene].push(triggerId);
        } else {
          this.onSwitchTrigger[scene] = [];
          this.onSwitch.push(scene);
          this.onSwitchTrigger[scene].push(triggerId);
        }
        break;
      case 'onobstransitionto':
        var scene = triggerLine.slice(1).join(' ');
        if (this.onTransitionTo.indexOf(scene) !== -1) {
          this.onTransitionToTrigger[scene].push(triggerId);
        } else {
          this.onTransitionToTrigger[scene] = [];
          this.onTransitionTo.push(scene);
          this.onTransitionToTrigger[scene].push(triggerId);
        }
        break;
      case 'onobsstreamstarted':
        this.onStartTrigger.push(triggerId);
        break;
      case 'onobsstreamstopped':
        this.onStopTrigger.push(triggerId);
        break;
      case 'onobscustommessage':
        var message = triggerLine.slice(1).join(' ');
        if (this.onCustom.indexOf(message) !== -1) {
          this.onCustomTrigger[message].push(triggerId);
        } else {
          this.onCustomTrigger[message] = [];
          this.onCustom.push(message);
          this.onCustomTrigger[message].push(triggerId);
        }
        break;
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
    if (currentScene.name === data.sceneName && this.onSwitch.indexOf(currentScene.name) !== -1) {
      this.onSwitchTrigger[data.sceneName].forEach(triggerId => {
        controller.handleData(triggerId);
      });
    }
  }

  /**
   * Handle transitions from obs websocket.
   * @param {Object} data scene information
   */
  async onTransitionBegin(data) {
    if (this.onTransitionTo.indexOf(data.toScene) !== -1) {
      this.onTransitionToTrigger[data.toScene].forEach(triggerId => {
        controller.handleData(triggerId);
      });
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
    if (broadcast.realm === 'kruiz-control' && typeof(broadcast.data.message) !== 'undefined' && this.onCustom.indexOf(broadcast.data.message) !== -1) {
      this.onCustomTrigger[broadcast.data.message].forEach(triggerId => {
        controller.handleData(triggerId, {data: broadcast.data.data});
      });
    }
  }

  /**
   * Handle the input data (take an action).
   * @param {array} triggerData contents of trigger line
   */
  async handleData(triggerData) {
    var trigger = triggerData[1].toLowerCase();
    switch (trigger) {
      case 'currentscene':
        var currentScene = await this.obs.getCurrentScene();
        return {current_scene: currentScene.name};
        break;
      case 'scene':
        var currentScene = await this.obs.getCurrentScene();
        var scene = triggerData.slice(2).join(' ');
        await this.obs.setCurrentScene(scene);
        return {previous_scene: currentScene};
        break;
      case 'scenesource':
        var status = triggerData[triggerData.length - 1].toLowerCase() === 'on' ? true : false;
        var scene = triggerData[2];
        var source = triggerData.slice(3, triggerData.length - 1).join(' ');
        await this.obs.setSourceVisibility(source, status, scene);
      case 'source':
        var status = triggerData[triggerData.length - 1].toLowerCase() === 'on' ? true : false;
        var filterIndex = triggerData.indexOf('filter');
        if (filterIndex === -1) {
          filterIndex = triggerData.indexOf('Filter');
        }
        if (filterIndex === -1) {
          var source = triggerData.slice(2, triggerData.length - 1).join(' ');
          await this.obs.setSourceVisibility(source, status);
        }
        else {
          var source = triggerData.slice(2, filterIndex).join(' ');
          var filter = triggerData.slice(filterIndex + 1, triggerData.length - 1).join(' ');
          await this.obs.setFilterVisibility(source, filter, status);
        }
        break;
      case 'send':
        var message = triggerData[2];
        var data = '';
        if (triggerData.length > 3) {
          var data = triggerData.slice(3).join(' ');
        }
        await this.obs.broadcastCustomMessage(message, data);
        break;
      default:
        break;
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
