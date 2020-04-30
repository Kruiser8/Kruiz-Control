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
*/
function connectOBSWebsocket(address, password, obsHandler, onSwitchScenes, onTransitionBegin, onStreamStarted, onStreamStopped, onCustomMessage) {
  var obs = new OBSWebSocket();
  obs.connect({ address: address, password: password }).then(() => {
    obsHandler.success();
  }).catch(err => { // Promise convention dicates you have a catch on every chain.
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

  obs.on('SwitchScenes', onSwitchScenes);
  obs.on('TransitionBegin', onTransitionBegin);
  obs.on('StreamStarted', onStreamStarted);
  obs.on('StreamStopped', onStreamStopped);
  obs.on('BroadcastCustomMessage', onCustomMessage);

  obs.getCurrentScene = async function() {
    return await this.send('GetCurrentScene').catch(err => {
      // Promise convention dicates you have a catch on every chain.
      console.error(err);
    });
  };

  obs.setSourceVisibility = async function(source, enabled, scene) {
    if (scene) {
      await this.send('SetSceneItemProperties', {
        'item': source,
        'visible': enabled,
        'scene-name': scene
      }).catch(err => {
        // Promise convention dicates you have a catch on every chain.
        console.error(err);
      });
    } else {
      await this.send('SetSceneItemProperties', {
        'item': source,
        'visible': enabled
      }).catch(err => {
        // Promise convention dicates you have a catch on every chain.
        console.error(err);
      });
    }
  };

  obs.setFilterVisibility = async function(source, filter, enabled) {
    await this.send('SetSourceFilterVisibility', {
      'sourceName': source,
      'filterName': filter,
      'filterEnabled': enabled
    }).catch(err => {
      // Promise convention dicates you have a catch on every chain.
      console.error(err);
    });
  };

  obs.setCurrentScene = async function(scene) {
    await this.send('SetCurrentScene', {
      'scene-name': scene
    }).catch(err => {
      // Promise convention dicates you have a catch on every chain.
      console.error(err);
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
      // Promise convention dicates you have a catch on every chain.
      console.error(err);
    });
  };

  return obs;
}
