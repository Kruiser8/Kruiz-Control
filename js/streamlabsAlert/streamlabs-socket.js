/**
 * Connect to the Streamlabs websocket and setup the event handlers
 * @param {Handler} streamlabsHandler Streamlabs Handler
 * @param {string} token Streamlabs Socket API token
 * @param {method} onEvent method to call when events are received
 */
function connectStreamlabsWebsocket(streamlabsHandler, token, onEvent) {
  //Connect to socket
  var streamlabs = io(`https://sockets.streamlabs.com?token=${token}`, {transports: ['websocket']});

  streamlabs.on('connect', function() {
    console.log('Successfully connected to the streamlabs websocket');
    streamlabsHandler.success();
  });

  streamlabs.onclose = function () {
    console.error('Error connecting to streamlabs socket: Incorrect token or connection error');
  }

  //Perform Action on event
  streamlabs.on('event', onEvent);
}
