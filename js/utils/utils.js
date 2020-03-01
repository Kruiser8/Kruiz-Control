/**
 * Create a random string of the provided length.
 * @param {number} length string length to generate
 */
 var randomString = function(length) {
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
 * @param {function} callback function to call with file data
 */
 function readFile(file, callback) {
  $.ajax({
    url: file,
    type: 'GET',
    dataType: 'text',
    success: function(data) {
      callback(data);
    },
    error: function(data) {
      console.error(`Error reading the ${file} file! Please open the html in Microsoft Edge or your broadcasting software.`);
    }
  });
}

/**
 * Get the user's id and send to the callback.
 * @param {string} user name user
 * @param {function} callback function to call with file data
 */
 function getIdFromUser(user, callback) {
  $.ajax({
    url: 'https://decapi.me/twitch/id/' + user,
    type: 'GET',
    dataType: 'text',
    success: function(data) {
      callback(data);
    },
    error: function(data) {
      console.error(`Error getting the user id for ${user}! Please double-check that your user is spelled correctly.`);
    }
  });
}
