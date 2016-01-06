'use strict';

var React = require('react-native');
var styles = require('./styles.js');
var ListItem = require('./listitem.js');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} = React;

var Welcome = React.createClass({
  componentWillMount: function() {
    this.listItems = [
      {
        dataTarget: 1,
        text: "original",
      },
      {
        dataTarget: "infinity-game",
        text: "infinity",
      },
      {
        dataTarget: "twist-game",
        text: "twist",
      },
      {
        dataTarget: "clear-game",
        text: "clear",
      },
      {
        dataTarget: "combine-game",
        text: "combine",
      },
      {
        dataTarget: 6,
        text: "options",
      },
    ]
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