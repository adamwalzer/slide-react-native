// var DDPClient = require('NativeModules').DDPClient;
// the regular requirement wasn't working for some reason
var React = require('react-native');
var DDPClient = require("../../node_modules/ddp-client/index.js");
var e = require('./events.js');
var {
  AsyncStorage,
} = React;
var connected, login, logout, subscribe, addEvent, syncEvents, doneSyncing, eventsObj = {}, processedEvents = {}, syncing = false;

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
  ddp.subscribe('HighScores', [], () => {
    var items = ddp.collections.HighScores ? ddp.collections.HighScores.items : null;
    AsyncStorage.setItem('HighScores', JSON.stringify(items), () => {
      e.emit('updateHighScores');
    });
  });
};

addEvent = (ts,func,args,cb) => {
  AsyncStorage.mergeItem('eventsObj',JSON.stringify(eventsObj)).then((obj) => {
    eventsObj = obj ? JSON.parse(obj) : {};
    if(!eventsObj[ts]) {
      eventsObj[ts] = [func,args,cb];
      syncEvents();
    } else {
      addEvent.call(null,++ts,func,args,cb);
    }
  });
};

syncEvents = () => {
  if(eventsObj && Object.keys(eventsObj).length != 0 && ddp.socket.readyState === 1 && !syncing) {
    syncing = true;
    console.log("syncing");
    ddp.call('syncEvents', [eventsObj], (error,result) => {
      console.log("synced");
      for(var key in result) {
        if(!eventsObj.hasOwnProperty(key)) continue;
        eventsObj[key] = result[key];
      }
      syncing = false;
      e.emit('doneSyncing');
    });
  }
};

doneSyncing = () => {
  Object.keys(eventsObj).map(function(key) {
     if(eventsObj[key][1].processed) {
       processedEvents[key] = eventsObj[key];
       delete eventsObj[key];
     }
  });
  console.log(eventsObj);
  AsyncStorage.setItem('eventsObj', JSON.stringify(eventsObj)).then(() => {
    syncEvents();
  }).done();
  AsyncStorage.mergeItem('processedEvents', JSON.stringify(processedEvents)).then(() => {
    processedEvents = {};
  }).done();
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
e.on('doneSyncing', doneSyncing);
e.on('login', login);
e.on('logout', logout);

module.exports = ddp;