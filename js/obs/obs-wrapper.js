/**
* Connect to the OBS websocket and setup the event handlers
* @param {string} address obs websocket address
* @param {string} password obs websocket password
* @param {Handler} obsHandler handler to mark successful initialization
* @param {function} onSwitchScenes handle switch scene messages
* @param {function} onTransitionBegin handle transition starts
* @param {function} onStreamStart handle stream start messages
* @param {function} onStreamStop handle stream stop messages
* @param {function} onCustomMessage handle custom messages
* @param {function} onOBSSourceVisibility handle scene item visibility changes
* @param {function} onOBSSourceFilterVisibility handle source filter visibility changes
*/
function connectOBSWebsocket(address, password, obsHandler, onSwitchScenes, onTransitionBegin, onStreamStarted, onStreamStopped, onCustomMessage, onOBSSourceVisibility, onOBSSourceFilterVisibility) {
  var obs = new OBSWebSocket();
  obs.connect(address, password).then(() => {
    obsHandler.success();
  }).catch(err => { // Promise convention dictates you have a catch on every chain.
    console.error(JSON.stringify(err));
  });


  // You must add this handler to avoid uncaught exceptions.
  obs.on('error', err => {
    console.log('socket error:', err);
    console.error('socket error:', err);
  });

  // Ws OnClose : try reconnect
  obs.on('onclose', function() {
    console.log('OBS Websocket Closed');
  });

  obs.on('Exiting', function() {
    obs.disconnect();
  });

  obs.on('SwitchScenes', onSwitchScenes);
  obs.on('TransitionBegin', onTransitionBegin);
  obs.on('StreamStarted', onStreamStarted);
  obs.on('StreamStopped', onStreamStopped);
  obs.on('BroadcastCustomMessage', onCustomMessage);
  obs.on('SceneItemVisibilityChanged', onOBSSourceVisibility);
  obs.on('SourceFilterVisibilityChanged', onOBSSourceFilterVisibility);

  //Timb Updated
  obs._getInputSettings = async function(source) {
    return await this.call('GetInputSettings', {
      'inputName': source
    }).then(data => {
      return data;
    })
  }

  obs._getSceneItemId = async function(scene, source) {
    const { sceneItemId } = await obs.call('GetSceneItemId', { sceneName: scene, sourceName: source });
    return sceneItemId;
  }

  //Timb Updated
  obs.setInputSettings = async function(source, inputSettings) {
    await this.call('SetInputSettings', {
      'inputName': source,
      'inputSettings': inputSettings
    });
  }

  //Timb Updated
  obs.getMediaInputStatus = async function(source) {
    return await this.call('GetMediaInputStatus', {
      'inputName': source
    }).then(data => {
      return data;
    });
  }

  obs.getCurrentScene = async function() {
    return await this.call('GetCurrentProgramScene')
    .then(data => {
      return data.currentProgramSceneName;
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  obs.getSourceVisibility = async function(scene, source) {
    return await this.call('GetSceneItemEnabled', {
      sceneName: scene,
      sceneItemId: await this._getSceneItemId(scene, source)
    }).then(data => {
      return data.sceneItemEnabled;
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  obs.getSourceActiveStatus = async function(source) {
    return await this.call('GetSourceActive', {
      'sourceName': source
    }).then(data => {
      return data.videoActive;
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  //Timb Updated
  obs.setSourceVisibility = async function(source, enabled, scene) {
    if (scene) {
      await this.call('SetSceneItemEnabled', {
        'sceneItemId': await this._getSceneItemId(scene, source),
        'sceneName': scene,
        'sceneItemEnabled': enabled
      }).catch(err => {
        console.error(JSON.stringify(err));
      });
    } else {
      let scene = await this.getCurrentScene();
      await this.call('SetSceneItemEnabled', {
        'sceneName': scene,
        'sceneItemId': await this._getSceneItemId(scene, source),
        'sceneItemEnabled': enabled
      }).catch(err => {
        console.error(JSON.stringify(err));
      });
    };
  };

  //Timb Updated
  obs.setFilterVisibility = async function(source, filter, enabled) {
    await this.call('SetSourceFilterEnabled', {
      'sourceName': source,
      'filterName': filter,
      'filterEnabled': enabled
    }).catch(err => {
      console.error(JSON.stringify(err));
    });
  };

  //Timb Updated
  obs.setCurrentScene = async function(scene) {
    await this.call('SetCurrentProgramScene', {
      'sceneName': scene
    }).catch(err => {
      console.error(JSON.stringify(err));
    });
  };

  //Timb Updated
  obs.setMute = async function(source, enabled) {
    await this.call('SetInputMute', {
      'inputName': source,
      'inputMuted': enabled
    }).catch(err => {
      console.error(JSON.stringify(err));
    });
  };

  //Timb Updated
  obs.toggleMute = async function(source) {
    return await this.call('ToggleInputMute', {
      'inputName': source,
    }).then(data => {
      return data.inputMuted;
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  //Timb Updated
  obs.getVersion = async function() {
    return await this.call('GetVersion')
    .then(data => {
      return data;
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  //Timb Updated
  obs.getVolume = async function(source) {
    return await this.call('GetInputVolume', {
      'inputName': source
    }).then(data => {
      return data;
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  //Timb Updated
  obs.setVolume = async function(source, volume, useDecibel) {
    let inputVolumeType = (useDecibel === true) ? 'inputVolumeDb' : 'inputVolumeMul';
    await this.call('SetInputVolume', {
      'inputName': source,
      [inputVolumeType]: volume,
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  //Timb Updated
  obs.takeSourceScreenshot = async function(source, filePath) {
    let imageFormat = filePath.split('.').pop();
    await this.call('SaveSourceScreenshot', {
      'sourceName': source,
      'imageFilePath': filePath,
      'imageFormat': imageFormat
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  //Timb Updated
  obs.triggerMediaInputAction = async function(sourceName, mediaAction) {
    await this.call('TriggerMediaInputAction', {
      'inputName': sourceName,
      'mediaAction': mediaAction
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  //Timb Updated
  obs.startStream = async function() {
    await this.call('StartStream').catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  //Timb Updated
  obs.stopStream = async function() {
    await this.call('StopStream').catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  //Timb Updated
  obs.startReplayBuffer = async function() {
    await this.call('StartReplayBuffer').catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  //Timb Updated
  obs.stopReplayBuffer = async function() {
    await this.call('StopReplayBuffer').catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  //Timb Updated
  obs.saveReplayBuffer = async function() {
    await this.call('SaveReplayBuffer').catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  //LET KRUISER MIGRATE THIS. TIMB TOO STUPID.
  obs.broadcastCustomMessage = async function(message, data) {
    await this.call('BroadcastCustomMessage', {
      'realm': 'kruiz-control',
      'data': {
        'message': message,
        'data': data
      }
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  //Timb Updated
  obs.refreshBrowser = async function(sourceName) {
    await this.call('PressInputPropertiesButton', {
      'inputName': sourceName,
      'propertyName': 'refreshnocache'
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  //Timb Updated
  obs.addSceneItem = async function(scene, source, status) {
    await this.call('CreateSceneItem', {
      'sceneName': scene,
      'sourceName': source,
      'sceneItemEnabled': status
    }).catch(err => { // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  obs.getSceneItemProperties = async function(scene, item) {
    var data = await this.call('GetSceneItemProperties', {
      'scene-name': scene,
      'item': item
    }).catch(err => { // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
    return data;
  }

  obs.getSourceFilters = async function(source) {
    var data = await this.call('GetSourceFilters', {
      'sourceName': source
    }).catch(err => { // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
    return data;
  }

  obs.setSceneItemPosition = async function(scene, item, x, y) {
    await this.call('SetSceneItemProperties', {
      'scene-name': scene,
      'item': item,
      'position': {
        'x': x,
        'y': y
      }
    }).catch(err => { // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  obs.setSceneItemSize = async function(scene, item, scaleX, scaleY) {
    await this.call('SetSceneItemProperties', {
      'scene-name': scene,
      'item': item,
      'scale': {
        'x': scaleX,
        'y': scaleY
	     }
    }).catch(err => { // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  obs.getCurrentTransition = async function() {
    return await this.call('GetCurrentTransition')
    .then(data => {
      return data;
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  obs.setCurrentTransition = async function(transition) {
    await this.call('SetCurrentTransition', {
      'transition-name': transition
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  return obs;
}
