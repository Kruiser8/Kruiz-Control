/**
* This overlay was made by Kruiser8 (https://twitch.tv/kruiser8)
*     and is licensed under the Creative Commmons Attribution 4.0 International License (CC BY 4.0)
*
*     For License information, visit https://creativecommons.org/licenses/by/4.0/ -->
*/

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
  controller.parseInput(data, false, false);
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
        controller.parseInput(input, i === (lines.length - 1), true);
      });
    }
  });
}
