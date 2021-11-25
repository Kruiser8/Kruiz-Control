class DiscordHandler extends Handler {
  /**
   * Create a new Discord handler.
   */
  constructor() {
    super('Discord', []);
    this.webhookUrls = {};
    this.webhookMessageIds = {};
    this.webhooks = {};
    this.success();

    this.initialize.bind(this);
  }

  /**
   * Handle the input data (take an action).
   * @param {array} triggerData contents of trigger line
   */
  async handleData(triggerData) {
    var action = Parser.getAction(triggerData, 'Discord');

    switch (action) {
      case 'clear':
        var { name } = Parser.getInputs(triggerData, ['action', 'name']);
        delete this.webhooks[name];
        break;
      case 'color':
        var { name, color } = Parser.getInputs(triggerData, ['action', 'name', 'color']);
        this.initialize(name);
        var color = triggerData.slice(3).join(' ');
        if (color.charAt(0) === '#') {
          color = color.substring(1);
        }
        var colorNum = parseInt(color, 16);
        if (!isNaN(colorNum)) {
          this.webhooks[name].embed.color = colorNum;
        }
        break;
      case 'create':
        var { name, url } = Parser.getInputs(triggerData, ['action', 'name', 'url']);
        this.webhookUrls[name] = url;
        break;
      case 'delete':
        var { name, messageId } = Parser.getInputs(triggerData, ['action', 'name', 'messageId'], false, 1);
        messageId = messageId || this.webhookMessageIds[name];
        var data = await callAPI('DELETE', `${this.webhooks[name].url}/messages/${messageId}`);
        break;
      case 'description':
        var { name, description } = Parser.getInputs(triggerData, ['action', 'name', 'description']);
        this.initialize(name);
        this.webhooks[name].embed.description = description;
        break;
      case 'field':
        var { name, header, value, inline } = Parser.getInputs(triggerData, ['action', 'name', 'header', 'value', 'inline'], false, 1);
        this.initialize(name);
        var field = {
          name: header,
          value: value
        };
        if (inline && inline.toLowerCase() === 'true') {
          field['inline'] = true;
        }
        if (!this.webhooks[name].embed.fields) {
          this.webhooks[name].embed.fields = [];
        }
        this.webhooks[name].embed.fields.push(field);
        break;
      case 'file':
        var { name, file } = Parser.getInputs(triggerData, ['action', 'name', 'file']);
        this.initialize(name);
        this.webhooks[name].file = file;
        break;
      case 'footericon':
        var { name, icon } = Parser.getInputs(triggerData, ['action', 'name', 'icon']);
        this.initialize(name);
        if (!this.webhooks[name].embed.footer) {
          this.webhooks[name].embed.footer = {};
        }
        this.webhooks[name].embed.footer.icon_url = icon;
        break;
      case 'footertext':
        var { name, text } = Parser.getInputs(triggerData, ['action', 'name', 'text']);
        this.initialize(name);
        if (!this.webhooks[name].embed.footer) {
          this.webhooks[name].embed.footer = {};
        }
        this.webhooks[name].embed.footer.text = text;
        break;
      case 'image':
        var { name, image } = Parser.getInputs(triggerData, ['action', 'name', 'image']);
        this.initialize(name);
        this.webhooks[name].embed.image = { url: image };
        break;
      case 'message':
        var { name, message } = Parser.getInputs(triggerData, ['action', 'name', 'message']);
        this.initialize(name);
        this.webhooks[name].content = message;
        break;
      case 'send':
        var { name } = Parser.getInputs(triggerData, ['action', 'name']);
        this.initialize(name);
        var json = {};
        if (this.webhooks[name].content) {
          json.content = this.webhooks[name].content;
        }

        if (this.webhooks[name].embed && Object.keys(this.webhooks[name].embed).length > 0) {
          json.embeds = [this.webhooks[name].embed];
        }

        var data;

        // Try to get file information and send as form data
        if (this.webhooks[name].file) {
          var fd = new FormData();
          var fileObj = await convertUrlToFileObj(this.webhooks[name].file);

          if (fileObj !== null) {
            fd.append( 'file', fileObj );
            fd.append( 'payload_json', JSON.stringify(json) );
            data = await callAPI('POST', `${this.webhooks[name].url}?wait=true`, fd, {}, { contentType: false, processData: false });
          }
        }

        // Otherwise, send message data as JSON
        if (data == undefined) {
          data = await callAPI('POST', `${this.webhooks[name].url}?wait=true`, JSON.stringify(json), { "Content-Type": "application/json" });
        }

        this.webhookMessageIds[name] = data.id;
        return { "discord_msg_id": data.id };
        break;
      case 'thumbnail':
        var { name, thumbnail } = Parser.getInputs(triggerData, ['action', 'name', 'thumbnail']);
        this.initialize(name);
        this.webhooks[name].embed.thumbnail = { url: thumbnail };
        break;
      case 'title':
        var { name, title } = Parser.getInputs(triggerData, ['action', 'name', 'title']);
        this.initialize(name);
        this.webhooks[name].embed.title = title;
        break;
      case 'update':
        var { name, messageId } = Parser.getInputs(triggerData, ['action', 'name', 'messageId'], false, 1);
        this.initialize(name);
        messageId = messageId || this.webhookMessageIds[name];

        var json = {};
        if (this.webhooks[name].content) {
          json.content = this.webhooks[name].content;
        }

        if (this.webhooks[name].embed) {
          json.embeds = [this.webhooks[name].embed];
        }
        var data = await callAPI('PATCH', `${this.webhooks[name].url}/messages/${messageId}`, JSON.stringify(json), { "Content-Type": "application/json" });
        break;
      case 'url':
        var { name, url } = Parser.getInputs(triggerData, ['action', 'name', 'url']);
        this.initialize(name);
        this.webhooks[name].embed.url = url;
        break;
    }
  }

  /**
   * Initialize the webhook data if it does not exist.
   * @param {string} name webhook name
   */
  initialize(name) {
    if (!this.webhooks[name]) {
      this.webhooks[name] = { content: "", url: this.webhookUrls[name], embed: {}, file: "" };
    }
  }
}

/**
 * Create a handler
 */
function discordHandlerExport() {
  var discord = new DiscordHandler();
}
discordHandlerExport();
