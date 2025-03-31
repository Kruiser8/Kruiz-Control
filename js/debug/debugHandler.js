class DebugHandler extends Handler {
  /**
   * Create a new Debug handler.
   */
  constructor() {
    super('Debug', []);
    this.All = false;
    this.Chat = false;
    this.MQTT = false;
    this.OBS = false;
    this.Parser = false;
    this.SLOBS = false;
    this.Storage = false;
    this.StreamElements = false;
    this.Streamlabs = false;
    this.Twitch = false;
    this.Voicemod = false;

    this.success();
    this.initialized();
  }

  /**
   * Handle the input data (take an action).
   * @param {array} triggerData contents of trigger line
   */
  handleData = async (triggerData) => {
    var { handler } = Parser.getInputs(triggerData, ['handler'], false, 1);
    if (handler) {
      handler = handler.toLowerCase();
      switch (handler) {
        case 'chat':
          this.Chat = true;
          break;
        case 'mqtt':
          this.MQTT = true;
          break;
        case 'obs':
          this.OBS = true;
          break;
        case 'parser':
          this.Parser = true;
          break;
        case 'slobs':
          this.SLOBS = true;
          break;
        case 'storage':
          this.Storage = true;
          break;
        case 'sl':
        case 'streamlabs':
          this.Streamlabs = true;
          break;
        case 'se':
        case 'streamelements':
          this.StreamElements = true;
          break;
        case 'twitch':
          this.Twitch = true;
          break;
        case 'voicemod':
          this.Voicemod = true;
          break;
        default:
          break;
      }
    } else {
      this.All = true;
    }
  }
}

/**
 * Create a handler
 */
let Debug;
function debugHandlerExport() {
  Debug = new DebugHandler();
}
debugHandlerExport();
