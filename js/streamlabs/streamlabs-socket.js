/**
 * Connect to the Streamlabs websocket and setup the event handlers
 * @param {Handler} streamlabsAlertHandler Streamlabs Alert Handler
 * @param {string} token Streamlabs Socket API token
 * @param {method} onEvent method to call when events are received
 */
function connectStreamlabsWebsocket(streamlabsAlertHandler, token, onEvent) {
  //Connect to socket
  var streamlabs = io(`https://sockets.streamlabs.com?token=${token}`, {transports: ['websocket']});

  streamlabs.on('connect', function() {
    console.log('Successfully connected to the streamlabs websocket');
    streamlabsAlertHandler.success();
  });

  streamlabs.onclose = function () {
    console.error('Error connecting to streamlabs socket: Incorrect token or connection error');
  }

  //Perform Action on event
  streamlabs.on('event', onEvent);
}
