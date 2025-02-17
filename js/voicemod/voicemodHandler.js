class VoicemodHandler extends Handler {
  /**
   * Create a new Voicemod handler.
   */
  constructor() {
    super('Voicemod', []);
    this.success();
  }

  /**
   * Initialize the connection to voicemod with the input settings.
   * @param {string} address voicemod websocket address
   * @param {string} password voicemod websocket password
   */
  init(address, apiKey) {
    this.api = connectVoicemodWebsocket(
      address, apiKey
    );
  }

  /**
   * Handle the input data (take an action).
   * @param {array} triggerData contents of trigger line
   */
  async handleData(triggerData) {
    var action = Parser.getAction(triggerData, 'Voicemod');
    switch (action) {
      case 'background':
        var { status } = Parser.getInputs(triggerData, ['action', 'status']);

        status = status.toLowerCase();
        var statuses = ['off', 'on', 'toggle'];
        if (statuses.indexOf(status) === -1) {
          console.error(`Invalid status value for Voicemod Background. Found "${status}", expected one of "${statuses.join('", "')}".`)
          return;
        }

        await this.api.setBackgroundEffectStatus(status);
        break;
      case 'beep':
        var { duration = 1 } = Parser.getInputs(triggerData, ['action', 'duration'], false, 1);

        var beep_duration = 1000;
        if (isNumeric(duration)) {
          beep_duration = parseInt(duration) * 1000;
        }
        await this.api.beep(beep_duration);
        break;
      case 'hear':
        var { status } = Parser.getInputs(triggerData, ['action', 'status']);

        status = status.toLowerCase();
        var statuses = ['off', 'on', 'toggle'];
        if (statuses.indexOf(status) === -1) {
          console.error(`Invalid status value for Voicemod Hear. Found "${status}", expected one of "${statuses.join('", "')}".`)
          return;
        }

        await this.api.setHearMyselfStatus(status);
        break;
      case 'mute':
        var { status } = Parser.getInputs(triggerData, ['action', 'status']);

        status = status.toLowerCase();
        var statuses = ['off', 'on', 'toggle'];
        if (statuses.indexOf(status) === -1) {
          console.error(`Invalid status value for Voicemod Mute. Found "${status}", expected one of "${statuses.join('", "')}".`)
          return;
        }

        await this.api.setMuteMicStatus(status);
        break;
      case 'random':
        var { mode = '' } = Parser.getInputs(triggerData, ['action', 'mode'], false, 1);

        mode = mode.toLowerCase();
        var modes = ['custom', 'favorite'];
        if (mode && modes.indexOf(mode) === -1) {
          console.error(`Invalid mode value for Voicemod Random. Found "${mode}", expected one of "${modes.join('", "')}".`)
          return;
        }

        await this.api.setRandomVoice(mode);
        break;
      case 'voice':
        var { voice } = Parser.getInputs(triggerData, ['action', 'voice']);
        var voices = await this.api.getVoices();
        var match = voices.filter(option => option.friendlyName === voice)[0];

        if (!match) {
          console.error(`Unable to find voice id Voicemod Voice given: "${voice}"`)
        }

        await this.api.setVoice(match.id);
        break;
      case 'voicechanger':
        var { status } = Parser.getInputs(triggerData, ['action', 'status']);

        status = status.toLowerCase();
        var statuses = ['off', 'on', 'toggle'];
        if (statuses.indexOf(status) === -1) {
          console.error(`Invalid status value for Voicemod VoiceChanger. Found "${status}", expected one of "${statuses.join('", "')}".`)
          return;
        }

        await this.api.setVoiceChangerStatus(status);
        break;
      case 'play':
        var { soundboard, sound } = Parser.getInputs(triggerData, ['action', 'soundboard', 'sound']);
        var soundboards = await this.api.getAllSoundboard();

        var board = soundboards.filter(option => option.name === soundboard)[0];
        if (!board) {
          console.error(`Unable to find Voicemod Play soundboard with name: "${soundboard}"`)
          return;
        }

        var match = board.sounds.filter(option => option.name === sound)[0];
        if (!match) {
          console.error(`Unable to find Voicemod Play sound with name, "${sound}, in the soundboard, ${soundboard}"`)
          return;
        }

        await this.api.playAudio(match.id);
        break;
      case 'stop':
        this.api.stopAudio();
        break;
    }
  }
}

/**
 * Create a handler
 */
async function voicemodHandlerExport() {
  var voicemod = new VoicemodHandler();
  var address = await readFile('settings/voicemod/address.txt');
  var apiKey = await readFile('settings/voicemod/apiKey.txt');
  voicemod.init(address.trim(), apiKey.trim());
}
voicemodHandlerExport();
