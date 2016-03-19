'use strict';

var React = require('react-native');
var styles = require('./styles.js');
var SettingItem = require('./setting-item.js');
var ListItem = require('./listitem.js');
var {
  Text,
  View,
  AsyncStorage,
} = React;

var e = require('./events.js');

var Settings = React.createClass({
  getInitialState() {
    return {
      settings: {},
    }
  },
  componentWillMount: function() {
    e.on('updateSetting',this.updateSetting);
    this.getSettings();
  },
  componentWillUnmount: function() {
    e.off('settingsUpdate',this.updateSettings);
  },
  getSettings() {
    AsyncStorage.getItem('settings').then(this.updateSettings).done();
  },
  updateSetting(setting,value) {
    var settings = this.state.settings;
    settings[setting] = value;
    this.updateSettings(settings);
  },
  updateSettings(settings) {
    if(typeof settings === "string") settings = JSON.parse(settings);
    if(settings) {
      this.setState({
        settings,
      });
      AsyncStorage.setItem('settings',JSON.stringify(settings));
      e.emit('settingsUpdate',settings);
    }
  },
  list: [
    {
      dataTarget: "sfx",
      text: "turn sfx ",
      on: "on",
      off: "off",
    },
    {
      dataTarget: "music",
      text: "turn music ",
      on: "on",
      off: "off",
    },
    {
      dataTarget: "sound",
      text: "turn all sound ",
      on: "on",
      off: "off",
    },
    {
      type: "listitem",
      dataTarget: "options",
      text: "back to options",
    },
  ],
  render: function() {
    var self = this;

    return (
      <View style={styles.options}>
        <View style={styles.ul}>
          {this.list.map(function(li,x){
            if(li.type === "listitem") {
              return (
                <ListItem dataTarget={li.dataTarget} text={li.text} styleNumber={x} key={x} navigator={self.props.navigator} />
              );
            } else {
              return (
                <SettingItem dataTarget={li.dataTarget} text={li.text} on={li.on} off={li.off} set={self.state.settings[li.dataTarget]} styleNumber={x} key={x} navigator={self.props.navigator} />
              );
            }
          })}
        </View>
      </View>
    );
  }
});

module.exports = Settings;