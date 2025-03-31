/**
 * Connect to the Streamlabs websocket and setup the event handlers
 * @param {Handler} streamlabsAlertHandler Streamlabs Alert Handler
 * @param {string} token Streamlabs Socket API token
 * @param {method} onEvent method to call when events are received
 */
function connectStreamlabsWebsocket(streamlabsAlertHandler, token, onEvent) {
  var connection_error = false;

  //Connect to socket
  var streamlabs = io(`https://sockets.streamlabs.com?token=${token}`, {transports: ['websocket']});

  streamlabs.on('connect', function() {
    console.error('Successfully connected to Streamlabs');
    streamlabsAlertHandler.success();
    streamlabsAlertHandler.initialized();
    connection_error = false;
  });

  streamlabs.on('connect_error', function() {
    if (!connection_error) {
      connection_error = true;

      console.error('Unable to connect to the Streamlabs websocket');
      streamlabsAlertHandler.initialized();
    }
  });

  streamlabs.onclose = function () {
    console.error('Error connecting to Streamlabs socket: Incorrect token or connection error');
    streamlabsAlertHandler.initialized();
  }

  //Perform Action on event
  streamlabs.on('event', onEvent);
}
