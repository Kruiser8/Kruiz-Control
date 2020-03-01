class ChatHandler extends Handler {
  /**
   * Create a new Chat handler.
   */
  constructor() {
    super('Chat', ['OnCommand','OnKeyword']);
    this.commands = [];
    this.commandsOther = [];
    this.commandsPermission = {};
    this.commandsInfo = {};
    this.commandsTrigger = {};
    this.keywords = [];
    this.keywordsRegex = null;
    this.keywordsOther = [];
    this.keywordsOtherRegex = null;
    this.keywordsPermission = {};
    this.keywordsInfo = {};
    this.keywordsTrigger = {};
  }

  /**
   * Initialize the chat connection with the input user.
   * @param {string} user twitch channel to connect
   * @param {string} oauth twitch irc oauth to send messages
   */
  init(user, oauth) {
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
    switch (trigger) {
      case 'OnCommand':
        var command = '';
        var info = '';
        var permission = triggerLine[1].toLowerCase();
        if (permission === 'u') {
          info = triggerLine[2].toLowerCase();
          command = triggerLine[3].toLowerCase();
        } else {
          command = triggerLine[2].toLowerCase();
        }
        if (command.charAt(0) === "!") {
          this.commands.push(command.substring(1));
          this.commandsPermission[command.substring(1)] = permission;
          this.commandsInfo[command.substring(1)] = info;
          this.commandsTrigger[command.substring(1)] = triggerId;
        } else {
          this.commandsOther.push(command);
          this.commandsPermission[command] = permission;
          this.commandsInfo[command] = info;
          this.commandsTrigger[command] = triggerId;
        }
        break;
      case 'OnKeyword':
        var keyword = '';
        var info = '';
        var permission = triggerLine[1].toLowerCase();
        if (permission === 'u') {
          info = triggerLine[2].toLowerCase();
          keyword = triggerLine.slice(3).join(' ');
        } else {
          keyword = triggerLine.slice(2).join(' ');
        }
        if (keyword.charAt(0) === "!") {
          this.keywords.push(keyword.substring(1).toLowerCase());
          this.keywordsPermission[keyword.substring(1).toLowerCase()] = permission;
          this.keywordsInfo[keyword.substring(1).toLowerCase()] = info;
          this.keywordsTrigger[keyword.substring(1).toLowerCase()] = triggerId;
        } else {
          this.keywordsOther.push(keyword.toLowerCase());
          this.keywordsPermission[keyword.toLowerCase()] = permission;
          this.keywordsInfo[keyword.toLowerCase()] = info;
          this.keywordsTrigger[keyword.toLowerCase()] = triggerId;
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
    var trigger = triggerData[1];
    if (trigger === 'Send') {
      ComfyJS.Say(triggerData.slice(2).join(' '));
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
   * Called after parsing all user input.
   */
  postParse() {
    if (this.keywords.length > 0) {
      this.keywordsRegex = new RegExp(this.keywords.join('|'), 'gi');
    } else if (this.keywordsOther.length > 0) {
      this.keywordsOtherRegex = new RegExp(this.keywordsOther.join('|'), 'gi');
    }

    ComfyJS.onCommand = ( user, command, message, flags, extra ) => {
      if( this.commands.indexOf(command) !== -1 && this.checkPermissions(user, flags, this.commandsPermission[command], this.commandsInfo[command])) {
        controller.handleData(this.commandsTrigger[command]);
      } else {
        var result = message.match(this.keywordsRegex);
        if (result) {
          var match = result[0].toLowerCase();
          if (this.checkPermissions(user, flags, this.keywordsPermission[match], this.keywordsInfo[match])) {
            controller.handleData(this.keywordsTrigger[match]);
          }
        }
      }
    }
    ComfyJS.onChat = ( user, message, flags, self, extra ) => {
      var command = message.split(' ')[0];
      if( this.commandsOther.indexOf(command) != -1 && this.checkPermissions(user, flags, this.commandsPermission[command], this.commandsInfo[command]) ) {
        controller.handleData(this.commandsTrigger[command]);
      } else {
        var result = message.match(this.keywordsOtherRegex);
        if (result) {
          var match = result[0].toLowerCase();
          if (this.checkPermissions(user, flags, this.keywordsPermission[match], this.keywordsInfo[match])) {
            controller.handleData(this.keywordsTrigger[match]);
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
