/**
 * Connect to the Voicemod websocket.
 * @param {string} address host for the Voicemod API
 * @param {string} apiKey Voicemod API key
 */
function connectVoicemodWebsocket(address, apiKey) {
  var promises = {};
  var apiWrapper = {};

  //Connect to socket
  websocket = new WebSocket(address);

  websocket.onopen = () => {
    if (Debug.Voicemod || Debug.All) {
      console.error('Successfully opened the voicemod websocket');
    }
    send('registerClient', {
      clientKey: apiKey
    });
  };

  websocket.onclose = (evt) => {
    console.error('Voicemod websocket connection closed');
  };

  websocket.onerror = (err) => {
    console.error('Voicemod websocket error');
    console.error(JSON.stringify(err));
  };

  websocket.onmessage = (e) => {
    if (e.data) {
      message = JSON.parse(e.data);

      if (Debug.Voicemod || Debug.All) {
        console.error(e.data);
      }

      var messageId = message.id || message.actionId;

      if (promises[messageId]) {
        promises[messageId](message);
      }
    }
  }

  var send = async (action, payload) => {
    payload = payload || {};
    var id = uuidv4();
    var request = {
      id,
      action,
      payload
    };

    return await new Promise((resolve) => {
      promises[id] = resolve;
      websocket.send(JSON.stringify(request));
    });
  }

  apiWrapper.getVoices = async () => {
    var data = await send('getVoices');
    return data.payload.voices;
  }

  apiWrapper.getCurrentVoice = async () => {
    var data = await send('getVoices');
    if (data.getCurrentVoice === 'nofx') {
      return 'nofx';
    }

    var voice = data.actionObject.voices.filter(option => option.id === data.currentVoice)[0];
    return voice.friendlyName;
  }

  apiWrapper.getAllSoundboard = async () => {
    var data = await send('getAllSoundboard');
    return data.payload.soundboards;
  }

  apiWrapper.setVoice = async (voiceID) => {
    await send('loadVoice', {
      voiceID
    });
  }

  apiWrapper.setRandomVoice = async (mode) => {
    var payload = {};
    var modeOptions = {
      custom: "CustomVoices",
      favorite: "FavoriteVoices"
    }

    if (mode && modeOptions[mode]) {
      payload.mode = modeOptions[mode];
    }
    send('selectRandomVoice', payload);
  }

  apiWrapper.getHearMyselfStatus = async () => {
    var data = await send('getHearMyselfStatus');
    return data.actionObject.value;
  }

  apiWrapper.setHearMyselfStatus = async (status) => {
    if (status === 'toggle') {
      send('toggleHearMyVoice');
      return;
    }

    var currentStatus = await apiWrapper.getHearMyselfStatus();
    if (
      (status === 'on' && !currentStatus) ||
      (status === 'off' && currentStatus)
    ) {
      send('toggleHearMyVoice');
    }
  }

  apiWrapper.getVoiceChangerStatus = async () => {
    var data = await send('getVoiceChangerStatus');
    return data.actionObject.value;
  }

  apiWrapper.setVoiceChangerStatus = async (status) => {
    if (status === 'toggle') {
      send('toggleVoiceChanger');
      return;
    }

    var currentStatus = await apiWrapper.getVoiceChangerStatus();
    if (
      (status === 'on' && !currentStatus) ||
      (status === 'off' && currentStatus)
    ) {
      send('toggleVoiceChanger');
    }
  }

  apiWrapper.getBackgroundEffectStatus = async () => {
    var data = await send('getBackgroundEffectStatus');
    return data.actionObject.value;
  }

  apiWrapper.setBackgroundEffectStatus = async (status) => {
    if (status === 'toggle') {
      send('toggleBackground');
      return;
    }

    var currentStatus = await apiWrapper.getBackgroundEffectStatus();
    if (
      (status === 'on' && !currentStatus) ||
      (status === 'off' && currentStatus)
    ) {
      send('toggleBackground');
    }
  }

  apiWrapper.getMuteMicStatus = async () => {
    var data = await send('getMuteMicStatus');
    return data.actionObject.value;
  }

  apiWrapper.setMuteMicStatus = async (status) => {
    if (status === 'toggle') {
      send('toggleMuteMic');
      return;
    }

    var currentStatus = await apiWrapper.getMuteMicStatus();
    if (
      (status === 'on' && !currentStatus) ||
      (status === 'off' && currentStatus)
    ) {
      send('toggleMuteMic');
    }
  }

  apiWrapper.beep = async (duration) => {
    send('setBeepSound', { badLanguage: 1 });
    setTimeout(() => {
      send('setBeepSound', { badLanguage: 0 })
    }, duration);
  }

  apiWrapper.playAudio = async (FileName) => {
    send('playMeme', { FileName, "IsKeyDown": true });
  }

  apiWrapper.stopAudio = async () => {
    send('stopAllMemeSounds');
  }

  return apiWrapper;
}
