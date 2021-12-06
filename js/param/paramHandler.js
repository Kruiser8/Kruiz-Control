class ParamHandler extends Handler {
  /**
   * Create a new Param handler.
   */
  constructor() {
    super('Param', []);
    this.success();
  }

  /**
   * Handle the input data (take an action).
   * @param {array} triggerData contents of trigger line
   * @param {array} parameters current trigger parameters
   */
  async handleData(triggerData, parameters) {
    var action = Parser.getAction(triggerData);

    switch (action) {
      case 'create':
        var { name, value } = Parser.getInputs(triggerData, ['action', 'name', 'value']);
        return { [name]: value };
        break;
      case 'lower':
        var { name } = Parser.getInputs(triggerData, ['action', 'name']);
        if (parameters.hasOwnProperty(name)) {
          return { [name]: parameters[name].toLowerCase() };
        }
        break;
      case 'upper':
        var { name } = Parser.getInputs(triggerData, ['action', 'name']);
        if (parameters.hasOwnProperty(name)) {
          return { [name]: parameters[name].toUpperCase() };
        }
        break;
      case 'proper':
        var { name } = Parser.getInputs(triggerData, ['action', 'name']);
        if (parameters.hasOwnProperty(name)) {
          return { [name]: parameters[name].toProperCase() };
        }
        break;
      case 'add':
        var { name, value } = Parser.getInputs(triggerData, ['action', 'name', 'value']);
        if (parameters.hasOwnProperty(name)) {
          value = parseFloat(value);
          var paramValue = parseFloat(parameters[name]);
          if (!isNaN(value) && !isNaN(paramValue)) {
            return { [name]: paramValue + value };
          }
        }
        break;
      case 'subtract':
        var { name, value } = Parser.getInputs(triggerData, ['action', 'name', 'value']);
        if (parameters.hasOwnProperty(name)) {
          value = parseFloat(value);
          var paramValue = parseFloat(parameters[name]);
          if (!isNaN(value) && !isNaN(paramValue)) {
            return { [name]: paramValue - value };
          }
        }
        break;
      case 'negate':
        var { name } = Parser.getInputs(triggerData, ['action', 'name']);
        if (parameters.hasOwnProperty(name)) {
          switch(String(parameters[name]).toLowerCase()) {
            case "false":
            case "no":
            case "0":
            case "":
              return { [name]: true };
            default:
              return { [name]: false };
          }
        }
        break;
      case 'exists':
        var { name } = Parser.getInputs(triggerData, ['action', 'name']);
        return { exists: parameters.hasOwnProperty(name) };
        break;
      case 'copy':
        var { name, toName } = Parser.getInputs(triggerData, ['action', 'name', 'toName']);
        if (parameters.hasOwnProperty(name)) {
          return { [toName]: parameters[name] };
        }
        break;
      case 'replace':
        var { name, toReplace, replacement } = Parser.getInputs(triggerData, ['action', 'name', 'toReplace', 'replacement']);
        if (parameters.hasOwnProperty(name)) {
          return { [name]: parameters[name].replace(new RegExp(escapeRegExp(toReplace), 'g'), replacement) };
        }
        break;
      case 'keyword':
        var { name, keywords } = Parser.getInputs(triggerData, ['action', 'name', 'keywords'], true);
        if (parameters.hasOwnProperty(name)) {
          keywords.forEach((keyword, index) => {
            keywords[index] = escapeRegExp(keyword.trim());
          });
          var regex = new RegExp('(?:^|\\s)' + keywords.join('(?:$|\\s)|(?:^|\\s)') + '(?:$|\\s)', 'gi');
          var result = parameters[name].match(regex);
          var matched = false;
          if (result) {
            matched = true;
            var match = result[0].trim();
            result.forEach((res, index) => {
              result[index] = res.trim();
            });
          }
          return { matched, match, keywords: result };
        }
        break;
      default:
        console.error(`Unexpected Param action (${action}). Check your event code.`);
        break;
    }
  }
}

/**
 * Create a handler
 */
function paramHandlerExport() {
  var param = new ParamHandler();
}
paramHandlerExport();
