class SLOBSHandler extends Handler {
  /**
   * Create a new SLOBS handler.
   */
  constructor() {
    super('SLOBS', ['OnSLOBSSwitchScenes', 'OnSLOBSStreamStarted', 'OnSLOBSStreamStopped']);
    this.onSwitch = [];
    this.onSwitchTrigger = {};
    this.onStartTrigger = [];
    this.onStopTrigger = [];
    this.slobs = connectSLOBSWebsocket(
      this.onSwitchScenes.bind(this),
      this.onStreamStart.bind(this),
      this.onStreamStop.bind(this)
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
      case 'onslobsswitchscenes':
        var scene = triggerLine.slice(1).join(' ');
        if (this.onSwitch.indexOf(scene) !== -1) {
          this.onSwitchTrigger[scene].push(triggerId);
        } else {
          this.onSwitch.push(scene);
          this.onSwitchTrigger[scene] = [];
          this.onSwitchTrigger[scene] = triggerId;
        }
        break;
      case 'onslobsstreamstarted':
        this.onStartTrigger.push(triggerId);
        break;
      case 'onslobsstreamstopped':
        this.onStopTrigger.push(triggerId);
        break;
      default:
        // do nothing
    }
    return;
  }

  /**
   * Handle switch scene messages from slobs subscription.
   * @param {Object} data scene information
   */
  async onSwitchScenes(data) {
    if (this.onSwitch.indexOf(data.name) !== -1) {
      this.onSwitchTrigger[data.name].forEach(triggerId => {
        controller.handleData(triggerId);
      });
    }
  }

  /**
   * Handle stream start messages from slobs subscription.
   */
  onStreamStart() {
    if (this.onStartTrigger.length > 0) {
      this.onStartTrigger.forEach(trigger => {
        controller.handleData(trigger);
      })
    }
  }

  /**
   * Handle stream stop messages from slobs subscription.
   */
  onStreamStop() {
    if (this.onStopTrigger.length > 0) {
      this.onStopTrigger.forEach(trigger => {
        controller.handleData(trigger);
      })
    }
  }

  /**
   * Handle the input data (take an action).
   * @param {array} triggerData contents of trigger line
   */
  async handleData(triggerData) {
    var trigger = triggerData[1].toLowerCase();
    switch (trigger) {
      case 'scene':
        var scene = triggerData.slice(2).join(' ');
        await this.slobs.setCurrentScene(scene);
        break;
      case 'source':
        var source = triggerData.slice(2, triggerData.length - 1).join(' ');
        var status = triggerData[triggerData.length - 1].toLowerCase() === 'on' ? true : false;
        await this.slobs.setSourceVisibility(source, status);
        break;
    }
    return;
  }
}

/**
 * Create a handler.
 */
function slobsHandlerExport() {
  var slobsHandler = new SLOBSHandler();
}
slobsHandlerExport();
