'use strict';

var React = require('react-native');
var styles = require('./styles.js');
var ListItem = require('./listitem.js');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
} = React;

var Welcome = React.createClass({
  componentWillMount: function() {
    this.listItems = [
      {
        dataTarget: 1,
        text: "original",
      },
      {
        dataTarget: 2,
        text: "infinity",
      },
      {
        dataTarget: 3,
        text: "twist",
      },
      {
        dataTarget: 4,
        text: "clear",
      },
      {
        dataTarget: 5,
        text: "combine",
      },
      {
        dataTarget: 6,
        text: "options",
      },
    ];

    AsyncStorage.multiGet(['userInfo','settings']).then((a) => {
      var change = false;
      if(!a.userInfo) this.props.navigator.jumpTo(this.props.navigator.props.initialRouteStack[6]);
      if(a.settings) {
        if(typeof a.settings.sfx === "undefined") {
          change = true;
          a.settings.sfx = true;
        }
        if(typeof a.settings.music === "undefined") {
          change = true;
          a.settings.music = true;
        }
        if(typeof a.settings.sound === "undefined") {
          change = true;
          a.settings.sound = true;
        }
      } else {
        change = true;
        a.settings = {
          sfx: true,
          music: true,
          sound: true,
        };
      }
      if(change) AsyncStorage.setItem('settings',JSON.stringify(a.settings));
    }).done();
  },
  render: function() {
    var self = this;
    return (
      <View style={styles.welcome}>
        <View style={styles.logoContainer}>
          <Image source={require('../../images/logo.png')} style={styles.logo} />
        </View>
        <View style={styles.ul}>
          {this.listItems.map(function(li,x){
            return (
              <ListItem dataTarget={li.dataTarget} text={li.text} styleNumber={x} key={x} navigator={self.props.navigator} />
            );
          })}
        </View>
      </View>
    );
  }
});

module.exports = Welcome;