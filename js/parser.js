class Parser {

  /**
   * Splits the input string into arguments.
   * @param {string} line string to split
   */
  static splitLine(line) {
    var items = [];
    try {
      items = shlexSplit(line);
    } catch (err) {
      items = line.split(' ');
    }
    return items;
  }

  /**
   * Get the action from the input line information.
   * @param {array} lineData input to grab the action
   * @param {string} handler the name of the handler retrieving the action
   * @param {numeric} offset offset to apply when retrieving the action
   */
  static getAction(lineData, handler, offset) {
    offset = offset || 0;
    if (lineData.length > offset + 1) {
        return lineData[offset + 1].toLowerCase();
    }
    console.error(`Unable to get a ${handler} action from: ${JSON.stringify(lineData)}`);
    return "";
  }

  /**
   * Get the input values for the given line.
   * @param {array} lineData input to grab the action
   * @param {array} inputNames the list of input names to grab
   * @param {false} supportsAliases true if the input allows aliases
   * @param {numeric} optionalInputs number of optional inputs to check
   */
  static getInputs(lineData, inputNames, supportsAliases, optionalInputs) {
    supportsAliases = supportsAliases || false;
    optionalInputs = optionalInputs || 0;
    var res = {};

    var totalPossibleInputs = inputNames.length;
    if (supportsAliases) {
      res[inputNames[totalPossibleInputs-1]] = [];
    }

    if (lineData.length > totalPossibleInputs - optionalInputs) {
      if (!supportsAliases && lineData.length > totalPossibleInputs + 1) {
        console.error(`Kruiz Control: Too many inputs provided for ${lineData[0]}.\r\nExpected (${totalPossibleInputs} inputs): ${JSON.stringify(inputNames)}\r\nFound (${lineData.length - 1} inputs): ${JSON.stringify(lineData.slice(1))}`);
      }

      lineData.forEach((item, i) => {
        if (i != 0) {
          if (i < totalPossibleInputs) {
            res[inputNames[i-1]] = item;
          } else if (i == totalPossibleInputs && supportsAliases) {
            res[inputNames[i-1]] = lineData.slice(i);
          } else if (i == totalPossibleInputs) {
            res[inputNames[i-1]] = lineData.slice(i).join(' ');
          }
        }
      });

      if (Debug.All || Debug.Parser) {
        console.error(`Values parsed from ${JSON.stringify(lineData)}: ${JSON.stringify(res)}`);
      }
      return res;
    }

    console.error(`Kruiz Control: Unable to retrieve enough inputs for ${lineData[0]}.\r\nExpected (${totalPossibleInputs} inputs): ${JSON.stringify(inputNames)}\r\nFound (${lineData.length - 1} inputs): ${JSON.stringify(lineData.slice(1))}`);
    return {};
  }
}
