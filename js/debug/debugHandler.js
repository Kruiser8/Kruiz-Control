class DebugHandler extends Handler {
  /**
   * Create a new Debug handler.
   */
  constructor() {
    super('Debug', []);
    this.success();
    this.All = false;
    this.OBS = false;
    this.Parser = false;
    this.SLOBS = false;
    this.StreamElements = false;
    this.Streamlabs = false;
    this.Twitch = false;
  }

  /**
   * Handle the input data (take an action).
   * @param {array} triggerData contents of trigger line
   */
  async handleData(triggerData) {
    var { handler } = Parser.getInputs(triggerData, ['handler'], false, 1);
    if (handler) {
      handler = handler.toLowerCase();
      switch (handler) {
        case 'obs':
          this.OBS = true;
          break;
        case 'parser':
          this.Parser = true;
          break;
        case 'slobs':
          this.SLOBS = true;
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
