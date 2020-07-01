/**
 * Connect to the StreamElements websocket and setup the event handlers
 * @param {Handler} streamElementHandler StreamElements Handler
 * @param {string} token StreamElements JWT token
 * @param {method} onTestEvent method to call when test events are received
 * @param {method} onEvent method to call when events are received
 */
function connectStreamElementsWebsocket(streamElementHandler, token, onTestEvent, onEvent) {
  const socket = io('https://realtime.streamelements.com', {
      transports: ['websocket']
  });
  // Socket connected
  socket.on('connect', function() {
    console.log('Successfully connected to the streamelements websocket');
    streamElementHandler.success();
    socket.emit('authenticate', {
        method: 'jwt',
        token: token
    });
  });

  // Socket got disconnected
  socket.on('disconnect', function() {
    console.log('Disconnected from websocket');
  });

  // Socket is authenticated
  socket.on('authenticated', function(data) {
    const channelId = data.channelId;
    console.log(`Successfully connected to channel ${channelId}`);
  });

  socket.on('event:test', onTestEvent);
  socket.on('event', onEvent);
}
