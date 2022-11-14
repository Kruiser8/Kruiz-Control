class TTSHandler extends Handler {
  /**
   * Create a new TTS handler.
   */
  constructor() {
    super('TTS', []);
    this.voices = {};
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
      this.updateVoices(voices);
      listParser.createList(name, voices.map(voice => voice.name));
    } else {
      var inputs = Parser.getInputs(triggerData, ['voice', 'volume', 'pitch', 'rate', 'wait', 'message']);
      if (Object.keys(inputs).length === 0) {
        inputs = Parser.getInputs(triggerData, ['voice', 'volume', 'wait', 'message']);
      }
      var { voice, volume, pitch, rate, wait, message } = inputs;

      volume = parseInt(volume);
      if (isNaN(volume)) {
        volume = 0.8;
      } else {
        volume = volume / 100;
      }

      pitch = parseInt(pitch);
      if (isNaN(pitch)) {
        pitch = 1;
      } else {
        pitch = pitch / 100 * 2;
      }

      rate = parseInt(rate);
      if (isNaN(rate)) {
        rate = 1;
      } else {
        rate = (rate / 100 * 9.9) + 0.1;
      }

      var msg = new SpeechSynthesisUtterance();
      msg.text = message;
      msg.volume = volume;
      msg.pitch = pitch;
      msg.rate = rate;

      // Load voices if not loaded yet
      if (Object.keys(this.voices).length === 0) {
        await this.initializeVoices();
      }

      if (this.voices[voice]) {
        msg.voice = this.voices[voice];
      }

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

  /**
   *  Initialize the internal list of voices
   */
  async initializeVoices() {
    var voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
      await timeout(1000);
      voices = window.speechSynthesis.getVoices();
    }
    this.updateVoices(voices);
  }

  /**
   * Update the internal voice dictionary.
   * @param {array} voices list of SpeechSynthesisVoice objects
   */
  updateVoices(voices) {
    this.voices = {};
    voices.forEach(voice => {
      this.voices[voice.name] = voice;
    });

  }
}

/**
 * Create a handler and read user settings
 */
async function ttsHandlerExport() {
  var ttsHandler = new TTSHandler();
}
ttsHandlerExport();
