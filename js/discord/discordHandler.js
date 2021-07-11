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
  }

  /**
   * Handle the input data (take an action).
   * @param {array} triggerData contents of trigger line
   */
  async handleData(triggerData) {
    var action = triggerData[1].toLowerCase();

    var name = triggerData[2];
    if (this.webhooks[triggerData[2]]) {
      name = triggerData[2];
    }

    if (action === 'create') {
      name = triggerData[2];
    } else {
      if (!this.webhooks[name]) {
        this.webhooks[name] = { content: "", url: this.webhookUrls[triggerData[2]], embed: {} };
      }
    }
    switch (action) {
      case 'clear':
        delete this.webhooks[name];
        break;
      case 'color':
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
        var url = triggerData.slice(3).join(' ');
        this.webhookUrls[name] = url;
        break;
      case 'delete':
        var messageId = this.webhookMessageIds[triggerData[2]];
        if (triggerData[3]) {
          messageId = triggerData[3];
        }
        var data = await callAPI('DELETE', `${this.webhooks[name].url}/messages/${messageId}`);
        break;
      case 'description':
        var description = triggerData.slice(3).join(' ');
        this.webhooks[name].embed.description = description;
        break;
      case 'field':
        var field = {
          name: triggerData[3],
          value: triggerData[4]
        };
        if (triggerData.length > 5) {
          if (triggerData[5].toLowerCase() === 'true') {
            field['inline'] = true;
          }
        }
        if (!this.webhooks[name].embed.fields) {
          this.webhooks[name].embed.fields = [];
        }
        this.webhooks[name].embed.fields.push(field);
        break;
      case 'footericon':
        var icon = triggerData.slice(3).join(' ');
        if (!this.webhooks[name].embed.footer) {
          this.webhooks[name].embed.footer = {};
        }
        this.webhooks[name].embed.footer.icon_url = icon;
        break;
      case 'footertext':
        var text = triggerData.slice(3).join(' ');
        if (!this.webhooks[name].embed.footer) {
          this.webhooks[name].embed.footer = {};
        }
        this.webhooks[name].embed.footer.text = text;
        break;
      case 'image':
        var image = triggerData.slice(3).join(' ');
        this.webhooks[name].embed.image = { url: image };
        break;
      case 'message':
        var message = triggerData.slice(3).join(' ');
        this.webhooks[name].content = message;
        break;
      case 'send':
        var json = {};
        if (this.webhooks[name].content) {
          json.content = this.webhooks[name].content;
        }

        if (this.webhooks[name].embed && Object.keys(this.webhooks[name].embed).length > 0) {
          json.embeds = [this.webhooks[name].embed];
        }
        var data = await callAPI('POST', `${this.webhooks[name].url}?wait=true`, JSON.stringify(json), { "Content-Type": "application/json" });
        this.webhookMessageIds[triggerData[2]] = data.id;
        return { "discord_msg_id": data.id };
        break;
      case 'thumbnail':
        var thumbnail = triggerData.slice(3).join(' ');
        this.webhooks[name].embed.thumbnail = { url: thumbnail };
        break;
      case 'title':
        var title = triggerData.slice(3).join(' ');
        this.webhooks[name].embed.title = title;
        break;
      case 'update':
        var messageId = this.webhookMessageIds[triggerData[2]];
        if (triggerData.length > 3) {
          messageId = triggerData[3];
        }
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
        var url = triggerData.slice(3).join(' ');
        this.webhooks[name].embed.url = url;
        break;
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
