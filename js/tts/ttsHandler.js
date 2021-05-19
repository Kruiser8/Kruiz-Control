class TTSHandler extends Handler {
  /**
   * Create a new TTS handler.
   */
  constructor() {
    super('TTS', []);
    this.success();
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
   */
  async handleData(triggerData) {
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
        responsiveVoice.speak(message, voice, {volume: volume, onend: resolve})
      });
    } else {
      responsiveVoice.speak(message, voice, {volume: volume});
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
