class FileHandler extends Handler {
  /**
   * Create a new File handler.
   */
  constructor() {
    super('File', ['OnFileUpdated']);
    this.files = [];
    this.filesTriggers = {};
    this.fileContents = {};
    this.success();
    this.initialized();
  }

  /**
   * Register trigger from user input.
   * @param {string} trigger name to use for the handler
   * @param {array} triggerLine contents of trigger line
   * @param {number} id of the new trigger
   */
  addTriggerData = (trigger, triggerLine, triggerId) => {
    var { file } = Parser.getInputs(triggerLine, ['file']);

    if (this.files.indexOf(file) === -1) {
      this.files.push(file);
      this.filesTriggers[file] = [triggerId];
      this.fileContents[file] = null;
    } else {
      this.filesTriggers[file].push(triggerId);
    }
  }

  /**
   * Handle the input data (take an action).
   * @param {array} triggerData contents of trigger line
   */
  handleData = async (triggerData) => {
    var action = Parser.getAction(triggerData, 'File');
    if (action === 'read') {
      var { filePath } = Parser.getInputs(triggerData, ['action', 'filePath']);
      var content = await readFile(filePath);
      return { content };
    }
  }

  /**
   * Called once all handlers are ready.
   */
  onInit = () => {
    this.files.forEach((file) => {
      readFile(file).then((initialContent) => {
        this.fileContents[file] = initialContent;
        setInterval(() => {
          readFile(file)
            .then((content) => {
              if (content !== this.fileContents[file]) {
                this.fileContents[file] = content;
                this.filesTriggers[file].forEach((triggerId) => {
                  controller.handleData(triggerId, { content });
                });
              }
            });
        }, 1000);
      }).catch(() => {});
    });
  }
}

/**
 * Create a handler
 */
function fileHandlerExport() {
  var file = new FileHandler();
}
fileHandlerExport();
