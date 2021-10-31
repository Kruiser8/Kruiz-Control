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
    var action = Parser.getAction(triggerData, 'TTS');
    if (action === 'stop') {
      responsiveVoice.cancel();
      Object.keys(this.resolve).forEach(key => {
        this.resolve[key]();
        delete this.resolve[key];
      });
    } else {
      var { voice, volume, wait, message } = Parser.getInputs(triggerData, ['voice', 'volume', 'wait', 'message']);
      volume = parseInt(volume);
      if (isNaN(volume)) {
        volume = 80;
      } else {
        volume = volume / 100;
      }
      if (wait === 'wait') {
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
