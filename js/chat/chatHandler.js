class ChatHandler extends Handler {
  /**
   * Create a new Chat handler.
   */
  constructor() {
    super('Chat', ['OnCommand','OnKeyword']);
    this.commands = [];
    this.commandsOther = [];
    this.commandsInfo = {};
    this.keywords = [];
    this.keywordsRegex = null;
    this.keywordsInfo = {};
  }

  /**
   * Initialize the chat connection with the input user.
   * @param {string} user twitch channel to connect
   * @param {string} oauth twitch irc oauth to send messages
   */
  init(user, oauth) {
    ComfyJS.onConnected = ( address, port, isFirstConnect ) => {
      if (isFirstConnect) {
        this.success();
      }
    }
    if (user) {
      if (oauth) {
        ComfyJS.Init(user, oauth);
      } else {
        ComfyJS.Init(user);
      }
    }
  }

  /**
   * Register trigger from user input.
   * @param {string} trigger name to use for the handler
   * @param {array} triggerLine contents of trigger line
   * @param {number} id of the new trigger
   */
  addTriggerData(trigger, triggerLine, triggerId) {
    trigger = trigger.toLowerCase();
    switch (trigger) {
      case 'oncommand':
        var command = '';
        var info = '';
        var cooldown = 0;
        var permission = triggerLine[1].toLowerCase();
        if (permission === 'u') {
          info = triggerLine[2].toLowerCase();
          cooldown = triggerLine[3];
          command = triggerLine[4].toLowerCase();
        } else {
          cooldown = triggerLine[2];
          command = triggerLine[3].toLowerCase();
        }
        if (command.charAt(0) === "!") {
          command = command.substring(1);
          this.commands.push(command);
        } else {
          this.commandsOther.push(command);
        }
        cooldown = parseInt(cooldown);
        if (isNaN(cooldown)) {
          cooldown = 0;
        }
        this.commandsInfo[command] = {
          permission: permission,
          info: info,
          trigger: triggerId,
          cooldown: cooldown * 1000,
          lastUse: 0 - (cooldown * 1000)
        }
        break;
      case 'onkeyword':
        var keyword = '';
        var info = '';
        var cooldown = 0;
        var permission = triggerLine[1].toLowerCase();
        if (permission === 'u') {
          info = triggerLine[2].toLowerCase();
          cooldown = triggerLine[3];
          keyword = triggerLine.slice(4).join(' ');
        } else {
          cooldown = triggerLine[2];
          keyword = triggerLine.slice(3).join(' ');
        }
        cooldown = parseInt(cooldown);
        if (isNaN(cooldown)) {
          cooldown = 0;
        }
        this.keywords.push(keyword);
        this.keywordsInfo[keyword] = {
          permission: permission,
          info: info,
          trigger: triggerId,
          cooldown: cooldown * 1000,
          lastUse: 0 - (cooldown * 1000)
        }
        break;
      default:
        // do nothing
    }
    return;
  }

  /**
   * Handle the input data (take an action).
   * @param {array} triggerData contents of trigger line
   */
  async handleData(triggerData) {
    var trigger = triggerData[1].toLowerCase();
    if (trigger === 'send') {
      ComfyJS.Say(triggerData.slice(2).join(' '));
    } else if (trigger === 'whisper') {
      ComfyJS.Whisper(triggerData.slice(3).join(' '), triggerData[2]);
    }
    return;
  }

  /**
   * Register trigger from user input.
   * @param {string} user twich username that sent message
   * @param {object} flags permission flags for the user
   * @param {string} permissions usability of the command or keyword
   * @param {string} info extra information for the usability
   */
  checkPermissions(user, flags, permissions, info) {
    user = user.toLowerCase();
    if (
      (permissions.includes('e')) ||
      (permissions.includes('s') && flags.subscriber) ||
      (permissions.includes('v') && flags.vip) ||
      (permissions.includes('f') && flags.founder) ||
      (permissions.includes('m') && flags.mod) ||
      (permissions.includes('b') && flags.broadcaster) ||
      (permissions === 'u' && info && user === info)
    ){
      return true;
    }
    return false;
  }

  /**
   * Check if a trigger is on cooldown.
   * @param {object} info command info object
   */
  updateCooldown(info) {
    if (info.cooldown === 0) {
      return true;
    }

    var curTime = new Date().getTime();
    if (curTime >= info.lastUse + info.cooldown) {
      info.lastUse = curTime;
      return true;
    } else {
      return false;
    }
  }

  /**
   * Called after parsing all user input.
   */
  postParse() {
    // Create Keyword Regex
    if (this.keywords.length > 0) {
      this.keywordsRegex = new RegExp('(?:\\b|^|\\s)' + this.keywords.map(x => escapeRegExp(x)).join('(?:\\b|$|\\s)|(?:\\b|^|\\s)') + '(?:\\b|$|\\s)', 'gi');
    }

    ComfyJS.onCommand = ( user, command, message, flags, extra ) => {
      message = '!' + command + ' ' + message;
      // Check for matching command and user permission
      if( this.commands.indexOf(command) !== -1 ) {
        var info = this.commandsInfo[command];
        if (this.checkPermissions(user, flags, info.permission, info.info) && this.updateCooldown(info)) {
          controller.handleData(info.trigger, {
            user: user,
            message: message,
            data: {
              user: user,
              command: command,
              message: message,
              flags: flags,
              extra: extra
            }
          });
        }
      }
      // Otherwise, check for keyword match
      else {
        var result = message.match(this.keywordsRegex);
        if (result) {
          var match = result[0].toLowerCase().trim();
          var info = this.keywordsInfo[match];

          // Check if user has permission to trigger keyword
          if (this.checkPermissions(user, flags, info.permission, info.info) && this.updateCooldown(info)) {
            controller.handleData(info.trigger, {
              user: user,
              message: message,
              data: {
                user: user,
                command: command,
                message: message,
                flags: flags,
                extra: extra
              }
            });
          }
        }
      }
    }

    ComfyJS.onChat = ( user, message, flags, self, extra ) => {
      // Check for matching command and user permission
      var command = message.split(' ')[0];
      if(this.commandsOther.indexOf(command) != -1) {
        var info = this.commandsInfo[command];
        if (this.checkPermissions(user, flags, info.permission, info.info) && this.updateCooldown(info)) {
          controller.handleData(info.trigger, {
            user: user,
            message: message,
            data: {
              user: user,
              message: message,
              flags: flags,
              extra: extra
            }
          });
        }
      }
      // Otherwise, check for keyword match
      else {
        var result = message.match(this.keywordsRegex);
        if (result) {
          var match = result[0].toLowerCase().trim();
          var info = this.keywordsInfo[match];

          // Check if user has permission to trigger keyword
          if (this.checkPermissions(user, flags, info.permission, info.info) && this.updateCooldown(info)) {
            controller.handleData(info.trigger, {
              user: user,
              message: message,
              data: {
                user: user,
                message: message,
                flags: flags,
                extra: extra
              }
            });
          }
        }
      }
    }
    return;
  }
}

/**
 * Create a handler and read user settings
 */
function chatHandlerExport() {
  var chat = new ChatHandler();
  readFile('settings/chat/user.txt', function(user) {
    readFile('settings/chat/oauth.txt', function(oauth) {
      chat.init(user.trim(), oauth.trim());
    });
  });
}
chatHandlerExport();
