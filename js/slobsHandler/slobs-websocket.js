/**
 * Connect to Streamlabs OBS JSON RPC API and setup the event handlers
 * @param {function} onSwitchScenes handle switch scene messages
 * @param {function} onStreamStart handle stream start messages
 * @param {function} onStreamStop handle stream stop messages
 */
 function connectSLOBSWebsocket(onSwitchScenes, onStreamStarted, onStreamStopped) {
  var socket = new SockJS('http://127.0.0.1:59650/api');
  var slobsSocket = {
    requestId: 1,
    socket: socket,
    scenes: {},
    activeScene: ''
  };

  socket.onopen = () => {
    slobsSocket.sendSLOBS("getScenes", "ScenesService");
    slobsSocket.sendSLOBS("activeScene", "ScenesService");
    slobsSocket.sendSLOBS("sceneSwitched", "ScenesService");
    slobsSocket.sendSLOBS("sceneAdded", "ScenesService");
    slobsSocket.sendSLOBS("sceneRemoved", "ScenesService");
  };

  socket.onmessage = (e) => {
    if (e.type === 'message') {
      var data = JSON.parse(e.data);
      if (data.id === 1) {
        data.result.forEach(scene => {
          slobsSocket.scenes[scene.name] = scene;
        });
      } else if (data.id === 2) {
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
      }
    }
  };

  socket.onclose = (e) => {
    console.log('Closed SLOBS connection', e);
  };

  slobsSocket.setCurrentScene = function(scene) {
    if (slobsSocket.scenes[scene]) {
      slobsSocket.sendSLOBS('makeSceneActive', 'ScenesService', [slobsSocket.scenes[scene].id])
    } else {
      console.error('No scene found with name', scene);
    }
  }

  slobsSocket.setSourceVisibility = function(source, enabled) {
    if (slobsSocket.activeScene && slobsSocket.scenes[slobsSocket.activeScene]) {
      var scene = slobsSocket.scenes[slobsSocket.activeScene];
      scene.nodes.forEach(sceneItem => {
        if (sceneItem.name === source) {
          var sceneItemId = `SceneItem["${scene.id}","${sceneItem.id}","${sceneItem.sourceId}"]`;
          slobsSocket.sendSLOBS("setVisibility", sceneItemId, [enabled]);
        }
      });
    }
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
  }

  return slobsSocket;
}
