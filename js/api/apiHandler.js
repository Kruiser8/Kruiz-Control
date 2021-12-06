class ApiHandler extends Handler {
  /**
   * Create a new API handler.
   */
  constructor() {
    super('API', []);
    this.success();
    this.apiCall = {};

    this.initialize.bind(this);
  }

  /**
   * Handle the input data (take an action).
   * @param {array} triggerData contents of trigger line
   */
  async handleData(triggerData) {
    var action = Parser.getAction(triggerData, 'API');
    if (action === 'get') {
      var { url } = Parser.getInputs(triggerData, ['action', 'url']);
      var response = await this.callAPI('GET', url);
      return { api_data: response };
    } else {
      switch (action) {
        case 'method':
          var { name, method } = Parser.getInputs(triggerData, ['action', 'name', 'method']);
          this.initialize(name);
          this.apiCall[name].method = method.toUpperCase();
          break;
        case 'header':
          var { name, headerKey, headerValue } = Parser.getInputs(triggerData, ['action', 'name', 'headerKey', 'headerValue']);
          this.initialize(name);
          this.apiCall[name].headers[headerKey] = headerValue;
          break;
        case 'data':
          var { name, dataKey, dataValue } = Parser.getInputs(triggerData, ['action', 'name', 'dataKey', 'dataValue']);
          this.initialize(name);
          this.apiCall[name].data[dataKey] = dataValue;
          break;
        case 'rawdata':
          var { name, rawData } = Parser.getInputs(triggerData, ['action', 'name', 'rawData']);
          this.initialize(name);
          this.apiCall[name].data = rawData;
          break;
        case 'url':
          var { name, apiURL } = Parser.getInputs(triggerData, ['action', 'name', 'apiURL']);
          this.initialize(name);
          this.apiCall[name].url = apiURL;
          break;
        case 'send':
          var { name } = Parser.getInputs(triggerData, ['action', 'name']);
          this.initialize(name);
          var response = await this.callAPI(this.apiCall[name].method, this.apiCall[name].url, this.apiCall[name].data, this.apiCall[name].headers);
          return { api_data: response };
          break;
        case 'clear':
          var { name } = Parser.getInputs(triggerData, ['action', 'name']);
          delete this.apiCall[name];
          break;
        default:
          console.error(`Unexpected API <action> (${action}). Check your event code.`);
          break;
      }
    }
  }

  /**
   * Initialize the api data if it does not exist.
   * @param {string} name webhook name
   */
  initialize(name) {
    if (this.apiCall[name] === undefined) {
      this.apiCall[name] = {
        method: "GET",
        headers: {},
        data: {},
        url: ""
      };
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
             response = 'success';
           }
        },
        error: function(err) {
          console.error(`Error calling the ${url} API: ${JSON.stringify(err)}`);
          response = 'error';
        }
      });
    } catch (err) {
      console.error(`Unhandled error calling the ${url} API: ${JSON.stringify(err)}`);
      response = 'error';
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
