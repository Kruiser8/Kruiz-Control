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
  obs.connect({ address: address, password: password }).then(() => {
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

  obs.getCurrentScene = async function() {
    return await this.send('GetCurrentScene')
    .then(data => {
      return data;
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  obs.getSourceVisibility = async function(scene, source) {
    return await this.send('GetSceneItemProperties', {
      'item': source,
      'scene-name': scene
    }).then(data => {
      return data;
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  obs.getSourceActiveStatus = async function(source) {
    return await this.send('GetSourceActive', {
      'sourceName': source
    }).then(data => {
      return data;
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  obs.setSourceVisibility = async function(source, enabled, scene) {
    if (scene) {
      await this.send('SetSceneItemProperties', {
        'item': source,
        'visible': enabled,
        'scene-name': scene
      }).catch(err => {
        // Promise convention dictates you have a catch on every chain.
        console.error(JSON.stringify(err));
      });
    } else {
      await this.send('SetSceneItemProperties', {
        'item': source,
        'visible': enabled
      }).catch(err => {
        // Promise convention dictates you have a catch on every chain.
        console.error(JSON.stringify(err));
      });
    }
  };

  obs.setFilterVisibility = async function(source, filter, enabled) {
    await this.send('SetSourceFilterVisibility', {
      'sourceName': source,
      'filterName': filter,
      'filterEnabled': enabled
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  obs.setCurrentScene = async function(scene) {
    await this.send('SetCurrentScene', {
      'scene-name': scene
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  obs.setMute = async function(source, enabled) {
    await this.send('SetMute', {
      'source': source,
      'mute': enabled
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  obs.toggleMute = async function(source) {
    await this.send('ToggleMute', {
      'source': source,
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  obs.getVersion = async function() {
    return await this.send('GetVersion')
    .then(data => {
      return data;
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  obs.getVolume = async function(source) {
    return await this.send('GetVolume', {
      'source': source
    }).then(data => {
      return data;
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  obs.setVolume = async function(source, volume) {
    await this.send('SetVolume', {
      'source': source,
      'volume': volume
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  obs.takeSourceScreenshot = async function(source, filePath) {
    await this.send('TakeSourceScreenshot', {
      sourceName: source,
      saveToFilePath: filePath
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  obs.playPauseMedia = async function(sourceName, playPause) {
    await this.send('PlayPauseMedia', {
      'sourceName': sourceName,
      'playPause': playPause
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  obs.restartMedia = async function(sourceName) {
    await this.send('RestartMedia', {
      'sourceName': sourceName
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  obs.stopMedia = async function(sourceName) {
    await this.send('StopMedia', {
      'sourceName': sourceName
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  obs.getMediaDuration = async function(sourceName) {
    return await this.send('GetMediaDuration', {
      'sourceName': sourceName
    }).then(data => {
      return data;
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  /**
   * Set the path of a media source.
   * @param {string} source
   * @param {string} path
   * @return {Promise<void>}
   */
  obs.setMediaSourcePath = async function(source, path) {
    await this.send('SetSourceSettings', {
      'sourceName': source,
      'sourceType': 'ffmpeg_source',
      'sourceSettings': {
        'local_file': path
      }
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  /**
   * Set the URL of a browser source.
   * @param {string} source
   * @param {string} url
   * @return {Promise<void>}
   */
  obs.setBrowserSourceURL = async function(source, url) {
    await this.send('SetSourceSettings', {
      'sourceName': source,
      'sourceType': 'browser_source',
      'sourceSettings': {
        'url': url
      }
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  obs.setSourceText = async function(source, text) {
    await this.send('SetSourceSettings', {
      'sourceName': source,
      'sourceSettings': {
        'text': text
      }
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  obs.startStream = async function() {
    await this.send('StartStreaming').catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  obs.stopStream = async function() {
    await this.send('StopStreaming').catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  obs.startReplayBuffer = async function() {
    await this.send('StartReplayBuffer').catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  obs.stopReplayBuffer = async function() {
    await this.send('StopReplayBuffer').catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  obs.saveReplayBuffer = async function() {
    await this.send('SaveReplayBuffer').catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  obs.broadcastCustomMessage = async function(message, data) {
    await this.send('BroadcastCustomMessage', {
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

  obs.refreshBrowser = async function(sourceName) {
    await this.send('RefreshBrowserSource', {
      'sourceName': sourceName
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  obs.addSceneItem = async function(scene, source, status) {
    await this.send('AddSceneItem', {
      'sceneName': scene,
      'sourceName': source,
      'setVisible': status
    }).catch(err => { // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  obs.getSceneItemProperties = async function(scene, item) {
    var data = await this.send('GetSceneItemProperties', {
      'scene-name': scene,
      'item': item
    }).catch(err => { // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
    return data;
  }

  obs.getSourceFilters = async function(source) {
    var data = await this.send('GetSourceFilters', {
      'sourceName': source
    }).catch(err => { // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
    return data;
  }

  obs.setSceneItemPosition = async function(scene, item, x, y) {
    await this.send('SetSceneItemProperties', {
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
    await this.send('SetSceneItemProperties', {
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
    return await this.send('GetCurrentTransition')
    .then(data => {
      return data;
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  obs.setCurrentTransition = async function(transition) {
    await this.send('SetCurrentTransition', {
      'transition-name': transition
    }).catch(err => {
      // Promise convention dictates you have a catch on every chain.
      console.error(JSON.stringify(err));
    });
  };

  return obs;
}
