/**
 * Connect to the Streamlabs websocket and setup the event handlers
 * @param {string} token Streamlabs Socket API token
 * @param {method} onEvent method to call when events are received
 */
function connectStreamlabsWebsocket(token, onEvent) {
  //Connect to socket
  var streamlabs = io(`https://sockets.streamlabs.com?token=${token}`, {transports: ['websocket']});

  streamlabs.onclose = function () {
    console.error('Error connecting to streamlabs socket: Incorrect token or connection error');
  }

  //Perform Action on event
  streamlabs.on('event', onEvent);
}
