'use strict';

var React = require('react-native');
var styles = require('./styles.js');
var {
  Text,
  View,
  TouchableWithoutFeedback,
  AsyncStorage,
} = React;

var FacebookLoginManager = require('NativeModules').FacebookLoginManager;

var FBListItem = React.createClass({
  logout() {
    console.log("logout");
    AsyncStorage.removeItem('userId', this.props.parent.updateUser);
  },
  login() {
    console.log("login");
    FacebookLoginManager.newSession((error, info) => {
      if (error) {
        alert("There was an error authenticating facebook.");
      } else {
        AsyncStorage.setItem('userId', ''+info.userId, this.props.parent.updateUser);
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