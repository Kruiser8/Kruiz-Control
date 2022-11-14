/**
* Connect to the OBS websocket and setup the event handlers
* @param {string} address obs websocket address
* @param {string} password obs websocket password
* @param {Handler} obsHandler handler to mark successful initialization
* @param {function} onSwitchScenes handle switch scene messages
* @param {function} onTransitionBegin handle transition starts
* @param {function} onStreamStateChange handle stream state change messages
* @param {function} onCustomMessage handle custom messages
* @param {function} onOBSSourceVisibility handle scene item visibility changes
* @param {function} onOBSSourceFilterVisibility handle source filter visibility changes
*/
function connectOBSWebsocket(address, password, obsHandler, onSwitchScenes, onTransitionBegin, onStreamStateChange, onCustomMessage, onOBSSourceVisibility, onOBSSourceFilterVisibility) {
  var obs = new OBSWebSocket();
  obs.connect(address, password).then(async () => {
    obs.getVersion().then(data => {
      console.error(`Kruiz Control connected to the OBS Websocket v${data.obsWebSocketVersion}`);
    });
    obsHandler.setCurrentScene(await obs.getCurrentScene());
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

  obs.on('CurrentProgramSceneChanged', onSwitchScenes);
  obs.on('SceneTransitionStarted', onTransitionBegin);
  obs.on('StreamStateChanged', onStreamStateChange);
  obs.on('CustomEvent', onCustomMessage);
  obs.on('SceneItemEnableStateChanged', onOBSSourceVisibility);
  obs.on('SourceFilterEnableStateChanged', onOBSSourceFilterVisibility);

  obs.getInputSettings = async function(source) {
    return await this.call('GetInputSettings', {
      'inputName': source
    }).then(data => {
      return data;
    })
  }

  obs.getSceneItemId = async function(scene, source) {
    return await obs.call('GetSceneItemId', {
      sceneName: scene,
      sourceName: source
    }).then(data => {
      return data.sceneItemId;
    }).catch(async err => {
      if (err.code === 600) {
        var group = await this.getSourceGroupName(scene, source);
        if (group) {
          return await this.getSceneItemId(group, source);
        }
      }
      console.error(JSON.stringify(err));
    });
  }

  obs.getSceneItemName = async function(scene, sceneItemId) {
    return await this.call('GetSceneItemList', {
      sceneName: scene
    }).then(data => {
      for (var item of data.sceneItems) {
        if (item.sceneItemId === sceneItemId) {
          return item.sourceName;
        }
      };
    }).catch(async err => {
      if (err.code === 602) {
        return await this.call('GetGroupSceneItemList', {
          sceneName: scene
        }).then(data => {
          for (var item of data.sceneItems) {
            if (item.sceneItemId === sceneItemId) {
              return item.sourceName;
            }
          };
        }).catch(groupError => {
          console.error(JSON.stringify(groupError));
        });
      } else {
        console.error(JSON.stringify(err));
      }
    });
  }

  obs.getScenesForGroup = async function(group) {
    return await this.call('GetSceneList').then(async data => {
      var scenes = data.scenes.map(item => item.sceneName)
      if (scenes.indexOf(group) !== -1) {
        return [group];
      }
      var groupScenes = [];
      for (var item of scenes) {
        await this.call('GetSceneItemList', {
          sceneName: item
        }).then(sceneItems => {
          for (var subitem of sceneItems.sceneItems) {
            if (subitem.sourceName === group) {
              groupScenes.push(item);
            }
          };
        }).catch(sceneItemsError => {
          console.error(JSON.stringify(sceneItemsError));
        });
      };
      return groupScenes;
    }).catch(groupError => {
      console.error(JSON.stringify(groupError));
    });
  }

  // Get the group the contains the provided source within the given scene
  obs.getSourceGroupName = async function(scene, source) {
    return await this.call('GetSceneItemList', {
      sceneName: scene
    }).then(async data => {
      // Identify groups
      for (var item of data.sceneItems) {
        if (item.isGroup) {
          // Get sources within group until match is found
          var result = await this.call('GetGroupSceneItemList', {
            sceneName: item.sourceName
          }).then(data => {
            for (var subitem of data.sceneItems) {
              if (subitem.sourceName === source) {
                return item.sourceName;
              }
            };
          }).catch(groupError => {
            console.error(JSON.stringify(groupError));
          });
          if (result) {
            return result;
          }
        }
      }
    }).catch(async err => {
      console.error(JSON.stringify(err));
    });
  }

  obs.setInputSettings = async function(source, inputSettings) {
    await this.call('SetInputSettings', {
      'inputName': source,
      'inputSettings': inputSettings
    }).catch(err => {
      console.error(JSON.stringify(err));
    });
  }

  obs.getMediaInputStatus = async function(source) {
    return await this.call('GetMediaInputStatus', {
      'inputName': source
    }).then(data => {
      return data;
    }).catch(err => {
      console.error(JSON.stringify(err));
    });
  }

  obs.getMediaDuration = async function(source) {
    return await this.getMediaInputStatus(source)
    .then(data => {
      return data.mediaDuration;
    }).catch(err => {
      console.error(JSON.stringify(err));
    });
  }

  obs.getCurrentScene = async function() {
    return await this.call('GetCurrentProgramScene')
    .then(data => {
      return data.currentProgramSceneName;
    }).catch(err => {
      console.error(JSON.stringify(err));
    });
  };

  obs.getSourceVisibility = async function(scene, source) {
    return await this.call('GetSceneItemEnabled', {
      sceneName: scene,
      sceneItemId: await this.getSceneItemId(scene, source)
    }).then(data => {
      return data.sceneItemEnabled;
    }).catch(async err => {
      if (err.code === 600) {
        var group = await this.getSourceGroupName(scene, source);
        if (group) {
          return await this.getSourceVisibility(group, source);
        }
      }
      console.error(JSON.stringify(err));
    });
  };

  obs.getSourceActiveStatus = async function(source) {
    return await this.call('GetSourceActive', {
      'sourceName': source
    }).then(data => {
      return data.videoActive;
    }).catch(err => {
      console.error(JSON.stringify(err));
    });
  };

  obs.setSourceVisibility = async function(source, enabled, scene) {
    if (!scene) {
      scene = await this.getCurrentScene();
    }
    await this.call('SetSceneItemEnabled', {
      'sceneItemId': await this.getSceneItemId(scene, source),
      'sceneName': scene,
      'sceneItemEnabled': enabled
    }).catch(async err => {
      if (err.code === 600) {
        var group = await this.getSourceGroupName(scene, source);
        if (group) {
          await this.setSourceVisibility(source, enabled, group);
          return;
        }
      }
      console.error(JSON.stringify(err));
    });
  };

  obs.setFilterVisibility = async function(source, filter, enabled) {
    await this.call('SetSourceFilterEnabled', {
      'sourceName': source,
      'filterName': filter,
      'filterEnabled': enabled
    }).catch(err => {
      console.error(JSON.stringify(err));
    });
  };

  obs.setCurrentScene = async function(scene) {
    await this.call('SetCurrentProgramScene', {
      'sceneName': scene
    }).catch(err => {
      console.error(JSON.stringify(err));
    });
  };

  obs.setMute = async function(source, enabled) {
    await this.call('SetInputMute', {
      'inputName': source,
      'inputMuted': enabled
    }).catch(err => {
      console.error(JSON.stringify(err));
    });
  };

  obs.toggleMute = async function(source) {
    return await this.call('ToggleInputMute', {
      'inputName': source,
    }).then(data => {
      return data.inputMuted;
    }).catch(err => {
      console.error(JSON.stringify(err));
    });
  };

  obs.getVersion = async function() {
    return await this.call('GetVersion')
    .then(data => {
      return data;
    }).catch(err => {
      console.error(JSON.stringify(err));
    });
  };

  obs.getVolume = async function(source) {
    return await this.call('GetInputVolume', {
      'inputName': source
    }).then(data => {
      return data;
    }).catch(err => {
      console.error(JSON.stringify(err));
    });
  };

  obs.setVolume = async function(source, volume, useDecibel) {
    const inputVolumeType = (useDecibel === true) ? 'inputVolumeDb' : 'inputVolumeMul';
    await this.call('SetInputVolume', {
      'inputName': source,
      [inputVolumeType]: volume,
    }).catch(err => {
      console.error(JSON.stringify(err));
    });
  };

  obs.takeSourceScreenshot = async function(source, filePath) {
    let imageFormat = filePath.split('.').pop();
    await this.call('SaveSourceScreenshot', {
      'sourceName': source,
      'imageFilePath': filePath,
      'imageFormat': imageFormat
    }).catch(err => {
      console.error(JSON.stringify(err));
    });
  };

  obs.triggerMediaInputAction = async function(sourceName, mediaAction) {
    await this.call('TriggerMediaInputAction', {
      'inputName': sourceName,
      'mediaAction': mediaAction
    }).catch(err => {
      console.error(JSON.stringify(err));
    });
  };

  obs.startStream = async function() {
    await this.call('StartStream').catch(err => {
      console.error(JSON.stringify(err));
    });
  };

  obs.stopStream = async function() {
    await this.call('StopStream').catch(err => {
      console.error(JSON.stringify(err));
    });
  };

  obs.startReplayBuffer = async function() {
    await this.call('StartReplayBuffer').catch(err => {
      console.error(JSON.stringify(err));
    });
  };

  obs.stopReplayBuffer = async function() {
    await this.call('StopReplayBuffer').catch(err => {
      console.error(JSON.stringify(err));
    });
  };

  obs.saveReplayBuffer = async function() {
    await this.call('SaveReplayBuffer').catch(err => {
      console.error(JSON.stringify(err));
    });
  };

  obs.broadcastCustomMessage = async function(message, data) {
    await this.call('BroadcastCustomEvent', {
      'eventData': {
        'realm': 'kruiz-control',
        'data': {
          'message': message,
          'data': data
        }
      }
    }).catch(err => {
      console.error(JSON.stringify(err));
    });
  };

  obs.refreshBrowser = async function(sourceName) {
    await this.call('PressInputPropertiesButton', {
      'inputName': sourceName,
      'propertyName': 'refreshnocache'
    }).catch(err => {
      console.error(JSON.stringify(err));
    });
  };

  obs.addSceneItem = async function(scene, source, status) {
    await this.call('CreateSceneItem', {
      'sceneName': scene,
      'sourceName': source,
      'sceneItemEnabled': status
    }).catch(err => {
      console.error(JSON.stringify(err));
    });
  };

  obs.getSceneItemTransform = async function(scene, source) {
    var data = await this.call('GetSceneItemTransform', {
      'sceneName': scene,
      'sceneItemId': await this.getSceneItemId(scene, source)
    }).catch(async err => {
      if (err.code === 600) {
        var group = await this.getSourceGroupName(scene, source);
        if (group) {
          return await this.getSceneItemTransform(group, source);
        }
      }
      console.error(JSON.stringify(err));
    });
    return data;
  }

  obs.getSceneItemPosition = async function(scene, source) {
    return await this.getSceneItemTransform(scene, source)
    .then(data => {
      return {
        x: data.sceneItemTransform.positionX,
        y: data.sceneItemTransform.positionY
      };
    });
  }

  obs.setSceneItemPosition = async function(scene, source, x, y) {
    await this.call('SetSceneItemTransform', {
      'sceneName': scene,
      'sceneItemId': await this.getSceneItemId(scene, source),
      'sceneItemTransform': {
        'positionX': x,
        'positionY': y
      }
    }).catch(async err => {
      if (err.code === 600) {
        var group = await this.getSourceGroupName(scene, source);
        if (group) {
          await this.setSceneItemPosition(group, source, x, y);
          return;
        }
      }
      console.error(JSON.stringify(err));
    });
  };

  obs.getSourceFilter = async function(source, filter) {
    return await this.call('GetSourceFilter', {
      'sourceName': source,
      'filterName': filter
    }).catch(err => {
      console.error(JSON.stringify(err));
    });
  }

  obs.getSceneItemSize = async function(scene, source) {
    return await this.getSceneItemTransform(scene, source)
    .then(data => {
      return {
        height: data.sceneItemTransform.height,
        sourceHeight: data.sceneItemTransform.sourceHeight,
        sourceWidth: data.sceneItemTransform.sourceWidth,
        width: data.sceneItemTransform.width
      };
    }).catch(err => {
      console.error(JSON.stringify(err));
    });
  }

  obs.setSceneItemSize = async function(scene, source, scaleX, scaleY) {
    await this.call('SetSceneItemTransform', {
      'sceneName': scene,
      'sceneItemId': await this.getSceneItemId(scene, source),
      'sceneItemTransform': {
        'scaleX': scaleX,
        'scaleY': scaleY
      }
    }).catch(async err => {
      if (err.code === 600) {
        var group = await this.getSourceGroupName(scene, source);
        if (group) {
          await this.setSceneItemSize(group, source, scaleX, scaleY);
          return;
        }
      }
      console.error(JSON.stringify(err));
    });
  };

  obs.setSceneItemRotation = async function(scene, source, rotation) {
    await this.call('SetSceneItemTransform', {
      'sceneName': scene,
      'sceneItemId': await this.getSceneItemId(scene, source),
      'sceneItemTransform': {
        'rotation': rotation
      }
    }).catch(async err => {
      if (err.code === 600) {
        var group = await this.getSourceGroupName(scene, source);
        if (group) {
          await this.setSceneItemRotation(group, source, rotation);
          return;
        }
      }
      console.error(JSON.stringify(err));
    });
  };

  obs.getCurrentTransition = async function() {
    return await this.call('GetCurrentSceneTransition')
    .then(data => {
      return data.transitionName;
    }).catch(err => {
      console.error(JSON.stringify(err));
    });
  };

  obs.setCurrentTransition = async function(transition) {
    await this.call('SetCurrentSceneTransition', {
      'transitionName': transition
    }).catch(err => {
      console.error(JSON.stringify(err));
    });
  };

  obs.getStats = async function() {
    return await this.call('GetStats').then(data => {
      return data;
    }).catch(err => {
      console.error(JSON.stringify(err));
    });
  }

  return obs;
}
