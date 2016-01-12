// var DDPClient = require('NativeModules').DDPClient;
// the regular requirement wasn't working for some reason
var DDPClient = require("../../node_modules/ddp-client/index.js");
var ddpclient = new DDPClient({
  // All properties optional, defaults shown
  // host : "104.131.68.26",
  // port : 3000,
  ssl  : false,
  autoReconnect : true,
  autoReconnectTimer : 500,
  maintainCollections : true,
  ddpVersion : '1',  // ['1', 'pre2', 'pre1'] available
  // Use a full url instead of a set of `host`, `port` and `ssl`
  url: 'ws://104.131.68.26/slide/play/websocket',
  // socketConstructor: WebSocket // Another constructor to create new WebSockets
});

/*
ddpclient.connect(function(error, wasReconnect) {
  // If autoReconnect is true, this callback will be invoked each time
  // a server connection is re-established
  if (error) {
    console.log('DDP connection error!');
    return;
  }

  if (wasReconnect) {
    console.log('Reestablishment of a connection.');
  }

  console.log('connected!');
});
*/

module.exports = ddpclient;