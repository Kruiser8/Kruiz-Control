class CooldownHandler extends Handler {
  GLOBAL_COOLDOWN_KEY = '__kc_cooldown_global_cooldowns';
  GLOBAL_COOLDOWN_KEY_PREFIX = '__kc_cooldown_global_cooldown_';

  /**
  * Create a new API handler.
  */
  constructor() {
    super('Cooldown', []);
    this.success();

    this.cooldowns = {};
  }

  /**
  * Called after parsing all user input.
  */
  async postParse() {
    this.global_cooldowns = await IDBService.get(this.GLOBAL_COOLDOWN_KEY) || [];
    for (const cooldown_id of this.global_cooldowns) {
      this.cooldowns[cooldown_id] = await IDBService.get(`${this.GLOBAL_COOLDOWN_KEY_PREFIX}${cooldown_id}`) || [];
    };
  }

  /**
  * Handle the input data (take an action).
  * @param {array} triggerData contents of trigger line
  */
  async handleData(triggerData) {
    var action = Parser.getAction(triggerData, 'Cooldown');
    if (action === 'global') {
      action = Parser.getAction(triggerData, 'Cooldown', 1);
      var { name, duration } = Parser.getInputs(triggerData, ['global', 'action', 'name', 'duration'], false, 1);

      switch (action) {
        case 'apply':
          var response = this.handleCooldown(name, parseFloat(duration));
          if (this.global_cooldowns.indexOf(name) === -1) {
            this.global_cooldowns.push(name);
            IDBService.set(this.GLOBAL_COOLDOWN_KEY, this.global_cooldowns);
          }
          IDBService.set(`${this.GLOBAL_COOLDOWN_KEY_PREFIX}${name}`, this.cooldowns[name]);
          return response;
          break;
        case 'check':
          return this.checkCooldown(name);
          break;
        case 'clear':
          delete this.cooldowns[name];
          var nameIndex = this.global_cooldowns.indexOf(name);
          if (nameIndex !== -1) {
            this.global_cooldowns.splice(nameIndex, 1);
            IDBService.set(this.GLOBAL_COOLDOWN_KEY, this.global_cooldowns);
            IDBService.delete(`${this.GLOBAL_COOLDOWN_KEY_PREFIX}${name}`);
          }
          break;
        default:
          console.error(`Unexpected Cooldown <action> (${action}). Check your event code.`);
          break;
      }
    } else {
      var { name, duration } = Parser.getInputs(triggerData, ['action', 'name', 'duration'], false, 1);
      switch (action) {
        case 'apply':
          return this.handleCooldown(name, parseFloat(duration));
          break;
        case 'check':
          return this.checkCooldown(name);
          break;
        case 'clear':
          delete this.cooldowns[name];
          break;
        default:
          console.error(`Unexpected Cooldown <action> (${action}). Check your event code.`);
          break;
      }
    }
  }

  /**
  * Check the named cooldown.
  *
  * @param {string} name name of the cooldown
  * @return {Object} whether or not to continue the trigger.
  */
  checkCooldown(name) {
    var response = {};
    response[name] = false;
    var curTime = new Date().getTime();
    if ( typeof(this.cooldowns[name]) !== 'undefined' && curTime < this.cooldowns[name] ) {
      response[name] = true;
      response['cooldown_real'] = (this.cooldowns[name] - curTime) / 1000;
      response['cooldown'] = Math.ceil(response['cooldown_real']);
    }
    return response;
  }

  /**
  * Handle the named cooldown.
  *
  * @param {string} name name of the cooldown
  * @param {numeric} duration duration of the cooldown
  * @return {Object} whether or not to continue the trigger.
  */
  handleCooldown(name, duration) {
    var response = {"continue": false};
    duration = duration * 1000; // convert to milliseconds
    var curTime = new Date().getTime();
    if ( typeof(this.cooldowns[name]) === 'undefined' || curTime >= this.cooldowns[name] ) {
      this.cooldowns[name] = curTime + duration;
      response["continue"] = true;
    }
    return response;
  }
}

/**
* Create a handler
*/
function cooldownHandlerExport() {
  var cooldown = new CooldownHandler();
}
cooldownHandlerExport();
