class ChatHandler extends Handler {
  /**
   * Create a new Chat handler.
   */
  constructor() {
    super('Chat', ['OnCommand','OnKeyword','OnEveryChatMessage','OnSpeak']);

    /* OnCommand */
    this.commands = [];
    this.commandsOther = [];
    this.commandsInfo = {};

    /* OnKeyword */
    this.keywords = [];
    this.keywordsRegex = null;
    this.keywordsInfo = {};

    /* OnSpeak */
    this.speaks = [];
    this.speaksInfo = {};
    this.speakers = {};

    /* OnEveryChatMessage */
    this.chatTriggers = [];

    this.init.bind(this);
    this.checkPermissions.bind(this);
    this.onAllChat.bind(this);
  }

  /**
   * Initialize the chat connection with the input user.
   * @param {string} user twitch channel to connect
   * @param {string} oauth twitch irc oauth to send messages
   */
  init(user, oauth) {
    this.channel = user.toLowerCase();
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
        var permission = '';
        var inputs = ['permission', 'cooldown', 'commands'];
        if (triggerLine.length > 1) {
          permission = triggerLine[1].toLowerCase();
          if (permission.includes('u')) {
            inputs.splice(1, 0, 'info');
          }
        }
        var { permission, info, cooldown, commands } = Parser.getInputs(triggerLine, inputs, true);
        permission = permission.toLowerCase();
        info = info ? info.toLowerCase() : "";

        cooldown = parseInt(cooldown);
        if (isNaN(cooldown)) {
          cooldown = 0;
        }

        commands.forEach(command => {
          command = command.toLowerCase();
          if (command.charAt(0) === "!") {
            command = command.substring(1);
            if (this.commands.indexOf(command) === -1) {
              this.commands.push(command);
              this.commandsInfo[command] = [];
            }
          } else {
            if (this.commandsOther.indexOf(command) === -1) {
              this.commandsOther.push(command);
              this.commandsInfo[command] = [];
            }
          }
          this.commandsInfo[command].push({
            permission: permission,
            info: info,
            trigger: triggerId,
            cooldown: cooldown * 1000,
            lastUse: 0 - (cooldown * 1000)
          });
        });
        break;
      case 'onkeyword':
        var permission = '';
        var inputs = ['permission', 'cooldown', 'keywords'];
        if (triggerLine.length > 1) {
          permission = triggerLine[1].toLowerCase();
          if (permission.includes('u')) {
            inputs.splice(1, 0, 'info');
          }
        }
        var { permission, info, cooldown, keywords } = Parser.getInputs(triggerLine, inputs, true);
        permission = permission.toLowerCase();
        info = info ? info.toLowerCase() : "";

        cooldown = parseInt(cooldown);
        if (isNaN(cooldown)) {
          cooldown = 0;
        }

        keywords.forEach(keyword => {
          keyword = keyword.toLowerCase();
          if (this.keywords.indexOf(keyword) === -1) {
            this.keywords.push(keyword);
            this.keywordsInfo[keyword] = [];
          }
          this.keywordsInfo[keyword].push({
            permission: permission,
            info: info,
            trigger: triggerId,
            cooldown: cooldown * 1000,
            lastUse: 0 - (cooldown * 1000)
          });
        });
        break;
      case 'onspeak':
        var { user } = Parser.getInputs(triggerLine, ['user']);
        user = user.toLowerCase();
        if (this.speaks.indexOf(user) === -1) {
          this.speaks.push(user);
          this.speaksInfo[user] = [];
        }
        this.speaksInfo[user].push(triggerId);
        break;
      case 'oneverychatmessage':
        this.chatTriggers.push(triggerId);
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
    var action = Parser.getAction(triggerData, 'Chat');
    if (action === 'send') {
      var { message } = Parser.getInputs(triggerData, ['action', 'message']);
      ComfyJS.Say(message);
    } else if (action === 'whisper') {
      var { user, message } = Parser.getInputs(triggerData, ['action', 'user', 'message']);
      ComfyJS.Whisper(message, user);
    }
    return;
  }

  /**
   * Register trigger from user input.
   * @param {string} user twitch display name that sent the message
   * @param {object} flags permission flags for the user
   * @param {string} permissions usability of the command or keyword
   * @param {string} username twitch username that sent the message
   * @param {string} info extra information for the usability
   */
  checkPermissions(user, flags, permissions, username, info) {
    user = user.toLowerCase();
    if (
      (permissions.includes('e')) ||
      (permissions.includes('s') && flags.subscriber) ||
      (permissions.includes('v') && flags.vip) ||
      (permissions.includes('f') && flags.founder) ||
      (permissions.includes('m') && flags.mod) ||
      (permissions.includes('b') && this.channel === username) ||
      (permissions.includes('n') && !flags.founder && !flags.subscriber && !flags.vip && !flags.mod && this.channel !== user) ||
      (permissions.includes('u') && info && user === info)
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
      var combined = '!' + command + ' ' + message;

      this.onAllChat(user, {
        user: user,
        message: combined,
        data: {
          user: user,
          command: command,
          message: combined,
          after: message,
          flags: flags,
          extra: extra
        }
      });

      // Check for matching command and user permission
      if (this.commands.indexOf(command) !== -1) {
        var args = Parser.splitLine(message);

        var chatArgs = {};
        for (var i = 0; i < args.length; i++) {
          chatArgs[`arg${i+1}`] = args[i];
        }
        this.commandsInfo[command].forEach(info => {
          if (this.checkPermissions(user, flags, info.permission, extra.username, info.info) && this.updateCooldown(info)) {
            controller.handleData(info.trigger, {
              command: command,
              user: user,
              message: combined,
              after: message,
              data: {
                user: user,
                command: command,
                message: combined,
                after: message,
                flags: flags,
                extra: extra
              },
              ...chatArgs
            });
          }
        });
      }
      // Otherwise, check for keyword match
      else {
        var result = message.match(this.keywordsRegex);
        if (result) {
          var match = result[0].trim().toLowerCase();
          var args = Parser.splitLine(message);
          var chatArgs = {};
          for (var i = 0; i < args.length; i++) {
            chatArgs[`arg${i+1}`] = args[i];
          }
          this.keywordsInfo[match].forEach(info => {
            // Check if user has permission to trigger keyword
            if (this.checkPermissions(user, flags, info.permission, extra.username, info.info) && this.updateCooldown(info)) {
              controller.handleData(info.trigger, {
                user: user,
                keyword: match,
                message: message,
                data: {
                  user: user,
                  keyword: match,
                  message: message,
                  flags: flags,
                  extra: extra
                },
                ...chatArgs
              });
            }
          });
        }
      }
    }

    ComfyJS.onChat = ( user, message, flags, self, extra ) => {
      this.onAllChat(user, {
        user: user,
        message: message,
        data: {
          user: user,
          message: message,
          flags: flags,
          extra: extra
        }
      });

      // Check for matching command and user permission
      var command = message.split(' ')[0].toLowerCase();
      if(this.commandsOther.indexOf(command) != -1) {
        var args = Parser.splitLine(message).slice(1);
        var chatArgs = {};
        for (var i = 0; i < args.length; i++) {
          chatArgs[`arg${i+1}`] = args[i];
        }
        this.commandsInfo[command].forEach(info => {
          if (this.checkPermissions(user, flags, info.permission, extra.username, info.info) && this.updateCooldown(info)) {
            var after = args.join(' ');
            controller.handleData(info.trigger, {
              command: command,
              user: user,
              message: message,
              after: after,
              data: {
                user: user,
                command: command,
                message: message,
                after: after,
                flags: flags,
                extra: extra
              },
              ...chatArgs
            });
          }
        });
      }
      // Otherwise, check for keyword match
      else {
        var result = message.match(this.keywordsRegex);
        if (result) {
          var args = Parser.splitLine(message);
          var chatArgs = {};
          for (var i = 0; i < args.length; i++) {
            chatArgs[`arg${i+1}`] = args[i];
          }
          var match = result[0].trim().toLowerCase();
          this.keywordsInfo[match].forEach(info => {
            // Check if user has permission to trigger keyword
            if (this.checkPermissions(user, flags, info.permission, extra.username, info.info) && this.updateCooldown(info)) {
              controller.handleData(info.trigger, {
                user: user,
                keyword: match,
                message: message,
                data: {
                  user: user,
                  keyword: match,
                  message: message,
                  flags: flags,
                  extra: extra
                },
                ...chatArgs
              });
            }
          });
        }
      }
    }
    return;
  }

  /**
   * Check if a trigger is on cooldown.
   * @param {strng} user that sent the message
   * @param {data} data to send with the OnEveryChatMessage
   */
  onAllChat(user, data) {
    // OnEveryChatMessage
    this.chatTriggers.forEach(triggerId => {
      controller.handleData(triggerId, data);
    });

    // Check for OnSpeak Event
    var userLower = user.toLowerCase();
    var onSpeakTriggers = [];
    if (this.speakers[userLower] === undefined && this.speaks.indexOf(userLower) !== -1) {
      onSpeakTriggers.push(...this.speaksInfo[userLower]);
    }
    if (this.speakers[userLower] === undefined && this.speaks.indexOf('*') !== -1) {
      onSpeakTriggers.push(...this.speaksInfo['*']);
    }
    if (onSpeakTriggers.length > 0) {
      this.speakers[userLower] = true;
      onSpeakTriggers.sort((a, b) => a-b);
      onSpeakTriggers.forEach(triggerId => {
        controller.handleData(triggerId, data);
      });
    } else if (this.speakers[userLower] === undefined) {
      this.speakers[userLower] = true;
    }
  }
}

/**
 * Create a handler and read user settings
 */
async function chatHandlerExport() {
  var chat = new ChatHandler();
  var user = await readFile('settings/chat/user.txt');
  var oauth = await readFile('settings/chat/oauth.txt');
  chat.init(user.trim(), oauth.trim());
}
chatHandlerExport();
