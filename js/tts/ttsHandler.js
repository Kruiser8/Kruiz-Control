class TTSHandler extends Handler {
  /**
   * Create a new TTS handler.
   */
  constructor() {
    super('TTS', []);
    this.success();
    this.resolve = {};
  }

  /**
   * Handle the input data (take an action).
   * @param {string} script script tag to add to the header
   */
  init(script) {
    $("head").append(script);
  }

  /**
   * Handle the input data (take an action).
   * @param {array} triggerData contents of trigger line
   * @param {array} parameters current trigger parameters
   */
  async handleData(triggerData, parameters) {
    if (triggerData[1].toLowerCase() == 'stop') {
      responsiveVoice.cancel();
      Object.keys(this.resolve).forEach(key => {
        this.resolve[key]();
        delete this.resolve[key];
      });
    } else {
      var voice = triggerData[1];
      var volume = parseInt(triggerData[2]);
      if (isNaN(volume)) {
        volume = 80;
      } else {
        volume = volume / 100;
      }
      var message = triggerData.slice(4).join(' ');
      if (triggerData[3] === 'wait') {
        await new Promise((resolve) => {
          this.resolve[parameters['_kc_event_id_']] = resolve;
          responsiveVoice.speak(message, voice, {volume: volume, onend: (value) => {
            delete this.resolve[parameters['_kc_event_id_']];
            resolve(value);
          }});
        });
      } else {
        responsiveVoice.speak(message, voice, {volume: volume});
      }
    }

    return;
  }
}

/**
 * Create a handler and read user settings
 */
async function ttsHandlerExport() {
  var ttsHandler = new TTSHandler();
  var tag = await readFile('settings/tts/tag.txt');
  ttsHandler.init(tag.trim());
}
ttsHandlerExport();
