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
   * @param {array} triggerData contents of trigger line
   * @param {array} parameters current trigger parameters
   */
  async handleData(triggerData, parameters) {
    var action = Parser.getAction(triggerData, 'TTS');
    if (action === 'stop') {
      window.speechSynthesis.cancel();
    } else if (action === 'voices') {
      var { name } = Parser.getInputs(triggerData, ['action', 'name']);
      var listParser = controller.getParser("list");
      var voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        await timeout(1000);
        voices = window.speechSynthesis.getVoices();
      }
      listParser.createList(name, voices.map(voice => voice.name));
    } else {
      var { voice, volume, wait, message } = Parser.getInputs(triggerData, ['voice', 'volume', 'wait', 'message']);
      volume = parseInt(volume);
      if (isNaN(volume)) {
        volume = 0.8;
      } else {
        volume = volume / 100;
      }
      var msg = new SpeechSynthesisUtterance();
      msg.text = message;
      msg.volume = volume;

      if (wait === 'wait') {
        await new Promise((resolve) => {
          msg.addEventListener('end', value => {
            resolve(value);
          });
          window.speechSynthesis.speak(msg);
        });
      } else {
        window.speechSynthesis.speak(msg);
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
}
ttsHandlerExport();
