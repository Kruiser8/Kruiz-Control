let AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

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
 * Retrieve the data from a url and convert to a blob.
 * @param {string} url URL to download data
 */
function getBlobFromUrl(url) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'blob';
    request.onload = () => {
      resolve(request.response);
    };
    request.onerror = reject;
    request.send();
  })
}

/**
 * Convert the URL to a file into a File object.
 * @param {string} fileUrl contents of trigger line
 */
async function convertUrlToFileObj(fileUrl) {
  try {
    var fileName = fileUrl.substring(fileUrl.lastIndexOf('/'));
    var fileBlob = await getBlobFromUrl(fileUrl);
    var file = new File([fileBlob], fileName);
    return file;
  } catch (err) {
    console.log(err);
    return null;
  }
}

/**
 * Read the file and send the data to the callback.
 * @param {string} method type of API call
 * @param {string} url url to call
 * @param {object} data parameters to send with the call
 * @param {object} headers headers to send with the call
 * @param {object} ajaxArgs options added to the $.ajax call
 */
async function callAPI(method, url, data, headers, ajaxArgs) {
  data = data || {};
  headers = headers || {};
  ajaxArgs = ajaxArgs || {};
  var response = null;
  try {
    await $.ajax({
      url: url,
      type: method,
      data: data,
      headers: headers,
      success: function(data) {
        response = data;
      },
      error: function(data) {
        console.error(`Error calling the ${url} API: ${JSON.stringify(data)}`);
      },
      ...ajaxArgs
    });
  } catch (err) {
    response = 'Error';
  }

  return response;
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
 * @param {string} value input string to escape
 */
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

/**
 * Check if the input is numeric
 * @param {mixed} n input
 */
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Decode any html encoded values in the input
 * @param {string} value input string to decode
 */
function htmlDecode(value) {
  return new DOMParser().parseFromString(value,'text/html').querySelector('html').textContent;
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
* Proper cases the input string.
* - capitalizes the first letter of every word.
*/
Object.defineProperty(String.prototype, "toProperCase", {
    value: function toProperCase() {
      var sentence = this.toLowerCase().split(" ");
      for(var i = 0; i < sentence.length; i++){
         sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
      }
      return sentence.join(' ');
    },
    writable: true,
    configurable: true
});

/**
 * Return a promise for the specified amount of milliseconds
 * @param {number} ms Milliseconds to wait in the promise
 */
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
