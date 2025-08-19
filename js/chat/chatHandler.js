class ChatHandler extends Handler {
  /**
   * Create a new Chat handler.
   */
  constructor() {
    super('Chat', ['OnCommand','OnKeyword','OnEveryChatMessage','OnHypeChat', 'OnSpeak']);

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

    /* OnHypeChat */
    this.onHypeChats = [];
    this.onHypeChatsInfo = {};
  }

  /**
   * Initialize the chat connection with the input user.
   * @param {string} channel twitch channel to connect
   */
  init = (channel, user) => {
    this.channel = channel.toLowerCase();
    this.user = user;
    ComfyJS.onConnected = ( address, port, isFirstConnect ) => {
      console.error("Chat connected successfully");
      if (isFirstConnect) {
        this.success();
        this.initialized();
      }
    }

    ComfyJS.onError = (error) => {
      if (error.includes("Login authentication failed")) {
        console.error("Unable to connect to Chat");
        this.initialized();
      }
    }

    Storage.onChange("ChatOAuth", (_, value) => {
      if (Debug.All || Debug.Chat) {
        console.error("New chat oauth value received")
      }
      if (ComfyJS.GetClient() !== null) {
        if (Debug.All || Debug.Chat) {
          console.error("Disconnecting ComfyJS")
        }
        ComfyJS.Disconnect();
      }
      if (Debug.All || Debug.Chat) {
        console.error("Initializing ComfyJS")
      }
      ComfyJS.Init(channel, `oauth:${value}`);
    }, true);
  }

  /**
   * Register trigger from user input.
   * @param {string} trigger name to use for the handler
   * @param {array} triggerLine contents of trigger line
   * @param {number} id of the new trigger
   */
  addTriggerData = (trigger, triggerLine, triggerId) => {
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
        info = info.split(',')

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
        info = info.split(',')

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
        var { users } = Parser.getInputs(triggerLine, ['users'], true);
        users.forEach(user => {
          user = user.toLowerCase();
          if (this.speaks.indexOf(user) === -1) {
            this.speaks.push(user);
            this.speaksInfo[user] = [];
          }
          this.speaksInfo[user].push(triggerId);
        });
        break;
      case 'oneverychatmessage':
        this.chatTriggers.push(triggerId);
        break;
      case 'onhypechat':
        var { users } = Parser.getInputs(triggerLine, ['users'], true);
        users.forEach(user => {
          user = user.toLowerCase();
          if (this.onHypeChats.indexOf(user) === -1) {
            this.onHypeChats.push(user);
            this.onHypeChatsInfo[user] = [];
          }
          this.onHypeChatsInfo[user].push(triggerId);
        });
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
  handleData = async (triggerData) => {
    var action = Parser.getAction(triggerData, 'Chat');
    if (action === 'send') {
      var { message } = Parser.getInputs(triggerData, ['action', 'message']);
      ComfyJS.Say(message);
    } else if (action === 'whisper') {
      var { user, message } = Parser.getInputs(triggerData, ['action', 'user', 'message']);
      return {
        actions: [
          ["Ignore", "Twitch", "Whisper", this.user, user, message]
        ]
      };
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
  checkPermissions = (user, flags, permissions, username, info) => {
    user = user.toLowerCase();
    if (permissions.includes('e')) {
      return [true, 'e'];
    } else if (permissions.includes('s') && flags.subscriber) {
      return [true, 's'];
    } else if (permissions.includes('v') && flags.vip) {
      return [true, 'v'];
    } else if (permissions.includes('o') && flags.founder) {
      return [true, 'o'];
    } else if (permissions.includes('m') && flags.mod) {
      return [true, 'm'];
    } else if (permissions.includes('b') && this.channel === username) {
      return [true, 'b'];
    } else if (permissions.includes('u') && info && info.indexOf(user) !== -1) {
      return [true, 'u'];
    } else if (permissions.includes('n') && !flags.founder && !flags.subscriber && !flags.vip && !flags.mod && this.channel !== user) {
      return [true, 'n']
    }

    return [false, ''];
  }

  /**
   * Check if a trigger is on cooldown.
   * @param {object} info command info object
   */
  updateCooldown = (info) => {
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

  onMessage = (user, message, flags, extra) => {
    // Check for matching command and user permission
    var command = message.split(' ')[0].toLowerCase();
    var toCheck = this.commandsOther;
    if (command.charAt(0) === "!") {
      toCheck = this.commands;
      command = command.substring(1);
    }
    if(toCheck.indexOf(command) != -1) {
      var args = Parser.splitLine(message).slice(1);
      var chatArgs = {};
      for (var i = 0; i < args.length; i++) {
        chatArgs[`arg${i+1}`] = args[i];
      }

      this.commandsInfo[command].forEach(info => {
        var username = extra.username || extra.fromUserLogin;
        var [canUseCommand, grantingPermission] = this.checkPermissions(user, flags, info.permission, username, info.info);
        if ((canUseCommand || info.permission.includes('f')) && this.updateCooldown(info)) {
          var after = args.join(' ');
          controller.handleData(info.trigger,
            {
              command: command,
              user: user,
              message: message,
              message_id: extra.id || '',
              after: after,
              data: {
                user: user,
                command: command,
                message: message,
                after: after,
                flags: flags,
                extra: extra
              },
              arg_count: args.length,
              ...chatArgs
            },
            canUseCommand && grantingPermission !== 'n' ? [] : this.addFollowerActions(info.permission, user)
          );
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
          var username = extra.username || extra.fromUserLogin;
          var [canUseCommand, grantingPermission] = this.checkPermissions(user, flags, info.permission, username, info.info);
          if ((canUseCommand || info.permission.includes('f')) && this.updateCooldown(info)) {
            controller.handleData(info.trigger,
              {
                user: user,
                keyword: match,
                message: message,
                message_id: extra.id || '',
                data: {
                  user: user,
                  keyword: match,
                  message: message,
                  flags: flags,
                  extra: extra
                },
                arg_count: args.length,
                ...chatArgs
              },
              canUseCommand && grantingPermission !== 'n' ? [] : this.addFollowerActions(info.permission, user)
            );
          }
        });
      }
    }
  }

  /**
   * Called after parsing all user input.
   */
  postParse = () => {
    // Create Keyword Regex
    if (this.keywords.length > 0) {
      this.keywordsRegex = new RegExp('(?:\\b|^|\\s)' + this.keywords.map(x => escapeRegExp(x)).join('(?:\\b|$|\\s)|(?:\\b|^|\\s)') + '(?:\\b|$|\\s)', 'gi');
    }

    ComfyJS.onCommand = ( user, command, message, flags, extra ) => {
      if (Debug.All || Debug.Chat) {
        console.error(`Command Received: ${JSON.stringify({user, command, message, flags, extra})}`);
      }
      var combined = '!' + command + ' ' + message;

      this.onAllChat(user, {
        user: user,
        message: combined,
        message_id: extra.id || '',
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
          var [canUseCommand, grantingPermission] = this.checkPermissions(user, flags, info.permission, extra.username, info.info);
          if ((canUseCommand || info.permission.includes('f')) && this.updateCooldown(info)) {
            controller.handleData(
              info.trigger,
              {
                command: command,
                user: user,
                message: combined,
                message_id: extra.id || '',
                after: message,
                data: {
                  user: user,
                  command: command,
                  message: combined,
                  after: message,
                  flags: flags,
                  extra: extra
                },
                arg_count: args.length,
                ...chatArgs
              },
              canUseCommand && grantingPermission !== 'n' ? [] : this.addFollowerActions(info.permission, user)
            );
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
            var [canUseCommand, grantingPermission] = this.checkPermissions(user, flags, info.permission, extra.username, info.info);
            if ((canUseCommand || info.permission.includes('f')) && this.updateCooldown(info)) {
              controller.handleData(info.trigger,
                {
                  user: user,
                  keyword: match,
                  message: message,
                  message_id: extra.id || '',
                  data: {
                    user: user,
                    keyword: match,
                    message: message,
                    flags: flags,
                    extra: extra
                  },
                  arg_count: args.length,
                  ...chatArgs
                },
                canUseCommand && grantingPermission !== 'n' ? [] : this.addFollowerActions(info.permission, user)
              );
            }
          });
        }
      }
    }

    ComfyJS.onWhisper = ( user, message, flags, self, extra ) => {
      if (Debug.All || Debug.Chat) {
        console.error(`Whisper Received: ${JSON.stringify({user, message, flags, extra})}`);
      }
      this.onMessage(user, message, flags, extra);
    }

    ComfyJS.onChat = ( user, message, flags, self, extra ) => {
      if (Debug.All || Debug.Chat) {
        console.error(`Chat Received: ${JSON.stringify({user, message, flags, extra})}`);
      }
      this.onAllChat(user, {
        user: user,
        message: message,
        message_id: extra.id || '',
        data: {
          user: user,
          message: message,
          flags: flags,
          extra: extra
        }
      });
      this.onMessage(user, message, flags, extra);
    }

    return;
  }

  /**
   * Return actions to check for twitch follower status if requested by the event.
   * @param {string} permissions usability of the command or keyword
   * @param {string} user twitch display name that sent the message
   */
  addFollowerActions = (permissions, user) => {
    if (permissions.includes('n')) {
      return [
        ['Ignore', 'Twitch', 'IsFollower', user],
        ['Ignore', 'If', '{is_follower}', '=', 'false']
      ];
    } else if (permissions.includes('f')) {
      return [
        ['Ignore', 'Twitch', 'IsFollower', user],
        ['Ignore', 'If', '{is_follower}', '=', 'true']
      ];
    } else {
      return [];
    }
  }

  /**
   * Check if a trigger is on cooldown.
   * @param {string} user that sent the message
   * @param {data} data to send with the OnEveryChatMessage
   */
  onAllChat = (user, data) => {
    // OnEveryChatMessage
    this.chatTriggers.forEach(triggerId => {
      controller.handleData(triggerId, data);
    });

    // Check for OnHypeChat
    if ("pinned-chat-paid-amount" in data.data.extra.userState) {
      var userLower = user.toLowerCase();
      var onHypeChatTriggers = [];
      if (this.onHypeChats.indexOf(userLower) !== -1) {
        onHypeChatTriggers.push(...this.onHypeChatsInfo[userLower]);
      }
      if (this.onHypeChats.indexOf('*') !== -1) {
        onHypeChatTriggers.push(...this.onHypeChatsInfo['*']);
      }
      if (onHypeChatTriggers.length > 0) {
        var userState = data.data.extra.userState;
        var hypeChatData = {
          amount: userState["pinned-chat-paid-amount"],
          formatted_amount: (userState["pinned-chat-paid-amount"] / Math.pow(10, userState["pinned-chat-paid-exponent"])).toFixed(userState["pinned-chat-paid-exponent"]),
          currency: userState["pinned-chat-paid-currency"],
          exponent: userState["pinned-chat-paid-exponent"],
          level: userState["pinned-chat-paid-level"],
          is_system_message: userState["pinned-chat-paid-is-system-message"],
          ...data
        };
        
        onHypeChatTriggers.sort((a, b) => a-b);
        onHypeChatTriggers.forEach(triggerId => {
          controller.handleData(triggerId, hypeChatData);
        });
      }
    }

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
  var channel = await readFile('settings/chat/channel.txt');
  var user = await readFile('settings/chat/user.txt');
  chat.init(channel.trim(), user.trim());
}
chatHandlerExport();
