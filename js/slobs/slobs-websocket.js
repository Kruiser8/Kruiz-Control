/**
 * Connect to Streamlabs OBS JSON RPC API and setup the event handlers
 * @param {Handler} slobsHandler handler to mark successful initialization
 * @param {string} token SLOBS API Token
 * @param {function} onSwitchScenes handle switch scene messages
 * @param {function} onStreamStart handle stream start messages
 * @param {function} onStreamStop handle stream stop messages
 */
 function connectSLOBSWebsocket(slobsHandler, token, onSwitchScenes, onStreamStarted, onStreamStopped) {
  var socket = new SockJS('http://127.0.0.1:59650/api');
  var slobsSocket = {
    requestId: 1,
    socket: socket,
    scenes: {},
    activeScene: '',
    responses: {}
  };

  socket.onopen = () => {
    slobsHandler.success();
    slobsSocket.sendSLOBS("auth", "TcpServerService", [token])
    slobsSocket.sendSLOBS("getScenes", "ScenesService");
    slobsSocket.sendSLOBS("activeScene", "ScenesService");
    slobsSocket.sendSLOBS("sceneSwitched", "ScenesService");
    slobsSocket.sendSLOBS("sceneAdded", "ScenesService");
    slobsSocket.sendSLOBS("sceneRemoved", "ScenesService");
    slobsSocket.sendSLOBS("streamingStatusChange", "StreamingService");
  };

  socket.onmessage = (e) => {
    if (e.type === 'message') {
      if (Debug.All || Debug.SLOBS) {
        console.error('SLOBS Message: ' + e.data);
      }
      var data = JSON.parse(e.data);
      if (data.id === 2) {
        data.result.forEach(scene => {
          slobsSocket.scenes[scene.name] = scene;
        });
      } else if (data.id === 3) {
        slobsSocket.activeScene = data.result.name;
      } else if (data.result && data.result.resourceId === 'ScenesService.sceneAdded' && data.result.data) {
        slobsSocket.scenes[data.result.data.name] = data.result.data;
      } else if (data.result && data.result.resourceId === 'ScenesService.sceneRemoved' && data.result.data) {
        delete slobsSocket.scenes[data.result.data.name];
      } else if (data.result && data.result.resourceId === 'ScenesService.sceneSwitched' && data.result.data) {
        slobsSocket.activeScene = data.result.data.name;
        onSwitchScenes(data.result.data);
      } else if (data.result && data.result.resourceId === 'StreamingService.streamingStatusChange' && data.result.data) {
        if (data.result.data === 'starting') {
          onStreamStarted();
        } else if (data.result.data === 'ending') {
          onStreamStopped();
        }
      } else if (slobsSocket.responses.hasOwnProperty(data.id.toString())) {
        slobsSocket.responses[data.id][0](data, ...slobsSocket.responses[data.id][1]);
        delete slobsSocket.responses[data.id];
      }
    }
  };

  socket.onclose = (e) => {
    console.log('Closed SLOBS connection', e);
  };

  slobsSocket.getCurrentScene = function() {
    return slobsSocket.activeScene;
  }

  slobsSocket.setCurrentScene = function(scene) {
    if (slobsSocket.scenes[scene]) {
      var current = slobsSocket.activeScene;
      slobsSocket.sendSLOBS('makeSceneActive', 'ScenesService', [slobsSocket.scenes[scene].id])
      return { previous_scene: current };
    } else {
      console.error('No scene found with name', scene);
    }
  }

  slobsSocket.setSourceVisibility = function(scene, source, enabled) {
    scene = scene || slobsSocket.activeScene;
    var sceneInfo = slobsSocket.scenes[scene];
    if (sceneInfo) {
      sceneInfo.nodes.forEach(sceneItem => {
        if (sceneItem.name === source) {
          var sceneItemId = `SceneItem["${sceneInfo.id}","${sceneItem.id}","${sceneItem.sourceId}"]`;
          slobsSocket.sendSLOBS("setVisibility", sceneItemId, [enabled]);
        }
      });
    }
  }

  slobsSocket.getSourceVisibility = async function(scene, source) {
    scene = scene || slobsSocket.activeScene;
    var sceneInfo = slobsSocket.scenes[scene];
    return await new Promise((resolve) => {
      var id = slobsSocket.sendSLOBS("getScene", "ScenesService", [sceneInfo.id]);
      slobsSocket.responses[id] = [this._getSourceVisibility, [resolve, source]];
    });
  }

  slobsSocket._getSourceVisibility = async function(sceneInfo, resolve, source) {
    sceneInfo.result.nodes.forEach(async sceneItem => {
      if (sceneItem.name === source) {
        resolve(sceneItem.visible);
      }
    });
  }

  slobsSocket.setFolderVisibility = function(scene, folder, enabled) {
    scene = scene || slobsSocket.activeScene;
    var sceneInfo = slobsSocket.scenes[scene];
    if (sceneInfo) {
      sceneInfo.nodes.forEach(sceneItem => {
        if (sceneItem.name === folder && sceneItem.sceneNodeType === 'folder') {
          sceneInfo.nodes.forEach(source => {
            if (sceneItem.childrenIds.indexOf(source.id) !== -1) {
              var sceneItemId = `SceneItem["${sceneInfo.id}","${source.id}","${source.sourceId}"]`;
              slobsSocket.sendSLOBS("setVisibility", sceneItemId, [enabled]);
            }
          });
        }
      });
    }
  }

  slobsSocket.flipSourceX = function(scene, source) {
    scene = scene || slobsSocket.activeScene;
    var sceneInfo = slobsSocket.scenes[scene];
    if (sceneInfo) {
      sceneInfo.nodes.forEach(sceneItem => {
        if (sceneItem.name === source) {
          var sceneItemId = `SceneItem["${sceneInfo.id}","${sceneItem.id}","${sceneItem.sourceId}"]`;
          slobsSocket.sendSLOBS("flipX", sceneItemId);
        }
      });
    }
  }

  slobsSocket.flipSourceY = function(scene, source) {
    scene = scene || slobsSocket.activeScene;
    var sceneInfo = slobsSocket.scenes[scene];
    if (sceneInfo) {
      sceneInfo.nodes.forEach(sceneItem => {
        if (sceneItem.name === source) {
          var sceneItemId = `SceneItem["${sceneInfo.id}","${sceneItem.id}","${sceneItem.sourceId}"]`;
          slobsSocket.sendSLOBS("flipY", sceneItemId);
        }
      });
    }
  }

  slobsSocket.setVolume = async function(source, volume) {
    return await new Promise((resolve) => {
      var id = slobsSocket.sendSLOBS("getSources", "AudioService");
      slobsSocket.responses[id] = [slobsSocket._setVolume, [resolve, source, volume]];
    });
  }

  slobsSocket._setVolume = async function(data, resolve, source, volume) {
    data.result.forEach((sourceByName, i) => {
      if (sourceByName.name === source) {
        resolve(sourceByName.fader.deflection);
        slobsSocket.sendSLOBS("setDeflection", sourceByName.resourceId, [volume]);
      }
    });
  }

  slobsSocket.rotateSource = function(scene, source, degree) {
    scene = scene || slobsSocket.activeScene;
    var sceneInfo = slobsSocket.scenes[scene];
    if (sceneInfo) {
      sceneInfo.nodes.forEach(sceneItem => {
        if (sceneItem.name === source) {
          var sceneItemId = `SceneItem["${sceneInfo.id}","${sceneItem.id}","${sceneItem.sourceId}"]`;
          slobsSocket.sendSLOBS("setTransform", sceneItemId, [{rotation: degree}]);
        }
      });
    }
  }

  slobsSocket.setAudioMute = function(source, isMuted) {
    var id = slobsSocket.sendSLOBS("getSourcesForCurrentScene", "AudioService");
    slobsSocket.responses[id] = [slobsSocket._setAudioMute, [source, isMuted]];
  }

  slobsSocket._setAudioMute = function(data, source, isMuted) {
    data.result.forEach((audioSource, i) => {
      if (audioSource.name === source) {
        if (isMuted == 'toggle') {
          isMuted = !audioSource.muted
        }
        slobsSocket.sendSLOBS("setMuted", audioSource.resourceId, [isMuted]);
      }
    });
  }

  slobsSocket.setPosition = function(scene, source, x, y) {
    scene = scene || slobsSocket.activeScene;
    var sceneInfo = slobsSocket.scenes[scene];
    if (sceneInfo) {
      sceneInfo.nodes.forEach(sceneItem => {
        if (sceneItem.name === source) {
          var sceneItemId = `SceneItem["${sceneInfo.id}","${sceneItem.id}","${sceneItem.sourceId}"]`;
          slobsSocket.sendSLOBS("setTransform", sceneItemId, [{position: { x: x, y: y} }]);
        }
      });
    }
  }

  slobsSocket.toggleStream = function() {
    slobsSocket.sendSLOBS("toggleStreaming", 'StreamingService');
  }

  slobsSocket.startReplayBuffer = function() {
    slobsSocket.sendSLOBS("startReplayBuffer", 'StreamingService');
  }

  slobsSocket.stopReplayBuffer = function() {
    slobsSocket.sendSLOBS("stopReplayBuffer", 'StreamingService');
  }

  slobsSocket.saveReplayBuffer = function() {
    slobsSocket.sendSLOBS("saveReplay", 'StreamingService');
  }

  slobsSocket.pushNotification = function(message) {
    slobsSocket.sendSLOBS("push", 'NotificationsService', [{message: message}]);
  }

  slobsSocket.sendSLOBS = function(method, resource, args) {
    args = args || [];
    var request = {
      jsonrpc: "2.0",
      method: method,
      params: {
        resource: resource,
        args: args
      },
      id: slobsSocket.requestId++
    }
    slobsSocket.socket.send(JSON.stringify(request));
    return request.id;
  }

  return slobsSocket;
}
