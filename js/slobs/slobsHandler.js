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
  }

  /**
   * Initialize the connection to SLOBS with the input settings.
   * @param {string} token slobs api token
   */
  init(token) {
    this.slobs = connectSLOBSWebsocket(
      this,
      token,
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
        for (var i = 1; i < triggerLine.length; ++i) {
          var scene = triggerLine.slice(1).join(' ');
          if (this.onSwitch.indexOf(scene) === -1) {
            this.onSwitch.push(scene);
            this.onSwitchTrigger[scene] = [];
          }
          this.onSwitchTrigger[scene].push(triggerId);
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
    var sceneTriggers = [];
    if (this.onSwitch.indexOf(data.name) !== -1) {
      sceneTriggers.push(...this.onSwitchTrigger[data.name]);
    }
    if (this.onSwitch.indexOf('*') !== -1) {
      sceneTriggers.push(...this.onSwitchTrigger['*']);
    }
    if (sceneTriggers.length > 0) {
      sceneTriggers.sort((a,b) => a-b);
      sceneTriggers.forEach(triggerId => {
        controller.handleData(triggerId, {
          scene: data.name
        });
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
      case 'currentscene':
        var scene = this.slobs.getCurrentScene();
        return {current_scene: scene};
        break;
      case 'scene':
        var scene = triggerData.slice(2).join(' ');
        return await this.slobs.setCurrentScene(scene);
        break;
      case 'source':
        var source = triggerData.slice(2, triggerData.length - 1).join(' ');
        var status = triggerData[triggerData.length - 1].toLowerCase() === 'on' ? true : false;
        await this.slobs.setSourceVisibility('', source, status);
        break;
      case 'scenesource':
        var scene = triggerData[2];
        var source = triggerData.slice(3, triggerData.length - 1).join(' ');
        var status = triggerData[triggerData.length - 1].toLowerCase() === 'on' ? true : false;
        await this.slobs.setSourceVisibility(scene, source, status);
        break;
      case 'scenefolder':
        var scene = triggerData[2];
        var folder = triggerData.slice(3, triggerData.length - 1).join(' ');
        var status = triggerData[triggerData.length - 1].toLowerCase() === 'on' ? true : false;
        await this.slobs.setFolderVisibility(scene, folder, status);
        break;
      case 'flip':
        var scene = triggerData[2];
        var source = triggerData.slice(3, triggerData.length - 1).join(' ');
        if (triggerData[triggerData.length - 1].toLowerCase() === 'y') {
          await this.slobs.flipSourceY(scene, source);
        } else {
          await this.slobs.flipSourceX(scene, source);
        }
        break;
      case 'rotate':
        var scene = triggerData[2];
        var source = triggerData.slice(3, triggerData.length - 1).join(' ');
        var degree = parseFloat(triggerData[triggerData.length - 1]);
        if (!isNaN(degree)) {
          await this.slobs.rotateSource(scene, source, degree);
        }
        break;
      case 'position':
        var scene = triggerData[2];
        var source = triggerData[3];
        var x = parseFloat(triggerData[4]);
        var y = parseFloat(triggerData[5]);
        if (!isNaN(x) && !isNaN(y)) {
          await this.slobs.setPosition(scene, source, x, y);
        }
        break;
      case 'mute':
        var source = triggerData.slice(2, triggerData.length - 1).join(' ');
        var status = triggerData[triggerData.length - 1].toLowerCase();
        if (status != 'toggle') {
          status = status === 'on' ? true : false;
        }
        await this.slobs.setAudioMute(source, status);
        break;
      case 'togglestream':
        await this.slobs.toggleStream();
        break;
      case 'savereplaybuffer':
        await this.slobs.saveReplayBuffer();
        break;
      case 'startreplaybuffer':
        await this.slobs.startReplayBuffer();
        break;
      case 'stopreplaybuffer':
        await this.slobs.stopReplayBuffer();
        break;
      case 'notification':
        var message = triggerData.slice(2).join(' ');
        await this.slobs.pushNotification(message);
        break;
    }
    return;
  }
}

/**
 * Create a handler.
 */
async function slobsHandlerExport() {
  var slobsHandler = new SLOBSHandler();
  var token = await readFile('settings/slobs/token.txt');
  slobsHandler.init(token.trim());
}
slobsHandlerExport();
