// Do stuff if the document is fully loaded
$(document).ready(async function() {
  var version = await readFile("version.txt");
  console.error(`Kruiz Control ${version.trim()} Initialized`);
  var data = await readFile("triggers.txt");
  await readTriggerFile(data);
});

/**
 * Read all the file triggers
 * @param {string} data list of files to parse
 */
async function readTriggerFile(data) {
  controller.parseInput(data, false);
  var files = await readFile("fileTriggers.txt");
  await readFileTriggers(files);
}

/**
 * Read all the file triggers
 * @param {string} data list of files to parse
 */
async function readFileTriggers(data) {
  data = data.trim();
  var lines = data.split(/\r\n|\n/);

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (!line.startsWith('#') && line.trim().length > 0) {
      try {
        var input = await readFile('triggers/' + line);
        controller.parseInput(input, true);
      } catch (error) {
        console.error(`Check that the ${line} file exists in the triggers folder`);
      }
    }
  }

  controller.doneParsing();
  setTimeout(function() {
    controller.runInit();
  }, 2000);
}
