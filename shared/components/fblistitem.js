'use strict';

var React = require('react-native');
var styles = require('./styles.js');
var {
  Text,
  View,
  TouchableWithoutFeedback,
  AsyncStorage,
} = React;

var e = require('./events.js');

var FacebookLoginManager = require('NativeModules').FacebookLoginManager;

var FBListItem = React.createClass({
  logout() {
    console.log("logout");
    AsyncStorage.removeItem('userInfo', function() {
      e.emit('logout');
    });
  },
  login() {
    console.log("login");
    FacebookLoginManager.newSession((error, info) => {
      if (error) {
        alert("There was an error authenticating facebook.");
      } else {
        AsyncStorage.setItem('userInfo', JSON.stringify(info), function() {
          e.emit('login');
        });
      }
    });
  },
  render: function() {
    return (
      <TouchableWithoutFeedback onPress={this[this.props.action]} key={this.props.key}>
        <View style={[styles.li, styles['li'+this.props.styleNumber]]}>
          <Text style={[styles.liText, styles['liText'+this.props.styleNumber]]}>
            {this.props.text}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
});

module.exports = FBListItem;