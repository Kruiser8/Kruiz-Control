/**
 * Create a random string of the provided length.
 * @param {number} length string length to generate
 */
function randomString(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for(var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

/**
 * Read the file and send the data to the callback.
 * @param {string} file name of the file
 */
async function readFile(file) {
  var response = "";
  await $.ajax({
    url: file,
    type: 'GET',
    dataType: 'text',
    success: function(data) {
      response = data;
    },
    error: function(data) {
      console.error(`Error reading the ${file} file! Please open the html in Microsoft Edge or your broadcasting software.`);
    }
  });
  return response;
}

/**
 * Get the user's id and send to the callback.
 * @param {string} user name user
 * @param {function} callback function to call with file data
 */
async function getIdFromUser(user) {
  var response = "";
  await $.ajax({
    url: 'https://decapi.me/twitch/id/' + user,
    type: 'GET',
    dataType: 'text',
    success: function(data) {
      response = data;
    },
    error: function(data) {
      console.error(`Error getting the user id for ${user}! Please double-check that your user is spelled correctly.`);
    }
  });
  return response;
}

/**
 * Escape a string for use in a RegExp
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

/**
 * Check if the input is numeric
 * @param {mixed} n input
 */
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Increment the value by the input increment.
 * If the value is not numeric, sets to 0.
 *
 * @param {mixed} value starting value
 * @param {numeric} increment incremental value
 */
function incrementVar(value, increment) {
  if (!isNumeric(value)) {
    value = 0;
  } else {
    value = parseFloat(value);
  }
  return value + increment;
}

/**
 * Return a promise for the specified amount of milliseconds
 * @param {number} ms Milliseconds to wait in the promise
 */
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
