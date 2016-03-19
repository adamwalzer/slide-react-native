'use strict';

var React = require('react-native');
var styles = require('./styles.js');
var {
  Text,
  View,
  TouchableWithoutFeedback,
} = React;

var e = require('./events.js');

var SettingItem = React.createClass({
  componentWillMount() {

  },
  handleOnPress(target) {
    e.emit('updateSetting',target,!this.props.set);
  },
  render: function() {
    return (
      <TouchableWithoutFeedback onPress={this.handleOnPress.bind(this, this.props.dataTarget)} key={this.props.key}>
        <View style={[styles.li, styles['li'+this.props.styleNumber]]}>
          <Text style={[styles.liText, styles['liText'+this.props.styleNumber]]}>
            {this.props.text}
            {this.props.set?this.props.off:this.props.on}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
});

module.exports = SettingItem;