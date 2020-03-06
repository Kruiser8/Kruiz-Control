class Controller {
  /**
   * Create a new controller.
   */
  constructor() {
    this.parsers = {};
    this.triggers = {};
    this.triggerCount = 0;
    this.triggerData = {};
    this.triggerAsyncMap = {};
    this.triggerAsync = [];
  }

  /**
   * Add a new parser to the controller.
   * @param {string} name name to use for the parser
   * @param {Handler} instance parser object to add
   */
  addParser(name, instance) {
    this.parsers[name] = instance;
  }

  /**
   * Get a parser by name.
   * @param {string} name name of the handler
   * @return {Handler|null} the parser or null if none exists
   */
  getParser(name) {
    if (this.parsers[name]) {
      return this.parsers[name];
    } else {
      console.error('Unable to find parser for input: ', name);
      return null;
    }
  }

  /**
   * Add a new trigger to the controller.
   * @param {string} trigger id of the trigger
   * @param {string} name name of parser that handles the trigger
   */
  addTrigger(trigger, name) {
    this.triggers[trigger] = name;
  }

  /**
   * Get a trigger by name.
   * @param {string} trigger name of the trigger
   * @return {Handler|null} the parser or null if none exists
   */
  getTrigger(trigger) {
    if (this.triggers[trigger]) {
      return this.triggers[trigger];
    } else {
      console.error('Unable to find trigger for input: ', trigger);
      return null;
    }
  }

  /**
   * Setup async queue for given trigger id
   * @param {string} triggerId id of the trigger to run
   */
  async handleData(triggerId) {
    if (this.triggerAsyncMap[triggerId]) {
      var queue = this.triggerAsync[this.triggerAsyncMap[triggerId]];
      queue.push(triggerId);
    } else {
      this.performTrigger(triggerId, null);
    }
  }

  /**
   * Perform the trigger content.
   * @param {string} triggerId id of the trigger to run
   */
  async performTrigger(triggerId, callback) {
    // Get trigger content
    var triggerSequence = this.triggerData[triggerId];

    for (var i = 0; i < triggerSequence.length; i++) {
      var data = triggerSequence[i];
      if (data[0] === 'Delay') {
        // Custom delay handler
        await timeout(parseInt(data[1]) * 1000);
      }
      else if (data[0] === 'Play') {
        // Play audio and await the end of the audio
        var audio = new Audio("sounds/" + data.slice(3).join(' ').trim());
        audio.volume = parseInt(data[1]) / 100;
        if (data[2].toLowerCase() === 'wait') {
          await new Promise((resolve) => {
            audio.onended = resolve;
            audio.play();
          });
        } else {
          audio.play();
        }
      }
      else {
        // Get parser and run trigger content
        var parser = this.getParser(data[0]);
        if (parser) {
          await parser.handleData(data);
        }
      }
    }
  }

  parseInput(data, isLast, useAsync) {
    // Pre Parser when no triggers added
    if (this.triggerCount === 0) {
      for (var handler in this.parsers) {
        this.parsers[handler].preParse();
      }
    }

    var triggerIds = [];
    var currentParser = null;
    var triggerSequence = [];
    data = data.trim();
    var lines = data.split(/\r\n|\n/);

    // Parse all lines
    for (var i = 0; i < lines.length; i++) {
      if (!lines[i].startsWith('#')) {
        var lineData = shlexSplit(lines[i]);
        var dataLength = lineData.length;

        // Get new trigger value
        if (dataLength > 0 && !currentParser) {
          currentParser = this.getTrigger(lineData[0]);
          triggerSequence = [lineData];
        }
        // Combine trigger data together
        else if (dataLength > 0 && currentParser) {
          triggerSequence.push(lineData);
        }
        // Clear trigger if found empty line
        else if (dataLength === 0 && currentParser) {
          var parser = this.getParser(currentParser)
          if (parser) {

            parser.addTriggerData(triggerSequence[0][0], triggerSequence[0], this.triggerCount);
            triggerIds.push(this.triggerCount);
            this.triggerData[this.triggerCount] = triggerSequence.slice(1);
            this.triggerCount = this.triggerCount + 1;
          }

          currentParser = null;
          triggerSequence = [];
        }
        // Ensure clear trigger data if no trigger
        else if (!currentParser) {
          triggerSequence = [];
        }
      }
    }
    // Add data if no trailing newline in file
    if (currentParser) {
      var parser = this.getParser(currentParser)
      if (parser) {
        parser.addTriggerData(triggerSequence[0][0], triggerSequence[0], this.triggerCount);
        triggerIds.push(this.triggerCount);
        this.triggerData[this.triggerCount] = triggerSequence.slice(1);
        this.triggerCount = this.triggerCount + 1;
      }
    }

    // Create async for file
    if (useAsync && triggerIds.length > 0) {
      var asyncQueue = async.queue(this.performTrigger.bind(this), 1);
      var asyncId = this.triggerAsync.length;
      this.triggerAsync.push(asyncQueue);
      for(var id = 0; id < triggerIds.length; id++) {
        this.triggerAsyncMap[triggerIds[id]] = asyncId;
      }
    }

    // Post parser after all triggers read
    if (isLast) {
      for (var handler in this.parsers) {
        this.parsers[handler].postParse();
      }
    }
  }
}
controller = new Controller();

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
