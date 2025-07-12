/**
 * Connect to the StreamElements websocket and setup the event handlers
 * @param {Handler} streamElementHandler StreamElements Handler
 * @param {string} token StreamElements JWT token
 * @param {method} onTestEvent method to call when test events are received
 * @param {method} onEvent method to call when events are received
 */
function connectStreamElementsWebsocket(streamElementHandler, token, onTestEvent, onEvent) {
  var connection_error = false;

  const socket = io('https://realtime.streamelements.com', {
      transports: ['websocket']
  });

  // Socket connected
  socket.on('connect', () => {
    socket.emit('authenticate', {
        method: 'jwt',
        token: token
    });
    connection_error = false;
  });

  socket.on('connect_error', () => {
    if (!connection_error) {
      connection_error = true;

      console.error("StreamElements failed to connect properly.");
      streamElementHandler.initialized();
    }
  });

  // Socket got disconnected
  socket.on('disconnect', () => {
    console.error('Disconnected from StreamElements websocket');
  });

  // Socket is authenticated
  socket.on('authenticated', () => {
    streamElementHandler.success();
    streamElementHandler.initialized();
    console.error(`Successfully connected to StreamElements`);
  });

  // Socket failed to authenticate
  socket.on('unauthorized', () => {
    console.error("Unable to authenticate with StreamElements websocket.")
    streamElementHandler.initialized();
  });

  socket.on('event:test', onTestEvent);
  socket.on('event', onEvent);
}
