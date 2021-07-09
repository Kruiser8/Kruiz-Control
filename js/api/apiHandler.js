class ApiHandler extends Handler {
  /**
   * Create a new API handler.
   */
  constructor() {
    super('API', []);
    this.success();
    this.apiCall = {};
  }

  /**
   * Handle the input data (take an action).
   * @param {array} triggerData contents of trigger line
   */
  async handleData(triggerData) {
    if (triggerData[1].toLowerCase() === 'get') {
      var method = 'GET';
      var url = triggerData.slice(2).join(' ');

      var response = await this.callAPI(method, url);
      return { api_data: response };
    } else {
      var action = triggerData[1].toLowerCase();
      var name = triggerData[2];

      if (this.apiCall[name] === undefined) {
        this.apiCall[name] = {
          method: "GET",
          headers: {},
          data: {},
          url: ""
        };
      }
      switch (action) {
        case 'method':
          this.apiCall[name].method = triggerData[3].toUpperCase();
          break;
        case 'header':
          var headerKey = triggerData[3];
          var headerValue = triggerData[4];
          this.apiCall[name].headers[headerKey] = headerValue;
          break;
        case 'data':
          var dataKey = triggerData[3];
          var dataValue = triggerData[4];
          this.apiCall[name].data[dataKey] = dataValue;
          break;
        case 'rawdata':
          this.apiCall[name].data = triggerData.slice(3).join(" ");
          break;
        case 'url':
          var apiURL = triggerData[3];
          this.apiCall[name].url = apiURL;
          break;
        case 'send':
          var method = this.apiCall[name].method;
          var url = this.apiCall[name].url;
          var headers = this.apiCall[name].headers;
          var rawData = this.apiCall[name].data;
          var response = await this.callAPI(method, url, rawData, headers)
          return { api_data: response };
          break;
        case 'clear':
          delete this.apiCall[name];
          break;
        default:
          console.error(`Unexpected API <action> (${action}). Check your event code.`);
          break;
      }
    }
  }

  /**
   * Call the input url and return the response.
   * @param {string} method type of API call
   * @param {string} url url to call
   * @param {object} data parameters to send with the call
   * @param {object} headers headers to send with the call
   */
  async callAPI(method, url, data, headers) {
    data = data || {};
    headers = headers || {};
    var response = null;
    try {
      await $.ajax({
        url: url,
        type: method,
        data: data,
        headers: headers,
        success: function(data) {
          response = data;
           if (data === undefined) {
             response = 'Sucess';
           }
        },
        error: function(data) {
          console.error(`Error calling the ${url} API: ${JSON.stringify(data)}`);
        }
      });
    } catch (err) {
      response = 'Error';
    }

    return response;
  }
}

/**
 * Create a handler
 */
function apiHandlerExport() {
  var api = new ApiHandler();
}
apiHandlerExport();
