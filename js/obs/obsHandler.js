class OBSHandler extends Handler {
  /**
   * Create a new OBS handler.
   */
  constructor() {
    super('OBS', ['OnOBSSwitchScenes', 'OnOBSTransitionTo', 'OnOBSStreamStarted', 'OnOBSStreamStopped', 'OnOBSCustomMessage', 'OnOBSSourceVisibility']);
    this.onSwitch = [];
    this.onSwitchTrigger = {};
    this.onTransitionTo = [];
    this.onTransitionToTrigger = {};
    this.onStartTrigger = [];
    this.onStopTrigger = [];
    this.onCustom = [];
    this.onCustomTrigger = {};
    this.onSourceVis = {};
    this.onSourceVisTrigger = {};
  }

  /**
   * Initialize the connection to obs with the input settings.
   * @param {string} address obs websocket address
   * @param {string} password obs websocket password
   */
  init(address, password) {
    this.obs = connectOBSWebsocket(
      address, password, this, this.onSwitchScenes.bind(this), this.onTransitionBegin.bind(this), this.onStreamStart.bind(this),
      this.onStreamStop.bind(this), this.onCustomMessage.bind(this), this.onSourceVisibility.bind(this)
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
        // Handle aliases
        for (var i = 1; i < triggerLine.length; ++i) {
          var scene = triggerLine[i];
          if (this.onSwitch.indexOf(scene) !== -1) {
            this.onSwitchTrigger[scene].push(triggerId);
          } else {
            this.onSwitchTrigger[scene] = [];
            this.onSwitch.push(scene);
            this.onSwitchTrigger[scene].push(triggerId);
          }
        }
        break;
      case 'onobstransitionto':
        // Handle aliases
        for (var i = 1; i < triggerLine.length; ++i) {
          var scene = triggerLine[i];
          if (this.onTransitionTo.indexOf(scene) !== -1) {
            this.onTransitionToTrigger[scene].push(triggerId);
          } else {
            this.onTransitionToTrigger[scene] = [];
            this.onTransitionTo.push(scene);
            this.onTransitionToTrigger[scene].push(triggerId);
          }
        }
        break;
      case 'onobsstreamstarted':
        this.onStartTrigger.push(triggerId);
        break;
      case 'onobsstreamstopped':
        this.onStopTrigger.push(triggerId);
        break;
      case 'onobscustommessage':
        // Handle aliases
        for (var i = 1; i < triggerLine.length; ++i) {
          var message = triggerLine[i];
          if (this.onCustom.indexOf(message) !== -1) {
            this.onCustomTrigger[message].push(triggerId);
          } else {
            this.onCustomTrigger[message] = [];
            this.onCustom.push(message);
            this.onCustomTrigger[message].push(triggerId);
          }
        }
        break;
      case 'onobssourcevisibility':
        var scene = triggerLine[1];
        var item = triggerLine[2];
        var status = triggerLine[3];
        var visibility = 'toggle';
        if (status && status.toLowerCase() === 'on') {
          visibility = true;
        } else if (status && status.toLowerCase() === 'off') {
          visibility = false;
        }
        if (!(scene in this.onSourceVis)) {
          this.onSourceVis[scene] = {};
        }
        if (!(item in this.onSourceVis[scene])) {
          this.onSourceVis[scene][item] = [];
        }
        this.onSourceVis[scene][item].push(visibility);
        if (!(`${scene}|${item}|${String(visibility)}` in this.onSourceVisTrigger)) {
          this.onSourceVisTrigger[`${scene}|${item}|${String(visibility)}`] = [];
        }
        this.onSourceVisTrigger[`${scene}|${item}|${String(visibility)}`].push(triggerId);
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
    if (Debug.All || Debug.OBS) {
      console.error("OBS onSwitchScenes: " + JSON.stringify(data));
    }
    var currentScene = await this.obs.getCurrentScene();
    var sceneTriggers = [];
    if (currentScene.name === data.sceneName) {
      if (this.onSwitch.indexOf(currentScene.name) !== -1) {
        sceneTriggers.push(...this.onSwitchTrigger[data.sceneName]);
      }
      if (this.onSwitch.indexOf('*') !== -1) {
        sceneTriggers.push(...this.onSwitchTrigger['*']);
      }
    }
    if (sceneTriggers.length > 0) {
      sceneTriggers.sort((a,b) => a-b);
      sceneTriggers.forEach(triggerId => {
        controller.handleData(triggerId, {
          scene: currentScene.name
        });
      });
    }
  }

  /**
   * Handle transitions from obs websocket.
   * @param {Object} data scene information
   */
  async onTransitionBegin(data) {
    if (Debug.All || Debug.OBS) {
      console.error("OBS onTransitionBegin: " + JSON.stringify(data));
    }
    var sceneTriggers = [];
    if (this.onTransitionTo.indexOf(data.toScene) !== -1) {
      sceneTriggers.push(...this.onTransitionToTrigger[data.toScene]);
    }
    if (this.onTransitionTo.indexOf('*') !== -1) {
      sceneTriggers.push(...this.onTransitionToTrigger['*']);
    }
    if (sceneTriggers.length > 0) {
      sceneTriggers.sort((a,b) => a-b);
      sceneTriggers.forEach(triggerId => {
        controller.handleData(triggerId, {
          from: data.fromScene,
          scene: data.toScene
        });
      });
    }
  }

  /**
   * Handle stream start messages from obs websocket.
   */
  onStreamStart() {
    if (Debug.All || Debug.OBS) {
      console.error("OBS onStreamStart message received");
    }
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
    if (Debug.All || Debug.OBS) {
      console.error("OBS onStreamStop message received");
    }
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
    if (Debug.All || Debug.OBS) {
      console.error("OBS onCustomMessage: " + JSON.stringify(broadcast));
    }
    var customTriggers = [];
    if (broadcast.realm === 'kruiz-control' && typeof(broadcast.data.message) !== 'undefined' && this.onCustom.indexOf(broadcast.data.message) !== -1) {
      customTriggers.push(...this.onCustomTrigger[broadcast.data.message]);
    }
    if (broadcast.realm === 'kruiz-control' && typeof(broadcast.data.message) !== 'undefined' && this.onCustom.indexOf('*') !== -1) {
      customTriggers.push(...this.onCustomTrigger['*']);
    }
    if (customTriggers.length > 0) {
      customTriggers.sort((a,b) => a-b);
      customTriggers.forEach(triggerId => {
        controller.handleData(triggerId, {
          message: broadcast.data.message,
          data: broadcast.data.data
        });
      });
    }
  }

  /**
   * Handle scene item visibility messages from obs websocket.
   * @param {Object} data scene item information
   */
  async onSourceVisibility(data) {
    if (Debug.All || Debug.OBS) {
      console.error("OBS onSourceVisibility: " + JSON.stringify(data));
    }
    var scene = data['scene-name'];
    var item = data['item-name'];
    var visibility = data['item-visible'];
    if (scene in this.onSourceVis && item in this.onSourceVis[scene]) {
      if (this.onSourceVis[scene][item].indexOf(visibility) !== -1) {
        this.onSourceVisTrigger[`${scene}|${item}|${String(visibility)}`].forEach(triggerId => {
          controller.handleData(triggerId, {
            visible: visibility
          });
        });
      }
      if (this.onSourceVis[scene][item].indexOf('toggle') !== -1) {
        this.onSourceVisTrigger[`${scene}|${item}|toggle`].forEach(triggerId => {
          controller.handleData(triggerId, {
            visible: visibility
          });
        });
      }
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
      case 'startstream':
        await this.obs.startStream();
        break;
      case 'stopstream':
        await this.obs.stopStream();
        break;
      case 'startreplaybuffer':
        await this.obs.startReplayBuffer();
        break;
      case 'stopreplaybuffer':
        await this.obs.stopReplayBuffer();
        break;
      case 'savereplaybuffer':
        await this.obs.saveReplayBuffer();
        break;
      case 'addsceneitem':
        var sceneName = triggerData[2];
        var sourceName = triggerData[3];
        var status = (triggerData[4] && triggerData[4].toLowerCase() === 'off') ? false : true;
        await this.obs.addSceneItem(sceneName, sourceName, status)
        break;
      case 'scene':
        var currentScene = await this.obs.getCurrentScene();
        var scene = triggerData.slice(2).join(' ');
        await this.obs.setCurrentScene(scene);
        return {previous_scene: currentScene.name};
        break;
      case 'scenesource':
        var scene = triggerData[2];
        var source = triggerData.slice(3, triggerData.length - 1).join(' ');
        var status = triggerData[triggerData.length - 1].toLowerCase();
        if (status === 'toggle') {
          var data = await this.obs.getSceneItemProperties(scene, source);
          status = ! data.visible;
        } else {
          status = status === 'on' ? true : false;
        }
        await this.obs.setSourceVisibility(source, status, scene);
        break;
      case 'source':
        var filterIndex = triggerData.indexOf('filter');
        if (filterIndex === -1) {
          filterIndex = triggerData.indexOf('Filter');
        }
        var urlIndex = triggerData.indexOf('url');
        if (urlIndex === -1) {
          urlIndex = triggerData.indexOf('URL');
        }
        if (urlIndex === -1) {
          urlIndex = triggerData.indexOf('Url');
        }
        var textIndex = triggerData.indexOf('text');
        if (textIndex === -1) {
          textIndex = triggerData.indexOf('TEXT');
        }
        if (textIndex === -1) {
          textIndex = triggerData.indexOf('Text');
        }
        if (filterIndex === -1 && urlIndex === -1 && textIndex == -1) {
          var source = triggerData.slice(2, triggerData.length - 1).join(' ');
          var status = triggerData[triggerData.length - 1].toLowerCase();
          if (status === 'toggle') {
            var data = await this.obs.getSceneItemProperties(undefined, source);
            status = ! data.visible;
          } else {
            status = status === 'on' ? true : false;
          }
          await this.obs.setSourceVisibility(source, status);
        } else if (filterIndex === -1 && urlIndex !== -1 && textIndex === -1) {
          var source = triggerData.slice(2, urlIndex).join(' ');
          var url = triggerData[triggerData.length - 1];
          await this.obs.setBrowserSourceURL(source, url);
        } else if (filterIndex === -1 && urlIndex === -1 && textIndex !== -1) {
          var source = triggerData.slice(2, textIndex).join(' ');
          var text = triggerData[triggerData.length - 1];
          await this.obs.setSourceText(source, text);
        }
        else {
          var source = triggerData.slice(2, filterIndex).join(' ');
          var filter = triggerData.slice(filterIndex + 1, triggerData.length - 1).join(' ');
          var status = triggerData[triggerData.length - 1].toLowerCase();
          if (status === 'toggle') {
            var data = await this.obs.getSourceFilters(source);
            var filters = data.filters;
            filters.forEach((item, i) => {
              if (item.name === filter) {
                status = ! item.enabled;
              }
            });
            if (status === 'toggle') {
              console.error('Unable to find filter with name: ' + filter);
            }
          } else {
            status = status === 'on' ? true : false;
          }
          await this.obs.setFilterVisibility(source, filter, status);
        }
        break;
      case 'refresh':
        var source = triggerData.slice(2).join(' ');
        await this.obs.refreshBrowser(source);
        break;
      case 'takesourcescreenshot':
        var source = triggerData.slice(2, triggerData.length - 1).join(' ');
        var filePath = triggerData[triggerData.length - 1];
        await this.obs.takeSourceScreenshot(source, filePath);
        break;
      case 'send':
        var message = triggerData[2];
        var data = '';
        if (triggerData.length > 3) {
          data = triggerData.slice(3).join(' ');
        }
        await this.obs.broadcastCustomMessage(message, data);
        break;
      case 'mute':
        var source = triggerData.slice(2, triggerData.length - 1).join(' ');
        var status = triggerData[triggerData.length - 1].toLowerCase();
        if (status === 'toggle') {
          await this.obs.toggleMute(source);
        } else {
          status = status === 'on' ? true : false;
          await this.obs.setMute(source, status);
        }
        break;
      case 'volume':
        var source = triggerData.slice(2, triggerData.length - 1).join(' ');
        var currentAudio = await this.obs.getVolume(source);
        var volume = parseFloat(triggerData[triggerData.length - 1]);
        if (!isNan(volume)) {
          await this.obs.setVolume(source, volume);
        } else {
          console.error('Unable to parse volume value: ' + triggerData[triggerData.length - 1]);
        }
        return {previous_volume: currentAudio.volume};
        break;
      case 'position':
        var scene = triggerData[2];
        if (scene === '{current}') {
          var currentScene = await this.obs.getCurrentScene();
          scene = currentScene.name;
        }
        var item = triggerData[3];
        var data = await this.obs.getSceneItemProperties(scene, item);
        var x = parseFloat(triggerData[4]);
        var y = parseFloat(triggerData[5]);
        await this.obs.setSceneItemPosition(scene, item, x, y);
        return {
          init_x: data.position.x,
          init_y: data.position.y
        }
        break;
      case 'size':
        var scene = triggerData[2];
        if (scene === '{current}') {
          var currentScene = await this.obs.getCurrentScene();
          scene = currentScene.name;
        }
        var item = triggerData[3];
        var data = await this.obs.getSceneItemProperties(scene, item);
        var scaleX = parseFloat(triggerData[4]) / parseFloat(data.sourceWidth);
        var scaleY = parseFloat(triggerData[5]) / parseFloat(data.sourceHeight);
        await this.obs.setSceneItemSize(scene, item, scaleX, scaleY);
        return {
          init_width: data.width,
          init_height: data.height
        }
        break;
      case 'version':
        var data = await this.obs.getVersion();
        return { version: data.obsWebsocketVersion };
      default:
        break;
    }
    return;
  }
}

/**
 * Create a handler and read user settings
 */
async function obsHandlerExport() {
  var obsHandler = new OBSHandler();
  var address = await readFile('settings/obs/address.txt');
  var password = await readFile('settings/obs/password.txt');
  obsHandler.init(address.trim(), password.trim());
}
obsHandlerExport();
