// var DDPClient = require('NativeModules').DDPClient;
// the regular requirement wasn't working for some reason
var React = require('react-native');
var DDPClient = require("../../node_modules/ddp-client/index.js");
var e = require('./events.js');
var {
  AsyncStorage,
} = React;
var connected, login, logout, subscribe, addEvent, syncEvents, eventsArray;

var ddp = new DDPClient({
  // All properties optional, defaults shown
  // host : "104.131.68.26",
  // port : 3000,
  // ssl  : false,
  // autoReconnect : true,
  // autoReconnectTimer : 500,
  // maintainCollections : true,
  // ddpVersion : '1',  // ['1', 'pre2', 'pre1'] available
  // Use a full url instead of a set of `host`, `port` and `ssl`
  url: 'ws://localhost:3000/websocket',
  // url: 'ws://104.131.68.26/slide/play/websocket',
  // url: 'ws://thataw.com/slide/play/websocket',
  // socketConstructor: WebSocket // Another constructor to create new WebSockets
});

ddp.connect(function(error, wasReconnect) {
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
  e.emit('connected');
});

signIn = () => {
  AsyncStorage.getItem('userInfo').then((userInfo) => {
    ddp.call('signIn', [userInfo], () => {
      subscribe();
      syncEvents();
    });
  }).done();
};

subscribe = () => {
  AsyncStorage.getItem('userInfo').then((userInfo) => {
    ddp.call('getHighScores', [], (HighScores) => {
      var items = HighScores ? HighScores.items : null;
      console.log(items);
      AsyncStorage.setItem('HighScores', JSON.stringify(items), () => {
        e.emit('updateHighScores');
      });
    })
  });
};

addEvent = (func,args,cb) => {
  eventsArray = eventsArray || [];
  eventsArray.push([func,args,cb]);
  syncEvents();
};

syncEvents = () => {
  if(eventsArray && eventsArray.length) {
    var args = eventsArray[0];
    var cb = args[2];
    args[2] = () => {
      eventsArray.shift();
      if(eventsArray.length) syncEvents();
      if(typeof cb === 'function') {
        cb(arguments);
      }
    };
    ddp.call.apply(ddp, args);
  }
};

connected = () => {
  signIn();
};

login = function() {
  signIn();
};
logout = function() {};

e.on('connected', connected);
e.on('addEvent', addEvent);
e.on('subscribe', subscribe);
e.on('login', login);
e.on('logout', logout);

module.exports = ddp;