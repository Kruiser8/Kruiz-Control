// Do stuff if the document is fully loaded
$(document).ready(function() {
  readFile("triggers.txt", function(data) {
    readTriggerFile(data);
  });
});

/**
 * Read all the file triggers
 * @param {string} data list of files to parse
 */
function readTriggerFile(data) {
  controller.parseInput(data, false);
  readFile("fileTriggers.txt", function(data) {
    readFileTriggers(data);
  });
}

/**
 * Read all the file triggers
 * @param {string} data list of files to parse
 */
function readFileTriggers(data) {
  data = data.trim();
  var lines = data.split(/\r\n|\n/);

  $.each(lines, function(i, line) {
    if (!line.startsWith('#')) {
      readFile('triggers/' + line, function(input) {
        controller.parseInput(input, true);
      });
    }
  });

  controller.doneParsing();
  setTimeout(function() {
    controller.runInit();
  }, 1000);
}
