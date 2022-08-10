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

    this.init.bind(this);
    this.onSwitchScenes.bind(this);
    this.onStreamStart.bind(this);
    this.onStreamStop.bind(this);
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
        var { scenes } = Parser.getInputs(triggerLine, ['scenes'], true);
        scenes.forEach(scene => {
          if (this.onSwitch.indexOf(scene) === -1) {
            this.onSwitch.push(scene);
            this.onSwitchTrigger[scene] = [];
          }
          this.onSwitchTrigger[scene].push(triggerId);
        });
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
    var action = Parser.getAction(triggerData, 'SLOBS');
    switch (action) {
      case 'currentscene':
        var scene = this.slobs.getCurrentScene();
        return { current_scene: scene };
        break;
      case 'isscenesourcevisible':
        var { scene, source } = Parser.getInputs(triggerData, ['action', 'scene', 'source']);
        var data = await this.slobs.getSourceVisibility(scene, source);
        return { is_visible: data };
        break;
      case 'scene':
        var { scene } = Parser.getInputs(triggerData, ['action', 'scene']);
        return await this.slobs.setCurrentScene(scene);
        break;
      case 'source':
        var { source, status } = Parser.getInputs(triggerData, ['action', 'source', 'status']);
        status = status.toLowerCase() === 'on' ? true : false;
        await this.slobs.setSourceVisibility('', source, status);
        break;
      case 'scenesource':
        var { scene, source, status } = Parser.getInputs(triggerData, ['action', 'scene', 'source', 'status']);
        status = status.toLowerCase() === 'on' ? true : false;
        await this.slobs.setSourceVisibility(scene, source, status);
        break;
      case 'scenefolder':
        var { scene, folder, status } = Parser.getInputs(triggerData, ['action', 'scene', 'folder', 'status']);
        status = status.toLowerCase() === 'on' ? true : false;
        await this.slobs.setFolderVisibility(scene, folder, status);
        break;
      case 'flip':
        var { scene, source, direction } = Parser.getInputs(triggerData, ['action', 'scene', 'source', 'direction']);
        if (direction.toLowerCase() === 'y') {
          await this.slobs.flipSourceY(scene, source);
        } else {
          await this.slobs.flipSourceX(scene, source);
        }
        break;
      case 'mute':
        var { source, status } = Parser.getInputs(triggerData, ['action', 'source', 'status']);
        status = status.toLowerCase();
        if (status != 'toggle') {
          status = status === 'on' ? true : false;
        }
        await this.slobs.setAudioMute(source, status);
        break;
      case 'notification':
        var { message } = Parser.getInputs(triggerData, ['action', 'message']);
        await this.slobs.pushNotification(message);
        break;
      case 'position':
        var { scene, source, x, y } = Parser.getInputs(triggerData, ['action', 'scene', 'source', 'x', 'y']);
        var x = parseFloat(x);
        var y = parseFloat(y);
        if (!isNaN(x) && !isNaN(y)) {
          await this.slobs.setPosition(scene, source, x, y);
        }
        break;
      case 'rotate':
        var { scene, source, degree } = Parser.getInputs(triggerData, ['action', 'scene', 'source', 'degree']);
        degree = parseFloat(degree);
        if (!isNaN(degree)) {
          await this.slobs.rotateSource(scene, source, degree);
        }
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
      case 'togglestream':
        await this.slobs.toggleStream();
        break;
      case 'volume':
        var { source, volume } = Parser.getInputs(triggerData, ['action', 'source', 'volume']);
        volume = parseFloat(volume);
        if (!isNaN(volume)) {
          var currentVolume = await this.slobs.setVolume(source, volume);
          return { previous_volume: currentVolume };
        } else {
          console.error('Unable to parse volume value: ' + triggerData[triggerData.length - 1]);
        }
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
